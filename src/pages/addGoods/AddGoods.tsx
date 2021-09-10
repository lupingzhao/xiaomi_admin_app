import SeachHead from '@/components/seachHead/SeachHead'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'umi';
import { useEffect } from 'react';
import { Pagination } from 'antd'
import GoodTable from '@/components/goods/GoodTable'
// import Add from '@/components/goods/Add';
import { Tabs, Form, Button } from 'antd';
import BasicsInfo from '@/components/goods/BasicsInfo';
import MediaInfo from '@/components/goods/MediaInfo';
import Specificat from '@/components/goods/Specificat';
import DetailsInfo from '@/components/goods/DetailsInfo';
const { TabPane } = Tabs;


const AddGoods = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  let [query, setQuery] = useState('')
  let [addboo, setAddboo] = useState(true)
  let total = useSelector((state: any) => state.Goods.total)
  // 搜索事件
  const onSearch = (value: string) => {
    dispatch({
      type: 'Goods/Goods',
      payload: { current: page, pageSize: pageSize, query: value }
    })
  };
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Goods/Goods',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  //添加按钮事件
  const btn = () => {
    setAddboo(false)
    localStorage.removeItem('editGoods')
    setBoo(1)
    setActiveKey('1')
  };

  // 编辑
  let edit = (val: any) => {
    localStorage.setItem('editGoods', JSON.stringify(val))
    setAddboo(false)
    setBoo(5)
    setActiveKey('1')
  }


  let [boo, setBoo] = useState<number>(1)
  let [activeKey, setActiveKey] = useState<string>('1')

  // 标签切换
  let onChanges = (e: any) => {
    setActiveKey(e)
  }
  // 信息验证通过
  let base = (e: number) => {
    setBoo(e)
    setActiveKey(String(e))
    if (e === 3) {
      dispatch({
        type: 'GoodsModel/GoodsModel',
        payload: { current: page, pageSize: pageSize, query: '' }
      })
    }
  }
  // 取消
  let cancel = (e: number) => {
    if (e === 1) {
      setAddboo(true)
    }
    setBoo(e)
    activeKey = String(e)
    setActiveKey(activeKey)
  }
  // 添加商品
  let add = () => {
    let data1 = JSON.parse(localStorage.getItem('basinfo')!)
    let data2 = JSON.parse(localStorage.getItem('pic')!)
    let data3 = JSON.parse(localStorage.getItem('spec')!)
    let data4 = JSON.parse(localStorage.getItem('productionDesc')!)
    // console.log({ 'spec': data3 });
    dispatch({
      type: 'Goods/add',
      payload: {
        add: {
          ...data1, ...data2, spec: data3, video: '',
          ...data4, comment: [], isShow: true, discount: "",
        },
        update: { current: page, pageSize: pageSize, query: '' }
      }
    })
    setAddboo(true)
  }

  useEffect(() => {
    // 获取商品
    dispatch({
      type: 'Goods/Goods',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
    // 获取分类
    dispatch({
      type: 'Category/Category',
      payload: {
        res: '',
        isadd: true
      }
    })


  }, [])



  return (
    <div className="bgc-white p-10">
      {
        addboo ?
          <div>
            {/* 正常页面 */}
            <SeachHead onSearch={onSearch} btn={btn} text='添加商品'></SeachHead>
            <GoodTable edits={edit} ></GoodTable>
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
                pageSizeOptions={['5', '20', '50', '100']}
              />
            </div>
          </div>
          :
          <div>
            {/* 添加页面 */}
            <div className='flex jcsb font-s-16'>
              <div>添加商品</div>
              <div onClick={() => { setAddboo(true) }} className="shou p-10" >X</div>
            </div>
            {/* 步骤 */}
            {/* <Add ></Add> */}
            <Tabs activeKey={activeKey} onChange={onChanges}>
              <TabPane tab="基础信息" key="1">
                <BasicsInfo base={base} cancel={cancel}></BasicsInfo>
              </TabPane>
              <TabPane tab="媒体信息" disabled={boo >= 2 ? false : true} key="2">
                <MediaInfo base={base} cancel={cancel}></MediaInfo>
              </TabPane>
              <TabPane tab="商品规格" disabled={boo >= 3 ? false : true} key="3">
                <Specificat base={base} cancel={cancel} ></Specificat>
              </TabPane>
              <TabPane tab="商品详情" disabled={boo >= 4 ? false : true} key="4">
                <DetailsInfo cancel={cancel} add={add}></DetailsInfo>
              </TabPane>
            </Tabs>
          </div>
      }



    </div >
  )
}

export default AddGoods
