import { Upload, Form, Input, Modal, Button, message } from 'antd';
import { useSelector, useDispatch } from 'umi'
import { useEffect, useState } from 'react';

interface Props {
  addVisible: boolean,
  iseditshow: (val: boolean) => void
  submit: (val: any) => void
  data: any
}
const EditCarousel = (props: Props) => {
  const [isVisible, setIsVisible] = useState(props.addVisible);
  const [Preview, setPreview] = useState(false);
  const [remove, setRemove] = useState(false);
  let [urls, setUrl] = useState(props.data.url)

  const fileList = [
    {
      uid: props.data._id,
      name: props.data.title,
      status: 'done',
      url: props.data.url,
      thumbUrl: props.data.url,
    }
  ];
  useEffect(() => {
    setIsVisible(props.addVisible)
  }, [props.addVisible])

  // 弹框取消
  const handleCancel = () => {
    setIsVisible(false);
    props.iseditshow(false)
  };
  // 预览
  const handleCancel1 = () => {
    setPreview(false);
    setIsVisible(true);
  };

  // 表单验证成功 提交
  const onFinish = (values: any) => {
    if (remove) {
      values.url = urls
    } else {
      values.url = props.data.url
    }
    values.url ? props.submit(values) : message.error('请上传图片')
  };
  // 图片上传
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      setUrl(e.file.response.data)
    }
  };
  // 移除
  const onRemove = (e: any) => {
    setRemove(true)
  }
  // 图片预览
  const onPreview = () => {
    !urls ? setUrl(props.data.url) : ''
    setPreview(true)
    setIsVisible(false);
  }
  return (
    <div>
      <Modal title="编辑轮播图" visible={isVisible} footer={false} onCancel={handleCancel}>
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
              onRemove={onRemove}
              maxCount={1}
              defaultFileList={[...fileList as any]}
              headers={{ Authorization: localStorage.getItem('token')! }}
              action="http://localhost:7001/admin/upload" listType="picture">
              <a>点击上传图片</a>
            </Upload>
          </Form.Item>
          <Form.Item
            label="图片标题"
            name="title"
            initialValue={props.data.title}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="图片链接"
            name="link"
            initialValue={props.data.link}
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
export default EditCarousel
