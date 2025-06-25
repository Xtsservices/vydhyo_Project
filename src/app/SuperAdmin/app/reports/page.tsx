"use client";

import React from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { Title, Text } = Typography;
const { Header: AntHeader, Content } = Layout;

const reportData = [
  {
    title: 'Total Patients',
    value: 1247,
    icon: <UserOutlined style={{ fontSize: 28, color: '#1890ff' }} />,
    color: '#e6f7ff',
  },
  {
    title: 'Total Revenue',
    value: '₹4,56,000',
    icon: <DollarOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    color: '#f6ffed',
  },
  {
    title: 'Feedback Count',
    value: 312,
    icon: <MessageOutlined style={{ fontSize: 28, color: '#faad14' }} />,
    color: '#fffbe6',
  },
];

const ReportsDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh', marginTop: '64px' }}>
      <AntHeader
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
          zIndex: 1,
          height: 'auto',
          lineHeight: 'normal',
          marginTop: '-84px',
        }}
      >
        <AppHeader />
        <SideHeader selectedKey="reports" />
      </AntHeader>

      <Content
        style={{
          padding: '24px',
          backgroundColor: '#fafafa',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Title level={3} style={{ marginBottom: 24 }}>
            Reports Summary
          </Title>

          <Row gutter={[16, 16]}>
            {reportData.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    backgroundColor: item.color,
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {item.icon}
                    <div>
                      <Text style={{ fontSize: 14, color: '#888' }}>{item.title}</Text>
                      <Title level={3} style={{ margin: 0 }}>
                        {item.value}
                      </Title>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ReportsDashboard;
