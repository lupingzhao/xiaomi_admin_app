import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Table, Space, Switch, Button, Popconfirm, Pagination } from 'antd';
import dayjs from 'dayjs';


const Order = () => {
  let dispatch = useDispatch()
  let index = 1
  let list = useSelector((state: any) => state.Order.orders)
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  let total = useSelector((state: any) => state.Order.total)

  const columns = [


    {
      title: '订单日期',
      dataIndex: 'pay_time',
      key: 'pay_time',
      align: 'center',
      render: (text: any) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '商品数量',
      dataIndex: 'count',
      key: 'count',
      align: 'center',
    },
    {
      title: '订单价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text: any) => <span>￥{Number(text).toFixed(2)}</span>
    },

    {
      title: '订单地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },

  ]

  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    // dispatch({
    //   type: 'Notice/notice',
    //   payload: { current: pages, pageSize: pageSizes, query: '' }
    // })
  }

  useEffect(() => {
    dispatch({
      type: 'Order/order'
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <Table rowKey='_id'
        bordered={true}
        columns={columns as any} dataSource={list}
        pagination={false}
      />

      <div className='t-a-r'>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          onChange={onChange}
          defaultPageSize={10}
          current={page}
          pageSizeOptions={['5', '10', '20', '100']}
        />
      </div>
    </div>
  )
}

export default Order
