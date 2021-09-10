import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, Switch, Upload, Image, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  base: (e: number) => void
  cancel: (val: number) => void
}
const MediaInfo = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  let [avatar, setAvatar] = useState('')
  let [boo, setBoo] = useState(true)
  let [editpic, setEditpic] = useState<any>(JSON.parse(localStorage.getItem('editGoods')!) ?
    JSON.parse(localStorage.getItem('editGoods')!).pic : [])

  // 表单验证通过
  const onFinish = (values: any) => {
    let list = [] as any
    if (localStorage.getItem('editGoods') && boo) {
      form.setFieldsValue({ pic: editpic })
      list = editpic
    } else {
      values.pic.map((item: any) => {
        list.push(item.response.data)
      })
      list = [...editpic, ...list]
    }
    localStorage.setItem('pic', JSON.stringify({ pic: list }))
    props.base(3)
  };
  // 图上传成功
  const normFile = (e: any) => {
    if (e.file.status === "done" || "removed") {
      setBoo(false)
      form.setFieldsValue({ pic: e.fileList })
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  let onPreview = (e: any) => {
    if (e.url) {
      setAvatar(e.url)
    } else {
      setAvatar(e.response.data)
    }
    setIsModalVisible(true)
  }
  // 取消事件
  let cancel = () => {
    props.cancel(1)
  }
  // 关闭预览
  const onCancel = () => {
    setIsModalVisible(false);
  };
  // 删除已上传的图片
  let delimg = (e: number) => {
    editpic = editpic.filter((i: any, index: number) => {
      return index !== e
    })
    setEditpic(editpic)
  }



  // 是否是编辑
  useEffect(() => {
    if (localStorage.getItem('editGoods')) {
      form.setFieldsValue({ pic: JSON.parse(localStorage.getItem('editGoods')!).pic })
    }
  }, [])


  return (
    <div>
      <Form
        form={form}
        style={{ width: '100%' }}
        name="basic2"
        labelCol={{ span: 2 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品图片"
          name="pic"
          rules={[{ required: true, message: '请上传商品封面图' }]}
        >
          <div className='m-b-10 flex' >
            <div className='flex a-i-fs'>
              {
                editpic && editpic.map(
                  (item: any, index: number) => {
                    return <div key={index} className=' m-r-15 '>
                      <Image
                        key={item}
                        width={102}
                        style={{ height: 102 }}
                        className='mr-5'
                        src={item}
                      />
                      <div className='t-a-c font-c-red shou' onClick={() => { delimg(index) }}>删除</div>
                    </div>
                  })
              }
            </div>
            <Upload name="pic"
              // fileList={editdata}
              multiple={true}
              maxCount={10}
              onChange={normFile}
              headers={{ Authorization: localStorage.getItem('token')! }}
              action="http://localhost:7001/admin/upload"
              showUploadList={true}
              listType='picture-card'
              onPreview={onPreview}
            >
              <div>
                <PlusOutlined style={{ fontSize: 20, color: 'gray' }} />
                <div>
                  <a>点击上传图片</a>
                </div>
              </div>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
          <Button style={{ marginRight: 10 }} onClick={cancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>

      <Modal title='图片预览' visible={isModalVisible}
        footer={false} onCancel={onCancel}>
        <div className='flex jcc'>
          <img src={avatar} alt="" style={{ width: 250, height: 250 }} className='t-a-c' />
        </div>
      </Modal>


    </div>
  )
}

export default MediaInfo
