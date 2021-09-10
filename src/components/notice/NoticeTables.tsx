import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useSelector } from 'umi'

interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any) => void
  del: (val1: string) => void
}

const NoticeTables = (props: Props) => {
  let list = useSelector((state: any) => state.Notice.notices)
  let index = 1
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

  // 表格每行代码
  const columns = [
    {
      title: '#',
      render: (text: any, record: any, index: number) => { return index + 1 },
      align: 'center'
    },
    {
      title: '通知内容',
      dataIndex: 'content',
      key: 'content',
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
            <Button type="primary" danger size='small'>
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

export default NoticeTables
