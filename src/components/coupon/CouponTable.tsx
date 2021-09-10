import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'umi'

interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any) => void
  del: (val1: string) => void
}

const CouponTable = (props: Props) => {
  let list = useSelector((state: any) => state.Coupon.coupons)
  // 编辑
  let edit = (val: any) => {
    props.edits(val)
  }
  // 删除
  let del = (val: string) => {
    props.del(val)
  }
  // 显示开关
  let onChange = (e1: boolean, e: string,) => {
    props.show(e, e1)
  }
  // amount: string
  // end_time: string
  // isShow: boolean
  // name: string
  // number: string
  // start_time: string
  // threshold: string
  // _id: string
  // 表格每行代码
  const columns = [
    {
      title: '优惠券名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center',
      render: (text: any) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      align: 'center',
      render: (text: any) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '优惠金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '使用门槛',
      dataIndex: 'threshold',
      key: 'threshold',
      align: 'center',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '发放数量',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      key: 'isShow',
      align: 'center',
      render: (text: any, record: any) => (
        <Switch defaultChecked={text}
          onChange={(e: boolean) => { onChange(e, record._id,) }} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="middle" className='font-s-12'>
          <Button type="primary" size='small'
            onClick={() => { edit(record) }}>编辑</Button>
          <Popconfirm
            placement="topRight"
            title='确定将此条通知删除吗？'
            onConfirm={() => { del(record._id) }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger size='small'>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]


  return (
    <div>
      <Table rowKey='_id'
        bordered={true}
        columns={columns as any} dataSource={list}
        pagination={false}
      />
    </div>
  )
}

export default CouponTable
