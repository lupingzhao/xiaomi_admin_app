
import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'umi'

interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any) => void
  del: (val1: string) => void
}

const SeckillTable = (props: Props) => {
  let list = useSelector((state: any) => state.Seckill.seckills)
  let index = 1
  // 编辑
  let edit = (val: any) => {
    // goodsname: val.goods._id
    props.edits({ ...val, })
  }
  // 删除
  let del = (val: string) => {
    props.del(val)
  }
  // 显示开关
  let onChange = (e1: boolean, e: string,) => {
    props.show(e, e1)
  }
  // mode: string
  // model: string[]
  // name: string
  // parentId: string[]
  // spec_item: string
  // _id: string
  // 表格每行代码
  const columns = [
    {
      title: '#',
      align: 'center',
      render: (text: any, record: any, index: number) => { return index + 1 }
    },
    {
      title: '秒杀商品',
      dataIndex: 'goods',
      key: 'goods',
      align: 'center',
      render: (text: any) => <span>{text.name}</span>
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
      title: '秒杀价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text: any) => <span>￥{Number(text).toFixed(2)}</span>
    },
    {
      title: '秒杀数量',
      dataIndex: 'goods_number',
      key: 'goods_number',
      align: 'center',
    },
    {
      title: '是否禁用',
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
            onClick={() => { edit(record) }}>
            编辑</Button>
          <Popconfirm
            placement="topRight"
            title='确定将此条通知删除吗？'
            onConfirm={() => { del(record) }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger >
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

export default SeckillTable
