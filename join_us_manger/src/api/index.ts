import request from '@/api/request'

//---------管理员接口
//登录
export const loginManger = (data:any) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

//注册
export const regManger = (data:any) => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
//查询所有管理员
export const selMangerAll = (data:any) => {
  return request({
    url: '/mangers',
    method: 'get',
    params:data
  })
}
//查询指定管理员
export const selMangerOne = (manger_id:string) => {
  return request({
    url: '/manger_id',
    method: 'post',
    data:{manger_id}
  })
}
//修改管理员权限
export const updateMangerState = (data:any) => {
  return request({
    url: '/state',
    method: 'post',
    data,
  })
}
//修改管理员
export const updateManger = (data:any) => {
  return request({
    url: '/manger',
    method: 'patch',
    data,
  })
}
//删除管理员
export const delManger = (manger_id:string) => {
  return request({
    url: '/manger',
    method: 'delete',
    data:{manger_id},
  })
}

//---------行业接口
//添加行业
export const addIndustry = (data:any) => {
  return request({
    url: '/industry',
    method: 'post',
    data
  })
}
//查询所有行业
export const selIndustryAll = (data:any) => {
  return request({
    url: '/industrys',
    method: 'get',
    params:data
  })
}
//查询所有行业（无分页）
export const selIndustryAllShow = () => {
  return request({
    url: '/industrys/show',
    method: 'get',
  })
}

//删除行业
export const delIndustry = (industry_id:string) => {
  return request({
    url: '/industry',
    method: 'delete',
    data:{industry_id},
  })
}
//修改行业状态
export const updateIndustryState = (data:any) => {
  return request({
    url: '/industry/state',
    method: 'post',
    data,
  })
}
//修改行业
export const updateIndustry = (data:any) => {
  return request({
    url: '/industry',
    method: 'patch',
    data,
  })
}


//----------职位类型
//查询所有职位类型
export const selPositionTypeAll = (data:any) => {
  return request({
    url: '/positionTypes',
    method: 'get',
    params:data
  })
}
//查询所有一级职位类型(无分页)
export const selPositionTypeShow= () => {
  return request({
    url: '/positionTypes/show',
    method: 'get',
  })
}
//删除职位类型
export const delPositionType = (data:any) => {
  return request({
    url: '/positionType',
    method: 'delete',
    data,
  })
}
//添加职位类型
export const addPositionType = (data:any) => {
  return request({
    url: '/positionType',
    method: 'post',
    data
  })
}
//修改职位类型
export const updatePositionType = (data:any) => {
  return request({
    url: '/positionType',
    method: 'patch',
    data,
  })
}

//----------用户接口
//查询所有用户
export const selUserInfo = (data:any) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}
//查询用户在线简历
export const selUserOnlineResume= (userId:string) => {
  return request({
    url: '/send/onlineResume',
    method: 'get',
    params:{userId}
  })
}



//----------公司接口
//查询所有公司
export const selCompanyAll = (data:any) => {
  return request({
    url: '/companys',
    method: 'post',
    data
  })
}
//查询所有公司的相册
export const selCompanyPhoto = (company_id:string) => {
  return request({
    url: '/company/photos',
    method: 'get',
    params:{company_id}
  })
}
//修改公司状态
export const updateCompanyState = (data:any) => {
  return request({
    url: '/company/state',
    method: 'post',
    data
  })
}




// ----------资讯接口
export const selectConsultCategory = () => {
  return request({
    url: '/category',
    method: 'get'
  })
}

//发布资讯
export const publishConsult = (data: { email: string, validateCode: string }) => {
  return request({
    url: '/consult',
    method: 'post',
    data
  })
}
//查询资讯
export const selectConsult = (data:any) => {
  return request({
    url: '/consults',
    method: 'get',
    params:data,
  })
}
//修改资讯状态
export const updateConsultState = (data:any) => {
  return request({
    url: '/consult/state',
    method: 'post',
    data,
  })
}
//修改资讯
export const updateConsult = (data:any) => {
  return request({
    url: '/consult',
    method: 'patch',
    data,
  })
}
//删除资讯
export const delConsult = (consult_id:string) => {
  return request({
    url: '/consult',
    method: 'delete',
    data:{consult_id},
  })
}

