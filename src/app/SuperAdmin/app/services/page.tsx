'use client';
import React from 'react';
import { Card, Col, Row, Typography, Layout } from 'antd';
import {
  ExperimentOutlined,
  HomeOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { Title, Text } = Typography;
const { Content } = Layout;

const services = [
  {
    title: 'Outpatient Services (OP)',
    icon: <HomeOutlined />,
    color: '#e6f7ff',
    iconColor: '#1890ff',
  },
  {
    title: 'Inpatient Services (IP)',
    icon: <BankOutlined />,
    color: '#f9f0ff',
    iconColor: '#722ed1',
  },
  {
    title: 'Diagnostics',
    icon: <ExperimentOutlined />,
    color: '#fff7e6',
    iconColor: '#fa8c16',
  },
  {
    title: 'Labs',
    icon: <MedicineBoxOutlined />,
    color: '#f6ffed',
    iconColor: '#52c41a',
  },
  {
    title: 'Blood Banks',
    icon: <HeartOutlined />,
    color: '#fff1f0',
    iconColor: '#f5222d',
  },
];

const Services: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <AppHeader />
      <Layout>
        <SideHeader selectedKey="services" />
        <Content
          style={{
            margin: '32px 24px',
            padding: 24,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #f0f1f2',
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: 8, marginTop: 30 }}>
            Our Services
          </Title>
          <Text
            style={{
              display: 'block',
              textAlign: 'center',
              fontSize: '22px',
              marginBottom: '2rem',
              color: '#001f3f',
            }}
          >
            <u>Coming Soon</u>
          </Text>

          <Row gutter={[32, 32]} justify="center">
            {services.map((service, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  bordered={false}
                  className="service-card"
                  bodyStyle={{
                    padding: '32px 16px',
                    backgroundColor: service.color,
                    borderRadius: 10,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    {React.cloneElement(service.icon, {
                      style: { fontSize: 30, color: service.iconColor },
                    })}
                  </div>
                  <Text strong style={{ fontSize: 16 }}>
                    {service.title}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>

      {/* <style jsx global>{`
        .service-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transform: translateY(-6px) scale(1.02);
        }
      `}</style> */}
    </Layout>
  );
};

export default Services;
