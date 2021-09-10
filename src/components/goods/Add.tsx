import React from 'react'
import { Tabs, Form, Button } from 'antd';
import BasicsInfo from './BasicsInfo';
import MediaInfo from './MediaInfo';
import Specificat from './Specificat';
import DetailsInfo from './DetailsInfo';
import { useState } from 'react';
const { TabPane } = Tabs;

const Add = () => {
  let [boo, setBoo] = useState<number>(1)
  let [activeKey, setActiveKey] = useState<string>('1')

  // 标签切换
  let onChange = (e: any) => {
    setActiveKey(e)
  }
  // 信息验证通过
  let base = (e: number) => {
    setBoo(e)
    setActiveKey(String(e))
  }
  // 取消
  let cancel = (e: number) => {
    setBoo(e)
    setActiveKey(String(e))
  }
  return (
    <div className='p-10' >
      <Tabs activeKey={activeKey} onChange={onChange}>
        <TabPane tab="基础信息" key="1">
          <BasicsInfo base={base} cancel={cancel}></BasicsInfo>

        </TabPane>
        <TabPane tab="媒体信息" disabled={boo >= 1 ? false : true} key="2">
          <MediaInfo base={base} cancel={cancel}></MediaInfo>
        </TabPane>
        <TabPane tab="商品规格" disabled={boo >= 1 ? false : true} key="3">
          {/* <Specificat base={base} cancel={cancel}></Specificat> */}
        </TabPane>
        <TabPane tab="商品详情" disabled={boo >= 1 ? false : true} key="4">
          {/* <DetailsInfo></DetailsInfo> */}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Add
