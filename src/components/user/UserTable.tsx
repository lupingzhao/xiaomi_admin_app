
import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'umi'

interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any) => void
  del: (val1: string) => void
}

const UserTable = (props: Props) => {
  let list = useSelector((state: any) => state.User.Users)
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
  // avatar: string
  // email: string
  // mobile: string
  // regiter_time: string
  // status: boolean
  // username: string
  // _id: string
  // 表格每行代码
  const columns = [
    {
      title: '用户头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (text: any) => {
        return (
          text ? <img src={text} style={{ width: 50, height: 50 }} alt="" />
            : <i className='iconfont icon-a-touxiang' style={{ fontSize: 50 }
            }></i >
        )
      }
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '用户电话',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center',
      render: (text: any) => {
        return (
          text ? text
            : '/'
        )
      }
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (text: any) => {
        return (
          text ? text
            : '/'
        )
      }
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      key: 'status',
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
            title='确定将此用户删除吗？'
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
        style={{ padding: 0 }}
        columns={columns as any} dataSource={list}
        pagination={false}
      />
    </div>
  )
}

export default UserTable
