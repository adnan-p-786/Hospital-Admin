import { Button, Divider, Form, Input, Modal, Table } from 'antd';
import { useState } from 'react';
import { useCreateDepartment, useDeleteDepartment } from '../Apis/Department/departmentHooks';
import { getDepartment } from '../Apis/Department/departmentApi';
import { useQuery } from 'react-query';


function Department() {
  const { data, isLoading, error, refetch } = useQuery("getDepartment", getDepartment)
  const { mutate: Create } = useCreateDepartment()
  const { mutate: Delete } = useDeleteDepartment()


  const [addModal, setAddModal] = useState(false)
  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }

  const handleDelete = (id) => {
    Delete(id, {
      onSuccess: () => {
        message.success('Deleted successfully');
        refetch();
      },
      onError: () => {
        message.error('Failed to delete');
      }
    });
  };


  const onFinish = (value) => {
    Create(value, {
      onSuccess() {
        message.success("add successfully")
        refetch()
        setAddModal(false)
        form.resetFields()
      },
      onError() {
        message.error("faild")
      }
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex gap-2">
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Divider>Departments</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        size="middle" />

      <Modal
        title="Add Department"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'Name'} label="Name" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Department