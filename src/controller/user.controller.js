class UserController {
    // 用户注册
    async register(ctx, next) {
        ctx.body = '用户注册成功'
    }
    // 用户登录
    async login(ctx, next) {
        ctx.body = 'login success'
    }
}

module.exports = new UserController()