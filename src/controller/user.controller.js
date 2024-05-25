const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
    // 用户注册
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        // 合法性
        if(!user_name || !password) {
            console.error('用户名或密码为空', ctx.request.body)
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '用户名或密码为空',
                result: ''
            }
            return
        }
        // 合理性
        if(getUserInfo({ user_name })) {
            ctx.status = 409
            ctx.body = {
                code: '10002',
                message: '用户已存在',
                result: ''
            }
            return
        }
        // 2. 操作数据库
        const res = await createUser(user_name, password)
        console.log(res);
        // 3. 返回结果
        ctx.body = {
            code: 200,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name, 
            }
        }
    }
    // 用户登录
    async login(ctx, next) {
        ctx.body = 'login success'
    }
}

module.exports = new UserController()