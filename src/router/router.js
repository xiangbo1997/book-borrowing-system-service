const Router = require("koa-router")  // 引入路由
const router = new Router()
const UserController = require('../controller/User')
const RoleController = require('../controller/Role')
const BookInfController = require('../controller/BookInfo')


router.get('/', ctx => { ctx.body = "我最帅!" })
router.get('/user', UserController.getUser)
// router.get('/user/:id', UserController.getCurrectUser)

router.get('/api/bookInfo', BookInfController.getBookInfo)



router.get('/role', RoleController.getRole)
router.post('/role', RoleController.getCurrectRole)
module.exports = router
