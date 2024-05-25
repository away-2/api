# 一、项目的初始化

1. npm 初始化
   `npm init -y`
   生成`package.json`文件：

- 记录项目的依赖

2. git 初始化
   `git init`
   生成`.git`隐藏文件夹，git 的本地仓库

3. 创建`readme`文件

# 二、搭建项目

1. 安装 koa 框架
   `npm install koa`

2. 编写最基本的 app
   创建 src/main.js

```
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello world'
});

app.listen(3000, () => {
    console.log(`this is listening on port 3000`);
})
```

3. 测试
   在终端，使用`node src/main.js`

# 三、项目的基本优化

1. 自动重启服务
   安装 nodemon 工具
   `npm i nodemon -D`
   编写`package.json`脚本

```
 "scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

执行`npm run dev`命令启动服务

2. 读取配置文件
   安装`dotenv`,读取根目录中的`.env`文件，将配置写`process.env`中
   `npm i dotenv`
   创建`.evn`文件
   `APP_PORT = 8000`
   创建`src/config/config.default.js`

```
const dotenv = require('dotenv');

dotenv.config()

// console.log(process.env.APP_PORT);

module.exports = process.env

```

改写`main.js`

```
const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');

const userRouter = require('./router/user')

const app = new Koa();

app.use(userRouter.routes());

app.listen(APP_PORT, () => {
    console.log(`this is listening on port ${APP_PORT}`);
})
```

# 四、添加路由

路由：根据不同的 URL,调用对应处理函数

1. 安装 koa-router
   `npm i koa-router`
   步骤： - 导入包 - 实例化对象 - 编写路由 - 注册中间件

2. 编写路由
   创建`src/router`目录，编写`user.route.js`

```
const Router = require('koa-router');

const router = new Router({prefix: '/users'})

// GET /users
router.get('/', (ctx, next) => {
    ctx.body = '这是 user'
});

module.exports = router
```

3. 改写`main.js`

```
const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');

const userRouter = require('./router/user.route')

const app = new Koa();

app.use(userRouter.routes());

app.listen(APP_PORT, () => {
    console.log(`this is listening on port ${APP_PORT}`);
})
```

# 五、目录结构优化

1. 将 http 服务和 app 业务拆分
- 创建`scr/app/index.js`
```
   const Koa = require('koa')

    const userRouter = require('../router/user.route')

    const app = new Koa();

    app.use(userRouter.routes());

    module.exports = app  
```
- 改写`main.js`
```
const { APP_PORT } = require('./config/config.default');

const app = require('./app')

app.listen(APP_PORT, () => {
    console.log(`this is listening on port ${APP_PORT}`);
})
```

2. 将路由和控制器拆分
- 路由：解析URL，分发给控制器对应的方法
- 控制器：处理不同的业务
- 改写`user.route.js`
```
const Router = require('koa-router');

const { register, login } = require('../controller/user.controller')

const router = new Router({prefix: '/users'})

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
```
创建`controller/user.controller.js`
```
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
```

# 六、解析body
1. 安装koa-body
```npm i koa-body```

2. 注册中间件
 - 改写`app/index.js'
```
const Koa = require('koa')
const { koaBody } = require('koa-body')

const userRouter = require('../router/user.route')

const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

module.exports = app
```

3. 解析请求数据
- 改写`controller/user.controller.js`
```
const { createUser } = require('../service/user.service')
class UserController {
    // 用户注册
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(user_name, password)
        console.log(res);
        // 3. 返回结果
        ctx.body = ctx.request.body
    }
    // 用户登录
    async login(ctx, next) {
        ctx.body = 'login success'
    }
}

module.exports = new UserController()
```

4. 拆分service层
- service层主要是做数据库处理
- 创建`src/service/user.service.js`
```
class UserService {
    async createUser(user_name, password) {
        // todo: 写入数据库
        return '写入数据库cg'
    }
}

module.exports = new UserService()
```

# 七、数据库操作
###### sequelize：ORM数据库工具
###### ORM：对象关系映射
- 数据表映射（对应）一个类
- 数据表中的数据行（记录）对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法
1. 安装sequelize
```npm i mysql2 sequelize```
