const Router = require('koa-router');

const router = new Router({prefix: '/users'})

// GET /users
router.get('/', (ctx, next) => {
    ctx.body = '这是 user'
});

module.exports = router