import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Upload, Modal, Image, Pagination } from 'antd'
import { message } from 'antd'
import NavTable from '@/components/navs/NavTable';


const Navigation = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)

  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  const [Preview, setPreview] = useState(false);
  const [isedit, setIsedit] = useState(false);
  let [urls, setUrl] = useState('')
  let [title, setTitle] = useState('')
  let [id, setId] = useState('')

  let total = useSelector((state: any) => state.Navigation.total)
  let text = '添加导航'
  // form表单
  let [form] = Form.useForm()

  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'Navigation/getNav',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  //添加按钮事件
  const btn = () => {
    setIsVisible(true)
    setTitle('')
    setUrl('')
    setId('')
  };
  // 关闭添加弹框
  let isShow = (e: boolean) => {
    setIsVisible(false)
    title = ''
    setTitle(title)
    setUrl('')
    setId('')
  }
  // 图片预览
  const onPreview = () => {
    setPreview(true)
    setIsVisible(false);
  }
  // 关闭预览
  const handleCancel1 = () => {
    setPreview(false);
    setIsVisible(true);
  };
  // 图上传成功
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      urls = e.file.response.data
      setUrl(urls)
    }
  };
  // 是否显示
  let isshows = (id: string, show: boolean) => {
    // showNav({ id, isShow }
    dispatch({
      type: "Navigation/isShow",
      payload: { id: id, isShow: show }
    })
  }
  // 编辑导航
  let edit = (val: any) => {
    title = val.title
    setTitle(title)
    setUrl(val.url)
    setId(val._id)
    setIsVisible(true)
  }
  // 添加确定
  let submit = () => {
    if (urls && form.getFieldsValue().title) {
      setIsVisible(false)
      // addNav({ title, url }
      // 添加
      if (!isedit) {
        dispatch({
          type: 'Navigation/getaddNav',
          payload: { title: form.getFieldsValue().title, url: urls }
        })
      } else {
        // 编辑 updateNav({ id, url, title } 
        dispatch({
          type: 'Navigation/edit',
          payload: { id: id, title: form.getFieldsValue().title, url: urls }
        })
        title = ''
        setTitle(title)
        setUrl('')
        setId('')
        setIsedit(false)
      }
    } else {
      message.warning('有必填项未输入')
    }
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'Navigation/del',
      payload: val
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Navigation/getNav',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  useEffect(() => {
    // 导航数据
    dispatch({
      type: 'Navigation/getNav',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text={text}></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <NavTable isShow={isshows} edit={edit} del={del}></NavTable>
      </div>
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
      <Amodel show={isVisible} isShow={isShow} title='添加导航' submit={submit}>
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          form={form}
          preserve={false}
        >
          <Form.Item
            label="图片地址"
            name="url"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <div className='m-b-10'>
              <Upload name="url"
                onPreview={onPreview}
                maxCount={1}
                onChange={normFile}
                headers={{ Authorization: localStorage.getItem('token')! }}
                action="http://localhost:7001/admin/upload"
                showUploadList={false}>
                <a>点击上传图片</a>
              </Upload>
            </div>
            <div className='m-b-10'>
              {urls && <Image
                width={80}
                height={80}
                src={urls}
              />}
            </div>
          </Form.Item>
          <Form.Item
            label="导航标题"
            name="title"
            initialValue={title}
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Amodel>

      {/*图片预览  */}
      <Modal title='图片预览' visible={Preview} onCancel={handleCancel1} footer={false}>
        <img src={urls} style={{ width: '100%', height: 300 }}></img>
      </Modal>
    </div>
  )
}

export default Navigation
