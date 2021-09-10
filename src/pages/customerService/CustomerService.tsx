import React, { useState } from 'react'
import style from './cSstyle.less';
import { Input, message } from 'antd';
import { Drawer, Button } from 'antd';
import emoji from '@/lib/emoji'
import dayjs from 'dayjs'

// 实时聊天
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

import { useEffect } from 'react';

const CustomerService = () => {
  // let emj = emoji as any

  let [chatList, setChatList] = useState<any[]>([])

  const [visible, setVisible] = useState(false)
  let [value, setValue] = useState<string>('')

  // 发送信息
  let send = () => {
    socket.emit('event', {
      time: dayjs().format('YYYY-MM-DD HH:mm'),
      type: 'PC',
      value: {
        data: value,
        name: JSON.parse(localStorage.getItem('user')!).username
      }
    })
    value = ''
    setValue(value)
  }

  useEffect(() => {
    // 接收消息
    socket.on('broadcast', (res) => {
      chatList.push(res)
      // 数组序列化 可解决延迟的问题
      setChatList([...chatList])
    })
    // 断开链接
    socket.on('disconnect', (res) => {
      message.error('已断开连接')
    })
  }, [])

  useEffect(() => {
    let length = chatList.length
    if (length > 0) {
      let dom = document.getElementById(`chatItem-${length - 1}`)
      dom!.scrollIntoView()
    }
    // }
  }, [chatList])


  // 输入框输入事件
  let input = (e: any) => {
    setValue(e.target.value)
  }

  // 点击表情
  let click = (e: any) => {
    value = value + e
    setValue(value)
  }



  return (
    <div className='height-100 ' style={{ paddingBottom: 50 }}>
      <div className='t-a-c bgc-low-gray  p-tb-10'>聊天记录</div>
      <div className={`${style.jlbox} p-10 `}>
        {
          chatList.map((i: any, index: number) => {
            return <div key={index} style={{ marginBottom: 30 }}
              className={`width-100  `}
              id={`chatItem-${index}`}
            >
              <div className={`flex ${i.type === 'PC' ? 'jce' : 'jcs'}`}>
                {
                  i.value.name ? <span className='font-s-18'>{i.value.name}</span>
                    : <span>游客用户</span>
                }
                <span className='m-lr-10 font-s-12'>{i.time}</span>
              </div>
              <div className={`flex ${i.type === 'PC' ? 'jce' : 'jcs'} `}>
                {
                  i.type !== 'PC' ? <div className={`${style.triangle_left} `}></div>
                    : null
                }
                <div className={` width-100 flex  ${i.type === 'PC' ? 'jce' : 'jcs'}  `}>
                  <div className={`${style.chatinfo} p-10 b-radius-10 ${i.type === 'PC' ? style.bgc_g : 'bgc-low-gray '}`}>{i.value.data}</div>
                </div>
                {
                  i.type === 'PC' ? <div className={`${style.triangle_bottomleft}`}></div>
                    : null
                }
              </div>

            </div>
          })
        }
      </div>

      {/* 底部输入框 */}
      <div className='m-tb-10 flex' >
        <Input placeholder="请输入" onPressEnter={send} onInput={(e) => { input(e) }}
          value={value} />

        <Button type="primary" className='m-lr-10' onClick={send}>
          发送
        </Button>
        <i className='iconfont icon-biaoqing_xiao_o mr-10' style={{ fontSize: 30 }}
          onClick={() => { setVisible(true) }}></i>
        <Drawer title="表情" width="500" placement="right" onClose={() => { setVisible(false) }}
          visible={visible}>
          <div className='flex width-100 flex-wrap'>
            {
              emoji.map((e: any, index: number) => {
                return <div key={index} className=''>
                  <div className={`${style.emj} m-tb-10 p-10 shou`} onClick={() => { click(e) }} style={{ fontSize: 20 }}>
                    {e}
                  </div>
                </div>
              })
            }

          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default CustomerService
