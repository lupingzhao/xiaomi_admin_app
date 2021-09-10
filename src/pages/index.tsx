import styles from './index.less';
import { useRef, useState } from 'react';
import { useSelector, useDispatch, history } from 'umi'
import { useEffect } from 'react';
import * as echarts from 'echarts';
import api from '@/http/api';
import dayjs from 'dayjs';

interface OrderType {
  address: string
  count: string
  goods_list: any[]
  mobile: string
  pay_time: string
  price: string
  user_id: string
  _id: string
}
export default function IndexPage() {
  let data = useSelector((state: any) => state.Index.indexData)
  let dispatch = useDispatch()

  let eCharts1 = useRef(null)
  let eCharts2 = useRef(null)
  let eCharts3 = useRef(null)



  useEffect(() => {
    // 首页数据头部
    dispatch({
      type: 'Index/getIndex',
    })
  }, [])


  useEffect(() => {
    // 订单数据
    let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let sumprice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let myChart = echarts.init(eCharts1.current!);
    let myChart1 = echarts.init(eCharts2.current!);

    api.getOrder().then((res: any) => {
      res.data.map((i: OrderType) => {
        if (new Date().toDateString() === new Date(i.pay_time).toDateString()) {
          sum[dayjs(i.pay_time).hour()] += 1
          sumprice[dayjs(i.pay_time).hour()] += Number(i.price)
        }
      })
      let option = {
        title: {
          text: '今日订单',
          textStyle: {
            fontSize: 12
          }
        },
        color: ['#73C0DE'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今日订单总计']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '今日订单总计',
            type: 'line',
            stack: '总量',
            data: sum
          },
        ]
      };
      option && myChart.setOption(option);

      // 销售额
      let option1 = {
        title: {
          text: '今日销售额',
          textStyle: {
            fontSize: 12
          }
        },
        color: ['#FFECAD'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今日销售额总计']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '今日销售额总计',
            type: 'line',
            stack: '总量',
            data: sumprice
          },
        ]
      };



      option1 && myChart1.setOption(option1);
    })

  }, [])

  // 分类
  useEffect(() => {
    // 获取分类
    var myChart2 = echarts.init(eCharts3.current!);
    api.getCategory('').then((res: any) => {
      let data = [] as any
      res.data.map((item: any) => {
        data.push({ value: item.list.length, name: item.name },)
      })
      let option2 = {
        title: {
          text: '商品分类',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          padding: [50, 0, 10, 10]
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option2 && myChart2.setOption(option2);
    })
  }, [])


  return (
    <div>
      <div className='flex jcsb font-s-12 font-c-w'>
        {/* 头部 */}
        <div className='width-32  p-10 ' style={{ backgroundColor: 'red' }}>
          <div>{data.orderCount}</div>
          <div>订单总数</div>
        </div>
        <div className='width-32  p-10 ' style={{ backgroundColor: '#00BA61' }}>
          <div>{data.goodsCount}</div>
          <div>商品总数</div>
        </div>
        <div className='width-32  p-10 ' style={{ backgroundColor: '#1E2D3C' }}>
          <div>{data.userCount}</div>
          <div>用户总数</div>
        </div>
      </div>
      {/* 数据折线图 */}
      <div className='flex jcsb m-tb-25'>
        <div className='width-49  p-t-10' ref={eCharts1}
          style={{ height: 300, width: 520, backgroundColor: '#fff' }}></div>
        <div className='width-49 p-t-10' ref={eCharts2}
          style={{ height: 300, width: 520, backgroundColor: '#fff' }}></div>
      </div>

      <div className=' p-t-10' ref={eCharts3}
        style={{ height: 400, width: 1048, backgroundColor: '#fff' }}>
      </div>
    </div>
  )
}
