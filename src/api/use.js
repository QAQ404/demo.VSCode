import reques from "@/utils/request.js"

//提供调用注册接口的函数
const userRegisterService = (registerData) => {
    const params = new URLSearchParams();
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    return reques.post("/user/register", params) //这里用registerData传的是json，但是我们要传的是x-www-form-urlencoded
}                                               //所以用URLSearchParams改格式

const userLoginService = (loginData) => {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return reques.post("/user/login", params);
}

const userInfoService = () => {
    return reques.get('/user/userInfo');
}

const exitService = () => {
    return reques.get('/user/exit')
}

const updateUserInfoService = (userData) => {
    return reques.put('/user/update', userData)
}

const userAvatarUpdateService = (url) => {
    const params = new URLSearchParams();
    params.append('avatarUrl',url);
    return reques.patch('/user/updateAvatar',params)
}


const updatePasswordService=(Data)=>{
    return reques.patch('/user/updatePwd',Data)
}
export {
    userRegisterService, userLoginService, userInfoService, exitService, updateUserInfoService
    , userAvatarUpdateService,updatePasswordService
}
