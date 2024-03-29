import request from '@/api/request'
// 用户登陆
export const userLogin = (data: { email: string, validateCode: string }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

//用户发送验证码
export const userSendCode = (email: string) => {
  return request({
    url: '/user/email/coder',
    method: 'post',
    data: {
      email
    }
  })
}

//获取用户信息
export const getUser = (userId: string) => {
  return request({
    url: '/user',
    method: 'post',
    data: {
      userId
    }
  })
}

//修改用户信息
export const updateUser = (data: any) => {
  return request({
    url: '/user',
    method: 'patch',
    data
  })
}

//添加用户简历
export const addUserResume = (data: any) => {
  return request({
    url: '/user/add/resume',
    method: 'post',
    data
  })
}
//修改用户简历
export const updateUserResume = (data: any) => {
  return request({
    url: '/user/resume',
    method: 'patch',
    data
  })
}

// 企业登陆
export const companyLoginReq = (data: Record<string, string>) => {
  return request({
    url: '/companyLogin',
    method: 'post',
    data: data
  })
}


//获取职位类型
export const getPositionType = () => {
  return request({
    url: '/positionType',
    method: 'get'
  })
}

//查询职位列表
export const getPositionList = (data: any) => {
  return request({
    url: '/positions',
    method: 'post',
    data,
  })
}
//查询首页搜索框热搜职位列表
export const getPositionHotSearchList = (cityName: string) => {
  return request({
    url: `/position/hot?cityName=${cityName}`,
    method: 'get'
  })
}

//查询首页热招职位列表
export const getPositionByHot = (position_type1: string) => {
  return request({
    url: `/position/hotSearch?position_type1=${position_type1}`,
    method: 'get'
  })
}
// 获取职位详情
export const getJobDetail = (position_id: string) => {
  return request({
    url: `/positionDetail`,
    method: 'get',
    params: {
      position_id: position_id
    }
  })
}

//随机排序查询职位列表  /position/by/rand?cityName=天津&num=6&isRandom=true
export const getSortOrRandomPosition = (data: { cityName: string, num?: number, isRandom?: boolean }) => {
  return request({
    url: `/position/by/rand`,
    method: 'get',
    params: data
  })
}

// hr登陆注册
export const hrLoginOrRegister = (data: { telephone: string, password: string }) => {
  return request({
    url: '/hr/LoginOrRegister',
    method: 'post',
    data: data
  })
}

// 企业端职位管理
export const hrPositionManage = (company_id: string, pageIndex: number, pageSize: number) => {
  return request({
    url: '/hr/positionManage',
    method: 'get',
    params: {
      company_id: company_id,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}

// 企业端查看职位详情
export const hrPositionDetail = (position_id: string) => {
  return request({
    url: '/hr/positionDetail',
    method: 'get',
    params: {
      position_id: position_id
    }
  })
}

// hr发布职位
export const hrAddPosition = (data: Record<string, any>) => {
  return request({
    url: '/hr/addPosition',
    method: 'post',
    data: data
  })
}
// hr绑定公司
export const hrAddCompany = (data: Record<string, any>) => {
  return request({
    url: '/hr/add/company',
    method: 'post',
    data: data
  })
}


//-------------投递相关
//添加投递记录
export const addSend = (data: Record<string, any>) => {
  return request({
    url: 'send',
    method: 'post',
    data
  })
}
//查询用户投递记录
export const selectSend = (data: any) => {
  return request({
    url: 'sends',
    method: 'get',
    params: data
  })
}
//取消/删除用户投递
export const cancelOrDelSend = (data: any) => {
  return request({
    url: 'send',
    method: 'delete',
    data
  })
}

//-------------收藏相关
//添加收藏
export const addCollect = (data: Record<string, any>) => {
  return request({
    url: 'collect',
    method: 'post',
    data
  })
}
//查询用户收藏
export const selectCollect = (data: any) => {
  return request({
    url: 'collects',
    method: 'get',
    params: data
  })
}
//删除用户收藏
export const deleteCollect = (data: any) => {
  return request({
    url: 'collect',
    method: 'delete',
    data
  })
}


//获取用户的收藏和投递状态
export const collectOrSendState = (data: any) => {
  return request({
    url: 'state',
    method: 'get',
    params: data
  })
}
//查询用户所有投递状态(数量)
export const allSendNum = (userId: string) => {
  return request({
    url: '/send/num',
    method: 'get',
    params: { userId }
  })
}
// hr删除职位
export const hrDelPosition = (position_id: string) => {
  return request({
    url: '/hr/delPosition',
    method: 'get',
    params: {
      position_id: position_id
    }
  })
}

// hr修改职位
export const hrEditPosition = (position_id: string) => {
  return request({
    url: '/hr/editPosition',
    method: 'get',
    params: {
      position_id: position_id
    }
  })
}

// hr修改职位
export const hrEditPosition2 = (data: Record<string, any>) => {
  return request({
    url: '/hr/editPositionR',
    method: 'post',
    data: data
  })
}


//-------公司相关
//查询所有公司
export const selectCompanys = (data: Record<string, any>) => {
  return request({
    url: '/companys',
    method: 'post',
    data
  })
}
//查询公司所有职位
export const selectCompanysPositions = (data: Record<string, any>) => {
  return request({
    url: '/company/positions',
    method: 'post',
    data
  })
}
//查询公司所有职位以及公司信息及公司详情
export const selectCompanysDetail = (company_id: string) => {
  return request({
    url: '/companyInfo',
    method: 'post',
    data: { company_id }
  })
}
// 获取投递继立列表
export const deliveryRecord = (company_id: string, telephone: string, pageIndex: number, pageSize: number) => {
  return request({
    url: '/send/deliveryRecord',
    method: 'get',
    params: {
      company_id: company_id,
      telephone: telephone,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}

// 更改投递状态
export const updateDeliveryState = (sendId: string, type: string) => {
  return request({
    url: '/send/updateDeliveryState',
    method: 'get',
    params: {
      sendId,
      type
    }
  })
}

// hr查看在线简历
export const onlineResume = (userId: string) => {
  return request({
    url: '/send/onlineResume',
    method: 'get',
    params: {
      userId
    }
  })
}

//-----------资讯相关
//查询资讯
export const selectConsult = (data:any) => {
  return request({
    url: '/consults',
    method: 'get',
    params:data
  })
}
//查询资讯分类
export const selectConsultCategory = () => {
  return request({
    url: '/category',
    method: 'get',
  })
}
//查询指定资讯
export const selectConsultOne = (consult_id:string) => {
  return request({
    url: '/consult',
    method: 'get',
    params:{consult_id}
  })
}



//---------轮播
export const selectSwiper = () => {
  return request({
    url: '/swipers',
    method: 'get',
  })
}
//---------行业
export const selectIndustry = () => {
  return request({
    url: '/industrys',
    method: 'get',
  })
}



//---------------企业端()
//通过人事id获取公司信息
export const selectCompanyInfo = (company_id:string) => {
  return request({
    url: '/hr/company/info',
    method: 'post',
    data:{company_id}
  })
}
//通过人事信息
export const selectHrInfo = (hr_id:string) => {
  return request({
    url: '/hr/info',
    method: 'post',
    data:{hr_id}
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
//修改公司信息
export const updateCompanyInfo = (data:any) => {
  return request({
    url: '/hr/company',
    method: 'patch',
    data
  })
}

//获取人事状态
export const selHrState = (hr_id:string) => {
  return request({
    url: '/hr/state',
    method: 'get',
    params:{hr_id}
  })
}
//获取公司状态
export const selCompanyState = (company_id:string) => {
  return request({
    url: '/company/state',
    method: 'get',
    params:{company_id}
  })
}
//修改人事
export const updateHr = (data:any) => {
  return request({
    url: '/hr/info',
    method: 'patch',
    data
  })
}

//查询所有公司
export const getAllCompany = () => {
  return request({
    url: '/companys/all',
    method: 'get',
  })
}

//hr选择绑定公司
export const setHrCompany = (data:any) => {
  return request({
    url: '/hr/build/company',
    method: 'post',
    data
  })
}


//查询关于内容
export const getAbout = ()=>{
  return request({
    url:"/about/content",
    method: 'get',
  })
}