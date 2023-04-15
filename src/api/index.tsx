import axios from 'axios'
import qs from 'qs'
// @ts-ignore
import { createHashHistory } from 'history'
import { Modal } from 'antd'
import list from "../compoments/list";

let history = createHashHistory()

// 配合教程演示组件外路由跳转使用，无实际意义
export const goto = (path:string) => {
    history.push(path)
}

// 开发环境地址
// let API_DOMAIN = '/api/'
// if (process.env.NODE_ENV === 'production') {
//     // 正式环境地址
 let   API_DOMAIN = 'http://192.168.3.242/back/'
// }
// let API_DOMAIN = '/api'

// 用户登录信息在localStorage中存放的名称
export const SESSION_LOGIN_INFO = 'loginInfo';

// API请求正常，数据正常
export const API_CODE = {
    // API请求正常
    OK: 200,
    // API请求正常，数据异常
    ERR_DATA: 403,
    // API请求正常，空数据
    ERR_NO_DATA: 301,
    // API请求正常，登录异常
    ERR_LOGOUT: 401,
}

// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试'
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录'

export const apiReqs = {

    // 登录（成功后将登录信息存入localStorage）

    signIn: (config:any) => {
        let userID = "0";
        console.log(config)
        axios//({method: 'post', url: API_DOMAIN + 'user/login/', data:config.data})
            .post(API_DOMAIN + 'user/login/', qs.stringify(config.data))
            .then((res) => {
                console.log(res)
                let result = res
                userID= result.data.userId
                localStorage.setItem("UserID",userID.toString())
                //console.log(localStorage.getItem("userID"))
                // config.done && config.done(result)
                // if (result.code === API_CODE.OK) {
                //     window.localStorage.setItem(
                //         SESSION_LOGIN_INFO,
                //         JSON.stringify({
                //             uid: result.data.loginUid,
                //             nickname: result.data.nickname,
                //             token: result.data.token,
                //         })
                //     )
                //     config.success && config.success(result)
                // } else {
                //     config.fail && config.fail(result)
                // }
            })
            .catch((err) => {
                console.log(err)
                // config.done && config.done()
                // config.fail &&
                // config.fail({
                //     message: API_FAILED,
                // })
            })
        return userID
    },
    // 注册
    register(config:any) {
        console.log(config)
        axios.post(API_DOMAIN + 'user/register/', qs.stringify(config.data))
            .then((res) => {
                console.log(res)
                // let result = res.data
                // config.done && config.done(result)
                // if (result.code === API_CODE.OK) {
                //     config.success && config.success(result)
                // } else {
                //     config.fail && config.fail(result)
                // }
            })
            .catch((err) => {
                console.log(err)
                // config.done && config.done()
                // config.fail &&
                // config.fail({
                //     message: API_FAILED,
                // })
            })
    },
    registerEmail(config:any) {
        axios.post(API_DOMAIN + 'user/registerEmail/', qs.stringify(config.data))
            .then((res) => {
                console.log(res)
                // let result = res.data
                // config.done && config.done(result)
                // if (result.code === API_CODE.OK) {
                //     config.success && config.success(result)
                // } else {
                //     config.fail && config.fail(result)
                // }
            })
            .catch((err) => {
                console.log(err)
                // config.done && config.done()
                // config.fail &&
                // config.fail({
                //     message: API_FAILED,
                // })
            })
    },
    // 管登出（登出后将登录信息从localStorage删除）
    signOut: () => {
        const { uid, token } = getLocalLoginInfo()
        let headers = {
            loginUid: uid,
            'access-token': token,
        }
        let axiosConfig = {
            method: 'post',
            url: API_DOMAIN + 'logout',
            headers,
        }
        axios(axiosConfig)
            .then((res) => {
                logout()
            })
            .catch(() => {
                logout()
            })
    },
    // 修改用户信息
    modifyUser: (config:any) => {
        config.url = API_DOMAIN + 'user/modify'
        apiRequest(config)
    },
    // 上传模型
    uploadModel: (config:any) => {
        config.url = API_DOMAIN + 'module/uploadModel/'
        axios.post(config.url,qs.stringify(config.data))
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    // 上传数据集
    uploadDataSet: (config:any) => {
        config.url = API_DOMAIN + 'module/uploadDataset/'
        axios.post(config.url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    // 上传权重
    uploadWeight: (config:any) => {
        config.url = API_DOMAIN + 'module/uploadWeight/'
        axios.post(config.url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    // 获取模型列表
     getModelList: (config:any) => {
        let url = API_DOMAIN + 'module/search/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 获取模型详情
    getModelDetail: (config:any) => {
        let url = API_DOMAIN + 'module/checkModel/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                console.log(res)
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 获取数据集详情
    getDatasetDetail: (config:any) => {
        let url = API_DOMAIN + 'module/checkDataset/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 获取模块详情
    getModuleDetail: (config:any) => {
        let url = API_DOMAIN + 'module/checkModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 生成模块
    generateModule: (config:any) => {
        let url = API_DOMAIN + 'module/tempProduceModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 测试模块
    testModule: (config:any) => {
        let url = API_DOMAIN + 'module/tempTestModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 搜索模块
    searchModule: (config:any) => {
        let url = API_DOMAIN + 'module/searchModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 搜索组合模块
    searchCombinationModule: (config:any) => {
        let url = API_DOMAIN + 'module/searchCombinedModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    },
    // 组合模块
    combineModule: (config:any) => {
        let url = API_DOMAIN + 'module/combineModule/'
        axios.post(url,qs.stringify(config.data))
            .then((res)=>{
                config.success&&config.success(res.data)
            }   )
            .catch((err)=>{
                console.log(err)
            }   )
    }
}

// 从localStorage获取用户信息
export function getLocalLoginInfo() {
    return JSON.parse(window.localStorage[SESSION_LOGIN_INFO])
}

// 失效退出界面
export function logout() {
    window.localStorage.removeItem(SESSION_LOGIN_INFO)
    history.push('/login')
}

/*
 * API请求封装（带验证信息）
 * config.history: [必填]用于页面跳转等逻辑
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */
export function apiRequest(config:any) {
    // @ts-ignore
    const loginInfo = JSON.parse(window.localStorage.getItem(SESSION_LOGIN_INFO))
    if (config.data === undefined) {
        config.data = {}
    }
    config.method =  'post'

    // 封装header信息
    let headers = {
        loginUid: loginInfo ? loginInfo.uid : null,
        'access-token': loginInfo ? loginInfo.token : null,
    }

    let data:any = null

    // // 判断是否使用formData方式提交
    // if (config.formData) {
    //     // @ts-ignore
    //     headers['Content-Type'] = 'multipart/form-data'
    //     data = new FormData()
    //     Object.keys(config.data).forEach(function (key) {
    //         data.append(key, config.data[key])
    //     })
    // } else {
    //     data = config.data
    // }


    data=config.data


    // 组装axios数据
    let axiosConfig = {
        method: config.method,
        url: config.url,
        headers,
        params: {},
        data: {},
    }

    // 判断是get还是post，并加入发送的数据
    if (config.method === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }

    // 发起请求
    axios(axiosConfig)
        .then((res) => {
            let result = res.data
            config.done && config.done()

            if (result.code === API_CODE.ERR_LOGOUT) {
                // 如果是登录信息失效，则弹出Antd的Modal对话框
                Modal.error({
                    title: result.message,
                    // 点击OK按钮后，直接跳转至登录界面
                    onOk: () => {
                        logout()
                    },
                })
            } else {
                // 如果登录信息正常，则执行success的回调
                config.success && config.success(result)
            }
        })
        .catch((err) => {
            // 如果接口不通或出现错误，则弹出Antd的Modal对话框
            Modal.error({
                title: API_FAILED,
            })
            // 执行fail的回调
            config.fail && config.fail()
            // 执行done的回调
            config.done && config.done()
        })
}
