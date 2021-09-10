import { Modal, Input, Button, Pagination } from 'antd';
import { useState, Component } from 'react';
import { useSelector, useDispatch } from 'umi'
import CarouselTable from '@/components/carousel/carouselTable/CarouselTable';
import AddCarousel from '@/Components/carousel/addCarousel/AddCarousel'
import { useEffect } from 'react';
const { Search } = Input;
interface ColumnType {
  title: string,
  dataIndex: string,
  key: string
  render?: any
  align?: string
}
const Carousel = () => {
  let dispatch = useDispatch()
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(5)
  let total = useSelector((state: any) => state.Carousel.total)
  // 添加弹框
  const [isVisible, setIsVisible] = useState(false);
  // 搜索
  const onSearch = (value: string) => {
    dispatch({
      type: 'Carousel/getBanners',
      payload: { current: 1, pageSize: 10, query: value }
    })
  };
  const sendboo = (e: boolean) => {
    setIsVisible(e)
  }
  // 编辑
  const edits = (e: any, e1: string) => {
    dispatch({
      type: 'Carousel/getEdit',
      payload: { id: e1, ...e }
    })
    dispatch({
      type: 'Carousel/getBanners',
      payload: { current: 1, pageSize: 10, query: '' }
    })
  }
  // 删除
  const del = (val: string) => {
    dispatch({
      type: 'Carousel/del',
      payload: val
    })

  }

  // 添加轮播图成功
  const submit = (e: any) => {
    dispatch({
      type: 'Carousel/getAdd',
      payload: e
    })
    setIsVisible(false)
  }
  // 是否显示轮播图
  // showUser({ id, status }
  const show = (ids: string, statu: boolean) => {
    dispatch({
      type: 'Carousel/getshow',
      payload: { id: ids, isShow: statu }
    })
  }
  // 分页
  let onChange = (pages: any, pageSizes: any) => {
    setPage(pages)
    setPageSize(pageSizes)
    dispatch({
      type: 'Carousel/getBanners',
      payload: { current: pages, pageSize: pageSizes, query: '' }
    })
  }
  useEffect(() => {
    // 获取列表
    dispatch({
      type: 'Carousel/getBanners',
      payload: { current: page, pageSize: pageSize, query: '' }
    })
  }, [])
  return (
    <div className='bgc-white p-10'>
      <div className='m-tb-10'>
        <Search placeholder="请输入" allowClear
          onSearch={onSearch} style={{ width: 250 }} />
        <Button type="primary" className='m-l-15'
          onClick={() => { setIsVisible(true) }}>添加轮播图</Button>
      </div>
      {/* 表格 */}
      <CarouselTable show={show} edits={edits} del={del}></CarouselTable>
      {/* 弹框 添加 */}
      <AddCarousel addVisible={isVisible} sendboo={sendboo} submit={submit}></AddCarousel>
      <div className='t-a-r m-tb-10' >
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
    </div >
  )
}

export default Carousel
