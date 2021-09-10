const BaseController = require('./base')
class HomeController extends BaseController {
  async search() {
    await this.find('Goods', ['name'])
  }

}

module.exports = HomeController


