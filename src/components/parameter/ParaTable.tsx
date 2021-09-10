import React from 'react'

import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useSelector } from 'umi'
import { useDispatch } from 'umi';

interface Props {
  edits: (val: any) => void
}

const ParaTable = (props: Props) => {
  let dispatch = useDispatch()
  let list = useSelector((state: any) => state.Params.Paramss)
  let index = 1
  // 编辑
  let edit = (val: any) => {
    props.edits(val)
  }
  // 删除
  let del = (val: any) => {
    dispatch({
      type: 'Params/del',
      payload: {
        del: { parentId: val.parentId, attrId: val._id },
        update: { parentId: val.parentId }
      }
    })
  }

  // 表格每行代码
  const columns = [
    {
      title: '#',
      render: (text: any, record: any, index: number) => { return index + 1 },
      align: 'center'
    },
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (text: any) => <img src={text} alt="" style={{ width: 30, height: 30 }} />
    },
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '参数描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
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
            onConfirm={() => { del(record) }}
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

export default ParaTable
