// import React, { useState } from 'react'
// import { Form, Input, Button, Checkbox, Select, Tag } from 'antd';
// import { useSelector, useDispatch } from 'umi';
// import { useEffect } from 'react';
// import { Spec } from '@/types'
// import api from '@/http/api';

// const { Option } = Select;
// interface Props {

// }


// const Checkdemo = (props: Props) => {

//   const [form] = Form.useForm();
//   let list = useSelector((state: any) => state.Spec.Specs)
//   let [specList, setSpecList] = useState<Spec[]>()
//   let [all, setAll] = useState<boolean[]>([false, false])
//   let modelData = useSelector((state: any) => state.GoodsModel.GoodsModels)
//   let dispatch = useDispatch()

//   // 表单验证通过
//   const onFinish = (values: any) => {
//     let data = [] as any
//     checkedList.map((item: any) => {
//       data.push(...item)
//     })
//     localStorage.setItem('spec', JSON.stringify(data))

//   };


//   const [checkedList, setCheckedList] = React.useState<string[]>([]);


//   const onChange = (e: any, i: string, item: Spec,) => {
//     if (e.target.checked) {
//       item.checklist.push(i)
//       setSpecList([...specList!])
//     } else {
//       item.checklist = item.checklist.filter(spec => spec !== i)
//     }
//     item.specitem.length === item.checklist.length ? all[0] = true : all[0] = false
//   };

//   const onCheckAllChange = (e: any, index: Spec,) => {
//     console.log(e.target);
//   };
//   useEffect(() => {

//   }, [])

//   return (
//     <div>
//       <div>

//       </div >


//     </div >
//   )


// }

// export default Checkdemo


import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Select, Tag } from 'antd';
import { useSelector } from 'umi';
import { useEffect } from 'react';
import { Spec } from '@/types'


const { Option } = Select;
interface Props {
  base: (e: number) => void
  cancel: (val: number) => void
  model: (val: string) => void
}


const Checkdemo = (props: Props) => {

  const [form] = Form.useForm();
  let list = useSelector((state: any) => state.Spec.Specs)
  let modelData = useSelector((state: any) => state.GoodsModel.GoodsModels)

  // 表单验证通过
  const onFinish = (values: any) => {
    list.map((item: Spec, index: number) => {
      item.checklist = checkedList[index]
    })
    // console.log(list);
    localStorage.setItem('spec', JSON.stringify(list))
    props.base(4)
  };
  // 取消事件
  let cancel = () => {
    props.cancel(2)
  }
  // 选择模型
  let onSelect = (e: any, item: any) => {
    console.log(e);
    props.model(e)
    setCheckAll1([])
    setIndeterminate([])
    setCheckedList([])
  }

  const [checkedList1, setCheckedList1] = React.useState<string[]>([]);
  const [checkedList, setCheckedList] = React.useState<any[]>([]);
  const [indeterminate, setIndeterminate] = React.useState<boolean[]>([]);
  const [checkAll1, setCheckAll1] = React.useState<boolean[]>([false, false]);

  const onChange = (list: any, index: number, val: any) => {
    checkedList[index] = list
    setCheckedList(checkedList)
    list.length === val.length ? checkAll1[index] = true : checkAll1[index] = false
    let boo = !!list.length && list.length < val.length
    indeterminate[index] = boo
    setIndeterminate(indeterminate)
    setCheckedList1(list)
    setCheckAll1(checkAll1);
  };

  const onCheckAllChange = (e: any, index: number, val: any) => {
    checkAll1[index] = e.target.checked
    setCheckAll1(checkAll1)
    if (e.target.checked) {
      setCheckedList1(list)
      checkedList[index] = val
    } else {
      setCheckedList1(list)
      checkedList[index] = []
    }
    setCheckedList1(list)
    setCheckedList(checkedList)

    indeterminate[index] = false
    setIndeterminate(indeterminate)
  };




  useEffect(() => {
    form.resetFields()
  }, [])



  return (
    <div>
      <Form style={{ display: 'flex' }}>
        <Form.Item label="商品模型"
          rules={[{ required: true }]}
        >
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品规格"
          name="spec"
        >
          <div>
            {
              list && list.map((item: any, index: number) => {
                return (
                  <div key={index} >
                    <Checkbox value={item.name} indeterminate={indeterminate[index]}
                      onChange={(e) => onCheckAllChange(e, index, item.spec_item)}
                      checked={checkAll1[index]}>
                      {item.name}

                    </Checkbox>
                    <div className='m-tb-10 border-b' style={{ padding: '0 10px 10px' }}>
                      {
                        item.specitem && <div className='flex'>
                          <Checkbox.Group onChange={(e) => onChange(e, index, item.specitem)}
                            value={checkedList[index]} options={item.specitem} >
                          </Checkbox.Group>
                        </div>
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

export default Checkdemo

