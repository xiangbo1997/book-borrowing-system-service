const BaseController = require("./BaseController");
const BorrowInfoModle = require('../model/BorrowInfo')

class BorrowInfController extends BaseController {
  //  获取借阅信息列表
  static async getBorrowList(ctx) {
    let ctx_query = ctx.query;
    let userId = ctx_query.userId;
    let id = ctx_query.id
    let res = []
    if(id) {
      res = await BorrowInfoModle.findAll({
        where: {
          userId,
          id

        }
      })
    } else {
      res = await BorrowInfoModle.findAll({
        where: {
          userId,
        }
      })
    }
     
    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: res })
  }
  // 还书
  static async returnBook(ctx) {
    const {id} = ctx.request.body || {}
    let res = []
    if(id) {
      res = await BorrowInfoModle.update({state:'已结束'},{
        where: {
          id
        }
      })
    }
     console.log(res, '$$$')
    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: {} })
  }
}

module.exports = BorrowInfController
