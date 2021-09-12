import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button, DatePicker, InputNumber, Select, Upload, Image } from 'antd'
const { Option } = Select;
import dayjs from 'dayjs';
import ParaTable from '@/components/parameter/ParaTable';



const ProductParameter = () => {
  let dispatch = useDispatch()
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [isadd, setIsAdd] = useState(false);
  let [number, setNumber] = useState('')
  let [id, setId] = useState('')
  let goods = useSelector((state: any) => state.Params.goods)
  let [avatar, setAvatar] = useState('')
  // form表单
  let [form] = Form.useForm()
  // 选择模型
  let onSelect = (e: any) => {
    setId(e)
    setIsDisabled(false)
    dispatch({
      type: 'Params/Params',
      payload: { parentId: e }
    })
    // console.log(e)
  }
  // 重置
  const onReset = () => {
    form.resetFields();
  };

  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
    setIsAdd(false)
    setAvatar('')
    onReset()
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
  }

  // 编辑导航
  let edit = (val: any) => {
    setIsAdd(true)
    setIsVisible(true)
    setAvatar(val.url)
    form.setFieldsValue({ ...val })
  }
  // 添加确定
  let submit = (val: any) => {
    if (isadd) {
      dispatch({
        type: 'Params/edit',
        payload: {
          edit: { ...val },
          update: { parentId: id }
        }
      })
    } else {
      dispatch({
        type: 'Params/add',
        payload: {
          add: val,
          update: { parentId: id }
        }
      })
    }
    setIsVisible(false)
  }

  // 图上传成功
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      avatar = e.file.response.data
      setAvatar(avatar)
      form.setFieldsValue({ url: e.file.response.data })
    }
  };
  useEffect(() => {
    // 通知数据
    dispatch({
      type: 'Params/goods',
      payload: { current: 1, pageSize: 1000, query: '' }
    })

  }, [])

  return (
    <div className='bgc-white p-10'>
      <div className='flex a-i-fs'>
        <Form form={form} name="control-hooks" onReset={onReset} style={{ display: 'flex' }}>
          <Form.Item name="parentId" label="所属商品"
            initialValue={id}
            rules={[{ required: true, message: '必须选择所属商品' }]}>
            <Select
              showSearch
              style={{ width: 250 }}
              placeholder="选择所属商品"
              optionFilterProp="children"
              onChange={onSelect}
            >
              {
                goods && goods.map((item: any, index: number) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Form>
        <Button style={{ marginLeft: 10 }} type='primary'
          disabled={disabled} onClick={btn}>添加参数</Button>
      </div>
      <div className='m-tb-10'>
        {/* 表格 */}
        <ParaTable edits={edit} ></ParaTable>
      </div>


      <Amodel show={isVisible} isShow={isShow}
        title='添加参数' submit={submit} isfooter={false}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          form={form}
          preserve={false}
          onFinish={submit}
          onReset={onReset}
        >
          <Form.Item
            label="图片地址"
            name="url"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <div className='m-b-10'>
              <Upload name="url"
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
                width={50}
                height={50}
                src={avatar}
              />}
            </div>
          </Form.Item>
          <Form.Item
            label="参数名称"
            name="name"
            initialValue={number}
            rules={[{ required: true, message: '请输入参数名称' }]}
          >
            <Input placeholder='请输入参数名称' />
          </Form.Item>
          <Form.Item
            label="参数描述"
            name="desc"
            initialValue={number}
            rules={[{ required: true, message: '请输入参数描述' }]}
          >
            <Input placeholder='请输入参数描述' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 17 }}>
            <Button className='mr-5' onClick={() => { isShow(true) }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" >
              确定
            </Button>
          </Form.Item>
        </Form>
      </Amodel>

    </div >
  )
}

export default ProductParameter



