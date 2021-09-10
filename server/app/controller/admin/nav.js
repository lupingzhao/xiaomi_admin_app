const BaseController = require('./base')

class NavController extends BaseController {
  async createNav() {
    await this.create('Nav')
  }
  async getNav() {
    await this.find('Nav', ['url', 'title'])
  }
  // 删除轮播图
  async delNav() {
    await this.del('Nav')
  }
  // 修改轮播图
  async updateNav() {
    await this.update('Nav')
  }
  // 显示轮播图
  async showNav() {
    await this.show('Nav')
  }
}

module.exports = NavController
