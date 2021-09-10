const BaseController = require('./base')

class CouponController extends BaseController {
  async createCoupon() {
    await this.create('Coupon')
  }
  async getCoupon() {
    await this.find('Coupon', ['name', 'mount', 'threshold', 'start_time', 'end_time'])
  }
  // 删除优惠券
  async delCoupon() {
    await this.del('Coupon')
  }
  // 修改优惠券
  async updateCoupon() {
    await this.update('Coupon')
  }
  // 显示优惠券
  async showCoupon() {
    await this.show('Coupon')
  }
}

module.exports = CouponController
