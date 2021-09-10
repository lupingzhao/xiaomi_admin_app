import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useEffect } from 'react';

interface Poprs {
  children: React.ReactNode,
  ok?: string
  show: boolean
  isShow: (val: boolean) => void
  isfooter?: boolean
  title: string
  submit: (val?: any) => void
  maskClosable?: boolean
}
const Amodel = (props: Poprs) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 确认
  const handleOk = () => {
    props.submit()
  };

  // 取消 关闭
  const handleCancel = () => {
    setIsModalVisible(false);
    props.isShow(isModalVisible)
  }

  // 监听是否显示
  useEffect(() => {
    setIsModalVisible(props.show)
  }, [props.show])

  return (
    <div>
      <Modal title={props.title}
        visible={isModalVisible}
        maskClosable={props.maskClosable}
        // 关闭弹框时销毁弹框
        destroyOnClose={true}
        okText={props.ok}
        cancelText='取消'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={props.isfooter}
      >
        {props.children}
      </Modal>
    </div>
  )
}

export default Amodel
