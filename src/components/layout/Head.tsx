import React, { useState } from 'react'
import { history } from 'umi'
import { message, Popconfirm } from 'antd';
import { setLocale } from 'umi';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// 图片使用 先import 引入 在使用
import a from '../../static/icon/cart.png'
import { useEffect } from 'react';

const Head = () => {

  const [lang, setLang] = useState<string>('简体中文')
  // 用户信息
  let user = JSON.parse(localStorage.getItem('user')!)
  let goOut = () => {
    history.push('/Login')
    localStorage.clear()
    message.success('退出成功')
  }

  const onClick = (item: any) => {
    // 不刷新页面
    if (item.key === 'en-US') {
      setLang('English')
    } else if (item.key === 'zh-CN') {
      setLang('简体中文')
    } else {
      setLang('繁体中文')
    }
    setLocale(item.key, false);
  };


  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='zh-CN'>简体中文 </Menu.Item>
      <Menu.Item key='en-US'>英文</Menu.Item>
      <Menu.Item key='zh-TW'>繁体中文</Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user')!)) {
      history.push('/Login')
    }
  }, [])

  return (
    <div className='font-s-16 flex'>
      <div className='m-r-15 '>
        <iframe width="350" height="30"
          frameBorder="0" scrolling="no"
          src="https://i.tianqi.com/?c=code&id=40"></iframe>
      </div>
      {/* 图片使用 */}
      {/* <img src={a} alt="" /> */}
      <Popconfirm
        title="确定退出登陆?"
        onConfirm={goOut}
        okText="确定"
        cancelText="取消"
      >
        <div className='flex m-r-15 a-i-c shou'  >
          <div className='mr-5' >
            {
              user ?
                <img src={user.avatar} alt="" style={{ width: 30, height: 30, borderRadius: '100%' }} />
                :
                <i className='iconfont icon-a-touxiang' style={{ fontSize: 20 }}></i>
            }
          </div>

          {
            user ? <div>{user.username}</div> : null
          }


        </div>
      </Popconfirm>

      <div>

        <Dropdown overlay={menu}>
          <div className="bgc-low-gray p-10 b-radius-10" >
            {lang}
            <DownOutlined style={{ marginLeft: 10 }} /></div>

        </Dropdown>

      </div>
    </div>
  )
}

export default Head
