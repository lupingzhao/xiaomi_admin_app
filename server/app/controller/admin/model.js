const BaseController = require('./base')

class ModelController extends BaseController {
  async createModel() {
    await this.create('Model')
  }
  async getModel() {
    await this.find('Model', ['name'])
  }
  // 删除模型
  async delModel() {
    await this.del('Model')
  }
  // 修改模型
  async updateModel() {
    await this.update('Model')
  }
  // 获取规格
  async getSpec() {
    await this.getAttr('Model', 'specifications')
  }
  // 添加规格
  async addSpec() {
    await this.addAttr('Model', 'specifications')
  }
  // 添加规格
  async delSpec() {
    await this.delAttr('Model', 'specifications')
  }
}

module.exports = ModelController
