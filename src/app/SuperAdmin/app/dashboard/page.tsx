'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';
import type { Dayjs } from 'dayjs';
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
  DatePicker,
  Progress,
  message,
  Switch,
  Select
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  SearchOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
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
  Bar
} from 'recharts';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

const SuperAdminDashboard = () => {
  const { token } = useToken();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [revenueTimeframe, setRevenueTimeframe] = useState('weekly');
  const [signinsTimeframe, setSigninsTimeframe] = useState('weekly');
  const [patientsTimeframe, setPatientsTimeframe] = useState('weekly');
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Top statistics data
  const [topStats, setTopStats] = useState([
    {
      title: 'New Sign-ins',
      value: 1234,
      icon: <UserAddOutlined />,
      color: '#1890ff',
      change: '+12% from last week',
      // onClick: () => {}, // No navigation
    },
    {
      title: 'New Doctors',
      value: 45,
      icon: <MedicineBoxOutlined />,
      color: '#722ed1',
      change: '+8% this month',
      onClick: () => router.push('/SuperAdmin/app/doctors'), // Navigate to doctors
    },
    {
      title: 'New Patients',
      value: 156,
      icon: <TeamOutlined />,
      color: '#fa8c16',
      change: '+15% this month',
      onClick: () => router.push('/SuperAdmin/app/patients'), // Navigate to patienys
    },
    {
      title: 'New Messages',
      value: 89,
      icon: <MessageOutlined />,
      color: '#13c2c2',
      change: '+5% this week',
      // onClick: () => {}, // No navigation
    },
    {
      title: 'New Updates',
      value: 89,
      icon: <MessageOutlined />,
      color: '#13c2c2',
      change: '+5% this week',
      // onClick: () => {}, // No navigation
    },
    {
      title: 'Total Revenue',
      value: 89,
      icon: <span style={{ fontSize: 20 }}>₹</span>,
      color: '#13c2c2',
      change: '+5% this week',
      onClick: () => router.push('/SuperAdmin/app/revenue'),
    }
  ]);

  // Secondary statistics data
  const [secondaryStats, setSecondaryStats] = useState([
    {
      title: 'Active Doctors',
      value: 78,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      description: 'At least 1 appointment this week'
    },
    {
      title: 'Active Patients',
      value: 234,
      icon: <HeartOutlined />,
      color: '#eb2f96',
      description: 'Recent activity this week'
    },
    {
      title: 'Total Doctors',
      value: 125,
      icon: <MedicineBoxOutlined />,
      color: '#13c2c2',
      description: 'Total onboarded'
    }
  ]);

  // Define type for statsData items
  type StatCard = {
    title: string;
    value: number | string;
    color: string;
    onClick: () => void;
    enabled: boolean;
  };

  // Main stats cards (original)
  const [statsData, setStatsData] = useState<StatCard[]>([
    // {
    //   title: 'Doctors',
    //   value: 0,
    //   color: '#1890ff',
    //   onClick: () => router.push('/Admin/app/doctors'),
    //   enabled: true
    // },
    // {
    //   title: 'Patients',
    //   value: 487,
    //   color: '#52c41a',
    //   onClick: () => router.push('/Admin/app/patients'),
    //   enabled: true
    // },
    // {
    //   title: 'Appointment',
    //   value: 485,
    //   color: '#ff4d4f',
    //   onClick: () => router.push('/Admin/app/appointments'),
    //   enabled: true
    // },
    // {
    //   title: 'Revenue',
    //   value: '$62523',
    //   color: '#faad14',
    //   onClick: () => router.push('/Admin/app/doctors'),
    //   enabled: true
    // }
  ]);

  // Revenue chart data (weekly/monthly)
  const weeklyRevenueData = [
    { name: 'Mon', revenue: 12000 },
    { name: 'Tue', revenue: 15000 },
    { name: 'Wed', revenue: 8000 },
    { name: 'Thu', revenue: 18000 },
    { name: 'Fri', revenue: 22000 },
    { name: 'Sat', revenue: 25000 },
    { name: 'Sun', revenue: 20000 }
  ];

  const monthlyRevenueData = [
    { name: 'Jan', revenue: 320000 },
    { name: 'Feb', revenue: 280000 },
    { name: 'Mar', revenue: 420000 },
    { name: 'Apr', revenue: 380000 },
    { name: 'May', revenue: 450000 },
    { name: 'Jun', revenue: 520000 }
  ];

  // Appointments pie chart data
  const appointmentsData = [
    { name: 'Completed', value: 450, color: '#52c41a' },
    { name: 'Scheduled', value: 180, color: '#1890ff' },
    { name: 'Cancelled', value: 45, color: '#ff4d4f' },
    { name: 'Rescheduled', value: 32, color: '#faad14' }
  ];

  // Popular doctors data
  const popularDoctorsData = [
    {
      key: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      appointments: 156,
      rating: 4.9,
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      key: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      appointments: 142,
      rating: 4.8,
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      key: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      appointments: 128,
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      key: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      appointments: 115,
      rating: 4.6,
      avatar: 'https://i.pravatar.cc/40?img=4'
    },
    {
      key: '5',
      name: 'Dr. Lisa Brown',
      specialty: 'Dermatology',
      appointments: 98,
      rating: 4.5,
      avatar: 'https://i.pravatar.cc/40?img=5'
    }
  ];

  // Patients list data
  const patientsList = [
    {
      key: '1',
      name: 'Charlene Reed',
      phone: '8286329170',
      lastVisit: '20 Oct 2023',
      paid: '$100.00',
      avatar: 'https://i.pravatar.cc/40?img=6'
    },
    {
      key: '2',
      name: 'Travis Trimble',
      phone: '2077299974',
      lastVisit: '22 Oct 2023',
      paid: '$200.00',
      avatar: 'https://i.pravatar.cc/40?img=7'
    },
    {
      key: '3',
      name: 'Carl Kelly',
      phone: '2607247769',
      lastVisit: '21 Oct 2023',
      paid: '$250.00',
      avatar: 'https://i.pravatar.cc/40?img=8'
    },
    {
      key: '4',
      name: 'Michelle Fairfax',
      phone: '5043686874',
      lastVisit: '21 Sep 2023',
      paid: '$150.00',
      avatar: 'https://i.pravatar.cc/40?img=9'
    }
  ];

  // Appointment List Data
  const appointmentsList = [
    {
      key: '1',
      id: 'APT001',
      patientName: 'Charlene Reed',
      patientAvatar: 'https://i.pravatar.cc/40?img=10',
      doctorName: 'Dr. Sarah Johnson',
      doctorAvatar: 'https://i.pravatar.cc/40?img=1',
      date: '20 Oct 2023',
      time: '10:00 AM',
      status: 'Completed'
    },
    {
      key: '2',
      id: 'APT002',
      patientName: 'Travis Trimble',
      patientAvatar: 'https://i.pravatar.cc/40?img=11',
      doctorName: 'Dr. Michael Chen',
      doctorAvatar: 'https://i.pravatar.cc/40?img=2',
      date: '22 Oct 2023',
      time: '11:00 AM',
      status: 'Pending'
    },
    {
      key: '3',
      id: 'APT003',
      patientName: 'Carl Kelly',
      patientAvatar: 'https://i.pravatar.cc/40?img=12',
      doctorName: 'Dr. Emily Davis',
      doctorAvatar: 'https://i.pravatar.cc/40?img=3',
      date: '21 Oct 2023',
      time: '09:30 AM',
      status: 'Cancelled'
    },
    {
      key: '4',
      id: 'APT004',
      patientName: 'Michelle Fairfax',
      patientAvatar: 'https://i.pravatar.cc/40?img=13',
      doctorName: 'Dr. James Wilson',
      doctorAvatar: 'https://i.pravatar.cc/40?img=4',
      date: '21 Sep 2023',
      time: '01:00 PM',
      status: 'Completed'
    },
    {
      key: '5',
      id: 'APT005',
      patientName: 'Paul Richard',
      patientAvatar: 'https://i.pravatar.cc/40?img=14',
      doctorName: 'Dr. Lisa Brown',
      doctorAvatar: 'https://i.pravatar.cc/40?img=5',
      date: '23 Oct 2023',
      time: '03:00 PM',
      status: 'Pending'
    }
  ];

  // Table columns definitions
  const updatedRequestsColumns = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (text, record) => (
        <Space>
          <Avatar src={record.userAvatar} size="small" />
          <Text strong style={{ fontSize: '12px' }}>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Request Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    }
  ];

  // Example data for updated requests
  const updatedRequests = [
    {
      key: '1',
      id: 'REQ001',
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/40?img=15',
      type: 'Profile Update',
      date: '24 Oct 2023',
      status: 'Approved'
    },
    {
      key: '2',
      id: 'REQ002',
      userName: 'Jane Smith',
      userAvatar: 'https://i.pravatar.cc/40?img=16',
      type: 'Document Upload',
      date: '23 Oct 2023',
      status: 'Pending'
    },
    {
      key: '3',
      id: 'REQ003',
      userName: 'Robert Brown',
      userAvatar: 'https://i.pravatar.cc/40?img=17',
      type: 'Profile Update',
      date: '22 Oct 2023',
      status: 'Rejected'
    }
  ];

  const doctorColumns = [
    {
      title: 'Doctor',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '11px' }}>{record.specialty}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Appointments',
      dataIndex: 'appointments',
      key: 'appointments',
      render: (appointments) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{appointments}</div>
          <Progress percent={Math.min(appointments / 2, 100)} size="small" showInfo={false} />
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color="gold">⭐ {rating}</Tag>
      ),
    }
  ];

  const patientColumns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => (
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
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Last Visit',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      width: 100,
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      width: 80,
      render: (text) => <Text strong style={{ fontSize: '12px' }}>{text}</Text>
    }
  ];

  const appointmentColumns = [
    {
      title: 'Appointment ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 150,
      render: (text, record) => (
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
      render: (text, record) => (
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
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      render: (text) => <Text style={{ fontSize: '12px' }}>{text}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    }
  ];

  // API fetch function
  const fetchUsers = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (!token) {
        console.warn('/login');
        return;
      }

      const response = await fetch('http://192.168.1.42:3000/users/AllUsers?type=doctor&status=approved', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`API Error: ${response.status} - ${errText}`);
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data || !Array.isArray(data.data)) {
        throw new Error('Unexpected API response format');
      }

      setDoctors(data.data);
      setDoctorsCount(data.data.length);

      console.log('Fetched doctors:', data.data);
      // setStatsData((prev) => {
      //   const updated = [...prev];
      //   updated[0].value = data?.data?.length;
      //   return updated;
      // });

    } catch (error) {
      console.error('fetchUsers error:', error);
      message.error('Failed to load doctor data');
    } finally {
      // setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleNavigation = (index, checked) => {
    setStatsData(prevStats => {
      const newStats = [...prevStats];
      newStats[index].enabled = checked;
      return newStats;
    });
  };

  const handleCardClick = (index) => {
    const stat = statsData[index];
    if (stat.enabled) {
      stat.onClick();
    } else {
      message.warning(`Navigation to ${stat.title} is currently disabled`);
    }
  };

  return (
    <>
      <AppHeader />
      <Layout className="min-h-screen">
        <SideHeader  selectedKey = 'dashboard'/>

        <Layout>
          <Header
            style={{
              backgroundColor: '#f5f5f5',
              // borderBottom: '1px solid #f0f0f0',
              padding: '0 16px',
              height: '71px',
              marginTop: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <Title level={2} style={{ margin: 0, fontSize: '30px' }}>
                Welcome SuperAdmin
              </Title>
              <Text type="secondary" style={{ margin: 10, marginBottom:'0px', fontSize: '14px' }}>Super Admin Dashboard</Text>
            </div>

            {/* Pending Approval */}
            <Space size="middle" style={{ flexWrap: 'wrap' }}>
              <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              style={{ backgroundColor: '#1890ff' }}
              onClick={() => {
                router.push('/SuperAdmin/app/doctorApproval');
              }}
              >
              Pending Approval
              </Button>
              <Input
              placeholder="Search here"
              prefix={<SearchOutlined />}
              style={{ width: '200px', minWidth: '150px' }}
              />
            </Space>
          </Header>

          <Content style={{ padding: '20px', marginTop: '10px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>

            {/* Top Statistics Cards */}

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {/* New Sign-ins Card */}
                <Col xs={24} sm={12} md={8}>
                <Card style={{ borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={4} style={{ margin: 0 }}>New Sign‑ins</Title>
                  <Select
                    size="small"
                    value={signinsTimeframe}
                    onChange={(val) => {
                    setSigninsTimeframe(val);
                    message.info(`Timeframe: ${val}`);
                    }}
                    style={{ width: 81 }}
                  >
                    <Option value="today">Today</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                    <Option value="calendar">Calendar</Option>
                  </Select>
                  </div>
                  {signinsTimeframe === 'calendar' && (
                  <DatePicker
                    style={{ marginTop: 8 }}
                    onChange={(date) => {
                    // setSelectedDate(date);
                    message.success(`Selected date: ${date?.format('YYYY-MM-DD')}`);
                    }}
                  />
                  )}
                  <Statistic
                  value={
                    signinsTimeframe === 'today'
                    ? 56
                    : signinsTimeframe === 'weekly'
                    ? 1234
                    : signinsTimeframe === 'monthly'
                    ? 4321
                    : signinsTimeframe === 'yearly'
                    ? 15000
                    : 1234 // default
                  }
                  prefix={<UserAddOutlined style={{ color: '#1890ff' }} />}
                  valueStyle={{ color: '#1890ff' }}
                  />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                  {signinsTimeframe === 'today'
                    ? '+2% from yesterday'
                    : signinsTimeframe === 'weekly'
                    ? '+12% from last week'
                    : signinsTimeframe === 'monthly'
                    ? '+8% from last month'
                    : signinsTimeframe === 'yearly'
                    ? '+20% from last year'
                    : '+12% from last week'}
                  </Text>
                </Card>
                </Col>

                {/* New Doctors Card */}
                <Col xs={24} sm={12} md={8}>
                  <Card
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    hoverable
                    onClick={(e) => {
                      // Prevent navigation if dropdown or datepicker is clicked
                      if (
                        (e.target as HTMLElement).closest('.no-card-nav')
                      ) return;
                      if (typeof topStats[1].onClick === 'function') {
                        topStats[1].onClick();
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Title level={4} style={{ margin: 0 }}>New Doctors</Title>
                      <Select
                        className="no-card-nav"
                        size="small"
                        value={revenueTimeframe}
                        onChange={(val) => {
                          setRevenueTimeframe(val);
                          message.info(`Timeframe: ${val}`);
                        }}
                        style={{ width: 81 }}
                        onClick={e => e.stopPropagation()}
                      >
                        <Option value="today">Today</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="yearly">Yearly</Option>
                        <Option value="calendar">Calendar</Option>
                      </Select>
                    </div>
                    {revenueTimeframe === 'calendar' && (
                      <DatePicker
                        className="no-card-nav"
                        style={{ marginTop: 8 }}
                        onChange={(date) => {
                          // setSelectedDate(date);
                          message.success(`Selected date: ${date?.format('YYYY-MM-DD')}`);
                        }}
                        onClick={e => e.stopPropagation()}
                      />
                    )}
                    <Statistic
                      value={
                        revenueTimeframe === 'weekly'
                          ? 45
                          : revenueTimeframe === 'monthly'
                          ? 180
                          : revenueTimeframe === 'yearly'
                          ? 1200
                          : 45 // default
                      }
                      prefix={React.cloneElement(topStats[1].icon, { style: { color: topStats[1].color } })}
                      valueStyle={{ color: topStats[1].color }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {revenueTimeframe === 'weekly'
                        ? '+8% this week'
                        : revenueTimeframe === 'monthly'
                        ? '+32% this month'
                        : revenueTimeframe === 'yearly'
                        ? '+96% this year'
                        : topStats[1].change}
                    </Text>
                  </Card>
                </Col>

                {/* New Patients Card */}
                <Col xs={24} sm={12} md={8}>
                <Card
                  style={{ borderRadius: '8px', cursor: 'pointer' }}
                  hoverable
                  onClick={e => {
                  // Prevent navigation if dropdown or datepicker is clicked
                  if ((e.target as HTMLElement).closest('.no-card-nav')) return;
                  if (typeof topStats[2].onClick === 'function') {
                    topStats[2].onClick();
                  }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={4} style={{ margin: 0 }}>New Patients</Title>
                  <Select
                    className="no-card-nav"
                    size="small"
                    value={patientsTimeframe}
                    onChange={val => {
                    setPatientsTimeframe(val);
                    message.info(`Timeframe: ${val}`);
                    }}
                    style={{ width: 81 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <Option value="today">Today</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                    <Option value="calendar">Calendar</Option>
                  </Select>
                  </div>
                  {patientsTimeframe === 'calendar' && (
                  <DatePicker
                    className="no-card-nav"
                    style={{ marginTop: 8 }}
                    onChange={date => {
                    // setPatientsSelectedDate(date);
                    message.success(`Selected date: ${date?.format('YYYY-MM-DD')}`);
                    }}
                    onClick={e => e.stopPropagation()}
                  />
                  )}
                  <Statistic
                  value={
                    patientsTimeframe === 'today'
                    ? 12
                    : patientsTimeframe === 'weekly'
                    ? 156
                    : patientsTimeframe === 'monthly'
                    ? 600
                    : patientsTimeframe === 'yearly'
                    ? 7200
                    : 156 // default
                  }
                  prefix={React.cloneElement(topStats[2].icon, { style: { color: topStats[2].color } })}
                  valueStyle={{ color: topStats[2].color }}
                  />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                  {patientsTimeframe === 'today'
                    ? '+1% from yesterday'
                    : patientsTimeframe === 'weekly'
                    ? '+15% this week'
                    : patientsTimeframe === 'monthly'
                    ? '+60% this month'
                    : patientsTimeframe === 'yearly'
                    ? '+180% this year'
                    : topStats[2].change}
                  </Text>
                </Card>
                </Col>

              {/* The rest of the topStats cards */}
              {topStats.slice(3).map((stat, index) => (
                <Col xs={24} sm={12} md={8} key={index + 3}>
                  <Card style={{ borderRadius: '8px' }}>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                      valueStyle={{ color: stat.color }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{stat.change}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* Secondary Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {secondaryStats.map((stat, index) => (
                <Col xs={24} sm={8} key={index}>
                  <Card style={{ borderRadius: '8px' }}>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                      valueStyle={{ color: stat.color }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{stat.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Original Stats Cards with Toggle */}
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
                      cursor: stat.enabled ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                      opacity: stat.enabled ? 1 : 0.7,
                      position: 'relative'
                    }}
                    hoverable={stat.enabled}
                    onClick={() => handleCardClick(index)}
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
                    }}>
                      {index === 0 && <TeamOutlined style={{ color: 'white', fontSize: '20px' }} />}
                      {index === 1 && <UserOutlined style={{ color: 'white', fontSize: '20px' }} />}
                      {index === 2 && <CalendarOutlined style={{ color: 'white', fontSize: '20px' }} />}
                      {index === 3 && <DollarOutlined style={{ color: 'white', fontSize: '20px' }} />}
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
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px'
                    }}>
                      <Switch
                        size="small"
                        checked={stat.enabled}
                        onChange={(checked) => handleToggleNavigation(index, checked)}
                        checkedChildren="On"
                        unCheckedChildren="Off"
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {/* Revenue Chart - Detailed View */}
              <Col xs={24} lg={16}>
                <Card
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Revenue Summary</span>
                      <Select
                        value={revenueTimeframe}
                        onChange={setRevenueTimeframe}
                        style={{ width: 120 }}
                      >
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="yearly">Yearly</Option>
                      </Select>
                    </div>
                  }
                  // style={{ borderRadius: '8px' }}
                  // extra={
                  //   <Text type="secondary" style={{ fontSize: 12 }}>
                  //     {revenueTimeframe === 'weekly'
                  //       ? 'Showing daily revenue for this week'
                  //       : revenueTimeframe === 'monthly'
                  //         ? 'Showing monthly revenue for this year'
                  //         : 'Showing yearly revenue'}
                  //   </Text>
                  // }
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
                          tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                        />
                        {/* Custom Tooltip: only show value near dot, not in a box */}
                        <Tooltip
                          content={({ active, payload, label }) =>
                            active && payload && payload.length ? (
                              <div style={{
                                background: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                padding: 0,
                                margin: 0,
                                color: '#1890ff',
                                fontWeight: 600,
                                fontSize: 16,
                                pointerEvents: 'none'
                              }}>
                                <span>
                                  ₹{payload[0]?.value?.toLocaleString()}
                                </span>
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
                            ? Math.max(...weeklyRevenueData.map(d => d.revenue))
                            : Math.max(...monthlyRevenueData.map(d => d.revenue))
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
                            ? Math.min(...weeklyRevenueData.map(d => d.revenue))
                            : Math.min(...monthlyRevenueData.map(d => d.revenue))
                          ).toLocaleString()
                        }
                        prefix="₹"
                        valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

                {/* Appointments Pie Chart */}
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
                      label={false} // Hide labels on the pie
                      >
                      {appointmentsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Custom legend below the chart */}
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {appointmentsData.map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                      <span style={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      backgroundColor: item.color,
                      borderRadius: '50%',
                      marginRight: 8,
                      border: '1px solid #e0e0e0'
                      }} />
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                      <span style={{ marginLeft: 8, color: '#888' }}>{item.value}</span>
                    </div>
                    ))}
                  </div>
                  </Card>
                </Col>
            </Row>

            {/* Patient, doctor onboarding bar Chart and Sales Double Bar Chart */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {/* Patient & Doctor Onboarding Bar Chart */}
              <Col xs={24} lg={12}>
                <Card
                  title="Patient & Doctor Onboarding"
                  style={{ borderRadius: '8px' }}
                >
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Jan', patients: 30, doctors: 10 },
                          { name: 'Feb', patients: 45, doctors: 15 },
                          { name: 'Mar', patients: 60, doctors: 20 },
                          { name: 'Apr', patients: 50, doctors: 18 },
                          { name: 'May', patients: 70, doctors: 25 },
                          { name: 'Jun', patients: 80, doctors: 30 },
                        ]}
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

              {/* Sales Line Chart */}
              <Col xs={24} lg={12}>
                <Card
                  title="Sales Progress"
                  style={{ borderRadius: '8px' }}
                >
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { name: 'Jan', online: 800, offline: 400 },
                          { name: 'Feb', online: 1200, offline: 900 },
                          { name: 'Mar', online: 1100, offline: 700 },
                          { name: 'Apr', online: 1600, offline: 1000 },
                          { name: 'May', online: 1800, offline: 1400 },
                          { name: 'Jun', online: 2000, offline: 900 },
                          { name: 'Jul', online: 2200, offline: 1300 },
                        ]}
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



            {/* Tables Row */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {/* Popular Doctors */}
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

              {/* Updated Requests */}
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

            {/* Appointments Table - Full Width */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="Appointments" style={{ borderRadius: '8px' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <Table
                      columns={appointmentColumns}
                      dataSource={appointmentsList}
                      pagination={{
                        pageSize: 5,
                        size: 'small',
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

export default SuperAdminDashboard;


