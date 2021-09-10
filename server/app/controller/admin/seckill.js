const BaseController = require('./base')

class SeckillController extends BaseController {
  async createSeckill() {
    let { ctx } = this
    let res = await ctx.model.Seckill.findOne(ctx.request.body)
    if (res) {
      this.fail(500, '请勿重复添加')
    } else {
      let n = new ctx.model.Seckill(ctx.request.body)
      let data = await n.save()
      if (data) {
        let id = ctx.request.body.goods._id
        let {start_time, end_time, price} = ctx.request.body
        await ctx.model.Goods.findByIdAndUpdate(id, {
          $set: {
            seckill: {
              isSeckill: true,
              start_time,
              end_time,
              price
            }
          }
        })
        this.success(200, '新增成功', data)
      } else {
        this.fail(500, '新增失败')
      }
    }
  }
  async getSeckill() {
    await this.find('Seckill', ['start_time', 'end_time'])
  }
  // 删除秒杀
  async delSeckill() {
    let {ctx} = this
    let {goodsId} = ctx.request.body
    let res = await ctx.model.Goods.findByIdAndUpdate(goodsId, {
      $set: {
        seckill: {}
      }
    })
    
    if (res) {
      await this.del('Seckill')
    } else {
      this.fail(500, '删除失败')
    }
  }
  // 修改秒杀
  async updateSeckill() {
    await this.update('Seckill')
  }
  // 显示秒杀
  async showSeckill() {
    await this.show('Seckill')
  }
}

module.exports = SeckillController
