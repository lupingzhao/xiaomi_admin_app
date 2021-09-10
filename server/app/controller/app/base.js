const path = require('path')
const Controller = require('egg').Controller

function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

class BaseController extends Controller {
  // 成功提示
  async success(code = 200, msg, data, total = null) {
    let { ctx } = this
    ctx.body = {
      code,
      msg,
      data,
      total
    }
  }
  // 失败提示
  async fail(code = 500, msg, data) {
    this.ctx.body = {
      code,
      msg,
      data
    }
  }
  // 上传文件
  async uploadFile() {
    let { ctx } = this
    if (!ctx.request.files) {
      return ctx.body = '请先选择上传文件'
    }
    let file = ctx.request.files[0]
    let name = 'egg-oss-demo/' + genID(10) + path.extname(file.filename)
    let result
    try {
      result = await ctx.oss.put(name, file.filepath)
    } catch (err) {
      console.log(err)
    }

    if (result) {
      this.success(200, '上传成功', result.url)
    } else {
      this.fail(500, '上传失败')
    }
  }
  // 新增
  async create(model) {
    let { ctx } = this
    let res = await ctx.model[model].findOne(ctx.request.body)
    if (res) {
      this.fail(500, '请勿重复添加')
    } else {
      let n = new ctx.model[model](ctx.request.body)
      let data = await n.save()
      if (data) {
        this.success(200, '新增成功', data)
      } else {
        this.fail(500, '新增失败')
      }
    }
  }
  // 查询
  async find(model, fields) {
    let { ctx } = this
    let page = ctx.request.query.current || 1
    let limit = ctx.request.query.pageSize || 10
    let { query } = ctx.request.query
    let reg = new RegExp(query, 'i')
    // 查询字段
    let searchFields = []
    fields.map(item => {
      let obj = {
        [item]: { $regex: reg }
      }
      searchFields.push(obj)
    })
    let data = await ctx.model[model].find({
      $or: searchFields
    }).skip((page - 1) * parseInt(limit)).limit(parseInt(limit)).exec()
    let total = await ctx.model[model].find({
      $or: searchFields
    }).count()
    if (data.length > 0) {
      this.success(200, '获取成功', data, total)
    } else {
      this.fail(200, '暂无数据', data)
    }
  }
  // 删除
  async del(model) {
    let { ctx } = this
    let { id } = ctx.request.body
    let res = await ctx.model[model].findByIdAndRemove(id)
    if (res) {
      this.success(200, '删除成功')
    } else {
      this.fail(500, '删除失败')
    }
  }
  // 修改
  async update(model) {
    let { ctx } = this
    let { id } = ctx.request.body
    let res = await ctx.model[model].findByIdAndUpdate(id, {
      $set: ctx.request.body
    })
    if (res) {
      this.success(200, '修改成功')
    } else {
      this.fail(500, '修改失败')
    }
  }
  // 是否显示
  async show(model) {
    let { ctx } = this
    let { id } = ctx.request.body
    let res = await ctx.model[model].findByIdAndUpdate(id, {
      $set: ctx.request.body
    })
    if (res) {
      this.success(200, '修改成功')
    } else {
      this.fail(500, '修改失败')
    }
  }
  // 获取属性
  async getAttr(model, attr) {
    let { ctx } = this
    let { parentId } = ctx.request.body
    let res = await ctx.model[model].findById(parentId)
    if (res) {
      this.success(200, '获取成功', res[attr], res[attr].length)
    } else {
      this.success(200, '获取成功', [], 0)
    }
  }
  // 添加属性
  async addAttr(model, attr) {
    let { ctx } = this
    let { parentId } = ctx.request.body
    let res = await ctx.model[model].findById(parentId)
    let r = null
    if (res) {
      if (Array.isArray(res[attr])) {
        res[attr].push({
          ...ctx.request.body,
          parentId,
          _id: genID(20)
        })
        r = await ctx.model[model].findByIdAndUpdate(parentId, {
          $set: {
            [attr]: res[attr]
          }
        })
      } else {
        r = await ctx.model[model].findByIdAndUpdate(parentId, {
          $set: {
            [attr]: ctx.request.body[attr]
          }
        })
      }
      if (r) {
        this.success(200, '更新成功')
      } else {
        this.fail(500, '更新失败')
      }
    } else {
      this.fail(500, '暂无上级')
    }
  }
  // 删除属性
  async delAttr(model, attr) {
    let { ctx } = this
    let { parentId, attrId } = ctx.request.body
    let res = await ctx.model[model].findById(parentId)
    if (res) {
      let arr = res[attr].filter((item) => item._id !== attrId)
      let r = await ctx.model[model].findByIdAndUpdate(parentId, {
        $set: {
          [attr]: arr
        }
      })
      if (r) {
        this.success(200, '删除成功')
      } else {
        this.fail(500, '删除失败')
      }
    } else {
      this.fail(500, '暂无上级')
    }
  }
  // 修改属性
  async updateAttr(model, attr) {
    let { ctx } = this
    let { parentId, attrId } = ctx.request.body
    let res = await ctx.model[model].findById(parentId)
    if (res) {
      res[attr].map(item => {
        if (item._id === attrId) {
          item = {
            ...ctx.request.body,
            parentId
          }
        }
      })
      let r = await ctx.model[model].findByIdAndUpdate(parentId, {
        $set: {
          [attr]: res[attr]
        }
      })
      if (r) {
        this.success(200, '更新成功')
      } else {
        this.fail(500, '更新失败')
      }
    } else {
      this.fail(500, '暂无上级')
    }
  }
  // 搜索属性
  async searchAttr(model, attr) {
    let { ctx } = this
    let { parentId, keyword } = ctx.request.body
    let res = await ctx.model[model].findById(parentId)
    if (res) {
      let arr = res[attr].filter(item => {
        Object.keys(item).map(key => {
          return key.includes(keyword)
        })
      })
      if (arr.length) {
        this.success(200, '删除成功', arr)
      } else {
        this.fail(500, '删除失败', [])
      }
    } else {
      this.fail(500, '暂无上级')
    }
  }
}

module.exports = BaseController

