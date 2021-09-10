const BaseController = require('./base')

class IndexNavController extends BaseController {
  // 创建首页导航
  async createIndexNav() {
    await this.create('IndexNav')
  }
  // 获取首页导航
  async getIndexNav() {
    await this.find('IndexNav', ['name', 'desc'])
  }
  // 删除首页导航
  async delIndexNav() {
    await this.del('IndexNav')
  }
  // 修改首页导航
  async updateIndexNav() {
    await this.update('IndexNav')
  }
  // 显示首页导航
  async showIndexNav() {
    await this.show('IndexNav')
  }
}

module.exports = IndexNavController
