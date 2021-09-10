
import { Table, Space, Switch, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector, useDispatch } from 'umi'
import { Modal, Image } from 'antd';

interface Props {
  edits: (val: any) => void
}

const GoodTable = (props: Props) => {
  let dispatch = useDispatch()
  let list = useSelector((state: any) => state.Goods.Goodss)
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [goods, setGoods] = useState<any>('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  // let index = 1
  // 编辑
  let edit = (val: any) => {
    props.edits(val)
  }
  // 删除
  let del = (val: string) => {
    // console.log(val);
    // props.del(val)
    dispatch({
      type: 'Goods/del',
      payload: {
        del: val,
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 详情
  let toView = (val: any) => {
    setGoods(val)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表格每行代码
  const columns = [
    {
      title: '#',
      align: 'center',
      render: (text: any, record: any, index: number) => { return index + 1 }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '商品原价',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      align: 'center',
    },
    {
      title: '商品现价',
      dataIndex: 'presentPrice',
      key: 'presentPrice',
      align: 'center',
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
    },
    {
      title: '是否新品',
      dataIndex: 'isNewGood',
      key: 'isNewGood',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          {text ? '是' : '否'}
        </div>
      )
    },
    {
      title: '是否热卖',
      dataIndex: 'isHot',
      key: 'isHot',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          {text ? '是' : '否'}
        </div>
      )
    },
    {
      title: '是否上架',
      dataIndex: 'isShow',
      key: 'isShow',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          {text ? '是' : '否'}
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="middle" className='font-s-12'>
          <Button type='primary' onClick={() => { edit(record) }}>
            编辑
          </Button>
          <Button onClick={() => { toView(record) }}>
            详情
          </Button>
          <Popconfirm
            placement="topRight"
            title='确定将此条通知删除吗？'
            onConfirm={() => { del(record._id) }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>
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

      {/* 商品详情 */}

      <Modal title={goods!.name} visible={isModalVisible} footer={false}
        width={600}
        onCancel={handleCancel}>
        <div className='flex'>
          <div className='mr-5'>商品介绍:</div>
          <div className='font-s-12'>{goods.introduction}</div>
        </div>
        <div className='flex'>
          <div className='mr-5'>商品原价:</div>
          <div>￥{goods.originalPrice}</div>
        </div>
        <div className='flex'>
          <div className='mr-5'>商品现价:</div>
          <div>￥{goods.presentPrice}</div>
        </div>
        <div className='flex m-tb-10 '>
          <div className='mr-5'>商品主图:</div>
          <div className='t-a-l'>
            <Image
              width={100}
              src={goods.cover}
            />
          </div>
        </div>
        <div className='flex m-tb-10 '>
          <div className='mr-5'>商品推荐:</div>
          <div className='t-a-l'>
            {goods.sellDesc && goods.sellDesc.map((item: string, index: number) => {
              return <div key={index}>
                {item}
              </div>
            })}
          </div>
        </div>
        <div className='flex m-tb-10 '>
          <div className='mr-5'>商品规格:</div>
          <div className='t-a-l'>
            {goods.spec && goods.spec.map((item: string, index: number) => {
              return <div key={index}>
                {item}
              </div>
            })}
          </div>
        </div>
      </Modal>

    </div >
  )
}

export default GoodTable


