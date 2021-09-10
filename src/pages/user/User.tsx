import Amodel from '@/components/amodel/Amodel';
import SeachHead from '@/components/seachHead/SeachHead';
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Upload, Modal, Image, Pagination, Button } from 'antd'
import UserTable from '@/components/user/UserTable';

const User = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  {/* username, avatar, email, mobile, password, status */ }
  let [avatar, setAvatar] = useState('')
  let [username, setusername] = useState('')
  let [email, setemail] = useState('')
  let [mobile, setmobile] = useState('')
  let [password, setpassword] = useState('')
  let [id, setId] = useState('')
  let total = useSelector((state: any) => state.User.total)

  // form表单
  let [form] = Form.useForm()
  // 置空表单
  let delData = () => {
    setusername('')
    setAvatar('')
    setemail('')
    setpassword('')
    setmobile('')
  }
  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'User/User',
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
    delData()
  }
  // 图上传成功
  const normFile = (e: any) => {
    if (e.file.status === "done") {
      avatar = e.file.response.data
      setAvatar(avatar)
    }
  };
  // 是否显示
  let isshows = (id: string, show: boolean) => {
    dispatch({
      type: "User/show",
      payload: {
        show: { id: id, status: show },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
  }
  // 编辑
  let edit = (val: any) => {
    setIsVisible(true)
    setId(val._id)
    setusername(val.username)
    setAvatar(val.avatar)
    setemail(val.email)
    setmobile(val.mobile)
  }
  // 添加确定
  let submit = (val: any) => {
    // { id, username, avatar, email, mobile, status }
    val.avatar = avatar
    if (username) {
      dispatch({
        type: 'User/edit',
        payload: {
          edit: { ...val, id: id },
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    } else {
      // 添加
      dispatch({
        type: 'User/add',
        payload: {
          add: val,
          update: { current: page, pageSize: pageSize, query: '' }
        }
      })
    }
    setIsVisible(false)
    delData()
  }
  // 删除
  let del = (val: string) => {
    dispatch({
      type: 'User/del',
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
      type: 'User/User',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  useEffect(() => {
    dispatch({
      type: 'User/User',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <SeachHead onSearch={onSearch} btn={btn} text='添加用户'></SeachHead>
      <div className='m-tb-10'>
        {/* 表格 */}
        <UserTable show={isshows} edits={edit} del={del}></UserTable>
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
          hideOnSinglePage={true}
        />
      </div>
      {/* 添加 */}
      <Amodel show={isVisible} isShow={isShow} title='添加导航' submit={submit} isfooter={false}>
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          form={form}
          preserve={false}
          onFinish={submit}
        >
          <Form.Item
            label="图片地址"
            name="avatar"
            valuePropName="fileList"
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
                width={80}
                height={80}
                src={avatar}
              />}
            </div>
          </Form.Item>
          <Form.Item
            label="用户名称"
            name="username"
            initialValue={username}
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input />
          </Form.Item>
          {
            !username ? <Form.Item
              label="用户密码"
              name="password"
              rules={[{ required: true, message: '请输入用户名称' }]}
            >
              <Input />
            </Form.Item> : ''
          }
          <Form.Item
            label="用户电话"
            name="mobile"
            initialValue={mobile}
          >
            <Input type='number' maxLength={11} />
          </Form.Item>
          <Form.Item
            label="用户邮箱"
            name="email"
            initialValue={email}
          >
            <Input type='email' />
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

export default User
