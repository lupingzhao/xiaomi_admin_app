import { useSelector } from 'umi';
import { Table, Space, Switch, Button, Modal, Popconfirm } from 'antd';

interface Props {
  isShow: (id: string, show: boolean) => void
  edit: (val: any) => void
  del: (val: string) => void
}
const NavTable = (props: Props) => {
  // 数据
  let data = useSelector((state: any) => state.Navigation.navs)


  // 编辑
  let edit = (val: any) => {
    props.edit(val)
  }
  // 删除
  let del = (val: any) => {
    props.del(val)
  }
  // 显示开关
  let onChange = (id: string, show: boolean) => {
    props.isShow(id, show)
  }

  let columns = [
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (text: any) => <img src={text} style={{ width: 50, height: 50 }}></img>,
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: '40%',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '是否显示',
      width: 100,
      key: 'isShow',
      align: 'center',
      render: (text: any, record: any) => (
        <Switch defaultChecked={record.isShow} onChange={(e: boolean) => { onChange(record._id, e) }} />
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
            title='确定将此导航栏删除？'
            okText='确定'
            onConfirm={() => { del(record._id) }}
            cancelText="取消"
          >
            <Button type="primary" danger size='small'>删除</Button>
          </Popconfirm>
        </Space >
      ),
    },
  ]

  return (
    <div>
      <Table rowKey='_id'
        bordered={true}
        columns={columns as any} dataSource={data}
        pagination={false}
      />
    </div>
  )
}

export default NavTable
