const BaseController = require('./base')

class BannerController extends BaseController {
  async createBanner() {
    await this.create('Banner')
  }
  async getBanner() {
    await this.find('Banner', ['url', 'title'])
  }
  // 删除轮播图
  async delBanner() {
    await this.del('Banner')
  }
  // 修改轮播图
  async updateBanner() {
    await this.update('Banner')
  }
  // 显示轮播图
  async showBanner() {
    await this.show('Banner')
  }
}

module.exports = BannerController
