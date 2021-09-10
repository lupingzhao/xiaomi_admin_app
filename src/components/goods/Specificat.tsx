import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Select, Tag } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { useEffect } from 'react';
import { Spec } from '@/types'

import api from '@/http/api'
const { Option } = Select;

interface Props {
  base: (e: number) => void
  cancel: (val: number) => void
}


const Specificat = (props: Props) => {
  let [specList, setSpecList] = useState<Spec[]>()
  let dispatch = useDispatch()
  const [form] = Form.useForm();
  let modelData = useSelector((state: any) => state.GoodsModel.GoodsModels)

  // 表单验证通过
  const onFinish = (values: any) => {
    let checklist = [] as any
    if (specList?.length) {
      checklist = specList!.filter((item: Spec, index: number) => {
        return item.checklist.length > 0
      })
    }
    localStorage.setItem('spec', JSON.stringify(checklist))
    props.base(4)
  };
  // 取消事件
  let cancel = () => {
    props.cancel(2)
  }
  // 选择模型
  let onSelect = (e: any, item: any) => {
    api.getSpec({ parentId: e }).then((res: any) => {
      res.data.map((item: Spec) => {
        item.checklist = []
        item.specitem = item.spec_item.split('\n')
      })
      setSpecList(res.data)
    }).catch()
  }

  const onChange = (e: any, i: string, item: Spec,) => {
    if (e.target.checked) {
      item.checklist.push(i)
    } else {
      item.checklist = item.checklist.filter(spec => spec !== i)
    }
    setSpecList([...specList!])
  };

  const onCheckAllChange = (e: any, spec: Spec, item: string[]) => {
    
    if (e.target.checked) {
      spec.checklist = item
    } else {
      spec.checklist = []
    }
    setSpecList([...specList!])
    console.log(specList);
  };





  useEffect(() => {
    form.resetFields()
    // console.log(65666);
    dispatch({
      type: 'GoodsModel/GoodsModel',
      payload: { current: 1, pageSize: 10000, query: '' }
    })
  }, [])




  return (
    <div>
      <Form style={{ display: 'flex' }}>
        <Form.Item label="商品模型" rules={[{ required: true }]} >
          <Select
            showSearch
            style={{ width: 250 }}
            placeholder="选择所属模型"
            optionFilterProp="children"
            onChange={onSelect}
          >
            {
              modelData.map((item: any, index: number) => {
                return (
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
      </Form>

      <Form
        form={form}
        style={{ width: '100%' }}
        name="basics"
        labelCol={{ span: 2 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品规格"
          name="spec"
        >
          <div>
            {
              specList && specList.map((item: Spec, index: number) => {
                return (
                  <div key={index} className='border-b m-tb-10'>
                    <div>
                      <Checkbox
                        checked={item.checklist.length === item.specitem.length}
                        onChange={(e) => onCheckAllChange(e, item, item.specitem)} >
                        {item.name}
                      </Checkbox>
                    </div>
                    <div className='flex m-tb-10'>
                      {
                        item.specitem.map((i: string) => {
                          return (
                            <div key={i}>
                              {
                                i ? <div>
                                  <Checkbox
                                    checked={item.checklist.includes(i)}
                                    onChange={(e) => onChange(e, i, item)}>
                                    <Tag>
                                      {i}
                                    </Tag>
                                  </Checkbox>
                                </div>
                                  : ""
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
          <Button style={{ marginRight: 10 }} onClick={cancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>

    </div >
  )
}

export default Specificat

