"use client";

import React, { useState } from 'react';
import { Table, Input, Button, Tag, Space, Avatar, Layout } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';
const { Header: AntHeader, Content } = Layout;

interface Patient {
    key: string;
    patientId: string;
    fullName: string;
    gender: string;
    mobileNumber: string;
    emailId: string;
    ageDob: string;
    registeredOn: string;
    status: string;
    avatar: string;
}

const PatientList = () => {
    const [searchText, setSearchText] = useState('');

    const patients: Patient[] = [
        {
            key: '1',
            patientId: 'PT001',
            fullName: 'Sarah Johnson',
            gender: 'Female',
            mobileNumber: '+91 98765 43210',
            emailId: 'sarah.johnson@email.com',
            ageDob: '32 / Mar 15, 1992',
            registeredOn: 'Jan 15, 2024',
            status: 'Active',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616c654e85b?w=40&h=40&fit=crop&crop=face'
        },
        {
            key: '2',
            patientId: 'PT002',
            fullName: 'Michael Chen',
            gender: 'Male',
            mobileNumber: '+91 91234 56789',
            emailId: 'michael.chen@email.com',
            ageDob: '28 / Jul 22, 1996',
            registeredOn: 'Jan 18, 2024',
            status: 'Active',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        },
        {
            key: '3',
            patientId: 'PT003',
            fullName: 'Emily Rodriguez',
            gender: 'Female',
            mobileNumber: '+91 99887 76655',
            emailId: 'emily.rodriguez@email.com',
            ageDob: '45 / Nov 08, 1979',
            registeredOn: 'Jan 20, 2024',
            status: 'Inactive',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
        },
        {
            key: '4',
            patientId: 'PT004',
            fullName: 'David Thompson',
            gender: 'Male',
            mobileNumber: '+91 90909 80808',
            emailId: 'david.thompson@email.com',
            ageDob: '38 / Apr 12, 1986',
            registeredOn: 'Jan 22, 2024',
            status: 'Active',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        },
        {
            key: '5',
            patientId: 'PT005',
            fullName: 'Lisa Anderson',
            gender: 'Female',
            mobileNumber: '+91 98760 12345',
            emailId: 'lisa.anderson@email.com',
            ageDob: '29 / Sep 25, 1995',
            registeredOn: 'Jan 25, 2024',
            status: 'Active',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
        },
    ];

    const columns = [
        {
            title: 'Patient ID',
            dataIndex: 'patientId',
            key: 'patientId',
            width: 100,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text: string, record: Patient) => (
                <Space>
                    <Avatar 
                        size={32} 
                        src={record.avatar}
                        style={{ flexShrink: 0 }}
                    />
                    <span style={{ fontWeight: 500 }}>{text}</span>
                </Space>
            ),
            width: 200,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
            width: 150,
        },
        {
            title: 'Email ID',
            dataIndex: 'emailId',
            key: 'emailId',
            width: 200,
        },
        {
            title: 'Age / DOB',
            dataIndex: 'ageDob',
            key: 'ageDob',
            width: 150,
        },
        {
            title: 'Registered On',
            dataIndex: 'registeredOn',
            key: 'registeredOn',
            width: 130,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag 
                    color={status === 'Active' ? 'success' : 'error'}
                    style={{ 
                        borderRadius: '4px',
                        fontWeight: 500,
                        border: 'none',
                        fontSize: '12px'
                    }}
                >
                    {status}
                </Tag>
            ),
            width: 100,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' , marginTop: '64px' }}>
            <AntHeader style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 0,
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                zIndex: 1,
                height: 'auto',
                lineHeight: 'normal',
                marginTop: '-84px',
            }}>
                <AppHeader />
                <SideHeader  selectedKey='patients'/>
            </AntHeader>

            <Content style={{ 
                padding: '24px', 
                backgroundColor: '#fafafa', 
                minHeight: 'calc(100vh - 64px)' 
            }}>
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '24px', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    {/* Header */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ 
                                margin: 0, 
                                fontSize: '20px', 
                                fontWeight: 600,
                                color: '#262626'
                            }}>
                                Patients
                            </h2>
                            <span style={{
                                color: '#1890ff',
                                fontSize: '14px',
                                fontWeight: 500
                            }}>
                                1247 total
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Input
                                placeholder="Search by name, email or mobile number"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{ 
                                    width: 300,
                                    borderRadius: '6px'
                                }}
                            />
                            <Button 
                                icon={<FilterOutlined />}
                                style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={patients}
                        // pagination={{
                        //     current: 1,
                        //     pageSize: 5,
                        //     total: 1247,
                        //     showSizeChanger: false,
                        //     showQuickJumper: false,
                        //     showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} results`,
                        //     style: { marginTop: '20px' },
                        //     itemRender: (current, type, originalElement) => {
                        //         if (type === 'page') {
                        //             return (
                        //                 <Button 
                        //                     type={current === 1 ? 'primary' : 'default'}
                        //                     size="small"
                        //                     style={{ 
                        //                         minWidth: '32px',
                        //                         height: '32px',
                        //                         margin: '0 2px'
                        //                     }}
                        //                 >
                        //                     {current}
                        //                 </Button>
                        //             );
                        //         }
                        //         if (type === 'prev') {
                        //             return (
                        //                 <Button 
                        //                     size="small" 
                        //                     disabled
                        //                     style={{ 
                        //                         minWidth: '70px',
                        //                         height: '32px',
                        //                         margin: '0 2px'
                        //                     }}
                        //                 >
                        //                     ← Previous
                        //                 </Button>
                        //             );
                        //         }
                        //         if (type === 'next') {
                        //             return (
                        //                 <Button 
                        //                     size="small"
                        //                     style={{ 
                        //                         minWidth: '70px',
                        //                         height: '32px',
                        //                         margin: '0 2px'
                        //                     }}
                        //                 >
                        //                     Next →
                        //                 </Button>
                        //             );
                        //         }
                        //         if (type === 'jump-next') {
                        //             return <span style={{ margin: '0 8px' }}>...</span>;
                        //         }
                        //         return originalElement;
                        //     }
                        // }}
                        style={{
                            backgroundColor: 'white'
                        }}
                        scroll={{ x: 1200 }}
                        size="middle"
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default PatientList;
