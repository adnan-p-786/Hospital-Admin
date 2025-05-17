import React from 'react'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

function Doctors() {
  return (
    <div>
      <Card
        style={{ width: 250, height: 350 }}
        cover={
          <img
            className='h-[350px]'
            alt="example"
            src=""
          />
        }
      >
        <Meta
          className='text-[18px] text-center'
          title="Dr Anees kp"
          description="Cardiology"
        />
      </Card>
    </div>
  )
}

export default Doctors