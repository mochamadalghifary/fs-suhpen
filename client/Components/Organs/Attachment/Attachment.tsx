import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import React from 'react'
import { Route } from '../../../Enums/Route'
import { host } from '../../../services/axios.service'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface IProps {
  total: number
}

const Attachment: React.FC<IProps> = (props: IProps) => {
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState('')
  const [previewTitle, setPreviewTitle] = React.useState('')
  const [fileList, setFileList] = React.useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  return (
    <>
      <Upload
        action={`${host}${Route.Attachment}`}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
        name={Route.Attachment.substring(1)}
      >
        {fileList.length >= props.total ? null : (
          <>
            <PlusOutlined />
            <div> Upload</div>
          </>
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default Attachment
