import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'umi'

interface Props {
  del: (val1: string) => void
}

const SpecTable = (props: Props) => {
  let list = useSelector((state: any) => state.Spec.Specs)
  let index = 1
  // 删除
  let del = (val: string) => {
    props.del(val)
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
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '所属模型',
      dataIndex: 'model',
      key: 'model',
      align: 'center',
    },
    {
      title: '展示方式',
      dataIndex: 'mode',
      key: 'mode',
      align: 'center',
    },
    {
      title: '规格项',
      dataIndex: 'spec_item',
      key: 'spec_item',
      align: 'center',
      render: (text: any) => <span>{text.split('\n').join(',')}</span>
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="middle" className='font-s-12'>
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

export default SpecTable

