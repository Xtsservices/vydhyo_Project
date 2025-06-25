"use client";
import React, { useState } from 'react';
import {
  Layout,
  Card,
  Avatar,
  Button,
  List,
  Typography,
  Row,
  Col,
  Menu,
  Badge,
  Statistic,
  Progress,
  Divider,
  Tag,
  Select,
  Space,
  Calendar,
  Timeline,
  notification,
  Table,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Modal,
  Spin,
  message,
  Upload
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import AppHeader from '@/app/Admin/components/header';
import dayjs from 'dayjs';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Add Staff Modal Component
const AddStaffModal = ({ isOpen, onCancel, onSubmit, staffType, loading }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Create regular JavaScript object instead of FormData
      const staffData: Record<string, any> = {};
      
      if (staffType === 'receptionist') {
        Object.assign(staffData, {
          firstname: values.firstname,
          lastname: values.lastname,
          gender: values.gender,
          DOB: dayjs(values.DOB).format('DD-MM-YYYY'),
          mobile: values.mobile,
        });
        // Note: File upload will need separate handling or convert to base64
        if (fileList.length > 0) {
          // staffData.profilePicture = await convertFileToBase64(fileList[0].originFileObj);
        }
      } else {
        // For other staff types
        Object.keys(values).forEach(key => {
          if (key === 'DOB') {
            staffData[key] = dayjs(values[key]).format('DD-MM-YYYY');
          } else {
            staffData[key] = values[key];
          }
        });
        staffData.staffType = staffType;
      }

      await onSubmit(staffData);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const validateMobile = (_, value) => {
    if (!value) {
      return Promise.reject('Please enter mobile number');
    }
    // Remove any spaces or special characters
    const cleanedValue = value.replace(/\D/g, '');
    
    if (cleanedValue.length !== 10) {
      return Promise.reject('Mobile number must be exactly 10 digits');
    }
    if (!/^[6-9]\d{9}$/.test(cleanedValue)) {
      return Promise.reject('Mobile number must start with 6, 7, 8, or 9');
    }
    return Promise.resolve();
  };

  const validateName = (_, value) => {
    if (!value) {
      return Promise.reject('This field is required');
    }
    if (value.length < 2) {
      return Promise.reject('Name must be at least 2 characters');
    }
    if (value.length > 50) {
      return Promise.reject('Name cannot exceed 50 characters');
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return Promise.reject('Name should contain only letters and spaces');
    }
    return Promise.resolve();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }
    return false; // Prevent automatic upload
  };

  // Helper function to convert file to base64 (if needed for image upload)
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const renderFormFields = () => {
    if (staffType === 'receptionist') {
      return (
        <>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ validator: validateName }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ validator: validateName }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="DOB"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select date of birth' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              format="DD-MM-YYYY"
              placeholder="Select date of birth"
              disabledDate={(current) => {
                // Only disable future dates
                return current && current > dayjs().endOf('day');
              }}
              showToday={true}
            />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[{ validator: validateMobile }]}
          >
            <Input 
              placeholder="Enter 10-digit mobile number" 
              maxLength={10}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value;
              }}
            />
          </Form.Item>
        </>
      );
    }

    // For other staff types - simplified common fields
    return (
      <>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[{ validator: validateName }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ validator: validateName }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile Number"
          rules={[{ validator: validateMobile }]}
        >
          <Input 
            placeholder="Enter 10-digit mobile number" 
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              e.target.value = value;
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="DOB"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker 
            style={{ width: '100%' }} 
            format="DD-MM-YYYY"
            placeholder="Select date of birth"
            disabledDate={(current) => {
              // Only disable future dates
              return current && current > dayjs().endOf('day');
            }}
            showToday={true}
          />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      title={`Add New ${staffType.charAt(0).toUpperCase() + staffType.slice(1)}`}
      open={isOpen}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setFileList([]);
      }}
      onOk={handleOk}
      confirmLoading={loading}
      width={600}
      centered
      okText={`Add ${staffType.charAt(0).toUpperCase() + staffType.slice(1)}`}
      cancelText="Cancel"
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}
        >
          {renderFormFields()}
        </Form>
      </Spin>
    </Modal>
  );
};

export default function StaffManagement() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('services');
  const [selectedStaffType, setSelectedStaffType] = useState('receptionist');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample data for existing staff
  const existingStaff = [
    {
      id: 1,
      name: 'Sarah Johnson',
      type: 'Receptionist',
      email: 'sarah@clinic.com',
      phone: '+1 234-567-8901',
      joinDate: '2023-06-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mike Davis',
      type: 'Compounder',
      email: 'mike@clinic.com',
      phone: '+1 234-567-8902',
      joinDate: '2023-08-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Emily Wilson',
      type: 'Nurse',
      email: 'emily@clinic.com',
      phone: '+1 234-567-8903',
      joinDate: '2023-05-10',
      status: 'Active'
    }
  ];

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: 'appointments', icon: <CalendarOutlined />, label: 'Appointments' },
    { key: 'patients', icon: <TeamOutlined />, label: 'My Patients' },
    { key: 'reviews', icon: <UserOutlined />, label: 'Walkin Patients' },
    { key: 'services', icon: <SettingOutlined />, label: 'Staff Management' },
    { key: 'availability', icon: <DashboardOutlined />, label: 'Availability' },
    { key: 'accounts', icon: <FileTextOutlined />, label: 'Accounts' },
    { key: 'invoices', icon: <FileTextOutlined />, label: 'Invoices' },
    { key: 'messages', icon: <MailOutlined />, label: 'Messages' },
    { key: 'logout', icon: <UserOutlined />, label: 'Logout' }
  ];

  const handleStaffTypeChange = (value) => {
    setSelectedStaffType(value);
  };

  const handleQuickAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddStaff = async (staffData) => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
      
      if (selectedStaffType === 'receptionist') {
        console.log('Sending receptionist data as object:', staffData);
        
        const response = await axios.post(
          'http://192.168.1.42:3000/doctor/createReceptionist',
          staffData, // Send as regular object
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' // Changed from multipart/form-data
            }
          }
        );

        console.log('Receptionist created:', response.data);
        notification.success({
          message: 'Receptionist Added Successfully',
          description: 'Receptionist has been added to the staff list.',
          duration: 3
        });
      } else {
        // For other staff types, you can add different API calls
        console.log('Other staff type data as object:', staffData);
        notification.success({
          message: `${selectedStaffType.charAt(0).toUpperCase() + selectedStaffType.slice(1)} Added Successfully`,
          description: `${selectedStaffType.charAt(0).toUpperCase() + selectedStaffType.slice(1)} has been added to the staff list.`,
          duration: 3
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating staff:', error);

      let errorMessage = 'An unexpected error occurred';
      
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        if (error.response.status === 401) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid data provided. Please check all fields.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      notification.error({
        message: 'Error Adding Staff',
        description: errorMessage,
        duration: 5
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ marginRight: 8 }}>{name.charAt(0)}</Avatar>
          {name}
        </div>
      ),
    },
    {
      title: 'Staff Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<MoreOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <AppHeader />
      <Layout style={{ minHeight: '100vh', marginTop: '4rem' }}>
        <Sider width={250} style={{ background: '#fff' }}>
          <div style={{ padding: '20px', textAlign: 'center', background: '#1890ff', color: 'white' }}>
            <Avatar size={64} style={{ marginBottom: '10px' }}>
              <UserOutlined />
            </Avatar>
            <Title level={5} style={{ color: 'white', margin: 0 }}>Dr Edalin Hendry</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
              BDS, MDS - Oral & Maxillofacial Surgery
            </Text>
            <div style={{ marginTop: '10px' }}>
              <Tag color="blue">Dentist</Tag>
            </div>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            onSelect={({ key }) => setSelectedMenuItem(key)}
            style={{ borderRight: 0, height: 'calc(100vh - 200px)', overflowY: 'auto' }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label
            }))}
          />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Title level={4} style={{ margin: 0 }}>Staff Management</Title>
              <Select
                value={selectedStaffType}
                onChange={handleStaffTypeChange}
                style={{ width: 150 }}
                placeholder="Select staff type"
              >
                <Option value="receptionist">Receptionist</Option>
                <Option value="compounder">Compounder</Option>
                <Option value="nurse">Nurse</Option>
              </Select>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleQuickAdd}
              loading={loading}
            >
              Quick Add
            </Button>
          </Header>

          <Content style={{ margin: '20px', background: '#f0f2f5' }}>
            {/* Staff Overview Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Staff"
                    value={existingStaff.length}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Receptionists"
                    value={existingStaff.filter(staff => staff.type === 'Receptionist').length}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Nurses"
                    value={existingStaff.filter(staff => staff.type === 'Nurse').length}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Compounders"
                    value={existingStaff.filter(staff => staff.type === 'Compounder').length}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Current Staff List */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card 
                  title="Current Staff Members" 
                  extra={
                    <Space>
                      <Button type="link">Export List</Button>
                      <Button type="link">Import Staff</Button>
                    </Space>
                  }
                >
                  <Table
                    dataSource={existingStaff}
                    columns={columns}
                    rowKey="id"
                    pagination={{ 
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>

        {/* Add Staff Modal */}
        <AddStaffModal
          isOpen={isModalOpen}
          onCancel={handleModalCancel}
          onSubmit={handleAddStaff}
          staffType={selectedStaffType}
          loading={loading}
        />
      </Layout>
    </>
  );
}