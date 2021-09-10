import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button, DatePicker, InputNumber } from 'antd'
import { message } from 'antd'
import moment from 'moment';
import CouponTable from '@/components/coupon/CouponTable';
import dayjs from 'dayjs';


const Coupon = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  const [isedit, setIsedit] = useState(false);
  let [name, setName] = useState('')
  let [amount, setAmount] = useState('')
  let [threshold, setThreshold] = useState('')
  let [startTime, setStartTime] = useState('')
  let [endTime, setEndTime] = useState('')
  let [number, setNumber] = useState('')
  let [id, setId] = useState('')
  let total = useSelector((state: any) => state.Coupon.total)

  // form表单
  let [form] = Form.useForm()
  // 置空表单数据
  let deldata = () => {
    setName('')
    setAmount('')
    setThreshold('')
    setStartTime('')
    setEndTime('')
    setNumber('')
  }
  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'Coupon/Coupon',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
    deldata()
  }

  // 是否显示
  let isshows = (id: string, show: boolean) => {
    dispatch({
      type: 'Coupon/show',
      payload: {
        show: { id: id, isShow: show },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 编辑导航
  let edit = (val: any) => {
    name = val.name
    setName(name)
    setIsVisible(true)
    setId(val._id)
    setAmount(val.amount)
    setEndTime(val.end_time)
    setStartTime(val.start_time)
    setThreshold(val.threshold)
    setNumber(val.number)
  }
  // 添加确定
  let submit = (val: any) => {
    if (dayjs(val.end_time._d).valueOf() > dayjs(val.start_time._d).valueOf()) {
      // 编辑
      if (name) {
        dispatch({
          type: 'Coupon/edit',
          payload: {
            edit: { ...val, id: id },
            update: { current: page, pageSize: pageSize, query: '' }
          }
        })
      } else {
        dispatch({
          type: 'Coupon/add',
          payload:
          {
            add: val,
            update: { current: page, pageSize: pageSize, query: '' }
          }
        })
      }
      deldata()
      setIsVisible(false)
    } else message.warning('结束时间必须大于开始时间！')

  }
  // 禁用时间
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'Coupon/del',
      payload: {
        del: val,
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Coupon/Coupon',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }

  useEffect(() => {
    // 通知数据
    dispatch({
      type: 'Coupon/Coupon',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text='添加优惠券'></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <CouponTable show={isshows} edits={edit} del={del}></CouponTable>
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
        />
      </div>
      {/* 添加 */}

      <Amodel show={isVisible} isShow={isShow} title='添加优惠券' submit={submit} isfooter={false}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label='优惠券名称'
            name="name"
            initialValue={name}
            rules={[{ required: true, message: '请输入优惠券名称' }]}
          >
            <Input placeholder='请输入优惠券名称' />
          </Form.Item>
          <Form.Item
            label="使用门槛"
            name="threshold"
            initialValue={threshold}
            rules={[{ required: true, message: '请输入使用门槛' }]}
          >
            <Input placeholder='请输入使用门槛' />
          </Form.Item>
          <Form.Item
            label="优惠金额"
            name="amount"
            initialValue={amount}
            rules={[{ required: true, message: '请输入优惠金额' }]}
          >
            <InputNumber min={1} max={10} placeholder='请输入优惠券金额' className='width-100' />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="start_time"
            initialValue={startTime && moment(startTime)}
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
            initialValue={endTime && moment(endTime)}
            rules={[{ required: true, message: '请输入结束时间' }]}
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
            label="发放数量"
            name="number"
            initialValue={number}
            rules={[{ required: true, message: '请输入发放数量' }]}
          >
            <Input type='number' placeholder='请输入发放数量' />
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

export default Coupon


