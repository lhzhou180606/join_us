const express = require("express")
const hrRouter = express.Router()
const query = require('../../utils/mysql')
const { v4: uuidv4, v4 } = require("uuid");
const jwt = require("../../utils/jsonwebtoken");
const { returnErr } = require("../../utils/returnErr");
//人事表

hrRouter.get('/',(req,res)=>{
  res.send({code:200,msg:'ok'})
})

// hr登陆或注册
hrRouter.post('/hr/LoginOrRegister', (req, res) => {
  const { telephone, password } = req.body
  const time = new Date().toLocaleString()
  const hr_id = v4()
  const queryHrSQl = `select * from hr where telephone = '${telephone}'`
  query(queryHrSQl, (result) => {
    if (result.length) {
      return res.send({
        code: 200,
        msg: '企业登录成功',
        data: null,
        company_id: result[0].company_id,
        token: jwt.sendToken({telephone}, '1day')
      })
    } else {
      const lengthSQl = 'select * from hr'
      query(lengthSQl, (result1) => {
        const insertSQl = `insert into hr(id, hr_id, name, company_id, telephone, password, avatar, reg_time) values('${result1.length + 1}', '${hr_id}', '', '', '${telephone}', '${password}', '', '${time}')`
        query(insertSQl, (result2) => {
          if (result2.affectedRows) {
            return res.send({
              code: 200,
              msg: '注册成功',
              data: null,
              remark: '该用户为首次注册',
              token: jwt.sendToken({telephone}, '1day')
            })
          } else {
            return returnErr(res, '注册失败')
          }
        })
      })
    }
  })
})

// 企业职位列表管理
hrRouter.get('/hr/positionManage', (req, res) => {
  const { company_id, pageIndex, pageSize } = req.query
  const sql = `select * from pos where company_id = '${company_id}' limit ${(pageIndex - 1) * pageSize}, ${pageSize}`
  query(sql, (result) => {
    if (result.length) {
      res.status(200).send({
        code: 200,
        msg: '请求成功',
        data: result,
        total: result.length
      })
    } else {
      return returnErr(res, '请求失败')
    }
  })
})

// 查看企业职位详情
hrRouter.get('/hr/positionDetail', (req, res) => {
  const { position_id } = req.query
  const sql = `select * from pos, company, hr where position_id = '${position_id}' and pos.company_id = company.company_id and hr.hr_id = pos.hr_id`;
  query(sql, (result) => {
    if (result.length) {
      delete result[0].password
      result[0].position_tag = JSON.parse(result[0].position_tag);
      result[0].welfare_tag = JSON.parse(result[0].welfare_tag);
      res.status(200).send({
        code: 200,
        msg: '请求成功',
        data: result[0]
      })
    } else {
      return returnErr(res, '请求失败')
    }
  })
})

// hr发布职位
hrRouter.post("/hr/addPosition", (req, res) => {
  const { company_id, telephone } = req.body
  res.send({
    code: 200
  })
});

module.exports = hrRouter