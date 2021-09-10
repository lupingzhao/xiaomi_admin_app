const BaseController = require('./base')
const groupBy = require('lodash/groupBy')

class CategoryController extends BaseController {
  async createCategory() {
    await this.create('Category')
  }
  async getCategory() {
    await this.find('Category', ['name'])
  }
  async getAppCategory() {
    let { ctx } = this
    let goods = await ctx.model.Goods.find()
    let category = await ctx.model.Category.find()
    let res = []
    category.map(item => {
      item.list.map(item1 => {
        goods.map(item2 => {
          if (item1._id === item2.category) {
            let obj = {
              category: '',
              list: []
            }
            obj.category = item1.name
            obj.list.push(item2)
            res.push(obj)
          }
        })
      })
    })
    let group = groupBy(res, 'category')
    let r = []
    for (let i in group) {
      let obj = {
        [i]: []
      }
      group[i].map(item => {
        item.list.map(item1 => {
          obj[i].push(item1)
        })
      })
      r.push(obj)
    }
    category.map(item => {
      item.list.map(item1 => {
        Object.values(r).map(key => {
          Object.keys(key).map(k => {
            if (k === item1.name) {
              item1.list = []
              item1.list.push(key)
            }
          })
        })
      })
    })
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: category
    }
  }
  // 删除分类
  async delCategory() {
    await this.del('Category')
  }
  // 修改分类
  async updateCategory() {
    await this.update('Category')
  }
  // 获取二级分类
  async getList() {
    await this.getAttr('Category', 'list')
  }
  // 添加二级分类
  async addList() {
    await this.addAttr('Category', 'list')
  }
  // 添加二级分类
  async delList() {
    await this.delAttr('Category', 'list')
  }
}

module.exports = CategoryController
