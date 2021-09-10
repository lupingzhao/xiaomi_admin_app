import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Pagination, Button } from 'antd'
import { message } from 'antd'
import NavTable from '@/components/navs/NavTable';
import NoticeTables from '@/components/notice/NoticeTables';


const Notice = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  const [Preview, setPreview] = useState(false);
  const [isedit, setIsedit] = useState(false);
  let [title, setTitle] = useState('')
  let [id, setId] = useState('')

  let total = useSelector((state: any) => state.Notice.total)
  let text = '添加导航'
  // form表单
  let [form] = Form.useForm()

  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'Notice/notice',
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
    setTitle('')
  }

  // 是否显示
  let isshows = (id: string, show: boolean) => {
    dispatch({
      type: 'Notice/isShowNotices',
      payload: {
        isShow: { id: id, isShow: show },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 编辑导航
  let edit = (val: any) => {
    title = val.content
    setTitle(title)
    setIsVisible(true)
    setId(val._id)
  }
  // 添加确定
  let submit = (val: any) => {
    // 编辑
    if (title) {
      dispatch({
        type: 'Notice/editNotice',
        payload: {
          edit: { id: id, content: val.title },
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    } else {
      dispatch({
        type: 'Notice/addNotice',
        payload:
        {
          add: { content: val.title },
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    }
    setTitle('')
    setIsVisible(false)
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'Notice/delNotices',
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
      type: 'Notice/notice',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  useEffect(() => {
    // 通知数据
    dispatch({
      type: 'Notice/notice',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text={text}></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <NoticeTables show={isshows} edits={edit} del={del}></NoticeTables>
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
        />
      </div>
      {/* 添加 */}

      <Amodel show={isVisible} isShow={isShow} title='添加通知' submit={submit} isfooter={false}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label="通知内容"
            name="title"
            initialValue={title}
            rules={[{ required: true, message: '请输入通知' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 17 }}>
            <Button className='mr-5' onClick={() => { setIsVisible(false) }}>
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

export default Notice

