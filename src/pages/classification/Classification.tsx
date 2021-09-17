import React from 'react'
import { Button, Input, Card, Form } from 'antd'
import CateTree from '@/components/classification/CateTree';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Category } from '@/types'

const { Option } = Select;
const { Search } = Input;

const Classification = () => {
  const [form] = Form.useForm();
  let dispatch = useDispatch()
  let [parentId, setParentId] = useState('')
  let [type, setType] = useState('')
  let cateData = useSelector((state: any) => state.Category.Categorys)
  // 搜索事件
  const onSearch = (value: string) => {
    if (value) {
      dispatch({
        type: 'Category/Category',
        payload: value
      })
    } else {
      // 分类数据
      dispatch({
        type: 'Category/Category',
        payload: {
          res: '',
          isadd: false
        }
      })
    }

  };
  // 表单验证通过
  const onFinish = (values: any) => {
    // 添加二级分类
    if (values.parentId) {
      values.parentId = parentId
      dispatch({
        type: 'Category/addSecond',
        payload: {
          add: values,
          update: {
            res: '',
            isadd: false
          }
        }
      })
    } else {
      // 添加一级分类
      dispatch({
        type: 'Category/add',
        payload: {
          add: values,
          update: {
            res: '',
            isadd: false
          }
        }
      })
    }
    form.resetFields();
  };
  // 点击确定
  const onReset = () => {
    // 触发表单验证
    form.submit()
  };

  // 点击的分类数据
  let info = (val: any, info: any) => {
    // 设置表单的某一项的值
    val === 'add' ? form.setFieldsValue({ parentId: info.title }) :
      form.resetFields();
    if (val === 'del') {
      dispatch({
        type: 'Category/del',
        payload: {
          del: info.key,
          update: {
            res: '',
            isadd: false
          }
        }
      })
    }
    if (val === 'add') {
      setParentId(info.key)
    }
  }
  // 选择器
  function handleChange(value: any, item: any) {
    setParentId(item.key)
  }

  useEffect(() => {
    // 分类数据
    dispatch({
      type: 'Category/Category',
      payload: {
        res: '',
        isadd: false
      }
    })
  }, [])



  return (
    <div className='bgc-white p-10'>
      <Search placeholder="请输入" allowClear
        onSearch={onSearch} style={{ width: 250 }} />
      <div className='flex m-tb-10 jcsb a-i-fs'>
        <CateTree add={info} ></CateTree>
        <div className='flex-1 m-l-15'>
          <Card title="新增分类" extra={<a href="#" onClick={onReset}>确定</a>} style={{ width: '100%' }}>
            <Form form={form} name="control-hooks" onFinish={onFinish}>
              {/* name, short_name, isShow */}
              <Form.Item name="name" label="分类名称" rules={[{ required: true }]}>
                <Input placeholder='请输入分类名称' />
              </Form.Item>
              <Form.Item name="parentId" label="上级分类">
                <Select style={{ width: '100%' }} onChange={handleChange}
                  optionFilterProp="children"
                  placeholder='请选择上级分类' showSearch>
                  {
                    cateData && cateData.map((item: any) => {
                      return (
                        <Option key={item.key} value={item.title}>{item.title}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item name="short_name" label="分类别名">
                <Input placeholder='请输入分类别名' />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Classification
