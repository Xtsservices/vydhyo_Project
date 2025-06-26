'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  theme,
  Table,
  Tag,
  Progress,
  message,
  Select,
} from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import { apiGet } from '@/app/Admin/app/auth/api';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
  change: string;
  onClick: () => void;
}

interface Doctor {
  key: string;
  name: string;
  specialty: string;
  appointments: number;
  rating: number;
  avatar: string;
}

interface Request {
  key: string;
  id: string;
  userName: string;
  userAvatar: string;
  type: string;
  date: string;
  status: string;
}

interface RevenueData {
  name: string;
  revenue: number;
}

interface AppointmentData {
  name: string;
  value: number;
  color: string;
}

interface OnboardingData {
  name: string;
  patients: number;
  doctors: number;
}

interface SalesData {
  name: string;
  online: number;
  offline: number;
}

interface DashboardData {
  success: boolean;
  doctors: {
    pending: number;
    approved: number;
    rejected: number;
  };
  messages: {
    open: number;
    inprogress: number;
    completed: number;
  };
  totalAmount: {
    today: number;
    week: number;
    month: number;
  };
  appointmentTypes: {
    'In-Person': number;
    Video: number;
    'home-visit': number;
  };
}

interface TooltipPayload {
  value: number;
  name: string;
}

// Dummy data for sales progress chart
const salesData: SalesData[] = [
  { name: 'Jan', online: 12000, offline: 8000 },
  { name: 'Feb', online: 15000, offline: 9000 },
  { name: 'Mar', online: 18000, offline: 11000 },
  { name: 'Apr', online: 20000, offline: 13000 },
  { name: 'May', online: 22000, offline: 14000 },
  { name: 'Jun', online: 25000, offline: 16000 },
];

// Dummy data for onboarding chart
const onboardingData: OnboardingData[] = [
  { name: 'Jan', patients: 120, doctors: 30 },
  { name: 'Feb', patients: 150, doctors: 40 },
  { name: 'Mar', patients: 180, doctors: 50 },
  { name: 'Apr', patients: 200, doctors: 60 },
  { name: 'May', patients: 220, doctors: 70 },
  { name: 'Jun', patients: 250, doctors: 80 },
];

const weeklyRevenueData: RevenueData[] = [
  { name: 'Mon', revenue: 12000 },
  { name: 'Tue', revenue: 15000 },
  { name: 'Wed', revenue: 8000 },
  { name: 'Thu', revenue: 18000 },
  { name: 'Fri', revenue: 22000 },
  { name: 'Sat', revenue: 25000 },
  { name: 'Sun', revenue: 20000 },
];

const monthlyRevenueData: RevenueData[] = [
  { name: 'Jan', revenue: 320000 },
  { name: 'Feb', revenue: 280000 },
  { name: 'Mar', revenue: 420000 },
  { name: 'Apr', revenue: 380000 },
  { name: 'May', revenue: 450000 },
  { name: 'Jun', revenue: 520000 },
];

const appointmentsData: AppointmentData[] = [
  { name: 'Completed', value: 450, color: '#52c41a' },
  { name: 'Scheduled', value: 180, color: '#1890ff' },
  { name: 'Cancelled', value: 45, color: '#ff4d4f' },
  { name: 'Rescheduled', value: 32, color: '#faad14' },
];

const popularDoctorsData: Doctor[] = [
  {
    key: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    appointments: 156,
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    key: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    appointments: 142,
    rating: 4.8,
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    key: '3',
    name: 'Dr. Emily Davis',
    specialty: 'Pediatrics',
    appointments: 128,
    rating: 4.7,
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    key: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    appointments: 115,
    rating: 4.6,
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
  {
    key: '5',
    name: 'Dr. Lisa Brown',
    specialty: 'Dermatology',
    appointments: 98,
    rating: 4.5,
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
];

const updatedRequests: Request[] = [
  {
    key: '1',
    id: 'REQ001',
    userName: 'John Doe',
    userAvatar: 'https://i.pravatar.cc/40?img=15',
    type: 'Profile Update',
    date: '24 Oct 2023',
    status: 'Approved',
  },
  {
    key: '2',
    id: 'REQ002',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/40?img=16',
    type: 'Document Upload',
    date: '23 Oct 2023',
    status: 'Pending',
  },
  {
    key: '3',
    id: 'REQ003',
    userName: 'Robert Brown',
    userAvatar: 'https://i.pravatar.cc/40?img=17',
    type: 'Profile Update',
    date: '22 Oct 2023',
    status: 'Rejected',
  },
];

const SuperAdminDashboard: React.FC = () => {
  const { token } = useToken();
  const router = useRouter();
  const [revenueTimeframe, setRevenueTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    success: false,
    doctors: { pending: 0, approved: 0, rejected: 0 },
    messages: { open: 0, inprogress: 0, completed: 0 },
    totalAmount: { today: 0, week: 0, month: 0 },
    appointmentTypes: { 'In-Person': 0, Video: 0, 'home-visit': 0 },
  });

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ Good Morning';
    if (hour < 18) return '🌤️ Good Afternoon';
    return '🌌 Good Evening';
  };

  const greeting = getGreeting();

  const fetchDashboardData = async (): Promise<void> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (!token) {
        message.warning('No access token found, redirecting to login');
        router.push('/login');
        return;
      }

      const response = await apiGet('/superAdmin/superAdminDashbaord');
      if (response.status === 200 && response.data.success) {
        setDashboardData(response.data);
      } else {
        message.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [router]);
  const firstRowStats: StatCard[] = [
    {
      title: 'Pending Approval',
      value: dashboardData.doctors.pending,
      icon: <UsergroupAddOutlined />,
      color: '#1890ff',
      change: '+8% this month',
      onClick: () => router.push('/SuperAdmin/app/doctorApproval'),
    },
    {
      title: 'Approved Doctors',
      value: dashboardData.doctors.approved,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      change: '+10% this month',
      onClick: () => router.push('/SuperAdmin/app/doctors?status=approved'),
    },
    {
      title: 'Rejected Doctors',
      value: dashboardData.doctors.rejected,
      icon: <CloseCircleOutlined />,
      color: '#ff4d4f',
      change: '-2% this month',
      onClick: () => router.push('/SuperAdmin/app/doctors?status=rejected'),
    },
  ];

  const secondRowStats: StatCard[] = [
    {
      title: 'Today Revenue',
      value: dashboardData.totalAmount.today
        ? Number(dashboardData.totalAmount.today).toFixed(2)
        : dashboardData.totalAmount.today,
      icon: <span style={{ fontSize: 20 }}>₹</span>,
      color: '#faad14',
      change: '+5% from yesterday',
      onClick: () => router.push('/SuperAdmin/app/revenue'),
    },
    {
      title: 'This Week Revenue',
      value: dashboardData.totalAmount.week
        ? Number(dashboardData.totalAmount.week).toFixed(2)
        : dashboardData.totalAmount.week,
      icon: <span style={{ fontSize: 20 }}>₹</span>,
      color: '#13c2c2',
      change: '+15% from last week',
      onClick: () => router.push('/SuperAdmin/app/revenue'),
    },
    {
      title: 'This Month Revenue',
      value: dashboardData.totalAmount.month
        ? Number(dashboardData.totalAmount.month).toFixed(2)
        : dashboardData.totalAmount.month,
      icon: <span style={{ fontSize: 20 }}>₹</span>,
      color: '#722ed1',
      change: '+25% this month',
      onClick: () => router.push('/SuperAdmin/app/revenue'),
    },
  ];

  const thirdRowStats: StatCard[] = [
    {
      title: 'Open Messages',
      value: dashboardData.messages.open,
      icon: <MessageOutlined />,
      color: '#1890ff',
      change: '+5% this week',
      onClick: () => router.push('/SuperAdmin/app/openMessages'),
    },
    {
      title: 'Closed Messages',
      value: dashboardData.messages.inprogress,
      icon: <MessageOutlined />,
      color: '#52c41a',
      change: '+8% this month',
      onClick: () => router.push('/SuperAdmin/app/openMessages'),
    },
    {
      title: 'Total Messages',
      value: dashboardData.messages.completed,
      icon: <MessageOutlined />,
      color: '#eb2f96',
      change: '+12% this month',
      onClick: () => router.push('/SuperAdmin/app/openMessages'),
    },
  ];

  const fourthRowStats: StatCard[] = [
    {
      title: 'In-Person',
      value: dashboardData.appointmentTypes['In-Person'],
      icon: <UserOutlined />,
      color: '#13c2c2',
      change: '+10% this month',
      onClick: () => router.push('/SuperAdmin/app/in-person-card-info'),
    },
    {
      title: 'Video',
      value: dashboardData.appointmentTypes.Video,
      icon: <VideoCameraOutlined />,
      color: '#fa8c16',
      change: '+15% this month',
      onClick: () => router.push('/SuperAdmin/app/video-card-info'),
    },
    {
      title: 'Home Visit',
      value: dashboardData.appointmentTypes['home-visit'],
      icon: <HomeOutlined />,
      color: '#722ed1',
      change: '+5% this month',
      onClick: () => router.push('/SuperAdmin/app/home-visit-card-info'),
    },
  ];

  const updatedRequestsColumns: ColumnsType<Request> = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => <Text style={{ fontSize: '12px' }}>{text}</Text>,
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (text: string, record: Request) => (
        <Space>
          <Avatar src={record.userAvatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Request Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (text: string) => <Text style={{ fontSize: '12px' }}>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  const doctorColumns: ColumnsType<Doctor> = [
    {
      title: 'Doctor',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Doctor) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {record.specialty}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Appointments',
      dataIndex: 'appointments',
      key: 'appointments',
      render: (appointments: number) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{appointments}</div>
          {/* <Progress percent={Math.min(appointments / 2, 100)} size="small" showInfo={false} /> */}
        </div>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (_: any, record: Doctor) => (
        <Tag color="geekblue">
          ₹{(record.appointments * 500).toLocaleString()}
        </Tag>
      ),
    },
    // {
    //   title: 'Rating',
    //   dataIndex: 'rating',
    //   key: 'rating',
    //   render: (rating: number) => (
    //     <Tag color="gold">⭐ {rating}</Tag>
    //   ),
    // },
  ];

  return (
    <>
      <AppHeader />
      <Layout className="min-h-screen">
        <SideHeader selectedKey="dashboard" />
        <Layout>
          <Header
            style={{
              backgroundColor: '#f5f5f5',
              padding: '0 16px',
              height: '71px',
              marginTop: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' ,display: 'flex',justifyContent:"space-between", alignItems: 'center'}}>
              <Title level={2} style={{ margin: 0, fontSize: '30px' }}>
                Welcome Super Admin
              </Title>
              <Text style={{ fontSize: '18px', display: 'block', marginTop: 4 }}>
                {greeting} !
              </Text>
            </div>
            {/* <Space size="middle" style={{ flexWrap: 'wrap' }}>
              <Button
                type="primary"
                icon={<UsergroupAddOutlined />}
                style={{ backgroundColor: '#1890ff' }}
                onClick={() => router.push('/SuperAdmin/app/doctor-approval')}
              >
                Pending Approval
              </Button>
              <Input
                placeholder="Search here"
                prefix={<SearchOutlined />}
                style={{ width: '200px', minWidth: '150px' }}
              />
            </Space> */}
          </Header>

          <Content
            style={{
              padding: '20px',
              marginTop: '10px',
              backgroundColor: '#f5f5f5',
              minHeight: 'calc(100vh - 64px)',
            }}
          >
            {/* First Row: New Doctors, Approved Doctors, Rejected Doctors */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {firstRowStats.map((stat, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    onClick={stat.onClick}
                  >
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={
                        React.isValidElement(stat.icon)
                          ? React.cloneElement(stat.icon, { style: { color: stat.color } })
                          : <span style={{ color: stat.color }}>{stat.icon}</span>
                      }
                      valueStyle={{ color: stat.color, fontSize: '24px' }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {/* {stat.change} */}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Second Row: Today Revenue, This Week Revenue, This Month Revenue */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {secondRowStats.map((stat, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    onClick={stat.onClick}
                  >
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={
                        React.isValidElement(stat.icon)
                          ? React.cloneElement(stat.icon, { style: { color: stat.color } })
                          : <span style={{ color: stat.color }}>{stat.icon}</span>
                      }
                      valueStyle={{ color: stat.color, fontSize: '24px' }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {/* {stat.change} */}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Third Row: Open Messages, Closed Messages, Total Messages */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {thirdRowStats.map((stat, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    onClick={stat.onClick}
                  >
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                      valueStyle={{ color: stat.color, fontSize: '24px' }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {/* {stat.change} */}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Fourth Row: In-Person, Video, Home Visit */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {fourthRowStats.map((stat, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    onClick={stat.onClick}
                  >
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                      valueStyle={{ color: stat.color, fontSize: '24px' }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {/* {stat.change} */}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Revenue Summary */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} lg={16}>
                <Card
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Revenue Summary</span>
                      <Select
                        value={revenueTimeframe}
                        onChange={(value: 'weekly' | 'monthly' | 'yearly') => setRevenueTimeframe(value)}
                        style={{ width: 120 }}
                      >
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="yearly">Yearly</Option>
                      </Select>
                    </div>
                  }
                  style={{ borderRadius: '8px' }}
                >
                  <div style={{ width: '100%', height: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={revenueTimeframe === 'weekly' ? weeklyRevenueData : monthlyRevenueData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#1890ff" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          content={({
                            active,
                            payload,
                            label,
                          }: {
                            active?: boolean;
                            payload?: TooltipPayload[];
                            label?: string;
                          }) =>
                            active && payload && payload.length ? (
                              <div
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  boxShadow: 'none',
                                  padding: 0,
                                  margin: 0,
                                  color: '#1890ff',
                                  fontWeight: 600,
                                  fontSize: 16,
                                  pointerEvents: 'none',
                                }}
                              >
                                <span>₹{payload[0]?.value?.toLocaleString()}</span>
                              </div>
                            ) : null
                          }
                          cursor={{ stroke: '#1890ff', strokeWidth: 2, opacity: 0.2 }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#1890ff"
                          fillOpacity={1}
                          fill="url(#revenueColor)"
                          strokeWidth={3}
                          dot={{ fill: '#1890ff', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7 }}
                          name="Revenue"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={8}>
                      <Statistic
                        title="Total Revenue"
                        value={
                          (revenueTimeframe === 'weekly'
                            ? weeklyRevenueData.reduce((sum, d) => sum + d.revenue, 0)
                            : monthlyRevenueData.reduce((sum, d) => sum + d.revenue, 0)
                          ).toLocaleString()
                        }
                        prefix="₹"
                        valueStyle={{ color: '#1890ff', fontWeight: 600 }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Highest"
                        value={
                          (revenueTimeframe === 'weekly'
                            ? Math.max(...weeklyRevenueData.map((d) => d.revenue))
                            : Math.max(...monthlyRevenueData.map((d) => d.revenue))
                          ).toLocaleString()
                        }
                        prefix="₹"
                        valueStyle={{ color: '#52c41a', fontWeight: 600 }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Lowest"
                        value={
                          (revenueTimeframe === 'weekly'
                            ? Math.min(...weeklyRevenueData.map((d) => d.revenue))
                            : Math.min(...monthlyRevenueData.map((d) => d.revenue))
                          ).toLocaleString()
                        }
                        prefix="₹"
                        valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Appointments Overview */}
              <Col xs={24} lg={8}>
                <Card title="Appointments Overview" style={{ borderRadius: '8px' }}>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={false}
                        >
                          {appointmentsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {appointmentsData.map((item) => (
                      <div key={item.name} style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 16,
                            height: 16,
                            backgroundColor: item.color,
                            borderRadius: '50%',
                            marginRight: 8,
                            border: '1px solid #e0e0e0',
                          }}
                        />
                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                        <span style={{ marginLeft: 8, color: '#888' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Patient & Doctor Onboarding and Sales Progress */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} lg={12}>
                <Card title="Patient & Doctor Onboarding" style={{ borderRadius: '8px' }}>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={onboardingData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="patients" fill="#1890ff" name="Patients" />
                        <Bar dataKey="doctors" fill="#52c41a" name="Doctors" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Sales Progress" style={{ borderRadius: '8px' }}>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="online"
                          stroke="#faad14"
                          strokeWidth={3}
                          dot={{ fill: '#faad14', strokeWidth: 2, r: 6 }}
                          name="Online Sales"
                        />
                        <Line
                          type="monotone"
                          dataKey="offline"
                          stroke="#eb2f96"
                          strokeWidth={3}
                          dot={{ fill: '#eb2f96', strokeWidth: 2, r: 6 }}
                          name="Offline Sales"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Popular Doctors and New Requests */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} lg={12}>
                <Card title="Popular Doctors" style={{ borderRadius: '8px' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={doctorColumns}
                      dataSource={popularDoctorsData}
                      pagination={{ pageSize: 5, size: 'small' }}
                      size="small"
                      scroll={{ x: 400 }}
                    />
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="New Requests" style={{ borderRadius: '8px' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={updatedRequestsColumns}
                      dataSource={updatedRequests}
                      pagination={{ pageSize: 5, size: 'small' }}
                      size="small"
                      scroll={{ x: 400 }}
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

export default SuperAdminDashboard;