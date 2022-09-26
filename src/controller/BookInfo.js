const BaseController = require("./BaseController");
const BookInfoModel = require('../model/BooksInfo')
const BorrowInfoModle = require('../model/BorrowInfo');
const Utils = require('../utils')



class BookInfController extends BaseController {
  //  获取图书列表
  static async getBooksList(ctx) {
    let ctx_query = ctx.query;
    let category = ctx_query.category;
    let res = []
    if (category) {
      res = await BookInfoModel.findAll({
        attributes: ['name', 'author', 'img_url', 'position', 'category'],
        where: {
          category
        },
    
      })
    } else {
      res = await BookInfoModel.findAll({
        attributes: ['name', 'author', 'img_url', 'position', 'category'],
      })
    }

    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: res })
  }
  // 获取图书详细信息
  static async getBookInfo(ctx) {
    let ctx_query = ctx.query;
    let id = ctx_query.id;
    if(id) {
      const res = await BookInfoModel.findAll({
        attributes: ['name', 'author', 'img_url', 'position', 'category', 'press', 'publication_date', 'create_time', 'update_time', 'img_url', 'introduction', 'total', 'remaining'],
        where: {
          id
        }
      })
    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: res && res[0] || {} })
    } else {
      res = [{}]
      ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data:  {info:'传入id'} })

    }
 



  }

  // // 借阅/续借
  static async borrowBook(ctx) {
    //日期加上天数后的新日期.
    function addDays(date, days) {
      let nd;
      if (date === 'now') {
        nd = new Date();
      } else {
        nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
      }

      const y = nd.getFullYear();
      let m = nd.getMonth() + 1;
      let d = nd.getDate();
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      const cdate = y + "-" + m + "-" + d;
      return cdate;

    }
    const srart_time = addDays('now')
    const {type, time, bookId, userId, id} = ctx.request.body || {}
    let uuid = id;
    // 借书
    if (type === 0) {
      uuid = Utils.guid()
      const end_time = addDays(srart_time, time)
      const bookInfo = await BookInfoModel.findAll({
        attributes: ['total', 'remaining', 'position', 'category', 'count'],
        where: {
          id:bookId
        }
      })
      const bookItem = bookInfo && bookInfo[0];
      const { category, position } = bookItem;
      const remaining = bookItem.remaining > 0 ? bookItem.remaining - 1 : 0
      const count = bookItem.count + 1;
      if (bookItem.remaining > 0) {
        // 更新库存和借阅次数
        await BookInfoModel.update({ remaining, count }, {
          where: {
            id:bookId
          }
        })
        await BorrowInfoModle.create({ id: uuid,bookId, userId, position, category, time, srart_time, time, end_time, state:'开始'})
        ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: { id, userId, position, remaining, category, time, srart_time, time, end_time } })

      } else {
        ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: {} })
      }
    }
    // 续借
    if (type === 1) {
      const borrowInfo = await BorrowInfoModle.findAll({
        attributes: ['time', 'srart_time', 'end_time',],
        where: {
          id:uuid
        }
      })
      const borrowItem = borrowInfo && borrowInfo[0]
      const times = borrowItem.time + time
      const end_time = addDays(borrowItem.end_time, times)
      await BorrowInfoModle.update({ time: times, end_time }, {
        where: {
          id:uuid
        }
      })
    }

      const borrow = await BorrowInfoModle.findAll({
        attributes: ['id', 'userId', 'position', 'time', 'srart_time', 'end_time'],
        where: {
          id:uuid
        }
      })
      const res = borrow && borrow[0] || {}
 
    ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: res })

  }

    // 获取图书详细信息
    static async deleteBook(ctx) {
      let ctx_query = ctx.query;
      let id = ctx_query.id;
      
      await BookInfoModel.destroy({
          where: {
            id
          }
        })
      ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: {code:'删除成功'} })
      
   
  
  
  
    }

    static async addBook(ctx) {


      const {name, author, img_url, position, category, press, publication_date, create_time, introduction, total} = ctx.request.body || {}
      const id = Utils.guid()
      const remaining = total
      const update_time = create_time
      await BookInfoModel.create({id，name, author, img_url, position, category, press, publication_date, create_time, update_time, introduction, total, remaining})
      ctx.body = BaseController.renderJsonSuccess({ code: 200, msg: '成功', data: { id, userId, position, remaining, category, time, srart_time, time, end_time } })


    }



}

module.exports = BookInfController
