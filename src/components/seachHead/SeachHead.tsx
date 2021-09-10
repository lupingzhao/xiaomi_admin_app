import React from 'react'
import { Button, Input } from 'antd'
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void
  btn: () => void
  text: string
}

const SeachHead = (props: Props) => {
  // 搜索事件
  const onSearch = (value: string) => {
    props.onSearch(value)
  };
  //按钮事件
  const btn = () => {
    props.btn()
  };

  return (
    <div className='m-tb-10'>
      <Search placeholder="请输入" allowClear
        onSearch={onSearch} style={{ width: 250 }} />
      <Button type="primary" className='m-l-15'
        onClick={btn}>{props.text}</Button>
    </div>
  )
}

export default SeachHead
