const BaseController = require("./BaseController");
const db = require('../database/dbquery')
const UserModel = require('../model/User')
const Role = require('../model/Role')

class UserController extends BaseController {


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
