'use strict'
const Controller = require('egg').Controller


class HomeController extends Controller {
  async index() {
    let { ctx } = this
    let user = await ctx.model.User.findOne({
      username: 'admin'
    })
    if (!user) {
      let u = await ctx.model.User({
        username: 'admin',
        password: '123456',
        email: '',
        mobile: '',
        avatar: '',
      })
      u.save()
    }
    await ctx.model.Goods.updateMany({
      seckill: {}
    })
    ctx.body = '导入数据成功'
  }

  async home() {
    const { app, query } = this.ctx
    // 给谁发, socket连接的id
    const id = query.id
    const nsp = app.io.of('/')
    if (nsp.sockets[id]) {
      // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit('res', 'hello http....')
    }
    this.ctx.body = "发送成功"
  }

  async getAreaList() {
    let { ctx } = this
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: [{ "py_head": "A", "name_list": [{ "is_prov": false, "name": "阿拉善盟", "id": "71", "type": 2 }, { "is_prov": false, "name": "安康", "id": "333", "type": 2 }, { "is_prov": false, "name": "阿克苏地区", "id": "369", "type": 2 }, { "is_prov": false, "name": "安顺", "id": "296", "type": 2 }, { "is_prov": false, "name": "鞍山", "id": "74", "type": 2 }, { "is_prov": false, "name": "安阳", "id": "191", "type": 2 }, { "is_prov": false, "name": "阿勒泰地区", "id": "375", "type": 2 }, { "is_prov": false, "name": "阿里地区", "id": "323", "type": 2 }, { "is_prov": false, "name": "安庆", "id": "140", "type": 2 }] }, { "py_head": "B", "name_list": [{ "is_prov": true, "name": "北京", "id": "2", "type": 1 }, { "is_prov": false, "name": "白山", "id": "91", "type": 2 }, { "is_prov": false, "name": "白银", "id": "338", "type": 2 }, { "is_prov": false, "name": "保山", "id": "305", "type": 2 }, { "is_prov": false, "name": "巴音郭楞蒙古", "id": "368", "type": 2 }, { "is_prov": false, "name": "宝鸡", "id": "327", "type": 2 }, { "is_prov": false, "name": "巴中", "id": "288", "type": 2 }, { "is_prov": false, "name": "蚌埠", "id": "135", "type": 2 }, { "is_prov": false, "name": "本溪", "id": "76", "type": 2 }, { "is_prov": false, "name": "巴彦淖尔", "id": "67", "type": 2 }, { "is_prov": false, "name": "包头", "id": "61", "type": 2 }, { "is_prov": false, "name": "亳州", "id": "147", "type": 2 }, { "is_prov": false, "name": "毕节地区", "id": "299", "type": 2 }, { "is_prov": false, "name": "北海", "id": "258", "type": 2 }, { "is_prov": false, "name": "滨州", "id": "185", "type": 2 }, { "is_prov": false, "name": "白城", "id": "93", "type": 2 }, { "is_prov": false, "name": "百色", "id": "263", "type": 2 }, { "is_prov": false, "name": "保定", "id": "43", "type": 2 }] }, { "py_head": "C", "name_list": [{ "is_prov": true, "name": "重庆", "id": "23", "type": 1 }, { "is_prov": false, "name": "池州", "id": "148", "type": 2 }, { "is_prov": false, "name": "承德", "id": "45", "type": 2 }, { "is_prov": false, "name": "沧州", "id": "46", "type": 2 }, { "is_prov": false, "name": "昌都地区", "id": "319", "type": 2 }, { "is_prov": false, "name": "楚雄彝族", "id": "310", "type": 2 }, { "is_prov": false, "name": "常德", "id": "225", "type": 2 }, { "is_prov": false, "name": "郴州", "id": "228", "type": 2 }, { "is_prov": false, "name": "昌吉回族", "id": "366", "type": 2 }, { "is_prov": false, "name": "潮州", "id": "249", "type": 2 }, { "is_prov": false, "name": "滁州", "id": "142", "type": 2 }, { "is_prov": false, "name": "长治", "id": "52", "type": 2 }, { "is_prov": false, "name": "常州", "id": "112", "type": 2 }, { "is_prov": false, "name": "赤峰", "id": "63", "type": 2 }, { "is_prov": false, "name": "成都", "id": "272", "type": 2 }, { "is_prov": false, "name": "长春", "id": "86", "type": 2 }, { "is_prov": false, "name": "朝阳", "id": "84", "type": 2 }, { "is_prov": false, "name": "崇左", "id": "267", "type": 2 }, { "is_prov": false, "name": "长沙", "id": "219", "type": 2 }] }, { "py_head": "D", "name_list": [{ "is_prov": false, "name": "大连", "id": "73", "type": 2 }, { "is_prov": false, "name": "定西", "id": "345", "type": 2 }, { "is_prov": false, "name": "大理白族", "id": "314", "type": 2 }, { "is_prov": false, "name": "大同", "id": "50", "type": 2 }, { "is_prov": false, "name": "东营", "id": "174", "type": 2 }, { "is_prov": false, "name": "大兴安岭地区", "id": "107", "type": 2 }, { "is_prov": false, "name": "德州", "id": "183", "type": 2 }, { "is_prov": false, "name": "东莞", "id": "252", "type": 2 }, { "is_prov": false, "name": "大庆", "id": "100", "type": 2 }, { "is_prov": false, "name": "德阳", "id": "276", "type": 2 }, { "is_prov": false, "name": "丹东", "id": "77", "type": 2 }, { "is_prov": false, "name": "德宏傣族景颇族", "id": "315", "type": 2 }, { "is_prov": false, "name": "达州", "id": "286", "type": 2 }] }, { "py_head": "E", "name_list": [{ "is_prov": false, "name": "恩施土家族苗族", "id": "217", "type": 2 }, { "is_prov": false, "name": "鄂尔多斯", "id": "65", "type": 2 }, { "is_prov": false, "name": "鄂州", "id": "210", "type": 2 }] }, { "py_head": "F", "name_list": [{ "is_prov": false, "name": "抚顺", "id": "75", "type": 2 }, { "is_prov": false, "name": "阜新", "id": "80", "type": 2 }, { "is_prov": false, "name": "防城港", "id": "259", "type": 2 }, { "is_prov": false, "name": "佛山", "id": "238", "type": 2 }, { "is_prov": false, "name": "抚州", "id": "168", "type": 2 }, { "is_prov": false, "name": "阜阳", "id": "143", "type": 2 }, { "is_prov": false, "name": "福州", "id": "150", "type": 2 }] }, { "py_head": "G", "name_list": [{ "is_prov": false, "name": "广安", "id": "285", "type": 2 }, { "is_prov": false, "name": "广州", "id": "233", "type": 2 }, { "is_prov": false, "name": "贵港", "id": "261", "type": 2 }, { "is_prov": false, "name": "桂林", "id": "256", "type": 2 }, { "is_prov": false, "name": "固原", "id": "360", "type": 2 }, { "is_prov": false, "name": "赣州", "id": "165", "type": 2 }, { "is_prov": false, "name": "贵阳", "id": "293", "type": 2 }, { "is_prov": false, "name": "广元", "id": "278", "type": 2 }] }, { "py_head": "H", "name_list": [{ "is_prov": false, "name": "黄石", "id": "206", "type": 2 }, { "is_prov": false, "name": "湖州", "id": "126", "type": 2 }, { "is_prov": false, "name": "菏泽", "id": "186", "type": 2 }, { "is_prov": false, "name": "鹤壁", "id": "192", "type": 2 }, { "is_prov": false, "name": "黑河", "id": "105", "type": 2 }, { "is_prov": false, "name": "惠州", "id": "243", "type": 2 }, { "is_prov": false, "name": "鹤岗", "id": "98", "type": 2 }, { "is_prov": false, "name": "衡水", "id": "48", "type": 2 }, { "is_prov": false, "name": "邯郸", "id": "41", "type": 2 }, { "is_prov": false, "name": "呼和浩特", "id": "60", "type": 2 }, { "is_prov": false, "name": "合肥", "id": "133", "type": 2 }, { "is_prov": false, "name": "葫芦岛", "id": "85", "type": 2 }, { "is_prov": false, "name": "汉中", "id": "331", "type": 2 }, { "is_prov": false, "name": "哈密地区", "id": "365", "type": 2 }, { "is_prov": false, "name": "红河哈尼族彝族", "id": "311", "type": 2 }, { "is_prov": false, "name": "哈尔滨", "id": "95", "type": 2 }, { "is_prov": false, "name": "衡阳", "id": "222", "type": 2 }, { "is_prov": false, "name": "海口", "id": "268", "type": 2 }, { "is_prov": false, "name": "怀化", "id": "230", "type": 2 }, { "is_prov": false, "name": "黄冈", "id": "214", "type": 2 }, { "is_prov": false, "name": "淮北", "id": "138", "type": 2 }, { "is_prov": false, "name": "呼伦贝尔", "id": "66", "type": 2 }, { "is_prov": false, "name": "河池", "id": "265", "type": 2 }, { "is_prov": false, "name": "淮安", "id": "116", "type": 2 }, { "is_prov": false, "name": "海西蒙古族藏族", "id": "356", "type": 2 }, { "is_prov": false, "name": "海东", "id": "350", "type": 2 }, { "is_prov": false, "name": "淮南", "id": "136", "type": 2 }, { "is_prov": false, "name": "贺州", "id": "264", "type": 2 }, { "is_prov": false, "name": "黄山", "id": "141", "type": 2 }, { "is_prov": false, "name": "和田地区", "id": "372", "type": 2 }, { "is_prov": false, "name": "河源", "id": "246", "type": 2 }, { "is_prov": false, "name": "杭州", "id": "122", "type": 2 }] }, { "py_head": "J", "name_list": [{ "is_prov": false, "name": "佳木斯", "id": "102", "type": 2 }, { "is_prov": false, "name": "金昌", "id": "337", "type": 2 }, { "is_prov": false, "name": "九江", "id": "162", "type": 2 }, { "is_prov": false, "name": "景德镇", "id": "160", "type": 2 }, { "is_prov": false, "name": "焦作", "id": "194", "type": 2 }, { "is_prov": false, "name": "金华", "id": "128", "type": 2 }, { "is_prov": false, "name": "酒泉", "id": "343", "type": 2 }, { "is_prov": false, "name": "济南", "id": "170", "type": 2 }, { "is_prov": false, "name": "济宁", "id": "177", "type": 2 }, { "is_prov": false, "name": "嘉兴", "id": "125", "type": 2 }, { "is_prov": false, "name": "锦州", "id": "78", "type": 2 }, { "is_prov": false, "name": "鸡西", "id": "97", "type": 2 }, { "is_prov": false, "name": "江门", "id": "239", "type": 2 }, { "is_prov": false, "name": "吉林", "id": "87", "type": 2 }, { "is_prov": false, "name": "荆门", "id": "211", "type": 2 }, { "is_prov": false, "name": "揭阳", "id": "250", "type": 2 }, { "is_prov": false, "name": "荆州", "id": "213", "type": 2 }, { "is_prov": false, "name": "嘉峪关", "id": "336", "type": 2 }, { "is_prov": false, "name": "晋城", "id": "53", "type": 2 }, { "is_prov": false, "name": "晋中", "id": "55", "type": 2 }, { "is_prov": false, "name": "吉安", "id": "166", "type": 2 }] }, { "py_head": "K", "name_list": [{ "is_prov": false, "name": "喀什地区", "id": "371", "type": 2 }, { "is_prov": false, "name": "开封", "id": "188", "type": 2 }, { "is_prov": false, "name": "昆明", "id": "302", "type": 2 }, { "is_prov": false, "name": "克拉玛依", "id": "363", "type": 2 }] }, { "py_head": "L", "name_list": [{ "is_prov": false, "name": "林芝地区", "id": "324", "type": 2 }, { "is_prov": false, "name": "莱芜", "id": "181", "type": 2 }, { "is_prov": false, "name": "临沧", "id": "309", "type": 2 }, { "is_prov": false, "name": "连云港", "id": "115", "type": 2 }, { "is_prov": false, "name": "凉山彝族", "id": "292", "type": 2 }, { "is_prov": false, "name": "辽阳", "id": "81", "type": 2 }, { "is_prov": false, "name": "临沂", "id": "182", "type": 2 }, { "is_prov": false, "name": "六盘水", "id": "294", "type": 2 }, { "is_prov": false, "name": "丽水", "id": "132", "type": 2 }, { "is_prov": false, "name": "吕梁", "id": "59", "type": 2 }, { "is_prov": false, "name": "廊坊", "id": "47", "type": 2 }, { "is_prov": false, "name": "丽江", "id": "307", "type": 2 }, { "is_prov": false, "name": "拉萨", "id": "318", "type": 2 }, { "is_prov": false, "name": "六安", "id": "146", "type": 2 }, { "is_prov": false, "name": "漯河", "id": "198", "type": 2 }, { "is_prov": false, "name": "临汾", "id": "58", "type": 2 }, { "is_prov": false, "name": "泸州", "id": "275", "type": 2 }, { "is_prov": false, "name": "聊城", "id": "184", "type": 2 }, { "is_prov": false, "name": "洛阳", "id": "189", "type": 2 }, { "is_prov": false, "name": "乐山", "id": "281", "type": 2 }, { "is_prov": false, "name": "来宾", "id": "266", "type": 2 }, { "is_prov": false, "name": "柳州", "id": "255", "type": 2 }, { "is_prov": false, "name": "娄底", "id": "231", "type": 2 }, { "is_prov": false, "name": "龙岩", "id": "157", "type": 2 }, { "is_prov": false, "name": "兰州", "id": "335", "type": 2 }, { "is_prov": false, "name": "辽源", "id": "89", "type": 2 }] }, { "py_head": "M", "name_list": [{ "is_prov": false, "name": "梅州", "id": "244", "type": 2 }, { "is_prov": false, "name": "眉山", "id": "283", "type": 2 }, { "is_prov": false, "name": "绵阳", "id": "277", "type": 2 }, { "is_prov": false, "name": "马鞍山", "id": "137", "type": 2 }, { "is_prov": false, "name": "茂名", "id": "241", "type": 2 }, { "is_prov": false, "name": "牡丹江", "id": "104", "type": 2 }] }, { "py_head": "N", "name_list": [{ "is_prov": false, "name": "南昌", "id": "159", "type": 2 }, { "is_prov": false, "name": "南京", "id": "109", "type": 2 }, { "is_prov": false, "name": "宁德", "id": "158", "type": 2 }, { "is_prov": false, "name": "那曲", "id": "322", "type": 2 }, { "is_prov": false, "name": "南通", "id": "114", "type": 2 }, { "is_prov": false, "name": "南充", "id": "282", "type": 2 }, { "is_prov": false, "name": "宁波", "id": "123", "type": 2 }, { "is_prov": false, "name": "南宁", "id": "254", "type": 2 }, { "is_prov": false, "name": "南阳", "id": "200", "type": 2 }, { "is_prov": false, "name": "内江", "id": "280", "type": 2 }, { "is_prov": false, "name": "南平", "id": "156", "type": 2 }] }, { "py_head": "P", "name_list": [{ "is_prov": false, "name": "莆田", "id": "152", "type": 2 }, { "is_prov": false, "name": "萍乡", "id": "161", "type": 2 }, { "is_prov": false, "name": "平顶山", "id": "190", "type": 2 }, { "is_prov": false, "name": "平凉", "id": "342", "type": 2 }, { "is_prov": false, "name": "攀枝花", "id": "274", "type": 2 }, { "is_prov": false, "name": "盘锦", "id": "82", "type": 2 }, { "is_prov": false, "name": "濮阳", "id": "196", "type": 2 }, { "is_prov": false, "name": "普洱", "id": "308", "type": 2 }] }, { "py_head": "Q", "name_list": [{ "is_prov": false, "name": "曲靖", "id": "303", "type": 2 }, { "is_prov": false, "name": "清远", "id": "248", "type": 2 }, { "is_prov": false, "name": "秦皇岛", "id": "40", "type": 2 }, { "is_prov": false, "name": "黔西南布依族苗族", "id": "298", "type": 2 }, { "is_prov": false, "name": "黔东南苗族侗族", "id": "300", "type": 2 }, { "is_prov": false, "name": "黔南布依族苗族", "id": "301", "type": 2 }, { "is_prov": false, "name": "青岛", "id": "171", "type": 2 }, { "is_prov": false, "name": "齐齐哈尔", "id": "96", "type": 2 }, { "is_prov": false, "name": "衢州", "id": "129", "type": 2 }, { "is_prov": false, "name": "庆阳", "id": "344", "type": 2 }, { "is_prov": false, "name": "琼海", "id": "269", "type": 2 }, { "is_prov": false, "name": "七台河", "id": "103", "type": 2 }, { "is_prov": false, "name": "钦州", "id": "260", "type": 2 }, { "is_prov": false, "name": "泉州", "id": "154", "type": 2 }] }, { "py_head": "R", "name_list": [{ "is_prov": false, "name": "日照", "id": "180", "type": 2 }, { "is_prov": false, "name": "日喀则地区", "id": "321", "type": 2 }] }, { "py_head": "S", "name_list": [{ "is_prov": true, "name": "上海", "id": "10", "type": 1 }, { "is_prov": false, "name": "上饶", "id": "169", "type": 2 }, { "is_prov": false, "name": "三明", "id": "153", "type": 2 }, { "is_prov": false, "name": "汕尾", "id": "245", "type": 2 }, { "is_prov": false, "name": "绥化", "id": "106", "type": 2 }, { "is_prov": false, "name": "邵阳", "id": "223", "type": 2 }, { "is_prov": false, "name": "双鸭山", "id": "99", "type": 2 }, { "is_prov": false, "name": "遂宁", "id": "279", "type": 2 }, { "is_prov": false, "name": "三亚", "id": "270", "type": 2 }, { "is_prov": false, "name": "绍兴", "id": "127", "type": 2 }, { "is_prov": false, "name": "省直辖县级行政区划", "id": "195", "type": 2 }, { "is_prov": false, "name": "三门峡", "id": "199", "type": 2 }, { "is_prov": false, "name": "松原", "id": "92", "type": 2 }, { "is_prov": false, "name": "商丘", "id": "201", "type": 2 }, { "is_prov": false, "name": "宿州", "id": "144", "type": 2 }, { "is_prov": false, "name": "韶关", "id": "234", "type": 2 }, { "is_prov": false, "name": "十堰", "id": "207", "type": 2 }, { "is_prov": false, "name": "石家庄", "id": "38", "type": 2 }, { "is_prov": false, "name": "商洛", "id": "334", "type": 2 }, { "is_prov": false, "name": "石嘴山", "id": "358", "type": 2 }, { "is_prov": false, "name": "深圳", "id": "235", "type": 2 }, { "is_prov": false, "name": "沈阳", "id": "72", "type": 2 }, { "is_prov": false, "name": "省直辖县级行政单位", "id": "376", "type": 2 }, { "is_prov": false, "name": "宿迁", "id": "121", "type": 2 }, { "is_prov": false, "name": "朔州", "id": "54", "type": 2 }, { "is_prov": false, "name": "汕头", "id": "237", "type": 2 }, { "is_prov": false, "name": "四平", "id": "88", "type": 2 }, { "is_prov": false, "name": "随州", "id": "216", "type": 2 }, { "is_prov": false, "name": "山南地区", "id": "320", "type": 2 }, { "is_prov": false, "name": "苏州", "id": "113", "type": 2 }] }, { "py_head": "T", "name_list": [{ "is_prov": true, "name": "天津", "id": "3", "type": 1 }, { "is_prov": false, "name": "塔城地区", "id": "374", "type": 2 }, { "is_prov": false, "name": "唐山", "id": "39", "type": 2 }, { "is_prov": false, "name": "泰安", "id": "178", "type": 2 }, { "is_prov": false, "name": "太原", "id": "49", "type": 2 }, { "is_prov": false, "name": "铜陵", "id": "139", "type": 2 }, { "is_prov": false, "name": "台州", "id": "131", "type": 2 }, { "is_prov": false, "name": "铁岭", "id": "83", "type": 2 }, { "is_prov": false, "name": "通辽", "id": "64", "type": 2 }, { "is_prov": false, "name": "天水", "id": "339", "type": 2 }, { "is_prov": false, "name": "泰州", "id": "120", "type": 2 }, { "is_prov": false, "name": "通化", "id": "90", "type": 2 }, { "is_prov": false, "name": "铜仁", "id": "297", "type": 2 }, { "is_prov": false, "name": "铜川", "id": "326", "type": 2 }] }, { "py_head": "W", "name_list": [{ "is_prov": false, "name": "无锡", "id": "110", "type": 2 }, { "is_prov": false, "name": "吴忠", "id": "359", "type": 2 }, { "is_prov": false, "name": "梧州", "id": "257", "type": 2 }, { "is_prov": false, "name": "武威", "id": "340", "type": 2 }, { "is_prov": false, "name": "威海", "id": "179", "type": 2 }, { "is_prov": false, "name": "潍坊", "id": "176", "type": 2 }, { "is_prov": false, "name": "武汉", "id": "205", "type": 2 }, { "is_prov": false, "name": "渭南", "id": "329", "type": 2 }, { "is_prov": false, "name": "芜湖", "id": "134", "type": 2 }, { "is_prov": false, "name": "温州", "id": "124", "type": 2 }, { "is_prov": false, "name": "乌鲁木齐", "id": "362", "type": 2 }, { "is_prov": false, "name": "乌海", "id": "62", "type": 2 }, { "is_prov": false, "name": "乌兰察布", "id": "68", "type": 2 }, { "is_prov": false, "name": "文山壮族苗族", "id": "312", "type": 2 }] }, { "py_head": "X", "name_list": [{ "is_prov": false, "name": "咸宁", "id": "215", "type": 2 }, { "is_prov": false, "name": "西双版纳傣族", "id": "313", "type": 2 }, { "is_prov": false, "name": "湘潭", "id": "221", "type": 2 }, { "is_prov": false, "name": "邢台", "id": "42", "type": 2 }, { "is_prov": false, "name": "厦门", "id": "151", "type": 2 }, { "is_prov": false, "name": "孝感", "id": "212", "type": 2 }, { "is_prov": false, "name": "兴安盟", "id": "69", "type": 2 }, { "is_prov": false, "name": "咸阳", "id": "328", "type": 2 }, { "is_prov": false, "name": "新余", "id": "163", "type": 2 }, { "is_prov": false, "name": "锡林郭勒盟", "id": "70", "type": 2 }, { "is_prov": false, "name": "许昌", "id": "197", "type": 2 }, { "is_prov": false, "name": "西宁", "id": "349", "type": 2 }, { "is_prov": false, "name": "襄阳", "id": "209", "type": 2 }, { "is_prov": false, "name": "湘西土家族苗族", "id": "232", "type": 2 }, { "is_prov": false, "name": "宣城", "id": "149", "type": 2 }, { "is_prov": false, "name": "西安", "id": "325", "type": 2 }, { "is_prov": false, "name": "信阳", "id": "202", "type": 2 }, { "is_prov": false, "name": "新乡", "id": "193", "type": 2 }, { "is_prov": false, "name": "忻州", "id": "57", "type": 2 }, { "is_prov": false, "name": "仙桃", "id": "218", "type": 2 }, { "is_prov": false, "name": "徐州", "id": "111", "type": 2 }] }, { "py_head": "Y", "name_list": [{ "is_prov": false, "name": "雅安", "id": "287", "type": 2 }, { "is_prov": false, "name": "榆林", "id": "332", "type": 2 }, { "is_prov": false, "name": "云浮", "id": "251", "type": 2 }, { "is_prov": false, "name": "运城", "id": "56", "type": 2 }, { "is_prov": false, "name": "宜宾", "id": "284", "type": 2 }, { "is_prov": false, "name": "银川", "id": "357", "type": 2 }, { "is_prov": false, "name": "延安", "id": "330", "type": 2 }, { "is_prov": false, "name": "延边朝鲜族", "id": "94", "type": 2 }, { "is_prov": false, "name": "岳阳", "id": "224", "type": 2 }, { "is_prov": false, "name": "伊春", "id": "101", "type": 2 }, { "is_prov": false, "name": "益阳", "id": "227", "type": 2 }, { "is_prov": false, "name": "宜春", "id": "167", "type": 2 }, { "is_prov": false, "name": "永州", "id": "229", "type": 2 }, { "is_prov": false, "name": "营口", "id": "79", "type": 2 }, { "is_prov": false, "name": "鹰潭", "id": "164", "type": 2 }, { "is_prov": false, "name": "伊犁哈萨克", "id": "373", "type": 2 }, { "is_prov": false, "name": "阳泉", "id": "51", "type": 2 }, { "is_prov": false, "name": "扬州", "id": "118", "type": 2 }, { "is_prov": false, "name": "宜昌", "id": "208", "type": 2 }, { "is_prov": false, "name": "盐城", "id": "117", "type": 2 }, { "is_prov": false, "name": "玉溪", "id": "304", "type": 2 }, { "is_prov": false, "name": "玉林", "id": "262", "type": 2 }, { "is_prov": false, "name": "烟台", "id": "175", "type": 2 }, { "is_prov": false, "name": "阳江", "id": "247", "type": 2 }] }, { "py_head": "Z", "name_list": [{ "is_prov": false, "name": "株洲", "id": "220", "type": 2 }, { "is_prov": false, "name": "中卫", "id": "361", "type": 2 }, { "is_prov": false, "name": "湛江", "id": "240", "type": 2 }, { "is_prov": false, "name": "漳州", "id": "155", "type": 2 }, { "is_prov": false, "name": "珠海", "id": "236", "type": 2 }, { "is_prov": false, "name": "镇江", "id": "119", "type": 2 }, { "is_prov": false, "name": "昭通", "id": "306", "type": 2 }, { "is_prov": false, "name": "肇庆", "id": "242", "type": 2 }, { "is_prov": false, "name": "周口", "id": "203", "type": 2 }, { "is_prov": false, "name": "张家口", "id": "44", "type": 2 }, { "is_prov": false, "name": "驻马店", "id": "204", "type": 2 }, { "is_prov": false, "name": "舟山", "id": "130", "type": 2 }, { "is_prov": false, "name": "张家界", "id": "226", "type": 2 }, { "is_prov": false, "name": "资阳", "id": "289", "type": 2 }, { "is_prov": false, "name": "张掖", "id": "341", "type": 2 }, { "is_prov": false, "name": "自贡", "id": "273", "type": 2 }, { "is_prov": false, "name": "中山", "id": "253", "type": 2 }, { "is_prov": false, "name": "遵义", "id": "295", "type": 2 }, { "is_prov": false, "name": "淄博", "id": "172", "type": 2 }, { "is_prov": false, "name": "枣庄", "id": "173", "type": 2 }, { "is_prov": false, "name": "郑州", "id": "187", "type": 2 }] }]
    }
  }
  async searchAreaList() {
    let { ctx } = this
    let { content } = ctx.request.body
    let res = await ctx.curl('https://m.mi.com/v1/mistore/area_search', {
      method: 'POST',
      data: {
        client_id: 180100031051,
        channel_id: '',
        webp: 1,
        content
      },
      dataType: 'json',
      headers: {
        referer: 'https://m.mi.com/maplocation/address?location_type=mihome'
      }
    })
    ctx.body = {
      code: 200,
      msg: '搜索成功',
      data: res.data
    }
  }
  async storeHome() {
    let { ctx } = this
    let { area_name, area_id } = ctx.request.body
    let res = await ctx.curl('https://m.mi.com/v1/miaftersale/store_home', {
      method: 'POST',
      data: {
        client_id: 180100031051,
        channel_id: '',
        webp: 1,
        area_type: 2,
        area_name: area_name,
        area_id: area_id,
        lat: 0,
        lng: 0,
        type_name: 'mihome'
      },
      dataType: 'json',
      headers: {
        referer: 'https://m.mi.com/maplocation?p_name=%25E6%2588%2590%25E9%2583%25BD&long=0&lat=0&classtype=2&area_id=272&hide_tabs='
      }
    })
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: res.data
    }
  }
  async storeDetail() {
    let { ctx } = this
    let { mihome_id } = ctx.request.body
    let res = await ctx.curl('https://m.mi.com/v1/mihome/service_infov2', {
      method: 'POST',
      data: {
        client_id: 180100031051,
        channel_id: '',
        webp: 1,
        mihome_id,
      },
      dataType: 'json',
      headers: {
        referer: 'https://m.mi.com/mihome/sites/detail?type=outlet&miHomeId=WDCN02310'
      }
    })
    ctx.body = {
      code: 200,
      msg: '搜索成功',
      data: res.data
    }
  }
}

module.exports = HomeController
