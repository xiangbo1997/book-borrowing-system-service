const BaseController = require("./BaseController");
const BookInfoModel = require('../model/BooksInfo')

class BookInfController extends BaseController {
    static async getBookInfo(ctx) {
      let ctx_query = ctx.query;
      let name = ctx_query.id;
      console.log(name, '%%%%')

      const res = await BookInfoModel.findAll({
        where: {
          id:1
        }
      })
        ctx.body = BaseController.renderJsonSuccess({code:200, msg:'成功', data:res})
    }


 
}

module.exports = BookInfController
