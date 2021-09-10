import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'umi';
import { Form, Input, Pagination, Button, DatePicker, InputNumber, Select, message } from 'antd'
import E from 'wangeditor'
const { Option } = Select;
const Specifications = () => {
  let dispatch = useDispatch()
  let [id, setId] = useState('')
  let [content, setContent] = useState('')
  let [editor, setEditor] = useState<any>('')
  let goods = useSelector((state: any) => state.Params.goods)
  let SpecParamss = useSelector((state: any) => state.SpecParams.SpecParamss)
  // form表单
  let [form] = Form.useForm()

  // 重置
  const onReset = () => {
    form.resetFields();
  };

  // 选择模型
  let onSelect = (e: any) => {
    setId(e)
    dispatch({
      type: 'SpecParams/SpecParams',
      payload: { parentId: e }
    })
    // getSpecParams
  }
  // 确认按钮
  let onFinish = () => {
    form.submit()
    if (content && id) {
      dispatch({
        type: 'SpecParams/add',
        payload: { parentId: id, specParams: content }
      })
      form.resetFields()
      editor.txt.clear()
    } else message.error('有必填项未选择')
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

  useEffect(() => {
    dispatch({
      type: 'Params/goods',
      payload: { current: 1, pageSize: 1000, query: '' }
    })
  }, [])

  return (
    <div className='bgc-white p-10'>
      <Form form={form} name="control-hooks" onReset={onReset} style={{ display: 'flex' }}>
        <Form.Item name="parentId" label="所属商品"
          rules={[{ required: true, message: '必须选择所属商品' }]}>
          <Select
            showSearch
            style={{ width: 250 }}
            placeholder="选择所属模型"
            optionFilterProp="children"
            onChange={onSelect}
          >
            {
              goods && goods.map((item: any, index: number) => {
                return (
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
      </Form>
      <div className="flex">
        {/* <!-- 商品内容 --> */}
        <div id="editor" className="toolbar" style={{ zIndex: 0 }}>
          <div dangerouslySetInnerHTML={{ __html: SpecParamss }}>
          </div>
        </div>
      </div>

      <div className='m-tb-10'>
        <Button type='primary' onClick={onFinish}>确认</Button>
      </div>


    </div>
  )
}

export default Specifications
