'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../../components/header';
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  List,
  Button,
  Badge,
  Input,
  Space,
  Typography,
  theme,
  Table,
  Tag,
  DatePicker,
  Divider,
  Progress,
  Alert,
  message
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ScheduleOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  CalendarOutlined,
  DollarOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HomeOutlined,
  StarFilled
} from '@ant-design/icons';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SideHeader from '../../components/sideheader';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const MedicalDashboard = () => {
  const { token } = useToken();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    message.loading('Navigating...', 0.5);
    setTimeout(() => {
      router.push(path);
    }, 50);
  }, [router]);

  const statsData = useMemo(() => [
    {
      title: 'Doctors',
      value: doctorsCount,
      color: '#1890ff',
      onClick: () => handleNavigation('/Admin/app/doctors')
    },
    {
      title: 'Patients',
      value: 487,
      color: '#52c41a',
      onClick: () => handleNavigation('/Admin/app/patients')
    },
    {
      title: 'Appointment',
      value: 485,
      color: '#ff4d4f',
      onClick: () => handleNavigation('/Admin/app/appointments')
    },
    {
      title: 'Revenue',
      value: '$62523',
      color: '#faad14',
      onClick: () => handleNavigation('/Admin/app/revenue')
    }
  ], [doctorsCount, handleNavigation]);

  const revenueData = useMemo(() => [
    { year: '2013', revenue: 50 },
    { year: '2014', revenue: 75 },
    { year: '2015', revenue: 225 },
    { year: '2016', revenue: 120 },
    { year: '2017', revenue: 75 },
    { year: '2018', revenue: 200 }
  ], []);

  const statusData = useMemo(() => [
    { year: '2015', orange: 25, blue: 100 },
    { year: '2016', orange: 50, blue: 25 },
    { year: '2017', orange: 125, blue: 90 },
    { year: '2018', orange: 75, blue: 50 },
    { year: '2019', orange: 150, blue: 125 }
  ], []);

  const doctorsList = useMemo(() => [
    {
      key: '1',
      name: 'Dr. Ruby Perrin',
      specialty: 'Dental',
      earned: '$3200.00',
      reviews: 4.5,
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '2',
      name: 'Dr. Darren Elder',
      specialty: 'Dental',
      earned: '$3100.00',
      reviews: 4.2,
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '3',
      name: 'Dr. Deborah Angel',
      specialty: 'Cardiology',
      earned: '$4000.00',
      reviews: 4.8,
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '4',
      name: 'Dr. Sofia Brient',
      specialty: 'Urology',
      earned: '$3200.00',
      reviews: 4.3,
      avatar: 'https://via.placeholder.com/40'
    }
  ], []);

  const patientsList = useMemo(() => [
    {
      key: '1',
      name: 'Charlene Reed',
      phone: '8286329170',
      lastVisit: '20 Oct 2023',
      paid: '$100.00',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '2',
      name: 'Travis Trimble',
      phone: '2077299974',
      lastVisit: '22 Oct 2023',
      paid: '$200.00',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '3',
      name: 'Carl Kelly',
      phone: '2607247769',
      lastVisit: '21 Oct 2023',
      paid: '$250.00',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      key: '4',
      name: 'Michelle Fairfax',
      phone: '5043686874',
      lastVisit: '21 Sep 2023',
      paid: '$150.00',
      avatar: 'https://via.placeholder.com/40'
    }
  ], []);

  const appointmentsList = useMemo(() => [
    {
      key: '1',
      id: 'APT001',
      patientName: 'Charlene Reed',
      patientAvatar: 'https://via.placeholder.com/40',
      doctorName: 'Dr. Ruby Perrin',
      doctorAvatar: 'https://via.placeholder.com/40',
      date: '20 Oct 2023',
      time: '10:00 AM',
      status: 'Completed'
    },
    {
      key: '2',
      id: 'APT002',
      patientName: 'Travis Trimble',
      patientAvatar: 'https://via.placeholder.com/40',
      doctorName: 'Dr. Darren Elder',
      doctorAvatar: 'https://via.placeholder.com/40',
      date: '22 Oct 2023',
      time: '11:00 AM',
      status: 'Pending'
    },
    {
      key: '3',
      id: 'APT003',
      patientName: 'Carl Kelly',
      patientAvatar: 'https://via.placeholder.com/40',
      doctorName: 'Dr. Deborah Angel',
      doctorAvatar: 'https://via.placeholder.com/40',
      date: '21 Oct 2023',
      time: '09:30 AM',
      status: 'Cancelled'
    },
    {
      key: '4',
      id: 'APT004',
      patientName: 'Michelle Fairfax',
      patientAvatar: 'https://via.placeholder.com/40',
      doctorName: 'Dr. Sofia Brient',
      doctorAvatar: 'https://via.placeholder.com/40',
      date: '21 Sep 2023',
      time: '01:00 PM',
      status: 'Completed'
    },
    {
      key: '5',
      id: 'APT005',
      patientName: 'Paul Richard',
      patientAvatar: 'https://via.placeholder.com/40',
      doctorName: 'Dr. Ruby Perrin',
      doctorAvatar: 'https://via.placeholder.com/40',
      date: '23 Oct 2023',
      time: '03:00 PM',
      status: 'Pending'
    }
  ], []);

  const doctorColumns = useMemo(() => [
    {
      title: 'Doctor Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.avatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty',
      width: 100,
      render: (text: string) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Earned',
      dataIndex: 'earned',
      key: 'earned',
      width: 80,
      render: (text: string) => <Text strong style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      width: 100,
      render: (rating: number) => (
        <Space size="small">
          <StarFilled style={{ color: '#faad14', fontSize: '12px' }} />
          <StarFilled style={{ color: '#faad14', fontSize: '12px' }} />
          <StarFilled style={{ color: '#faad14', fontSize: '12px' }} />
          <Text style={{ fontSize: '11px' }}>{rating}</Text>
        </Space>
      )
    }
  ], []);

  const patientColumns = useMemo(() => [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.avatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (text: string) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Last Visit',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      width: 100,
      render: (text: any) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      width: 80,
      render: (text: any) => <Text strong style={{ fontSize: '12px' }}>{text}</Text>
    }
  ], []);

  const appointmentColumns = useMemo(() => [
    {
      title: 'Appointment ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: any) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 150,
      render: (text: any, record: any) => (
        <Space>
          <Avatar src={record.patientAvatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 150,
      render: (text: any, record: any) => (
        <Space>
          <Avatar src={record.doctorAvatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (text: any) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      render: (text: any) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    }
  ], []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        message.error('No authentication token found. Please login again.');
        return;
      }

      const response = await fetch('http://192.168.1.42:3000/users/AllUsers?type=doctor&status=approved', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDoctors(data.data);
      setDoctorsCount(data.data.length || 0);
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
      message.error('Failed to fetch doctors data');
      setDoctorsCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCardClick = useCallback((onClick: () => void) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
    };
  }, []);

  return (
    <>
      <AppHeader />
      <Layout className="min-h-screen">
        <SideHeader/>

        <Layout>
          <Header
            style={{
              backgroundColor: 'white',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 16px',
              height: '71px',
              marginTop: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <Title level={2} style={{ margin: 0, fontSize: '20px' }}>
                Welcome Admin!
              </Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>Dashboard</Text>
            </div>

            <Space size="middle" style={{ flexWrap: 'wrap' }}>
              <Input
                placeholder="Search here"
                prefix={<SearchOutlined />}
                style={{ width: '200px', minWidth: '150px' }}
              />
            </Space>
          </Header>

          <Content style={{ padding: '16px', marginTop: '8px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {statsData.map((stat, index) => (
                <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                  <Card
                    style={{
                      borderRadius: '8px',
                      textAlign: 'center',
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    hoverable
                    onClick={handleCardClick(stat.onClick)}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      position: 'relative'
                    }}>
                      {index === 0 && <TeamOutlined style={{ color: 'white', fontSize: '20px' }} />}
                      {index === 1 && <div style={{ color: 'white', fontSize: '20px' }}>📋</div>}
                      {index === 2 && <CalendarOutlined style={{ color: 'white', fontSize: '20px' }} />}
                      {index === 3 && <div style={{ color: 'white', fontSize: '20px' }}>📁</div>}
                    </div>
                    <Title level={3} style={{ margin: '0 0 4px 0', color: '#333', fontSize: '24px' }}>
                      {stat.value}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {stat.title}
                    </Text>
                    <div style={{
                      width: '100%',
                      height: '3px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '2px',
                      marginTop: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '70%',
                        height: '100%',
                        backgroundColor: stat.color,
                        borderRadius: '2px'
                      }} />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Card
                  title="Revenue"
                  style={{ borderRadius: '8px', height: 'auto', minHeight: '350px' }}
                >
                  <div style={{ width: '100%', height: '280px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#1890ff" stopOpacity={0.3} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#1890ff"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Card
                  title="Status"
                  style={{ borderRadius: '8px', height: 'auto', minHeight: '350px' }}
                >
                  <div style={{ width: '100%', height: '280px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={statusData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="orange"
                          stroke="#faad14"
                          strokeWidth={3}
                          dot={{ fill: '#faad14', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="blue"
                          stroke="#1890ff"
                          strokeWidth={3}
                          dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Card
                  title="Doctors List"
                  style={{ borderRadius: '8px' }}
                >
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={doctorColumns}
                      dataSource={doctorsList}
                      pagination={{
                        pageSize: 4,
                        size: 'small',
                        showSizeChanger: false,
                        showQuickJumper: false,
                        simple: true
                      }}
                      size="small"
                      scroll={{ x: 400 }}
                    />
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Card
                  title="Patients List"
                  style={{ borderRadius: '8px' }}
                >
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={patientColumns}
                      dataSource={patientsList}
                      pagination={{
                        pageSize: 4,
                        size: 'small',
                        showSizeChanger: false,
                        showQuickJumper: false,
                        simple: true
                      }}
                      size="small"
                      scroll={{ x: 400 }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  title={
                    <Space>
                      <Text strong>Appointment List</Text>
                    </Space>
                  }
                  style={{ borderRadius: '8px', marginTop: '19px' }}
                >
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={appointmentColumns}
                      dataSource={appointmentsList}
                      pagination={{
                        pageSize: 5,
                        size: 'small',
                        showSizeChanger: false,
                        showQuickJumper: false,
                        simple: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total} appointments`
                      }}
                      size="small"
                      scroll={{ x: 800 }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MedicalDashboard;