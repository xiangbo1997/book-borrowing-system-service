const Koa = require('koa') // 引入koa
const app = new Koa() // 声明实例

const router = require('./src/router/router')
const bodyParser = require('koa-body')

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  multipart: true // 是否支持 multipart-formdate 的表单
}))


/**
 * router.routes() 启动路由
 * router.allowedMethods() 运行任何请求——get/post/put/delete等
 */
app.use(router.routes(), router.allowedMethods())


app.listen(9000)
