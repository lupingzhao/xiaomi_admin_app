import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'umi'
import { render } from 'react-dom';
import { history } from 'umi'
interface Props {
  edits: (val: any) => void
  del: (val1: string) => void
}

const ModelTable = (props: Props) => {
  let list = useSelector((state: any) => state.GoodsModel.GoodsModels)
  let index = 1
  // 编辑
  let edit = (val: any) => {
    props.edits(val)
  }
  // 删除
  let del = (val: string) => {
    props.del(val)
  }
  // attribute: any
  // name: string
  // specifications: any
  // _id: string
  // 表格每行代码
  const columns = [
    {
      title: '#',
      align: 'center',
      render: (text: any, record: any, index: number) => { return index + 1 },
      width: 20
    },
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 100,
      render: (text: any, record: any) => (
        <Space size="middle" className='font-s-12'>
          <Button type="primary"
            onClick={() => { edit(record) }}>
            编辑</Button>
          <Button type="primary"
            onClick={() => { history.push(`/productSpecifications?id=${record._id}&name=${record.name}`) }}
          >
            添加规格</Button>
          <Popconfirm
            placement="topRight"
            title='确定将此条通知删除吗？'
            onConfirm={() => { del(record._id) }}
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

export default ModelTable
