import { Card } from 'antd'
import React from 'react'

export const Section: React.FC<React.PropsWithChildren> = (props) => {
  const { ...cardProps } = props
  return <Card {...cardProps}>{props.children}</Card>
}
