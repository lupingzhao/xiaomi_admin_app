import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import Aside from '@/components/layout/Aside';
import Head from '@/components/layout/Head';
import { history } from 'umi';
const { Header, Sider, Content } = Layout;
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
interface Props {
  children: React.ReactNode
}

const Layouts = (props: Props) => {
  let [collapsed, setCollapsed] = useState<boolean>(false)
  let toggle = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    // 路由守卫
    if (!localStorage.getItem('token')) {
      history.push('/Login')
    }
  }, [])

  return (

    <Layout>
      {/* 侧边 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Aside></Aside>
      </Sider>

      <Layout className="site-layout">
        {/* 头部 */}
        <Header className="site-layout-background flex jcsb p-lr-10 "
          style={{ padding: '0 20px', background: '#fff', lineHeight: 0, height: 50 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <Head></Head>
        </Header>
        {/* 内容 */}
        <Content
          className="site-layout-background"
          style={{
            margin: '16px 16px',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>


  )
}

export default Layouts
