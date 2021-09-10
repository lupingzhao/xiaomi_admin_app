import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button } from 'antd'
import RecoTable from '@/components/recommend/RecoTable';
import { Select } from 'antd';


const RecommendNav = () => {
  const { Option } = Select;
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);

  let [id, setId] = useState('')
  let [querry, setquerry] = useState('')
  let [isedit, setIsedit] = useState(false)
  let [goodslist, setGoodsLists] = useState<any>([])
  let [checklist, setchecklist] = useState<any>([])
  let total = useSelector((state: any) => state.RecommendNav.total)
  let goods = useSelector((state: any) => state.Goods.Goodss)
  // 选择
  function handleChange(value: any, item: any) {
    goodslist = []
    value && value.map((item: string) => {
      goods && goods.map((i: any) => {
        i._id === item ? goodslist.push(i) : ''
      })
    })
    setGoodsLists(goodslist)
    // form.setFieldsValue({ goods: goodslist })
    // goodslist = goods.filter((item: any) =>)
  }
  // form表单
  let [form] = Form.useForm()

  // 搜索事件
  const onSearch = (value: string) => {
    setquerry(value)
    dispatch({
      type: 'RecommendNav/RecommendNav',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
    setIsedit(false)
    form.resetFields();
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
  }

  // 是否显示
  let isshows = (id: string, show: boolean) => {
    dispatch({
      type: "RecommendNav/show",
      payload: {
        show: { id: id, isShow: show },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 编辑
  let edit = (val: any) => {
    setIsVisible(true)
    setIsedit(true)
    setId(val._id)
    setGoodsLists(val.goods)
    checklist = []
    val.goods && val.goods.map((i: any) => {
      checklist.push(i!._id)
    })
    form.setFieldsValue({ ...val, goods: checklist })
  }
  // 添加确定
  let submit = (val: any) => {
    // form.setFieldsValue({ goods: goodslist })
    val.goods = goodslist
    if (isedit) {
      dispatch({
        type: 'RecommendNav/edit',
        payload: {
          edit: { ...val, id: id },
          update: { current: page, pageSize: pageSize, query: querry }
        }
      })
    } else {
      // 添加
      dispatch({
        type: 'RecommendNav/add',
        payload: {
          add: { ...val },
          update: { current: page, pageSize: pageSize, query: querry }
        }
      })
    }
    setIsVisible(false)

  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'RecommendNav/del',
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
      type: 'RecommendNav/RecommendNav',
      payload: { current: pages, pageSize: pageSizes, query: querry }
    })
  }
  useEffect(() => {
    dispatch({
      type: 'RecommendNav/RecommendNav',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
    dispatch({
      type: 'Goods/Goods',
      payload: { current: 1, pageSize: 1000, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text='添加推荐导航'></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <RecoTable show={isshows} edits={edit} del={del}></RecoTable>
      </div>
      {/* 分页 */}
      <div className='t-a-r m-tb-10'>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          onChange={onChange}
          defaultPageSize={5}
          current={page}
          pageSizeOptions={['5', '10', '20', '100']}
          hideOnSinglePage={true}
        />
      </div>
      {/* 添加 */}
      <Amodel show={isVisible} isShow={isShow} title='添加推荐导航' submit={submit} isfooter={false}>
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label="导航名称"
            name="name"
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input placeholder='请输入导航名称' />
          </Form.Item>
          <Form.Item
            label="导航描述"
            name="desc"
            rules={[{ required: true, message: '请输入导航描述' }]}
          >
            <Input placeholder='请输入导航描述' />
          </Form.Item>
          <Form.Item
            label="下属商品"
            name="goods"
            initialValue={checklist}
            rules={[{ required: true, message: '请选择下属商品' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择下属商品"
              onChange={handleChange}
              allowClear
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


    </div>
  )
}

export default RecommendNav
