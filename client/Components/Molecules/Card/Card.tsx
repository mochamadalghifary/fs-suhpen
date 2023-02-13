import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

interface IProps {
  image?: string
  href: string
  title: string
  description: string
}

const CardImage: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate()

  return (
    <Card
      hoverable
      style={{ width: 240, margin: 15 }}
      cover={
        <img
          src={
            props.image ||
            'https://rnb.scene7.com/is/image/roomandboard/HH_Liv_S1021_1022?wid=1200'
          }
        />
      }
      onClick={() => navigate(props.href)}
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  )
}

export default CardImage
