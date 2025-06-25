'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../../components/header';

import { 
  Layout, 
  Menu, 
  Card, 
  Table, 
  Button, 
  Input,
  Space,
  Typography,
  theme,
  Avatar,
  Tag,
  Checkbox,
  Pagination,
  Tooltip,
  Dropdown,
  Badge
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
  HomeOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  MoreOutlined,
  FilterOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const ClinicsPage = () => {
  const { token } = useToken();
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard')
    },
    {
      key: 'clinics',
      icon: <HomeOutlined />,
      label: 'Clinics',
      onClick: () => router.push('/clinics')
    },
    {
      key: 'doctors',
      icon: <TeamOutlined />,
      label: 'Doctors',
      onClick: () => router.push('/doctors')
    },
    {
      key: 'patients',
      icon: <UserOutlined />,
      label: 'Patients',
      onClick: () => router.push('/patients')
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: 'Appointments',
      onClick: () => router.push('/appointments')
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
      onClick: () => router.push('/reports')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/settings')
    }
  ];

  const clinicsData = [
    {
      key: '1',
      id: 'MH',
      clinicName: 'Metro Health Center',
      specialty: 'Primary Care',
      doctors: 12,
      location: 'New York, NY',
      contact: '+1 234-567-8900',
      email: 'contact@metro.com',
      revenue: 125000,
      registered: 'Jan 15, 2024',
      status: 'Active',
      color: '#1890ff'
    },
    {
      key: '2',
      id: 'SM',
      clinicName: 'Sunrise Medical',
      specialty: 'Specialized Care',
      doctors: 8,
      location: 'Los Angeles, CA',
      contact: '+1 987-654-3210',
      email: 'info@sunrise.com',
      revenue: 89500,
      registered: 'Feb 03, 2024',
      status: 'Pending',
      color: '#fa8c16'
    },
    {
      key: '3',
      id: 'CC',
      clinicName: 'Central Clinic',
      specialty: 'Family Medicine',
      doctors: 15,
      location: 'Chicago, IL',
      contact: '+1 555-123-4567',
      email: 'hello@central.com',
      revenue: 156200,
      registered: 'Dec 20, 2023',
      status: 'Active',
      color: '#52c41a'
    },
    {
      key: '4',
      id: 'CH',
      clinicName: 'City Hospital',
      specialty: 'Emergency Care',
      doctors: 25,
      location: 'Miami, FL',
      contact: '+1 444-555-6666',
      email: 'admin@cityhospital.com',
      revenue: 245000,
      registered: 'Nov 10, 2023',
      status: 'Active',
      color: '#1890ff'
    },
    {
      key: '5',
      id: 'WC',
      clinicName: 'Wellness Center',
      specialty: 'Preventive Care',
      doctors: 6,
      location: 'Seattle, WA',
      contact: '+1 333-444-5555',
      email: 'info@wellness.com',
      revenue: 67800,
      registered: 'Mar 22, 2024',
      status: 'Pending',
      color: '#fa8c16'
    }
  ];

  const actionMenuItems = [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />
    },
    {
      key: 'edit',
      label: 'Edit Clinic',
      icon: <EditOutlined />
    },
    {
      key: 'download',
      label: 'Download Report',
      icon: <DownloadOutlined />
    }
  ];

  const columns = [
    {
      title: (
        <Checkbox 
          checked={selectedRowKeys.length === clinicsData.length}
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < clinicsData.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(clinicsData.map(item => item.key));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: 'select',
      key: 'select',
      width: 50,
      render: (_: any, record: { key: string; }) => (
        <Checkbox 
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys([...selectedRowKeys, record.key]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key));
            }
          }}
        />
      )
    },
    {
      title: 'Clinic Name',
      dataIndex: 'clinicName',
      key: 'clinicName',
      render: (text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, record: { color: any; id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; specialty: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <Space>
          <Avatar 
            size={32} 
            style={{ backgroundColor: record.color }}
          >
            {record.id}
          </Avatar>
          <div>
            <Text strong style={{ display: 'block' }}>{text}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.specialty}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Doctors',
      dataIndex: 'doctors',
      key: 'doctors',
      align: 'center',
      render: (count: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => (
        <Text strong>{count}</Text>
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (phone: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, record: { email: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div>
          <Text style={{ display: 'block' }}>{phone}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.email}
          </Text>
        </div>
      )
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (amount: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <Text strong>${amount.toLocaleString()}</Text>
      )
    },
    {
      title: 'Registered',
      dataIndex: 'registered',
      key: 'registered'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
        const colors = {
          'Active': '#52c41a',
          'Pending': '#faad14',
          'Inactive': '#ff4d4f'
        };
        return <Tag color={colors[status as 'Active' | 'Pending' | 'Inactive']}>{status}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_: any) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
            />
          </Tooltip>
          <Dropdown
            menu={{ items: actionMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />} 
              size="small"
            />
          </Dropdown>
        </Space>
      )
    }
  ];

  const filteredData = clinicsData.filter(clinic =>
    clinic.clinicName.toLowerCase().includes(searchText.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchText.toLowerCase()) ||
    clinic.specialty.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
    <AppHeader />
    <Layout className="min-h-screen">
      <Sider 
        width={200} 
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
          borderRight: '1px solid #f0f0f0'
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Space align="center" size="middle">
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#1890ff', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MedicineBoxOutlined style={{ color: 'white', fontSize: '18px' }} />
            </div>
          
          </Space>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['clinics']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>

      <Layout>
        <Header 
          style={{ 
            backgroundColor: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Title level={3} style={{ margin: 0, color: token.colorTextHeading }}>
            Clinics
          </Title>
          
            <Space style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Input
              placeholder="Search clinics..."
              prefix={<SearchOutlined />}
              style={{ maxWidth: '300px' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
           
            </Space>
        </Header>

        <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
          <Card 
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {/* Search and Actions Bar */}
            <div style={{ 
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
                <Input
                  placeholder="Search by clinic name, city..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ maxWidth: '300px' }}
                />
                <Button icon={<FilterOutlined />}>
                  Filter
                </Button>
                <Button icon={<FilterOutlined />}>
                  Sort
                </Button>
              </div>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                style={{ backgroundColor: '#1890ff' }}
                onClick={() => router.push('/clinics/new')}
              >
                Add New Clinic
              </Button>
            </div>

            {/* Select All and Apply Actions */}
            <div style={{ 
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Space>
                <Checkbox 
                  checked={selectedRowKeys.length === clinicsData.length}
                  indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < clinicsData.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys(clinicsData.map(item => item.key));
                    } else {
                      setSelectedRowKeys([]);
                    }
                  }}
                >
                  Select All
                </Checkbox>
                {selectedRowKeys.length > 0 && (
                  <Button size="small">
                    Apply ({selectedRowKeys.length})
                  </Button>
                )}
              </Space>
            </div>

            {/* Table */}
            <Table
              columns={columns}
              dataSource={paginatedData}
              pagination={false}
              rowKey="key"
              size="middle"
              scroll={{ x: 1200 }}
            />

            {/* Custom Pagination */}
            <div style={{ 
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text type="secondary">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
              </Text>
              
              <Pagination
                current={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
                showQuickJumper
                size="small"
              />
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout></>
    
  );
};

export default ClinicsPage;