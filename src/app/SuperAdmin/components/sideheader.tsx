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
  QuestionCircleOutlined,
  ToolOutlined,
  ExperimentOutlined,
  BankOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

interface SideHeaderProps {
  selectedKey?: string;
}

const SideHeader: React.FC<SideHeaderProps> = ({ selectedKey }) => {
  const router = useRouter();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/SuperAdmin/app/dashboard')
    },
    {
      key: 'doctors',
      icon: <TeamOutlined />,
      label: 'Doctors',
      onClick: () => router.push('/SuperAdmin/app/doctors')
    },
    {
      key: 'patients',
      icon: <UserOutlined />,
      label: 'Patients',
      onClick: () => router.push('/SuperAdmin/app/patients')
    },
    {
      key: 'services',
      icon: <ToolOutlined />,
      label: 'Services',
      onClick: () => router.push('/SuperAdmin/app/services')
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: 'Appointments',
      onClick: () => router.push('/SuperAdmin/app/appointments')
    },
    {
      key: 'revenue',
      icon: <MoneyCollectOutlined />,
      label: 'Revenue',
      onClick: () => router.push('/SuperAdmin/app/revenue')
    },
    {
      key: 'departments',
      icon: <BankOutlined />,
      label: 'Billing Status',
      onClick: () => router.push('/SuperAdmin/app/departments')
    },
    {
      key: 'specialities',
      icon: <MedicineBoxOutlined />,
      label: 'Specialities',
      onClick: () => router.push('/SuperAdmin/app/specialities')
    },
    {
      key: 'reviews',
      icon: <StarFilled />,
      label: 'Reviews/Feedback',
      onClick: () => router.push('/SuperAdmin/app/reviews')
    },

    //   {
    //   key: 'features',
    //   icon: <AppstoreOutlined />,
    //   label: 'Features',
    //   onClick: () => router.push('/SuperAdmin/app/features')
    // },
    // {
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   label: 'Settings',
    //   onClick: () => router.push('/SuperAdmin/app/settings')
    // },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
      onClick: () => router.push('/SuperAdmin/app/reports')
    },
    {
      key: 'profile',
      icon: <FileTextOutlined />,
      label: 'Profile',
      onClick: () => router.push('/SuperAdmin/app/profile')
    }
  ];

  const pageItems = [
    // {
    //   key: 'profile',
    //   icon: <UserOutlined />,
    //   label: 'Profile',
    // },
    // {
    //   key: 'authentication',
    //   icon: <SettingOutlined />,
    //   label: 'Authentication',
    // },
    // {
    //   key: 'error-pages',
    //   icon: <QuestionCircleOutlined />,
    //   label: 'Error Pages',
    // }
  ];

  return (
    <Sider
      width={200}
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: '#2c5aa0'
      }}
    >
      <div style={{
        // padding: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        color: 'white',
        marginTop: '84px'
      }}>
        <Text strong style={{ color: 'white' }}>Super Admin</Text>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[selectedKey ? selectedKey : 'dashboard']}
        items={menuItems}
        style={{
          border: 'none',
          background: 'transparent'
        }}
      />

      {/* <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: 'auto',
        color: 'white'
      }}>
        <Text strong style={{ color: 'white' }}>Pages</Text>
      </div>
       */}
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