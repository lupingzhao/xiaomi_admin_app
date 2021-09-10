import { Table, Space, Switch, Button, Popconfirm, Modal } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'umi'
import { useState } from 'react';
import { Goods } from '@/types'

interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any) => void
  del: (val1: string) => void
}

const RecoTable = (props: Props) => {
  let list = useSelector((state: any) => state.RecommendNav.RecommendNavs)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goodslist, setGoodsList] = useState([]);
  // 编辑
  let edit = (val: any) => {
    props.edits(val)
  }
  // 删除
  let del = (val: string) => {
    props.del(val)
  }
  // 查看下属商品
  let view = (val: any) => {
    setGoodsList(val.goods)
    setIsModalVisible(true)
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
      title: '导航名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '导航描述',
      dataIndex: 'desc',
      key: 'desc',
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
          <Button size='small'
            onClick={() => { view(record) }}>
            下属商品</Button>
          <Button type="primary" size='small'
            onClick={() => { edit(record) }}>
            编辑</Button>
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


      <Modal title="分类下属商品" visible={isModalVisible} footer={false}
        onCancel={() => { setIsModalVisible(false) }}>
        <div className=''>
          {
            goodslist.length && goodslist.map((item: Goods) => {
              return (
                <div style={{ margin: 5 }} key={item._id}>
                  <span>商品名称：</span>
                  <span>{item.name}</span>
                </div>
              )
            })

          }
        </div>

      </Modal>
    </div >
  )
}

export default RecoTable
