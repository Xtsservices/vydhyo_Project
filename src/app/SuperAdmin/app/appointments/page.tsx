"use client";

import React, { useState } from 'react';
import { Table, Button, Input, Select, Tag, Space, Layout } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import  AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { Header: AntHeader, Content } = Layout;
const { Option } = Select;

export default function AppointmentsTable() {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'Appointment ID',
      dataIndex: 'appointmentId',
      key: 'appointmentId',
      width: 120,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      width: 150,
      render: (patient: { name: string; id: string }) => (
        <div>
          <div style={{ fontWeight: 500 }}>{patient.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>ID: {patient.id}</div>
        </div>
      ),
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      width: 150,
      render: (doctor: { name: string; specialty: string }) => (
        <div>
          <div style={{ fontWeight: 500 }}>{doctor.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{doctor.specialty}</div>
        </div>
      ),
    },
    {
      title: 'Clinic',
      dataIndex: 'clinic',
      key: 'clinic',
      width: 120,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 130,
      render: (dateTime: { date: string; time: string }) => (
        <div>
          <div>{dateTime.date}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{dateTime.time}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        let color = 'blue';
        if (type === 'Follow-up') color = 'purple';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'green';
        if (status === 'Completed') color = 'orange';
        if (status === 'Cancelled') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: () => (
        <Button type="link" size="small">
          View
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      appointmentId: 'APT001',
      patient: {
        name: 'Dr. Sarah Johnson',
        id: '12345',
      },
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
      },
      clinic: 'Downtown Clinic',
      dateTime: {
        date: 'Dec 15, 2024',
        time: '10:30 AM',
      },
      type: 'Follow-up',
      status: 'Pending',
    },
    {
      key: '2',
      appointmentId: 'APT002',
      patient: {
        name: 'Michael Rodriguez',
        id: '67890',
      },
      doctor: {
        name: 'Dr. Michael Rodriguez',
        specialty: 'Neurology',
      },
      clinic: 'Central Medical',
      dateTime: {
        date: 'Dec 14, 2024',
        time: '2:15 PM',
      },
      type: 'Follow-up',
      status: 'Completed',
    },
    {
      key: '3',
      appointmentId: 'APT003',
      patient: {
        name: 'Robert Brown',
        id: '54321',
      },
      doctor: {
        name: 'Dr. Emily Davis',
        specialty: 'Dermatology',
      },
      clinic: 'Uptown Office',
      dateTime: {
        date: 'Dec 13, 2024',
        time: '9:00 AM',
      },
      type: 'Follow-up',
      status: 'Cancelled',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh',marginTop: '70px' }}> {/* Adjust based on your header height */}
      <AntHeader style={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: 0,
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        zIndex: 1,
        height: '550px',
        lineHeight: 'normal'
      }}>
        <AppHeader />
        <SideHeader selectedKey='appointments' />
      </AntHeader>

      <Content style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        minHeight: 'calc(100vh - 64px)'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px 24px', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '16px', color: '#262626' }}>Appointments</h2>
            <Space>
              <Input
                placeholder="Search by Patient, Doctor, or Clinic"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Button icon={<FilterOutlined />}>
                Filter
              </Button>
            </Space>
          </div>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 3,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              style: { padding: '16px 24px' }
            }}
            size="middle"
            scroll={{ x: 1000 }}
          />
        </div>
      </Content>
    </Layout>
  );
}