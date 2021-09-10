const BaseController = require('./base')

class NoticeController extends BaseController {
  async createNotice() {
    await this.create('Notice')
  }
  async getNotice() {
    await this.find('Notice', ['content'])
  }
  // 删除轮播图
  async delNotice() {
    await this.del('Notice')
  }
  // 修改轮播图
  async updateNotice() {
    await this.update('Notice')
  }
  // 显示轮播图
  async showNotice() {
    await this.show('Notice')
  }
}

module.exports = NoticeController
