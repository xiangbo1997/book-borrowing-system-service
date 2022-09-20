const BaseController = require("./BaseController");
const db = require('../database/dbquery')
const UserModel = require('../model/User')
const Role = require('../model/Role')

class UserController extends BaseController {
  static async getUser(ctx) {
   // let sql = `select * from user where status=1`
    // const res = await db.query(sql)
    // const res = await UserModel.findAll()
    const res = await UserModel.findAll({
      where: {
          status: 1
      },
      include: {
        model: Role
    }
  })
    ctx.body = BaseController.renderJsonSuccess(200, res)
    // ctx.body = BaseController.renderJsonSuccess(200, res)
  }

  static async getUserDetail(ctx) {
    const id = ctx.params.id
    let msg = '输入错误'
    let code = 200
    if (parseInt(id) === 666) {
      msg = '输入正确'
    }
    ctx.body = BaseController.renderJsonSuccess(code, msg, id)
  }
}
module.exports = UserController
