'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ScheduleOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
  StarFilled,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

interface SideHeaderProps {
  selectedKey?: string;
}

const SideHeader: React.FC<SideHeaderProps> = ({ selectedKey = 'dashboard' }) => {
  const router = useRouter();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/Admin/app/dashboard')
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: 'Appointments',
      onClick: () => router.push('/Admin/app/appointments')
    },
    {
      key: 'specialities',
      icon: <MedicineBoxOutlined />,
      label: 'Specialities',
      onClick: () => router.push('/Admin/app/specialities')
    },
    {
      key: 'doctors',
      icon: <TeamOutlined />,
      label: 'Doctors',
      onClick: () => router.push('/Admin/app/doctors')
    },
    {
      key: 'patients',
      icon: <UserOutlined />,
      label: 'Patients',
      onClick: () => router.push('/Admin/app/patients')
    },
    {
      key: 'reviews',
      icon: <StarFilled />,
      label: 'Reviews',
      onClick: () => router.push('/Admin/app/reviews')
    },
    {
      key: 'transactions',
      icon: <MoneyCollectOutlined />,
      label: 'Transactions',
      onClick: () => router.push('/Admin/app/transactions')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/Admin/app/settings')
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
      onClick: () => router.push('/Admin/app/reports')
    }
  ];

  const pageItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'authentication',
      icon: <SettingOutlined />,
      label: 'Authentication',
    },
    {
      key: 'error-pages',
      icon: <QuestionCircleOutlined />,
      label: 'Error Pages',
    }
  ];

  return (
    <Sider
      width={200}
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      style={{
      background: '#25416a' // lighter than #00203F
      }}
    >
      <div style={{
      padding: '16px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      color: 'white',
      marginTop: '84px'
      }}>
      <Text strong style={{ color: 'white' }}>Main</Text>
      </div>
      
      <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[selectedKey]}
      items={menuItems}
      style={{
        border: 'none',
        background: 'transparent'
      }}
      />

      <div style={{
      padding: '16px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      marginTop: 'auto',
      color: 'white'
      }}>
      <Text strong style={{ color: 'white' }}>Pages</Text>
      </div>
      
      <Menu
      theme="dark"
      mode="inline"
      items={pageItems}
      style={{
        border: 'none',
        background: 'transparent'
      }}
      />
    </Sider>
  );
};

export default SideHeader;