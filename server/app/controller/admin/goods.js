const BaseController = require('./base')

class GoodController extends BaseController {
  async createGood() {
    await this.create('Goods')
  }
  async getGood() {
    await this.find('Goods', ['name'])
  }
  // 删除商品
  async delGood() {
    await this.del('Goods')
  }
  // 修改商品
  async updateGood() {
    await this.update('Goods')
  }
  // 显示商品
  async showGood() {
    await this.show('Goods')
  }
  // 获取参数
  async getParams() {
    await this.getAttr('Goods', 'params')
  }
  // 添加参数
  async addParams() {
    await this.addAttr('Goods', 'params')
  }
  // 删除参数
  async delParams() {
    await this.delAttr('Goods', 'params')
  } 
  // 编辑参数
  async updateParams() {
    await this.updateAttr('Goods', 'params')
  }
  // 获取规格参数
  async getSpecParams() {
    await this.getAttr('Goods', 'specParams')
  }
  // 添加规格参数
  async addSpecParams() {
    await this.addAttr('Goods', 'specParams')
  }
  // 删除规格参数
  async delSpecParams() {
    await this.delAttr('Goods', 'specParams')
  } 
  // 编辑规格参数
  async updateSpecParams() {
    await this.updateAttr('Goods', 'specParams')
  }
}

module.exports = GoodController
