import React, { useState } from 'react'
import { useEffect } from 'react';
import E from 'wangeditor'
import { Button, } from 'antd'
interface Props {
  add: () => void
  cancel: (val: number) => void
}
const DetailsInfo = (props: Props) => {
  let [editdata, setEditdata] = useState(JSON.parse(localStorage.getItem('editGoods')!) ?
    JSON.parse(localStorage.getItem('editGoods')!).detail : '')
  let [content, setContent] = useState('')
  let [editor, setEditor] = useState<any>('')
  // 确认按钮
  let onOk = () => {
    localStorage.setItem('productionDesc',
      JSON.stringify({ productionDesc: content, detail: content }))
    props.add()
  }
  // 取消事件
  let cancel = () => {
    props.cancel(3)
  }
  useEffect(() => {
    if (!editor) {
      const editors = new E('#editor')
      editors.config.placeholder = '请上传商品详情图'
      editors.create()
      // editor.txt.html(SpecParamss)
      // 编辑器的值
      editors.config.onchange = (val: string) => {
        setContent(val)
      }
      setEditor(editors)
    }


  }, [])

  return (
    <div>
      <div className="flex">
        {/* <!-- 商品内容 --> */}
        <div id="editor" >
          <div dangerouslySetInnerHTML={{ __html: editdata }}>
          </div>
        </div>

      </div>
      <div className=' m-tb-10'>
        <Button style={{ marginRight: 10 }} onClick={cancel}>
          取消
        </Button>
        <Button type="primary" htmlType="submit" onClick={onOk}>
          添加商品
        </Button>
      </div>
    </div>
  )
}

export default DetailsInfo
