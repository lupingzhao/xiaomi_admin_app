import React, { useRef } from 'react'
import { Card, Input, Form, Button } from 'antd'
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi'
const Login = () => {
  let userInfo = useSelector((state: any) => state.Login.userInfo)
  let dispatch = useDispatch()

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  // 表单验证成功后触发
  const onFinish = (values: any) => {
    // username, password
    // Login与命名空间一致 namespace
    dispatch({
      type: 'Login/getLogin',
      payload: values
    })
  };

  return (
    <div className='flex jcc height-100 bgc-low-gray'>
      <div className='t-a-c'>
        <Card style={{ width: 600 }}>
          <div className='font-s-18 font-w-7 m-tb-25 '>
            小米Lite
          </div>
          <div className='m-tb-25 font-s-14 '>
            欢迎来到小米Lite后台管理系统
          </div>
          <Form {...layout} name="control-ref" onFinish={onFinish}>
            <Form.Item name="username"
              rules={[{
                required: true, message: '用户名不能为空'
              }]}
            >
              <Input
                size="large"
                style={{ width: '530px', padding: 10, }}
                placeholder="请输入用户名"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              { required: true, message: '密码不能为空' },
              { min: 3, max: 8, message: '密码长度在3到8个字符之间' }
            ]}>
              <Input.Password size="large"
                style={{ width: '530px', padding: 10, }}
                prefix={<UnlockOutlined />}
                placeholder="请输入密码" />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" block style={{ width: 530, height: 40 }}>
                登陆
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div >
  )
}

export default Login
