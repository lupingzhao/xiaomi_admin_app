import React, { useState } from 'react'
import { Tree, Popconfirm } from 'antd';
const { DirectoryTree } = Tree;
import { useSelector } from 'umi'
import styles from '../../pages/index.less'
interface Prpos {
  add: (val: any, info: any) => void
}

const CateTree = (props: Prpos) => {
  let [id, setid] = useState()
  let data = useSelector((state: any) => state.Category.Categorys)

  let add = (e: any, e1: string, info: any) => {
    // 阻止冒泡
    // e.stopPropagation()
    props.add(e1, info)
  }
  let select = (e: any) => {
    setid(e[0])
  }
  return (
    <div className='width-49'>
      <DirectoryTree
        multiple
        style={{ width: '100%' }}
        defaultExpandAll={false}
        treeData={data}
        // icon='' 是否显示默认图标
        onSelect={select}
        titleRender={(nodeData: any) => {
          return (
            <div className={`flex jcsb ${styles.hover}`} style={{ marginLeft: 25, marginTop: -24 }} >
              <div>{nodeData.title}</div>
              {
                !nodeData.isLeaf ?
                  <div className={`${styles.show}`} style={id === nodeData.key ? { display: 'block' } : undefined}>
                    <div className={` flex `} >
                      <div className={`mr-5 ${styles.item}`}
                        onClick={(e) => { add(e, 'add', nodeData) }}>新增</div>
                      <div className={`mr-5 ${styles.del}`}
                        onClick={(e) => { add(e, 'show', nodeData) }}>禁用</div>
                      <Popconfirm
                        title="确定将此分类删除吗?"
                        onConfirm={(e) => { add(e, 'del', nodeData) }}
                        okText="确定"
                        cancelText="取消"
                        className={` ${styles.item}`}
                      >
                        <div onClick={(e) => { e.stopPropagation(), setid(nodeData.key) }}
                          className={`mr-5 ${styles.del}`}>删除</div>
                      </Popconfirm>
                    </div>
                  </div> : ''
              }
            </div >
          )
        }}
      />
    </div >
  )
}
export default CateTree
