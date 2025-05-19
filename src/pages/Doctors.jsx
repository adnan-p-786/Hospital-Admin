import React from 'react';
import { Button, Card, Spin, Modal, Form, Input, Select, message, Upload } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getDoctor, postDoctor } from '../Apis/Doctor/doctorApi';

const { Meta } = Card;
const { Option } = Select;

function Doctors() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery('getDoctor', getDoctor);

  const { mutate: createDoctor, isLoading: isSubmitting } = useMutation(postDoctor, {
    onSuccess: () => {
      message.success('Doctor added successfully!');
      queryClient.invalidateQueries('getDoctor');
      setIsModalVisible(false);
      form.resetFields();
    },
    onError: () => {
      message.error('Failed to add doctor.');
    },
  });

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        if(values.image.file){
          values.image = values.image.file.originFileObj
        }
        // values.ima = values.im.file.oj
        createDoctor(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  if (isLoading) return <Spin tip="Loading doctors..." />;
  if (isError) return <p>Error loading doctors</p>;

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button type="primary" onClick={showModal}>
          Add Doctor
        </Button>
      </div>
      <Modal
        title="Add New Doctor"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isSubmitting}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="Name" label="Doctor Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="Department" label="Department" rules={[{ required: true, message: 'Please select a department' }]}>
            <Select placeholder="Select a department">
              <Option value="Cardiology">Cardiology</Option>
              <Option value="Neurology">Neurology</Option>
              <Option value="Dermatology">Dermatology</Option>
              <Option value="Pediatrics">Pediatrics</Option>
              <Option value="Radiology">Radiology</Option>
              <Option value="Orthopeadic">Orthopeadic</Option>
            </Select>
          </Form.Item>
          <Form.Item name={'image'}>
            <Upload>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>

        </Form>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Array.isArray(data?.data) && data.data.length > 0 ? (
          data.data.map((doctor) => (
            <Card
              key={doctor._id}
              style={{ width: 300, height: 420 }}
              cover={
                <img
                  className="h-[320px] object-cover"
                  alt={doctor.Name}
                  src={doctor.image}
                />
              }
            >
              <Meta
                className="text-[18px] text-center"
                title={doctor.Name}
                description={doctor.Department}
              />
            </Card>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
