import { Table, Space, Switch, Button, Modal, Image } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import EditCarousel from '../EditCarousel';
interface Props {
  show: (val1: string, val2: boolean) => void
  edits: (val: any, val1: string) => void
  del: (val1: string) => void
}
const CarouselTable = (props: Props) => {
  let lists = useSelector((state: any) => state.Carousel.list)
  let index = 1
  const [isedit, setEdit] = useState(false);

  let [datas, setData] = useState<any>('')
  // 显示开关
  let onChange = (e1: boolean, e: string,) => {
    props.show(e, e1)
  }
  // 关闭弹窗时修改控制弹窗的值
  const iseditshow = (e: boolean) => {
    setEdit(e)
  }
  // 编辑
  let edit = (val: any) => {
    setEdit(true)
    setData(val)
  }
  // 删除
  let del = (val: any) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该轮播图吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        props.del(val)
      },
    });
  }
  // 表格每行代码
  const columns = [
    {
      title: '#',
      render: (text: any, record: any, index: number) => { return index + 1 },
      align: 'center',
      width: 40,
    },
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (text: any) =>
        <Image
          width={130}
          src={text}
        />
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 80,
      ellipsis: true

    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      align: 'center',
      width: 250,
      ellipsis: true
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      key: 'isShow',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => (
        <Switch defaultChecked={text} onChange={(e: boolean) => { onChange(e, record._id,) }} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 150,
      render: (text: any, record: any) => (
        <Space size="middle" className='font-s-12'>
          <Button type="primary" size='small'
            onClick={() => { edit(record) }}>编辑</Button>
          <Button type="primary" danger size='small'
            onClick={() => { del(record._id) }}>删除</Button>
        </Space>
      ),
    },
  ]

  // 输入框的后缀图标
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  // 编辑轮播图成功
  const submit = (e: any) => {
    setEdit(false)
    props.edits(e, datas._id)
  }
  return (
    <div>
      <Table rowKey='_id'
        bordered={true}
        columns={columns as any} dataSource={lists}
        pagination={false}
      />
      {/* 编辑弹框 */}
      <EditCarousel addVisible={isedit} submit={submit} data={datas} iseditshow={iseditshow}></EditCarousel>

    </div>
  )
}

export default CarouselTable
