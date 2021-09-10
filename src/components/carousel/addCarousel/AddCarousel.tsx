import { Upload, Form, Input, Modal, Button, message } from 'antd';
import { useSelector, useDispatch } from 'umi'
import { useEffect, useState } from 'react';

interface Props {
  addVisible: boolean,
  sendboo: (val: boolean) => void,
  submit: (val: any) => void
}
const AddCarousel = (props: Props) => {
  let userInfo = useSelector((state: any) => state.Login.userInfo)
  const [isVisible, setIsVisible] = useState(props.addVisible);
  const [Preview, setPreview] = useState(false);
  let [urls, setUrl] = useState('')
  let [link, setlink] = useState('')
  let [title, settitle] = useState('')

  useEffect(() => {
    setIsVisible(props.addVisible)
  }, [props.addVisible])

  // 弹框取消
  const handleCancel = () => {
    setIsVisible(false);
    props.sendboo(false)
    setUrl('')
    settitle('')
    setlink('')
  };
  const handleCancel1 = () => {
    setPreview(false);
    setIsVisible(true);
  };

  // 表单验证成功 提交
  const onFinish = (values: any) => {
    values.url = urls
    if (values.url) {
      props.submit(values)

    } else message.error('请上传图片')
  };
  // 图片上传
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      setUrl(e.file.response.data)
    }
  };
  // 图片预览
  const onPreview = () => {
    setPreview(true)
    setIsVisible(false);
  }

  return (
    <div className='p-10'>
      <Modal title="添加轮播图" destroyOnClose={true}
        visible={isVisible} footer={false} onCancel={handleCancel}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="图片地址"
            name="url"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="url"
              onPreview={onPreview}
              maxCount={1}
              headers={{ Authorization: localStorage.getItem('token')! }}
              action="http://localhost:7001/admin/upload" listType="picture">
              <a>点击上传图片</a>
            </Upload>
          </Form.Item>
          <Form.Item
            label="图片标题"
            name="title"
            initialValue={title}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="图片链接"
            name="link"
            initialValue={link}
          >
            <Input />
          </Form.Item>
          <Form.Item >
            <div className='t-a-r ' style={{ width: 450 }}>
              <Button className='m-r-15' onClick={handleCancel}>
                取消
              </Button>
              <Button type="primary" htmlType="submit"  >
                确认
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>


      {/*图片预览  */}
      <Modal title='图片预览' visible={Preview} onCancel={handleCancel1} footer={false}>
        <img src={urls} style={{ width: '100%', height: 300 }}></img>
      </Modal>

    </div>
  )
}

export default AddCarousel
