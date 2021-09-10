import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button, DatePicker, InputNumber, Select } from 'antd'
import { message } from 'antd'
import ModelTable from '@/components/goodsModel/ModelTable';
const { Option } = Select;


const GoodsModel = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  let [name, setName] = useState('')
  let [id, setId] = useState('')
  let total = useSelector((state: any) => state.GoodsModel.total)

  // form表单
  let [form] = Form.useForm()
  // 置空表单数据
  let deldata = () => {
    setName('')
  }
  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'GoodsModel/GoodsModel',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
    deldata()
  }

  // 编辑导航
  let edit = (val: any) => {
    name = val.name
    setName(name)
    setIsVisible(true)
    setId(val._id)
  }
  // 添加确定
  let submit = (val: any) => {
    if (name) {
      dispatch({
        type: 'GoodsModel/edit',
        payload:
        {
          edit: { ...val, id: id },
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    } else {
      dispatch({
        type: 'GoodsModel/add',
        payload:
        {
          add: val,
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    }

    deldata()
    setIsVisible(false)
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'GoodsModel/del',
      payload: {
        del: val,
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'GoodsModel/GoodsModel',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }

  useEffect(() => {
    // 通知数据
    dispatch({
      type: 'GoodsModel/GoodsModel',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text='添加模型'></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <ModelTable edits={edit} del={del}></ModelTable>
      </div>
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
        />
      </div>
      {/* 添加 */}

      <Amodel show={isVisible} isShow={isShow} title='添加模型' submit={submit} isfooter={false}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label="模型名称"
            name="name"
            initialValue={name}
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input></Input>
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

export default GoodsModel



