import React, { useState, useEffect } from 'react'
import { Select, Button, Form, Input, Pagination, Radio, } from 'antd'
const { Option, OptGroup } = Select;
import { SearchOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { history, Location, useSelector } from 'umi';
import Amodel from '@/components/amodel/Amodel';
import SpecTable from '@/components/spec/SpecTable';


const { TextArea } = Input;
const ProductSpecifications = () => {

  let dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  let modelData = useSelector((state: any) => state.GoodsModel.GoodsModels)
  let [id, setId] = useState<any>(history.action !== 'POP' && history.location.query!.id ? history.location.query!.id : "")
  let [disabled, setDisabled] = useState<boolean>(true)
  const [form] = Form.useForm();
  let [page, setPage] = useState(1)
  let [name, setName] = useState(history.action !== 'POP' && history.location.query!.name ? history.location.query!.name : "")
  let [pageSize, setPageSize] = useState(5)
  let total = useSelector((state: any) => state.Seckill.total)

  // 选择模型
  let onSelect = (e: any, item: any) => {
    form.setFieldsValue({ model: e })
    setId(e)
    setName(item.children)
  }
  // 弹框选择模型
  let onSelect1 = (e: any, item: any) => {
    setName(item.children)
    form.setFieldsValue({ parentId: e })
  }
  // 重置
  const onReset = () => {
    form.resetFields();
    setId("")
    dispatch({
      type: 'Spec/reset'
    })
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
  }
  // 添加
  let add = () => {
    setIsVisible(true)
    form.setFieldsValue({ model: id })
  }
  // 添加确定
  let submit = (val: any) => {
    val.model = name
    dispatch({
      type: 'Spec/add',
      payload: {
        add: val,
        update: { parentId: val.parentId }
      }
    })
    setId(val.parentId)
    setIsVisible(false)
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'Spec/del',
      payload: {
        del: { parentId: id, attrId: val },
        update: { parentId: id }
      }
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Coupon/Coupon',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  useEffect(() => {
    // pop是代表刷新页面
    if (history.location.query!.id && history.action !== 'POP') {
      form.setFieldsValue({ parentId: history.location.query!.id })
      setDisabled(false)

      form.setFieldsValue({ model: history.location.query!.id })
      dispatch({
        type: 'Spec/Spec',
        payload: { parentId: history.location.query!.id }
      })
    } else {
      dispatch({
        type: 'Spec/Spec',
        payload: { parentId: null }
      })
    }
    dispatch({
      type: 'GoodsModel/GoodsModel',
      payload: { current: 1, pageSize: 10000, query: '' }
    })
  }, [])
  // 监听选择器的值
  useEffect(() => {
    if (id && id !== "选择所属模型") {
      setDisabled(false)
      dispatch({
        type: 'Spec/Spec',
        payload: { parentId: id }
      })
    } else setDisabled(true)
  }, [id])


  return (
    <div className='bgc-white p-10'>
      <div className='flex a-i-fs'>
        <Form form={form} name="control-hooks" style={{ display: 'flex' }}>
          <Form.Item name="parentId" label="所属模型"
            rules={[{ required: true, message: '必须选择模型' }]}>
            <Select
              showSearch
              style={{ width: 250 }}
              placeholder="选择所属模型"
              optionFilterProp="children"
              onChange={onSelect}
            >
              {
                modelData.map((item: any, index: number) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button icon={<RedoOutlined />} htmlType='reset' onClick={onReset} className='m-l-15'>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='m-tb-10'>
        <Button type='primary' icon={<PlusOutlined />} disabled={disabled}
          onClick={() => { add() }}>
          添加规格
        </Button>
      </div>
      <SpecTable del={del}></SpecTable>
      {/* 分页 */}
      <div className='t-a-r'>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          onChange={onChange}
          defaultPageSize={5}
          current={page}
          pageSizeOptions={['5', '20', '50', '100']}
          hideOnSinglePage={true}
        />
      </div>

      {/* 添加 */}
      <Amodel show={isVisible} isShow={isShow} title='添加秒杀' submit={submit} isfooter={false}>
        {/* name, model, spec_item, mode, parentId  */}
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label='规格名称'
            name="name"
            rules={[{ required: true, message: '请输入规格名称' }]}
          >
            <Input placeholder='请输入规格名称'></Input>
          </Form.Item>
          <Form.Item name="model" label="所属模型"
            rules={[{ required: true, message: '必需选择模型' }]}>
            <Select
              showSearch
              className='width-100'
              placeholder="选择所属模型"
              optionFilterProp="children"
              onChange={onSelect1}
            >
              {
                modelData.map((item: any, index: number) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="规格项"
            name="spec_item"
            rules={[{ required: true, message: '请输入规格项' }]}
          >
            <TextArea placeholder="请输入规格项，一行一个" allowClear />
          </Form.Item>
          <Form.Item
            label="展示方式"
            name="mode"
            rules={[{ required: true, message: '请选择展示方式' }]}
          >
            <Radio.Group>
              <Radio value="文字">文字</Radio>
              <Radio value="图片">图片</Radio>
              <Radio value="颜色">颜色</Radio>
            </Radio.Group>
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

export default ProductSpecifications
