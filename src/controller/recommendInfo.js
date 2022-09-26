const BaseController = require("./BaseController");
const ActivitynfoModle = require('../model/recommendInfo')

class BorrowInfController extends BaseController {
  //  获取推荐活动
  static async getActivityList(ctx) {
  
      res = await ActivitynfoModle.findAll({ })
  
    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: res })
  }

}

module.exports = BorrowInfController
