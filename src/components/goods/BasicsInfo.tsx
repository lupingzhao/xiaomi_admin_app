import { Form, Input, Button, Checkbox, Select, Switch, Upload, Image, Cascader } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'umi';
const { Option, OptGroup } = Select;

interface Props {
  base: (e: number) => void
  cancel: (val: number) => void
}

const BasicsInfo = (props: Props) => {

  let cate = useSelector((state: any) => state.Category.Categorys)
  const [form] = Form.useForm();
  let [avatar, setAvatar] = useState('')
  let [editdata, setEditdata] = useState<any>(JSON.parse(localStorage.getItem('editGoods')!))



  // 表单验证通过
  const onFinish = (values: any) => {
    // console.log(values);
    values.category = values.category[1]
    localStorage.setItem('basinfo', JSON.stringify(values))
    props.base(2)
  };
  // 图上传成功
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      form.setFieldsValue({ cover: e.file.response.data })
      avatar = e.file.response.data
      setAvatar(avatar)
    }
  }
  // 取消
  let cancel = () => {
    props.cancel(1)
  };

  // 是否是编辑
  useEffect(() => {
    if (localStorage.getItem('editGoods')) {
      let ed = JSON.parse(localStorage.getItem('editGoods')!)
      cate.map((i: any) => {
        i.children.map((e: any) => {
          if (e.key === ed.category) {
            ed.category = [i.key, ed.category]
          }
        })
      })
      form.setFieldsValue({ ...ed })
      setAvatar(editdata.cover)
    }
  }, [])

  const normFiles = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Form
        form={form}
        style={{ width: '100%' }}
        name="basic1"
        labelCol={{ span: 3 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[{ required: true, message: '请输入商品名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="商品分类"
          name="category"
          rules={[{ required: true, message: '请选择商品分类' }]}
        >
          <Cascader
            fieldNames={{ label: 'title', value: 'key', children: 'children' }}
            options={cate && cate}
            placeholder="请选择商品分类"
          />

        </Form.Item>
        <Form.Item
          label="商品原价"
          name="originalPrice"
          rules={[{ required: true, message: '请输入商品原价' }]}
        >
          <Input type='number' min={0} />
        </Form.Item>
        <Form.Item
          label="商品现价"
          name="presentPrice"
          rules={[{ required: true, message: '请输入商品现价' }]}
        >
          <Input type='number' min={0}></Input>
        </Form.Item>

        <Form.Item
          name="cover"
          label="封面图"
          valuePropName="fileList"
          getValueFromEvent={normFiles}
          rules={[{ required: true, message: '请上商品封面图' }]}
        >
          <>
            <div className='m-b-10'>
              <Upload
                maxCount={1}
                onChange={normFile}
                headers={{ Authorization: localStorage.getItem('token')! }}
                action="http://localhost:7001/admin/upload"
                showUploadList={false}>
                <a>点击上传图片</a>
              </Upload>
            </div>
            <div className='m-b-10'>
              {avatar && <Image
                width={80}
                height={80}
                src={avatar}
              />}
            </div>
          </>
        </Form.Item>

        <Form.Item
          label="商品单位"
          name="company"
          rules={[{ required: true, message: '请输入商品单位' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商品库存"
          name="stock"
          rules={[{ required: true, message: '请输入商品库存' }]}
        >
          <Input type='number' min={0} />
        </Form.Item>
        <Form.Item
          label="商品简介"
          name="introduction"
          rules={[{ required: true, message: '请输入商品简介' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="推荐介绍"
          name="sellDesc"
          rules={[{ required: true, message: '请输入商品推荐介绍' }]}
        >
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>
        <Form.Item
          label="是否新品"
          name="isNewGood"
          valuePropName='checked'
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item
          label="是否热销"
          name="isHot"
          valuePropName='checked'
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item
          label="是否推荐"
          name="isRecommend"
          valuePropName='checked'
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button style={{ marginRight: 20 }} onClick={cancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BasicsInfo
