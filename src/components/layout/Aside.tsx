import React, { useState } from 'react'
import { Menu, Button } from 'antd';
import { iconsNav } from '@/types/index'
import { history, setLocale, useIntl } from 'umi';
import { useEffect } from 'react';

// 使用iconfont
// const MyIcon = createFromIconfontCN({
//  scriptUrl: '//at.alicdn.com/t/font_2763713_kqnjfxy3au.js', // 在 iconfont.cn 上生成
// }); <MyIcon type={navs[1].icon} />

const { SubMenu } = Menu;

const Aside = () => {
  const intl = useIntl()
  let selectedKeys = (e: any) => {
    history.push(e.key)
  }

  return (
    <>
      <Menu theme="dark" mode="inline" selectedKeys={[history.location.pathname]} onSelect={selectedKeys}>
        {
          iconsNav.map((item: any, index: number) => {
            return (
              item.child.length ?
                <SubMenu key="sub1" icon={<item.icon />} title={intl.formatMessage({ id: item.t })}>
                  {
                    item.child.map((item1: any, index1: number) => {
                      return (
                        <Menu.Item key={item1.path} icon={<item1.icon />}>
                          {intl.formatMessage({ id: item1.t })}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
                :
                <Menu.Item key={item.path} icon={<item.icon />}>
                  {intl.formatMessage({ id: item.t })}
                </Menu.Item>
            )
          })
        }
      </Menu>
    </>

  )
}

export default Aside
