import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button, DatePicker, InputNumber, Select } from 'antd'
import { message } from 'antd'
const { Option } = Select;
import moment from 'moment';
import dayjs from 'dayjs';
import SeckillTable from '@/components/seckill/SeckillTable';


const Seckill = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  let [isedit, setIsedit] = useState(false)
  let [querry, setQuerry] = useState('')
  let [editshow, setEditshow] = useState('')
  let [seckillGoods, setSkillGoods] = useState<any>('')
  let total = useSelector((state: any) => state.Seckill.total)
  let goods = useSelector((state: any) => state.Params.goods)

  // form表单
  let [form] = Form.useForm()

  // 搜索事件
  const onSearch = (value: string) => {
    setQuerry(value)
    dispatch({
      type: 'Seckill/Seckill',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
    setIsedit(false)
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
  }

  // 是否显示
  let isshows = (id: string, show: boolean) => {
    dispatch({
      type: 'Seckill/show',
      payload: {
        show: { id: id, isShow: show },
        update: { current: page, pageSize: pageSize, query: querry }
      }
    })
  }
  // 编辑导航
  let edit = (val: any) => {
    setSkillGoods(val.goods)
    val.start_time = moment(val.start_time)
    val.end_time = moment(val.end_time)
    form.setFieldsValue({ ...val, })
    setIsVisible(true)
    setIsedit(true)
  }
  // 选择器
  let select = (e: any, val: any) => {
    seckillGoods = goods.filter((i: any) => {
      return i._id === val.key
    })
    setSkillGoods(seckillGoods[0])
  }
  // 添加确定
  let submit = (val: any) => {
    // start_time, end_time, goods_number, price, goods, isShow 
    if (dayjs(val.end_time._d).valueOf() > dayjs(val.start_time._d).valueOf()) {
      // // 编辑
      if (isedit) {
        dispatch({
          type: 'Seckill/edit',
          payload: {
            edit: { ...val, goods: seckillGoods },
            update: { current: page, pageSize: pageSize, query: querry }
          }
        })
        setSkillGoods('')
      } else {
        dispatch({
          type: 'Seckill/add',
          payload:
          {
            add: { ...val, goods: seckillGoods },
            update: { current: page, pageSize: pageSize, query: querry }
          }
        })
      }
      setIsVisible(false)
    } else message.warning('结束时间必须大于开始时间！')

  }
  // 禁用时间
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current < new Date();
  }
  // 删除
  let del = (val: any) => {
    dispatch({
      type: 'Seckill/del',
      payload: {
        del: { id: val._id, goodsId: val.goods._id },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Seckill/Seckill',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }


  useEffect(() => {
    // 通知数据
    dispatch({
      type: 'Seckill/Seckill',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
    dispatch({
      type: 'Params/goods',
      payload: { current: 1, pageSize: 10000, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text='添加秒杀'></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <SeckillTable show={isshows} edits={edit} del={del}></SeckillTable>
      </div>
      {/* 分页 */}
      <div className='t-a-r m-tb-10'>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          onChange={onChange}
          defaultPageSize={5}
          current={page}
          pageSizeOptions={['5', '20', '50', '100']}
          hideOnSinglePage={true}
        />
      </div>
      {/* 添加 */}

      <Amodel maskClosable={false} show={isVisible} isShow={isShow} title='添加秒杀' submit={submit} isfooter={false}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          {/* start_time, end_time, goods_number, price, goods, isShow */}
          <Form.Item
            label='秒杀商品'
            name="goodsname"
            rules={[{ required: true, message: '请选择秒杀商品' }]}
          >
            <Select
              showSearch
              style={{ width: "100%", height: 32 }}
              placeholder="请选择商品"
              onSelect={select}
            >
              {
                goods && goods.map((item: any, index: number) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="开始时间"
            name="start_time"
            className='width-100'
            rules={[{ required: true, message: '请输入开始时间' }]}
          >
            <DatePicker
              inputReadOnly={true}
              format="YYYY-MM-DD HH:mm:ss"
              className='width-100'
              disabledDate={disabledDate}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="end_time"
            rules={[{ required: true, message: '请输入结束时间' }]}
          >
            <DatePicker
              className='width-100'
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </Form.Item>
          <Form.Item
            label="秒杀价格"
            name="price"
            rules={[{ required: true, message: '请输入秒杀价格' }]}
          >
            <InputNumber min={0} placeholder='请输入秒杀价格' className='width-100' />
          </Form.Item>
          <Form.Item
            label="秒杀数量"
            name="goods_number"
            rules={[{ required: true, message: '请输入秒杀数量' }]}
          >
            <Input type='number' min={1} placeholder='请输入秒杀数量' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 17 }}>
            <Button className='mr-5' onClick={() => { isShow(true) }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" >
              确定
            </Button>
          </Form.Item>
        </Form>
      </Amodel>

    </div >
  )
}

export default Seckill



