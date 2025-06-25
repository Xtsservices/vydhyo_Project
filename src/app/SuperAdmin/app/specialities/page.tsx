"use client";

import React, { useState } from 'react';
import { Table, Input, Button, Tag, Space, Avatar, Layout } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';
const { Header: AntHeader, Content } = Layout;

interface Speciality {
    key: string;
    name: string;
    department: string;
    // status: string;
    icon: string;
}

const SpecialitiesList = () => {
    const [searchText, setSearchText] = useState('');

    const specialities: Speciality[] = [
        {
            key: '1',
            name: 'Cardiology',
            department: 'Heart & Vascular',
            // status: 'Active',
            icon: 'https://cdn-icons-png.flaticon.com/512/3448/3448590.png',
        },
        {
            key: '2',
            name: 'Dermatology',
            department: 'Skin Care',
            // status: 'Active',
            icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087924.png',
        },
        {
            key: '3',
            name: 'Neurology',
            department: 'Brain & Nervous System',
            // status: 'Inactive',
            icon: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png',
        },
        {
            key: '4',
            name: 'Orthopedics',
            department: 'Bones & Muscles',
            // status: 'Active',
            icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995507.png',
        },
        {
            key: '5',
            name: 'Pediatrics',
            department: 'Child Care',
            // status: 'Active',
            icon: 'https://cdn-icons-png.flaticon.com/512/4210/4210915.png',
        },
    ];

    const columns = [
        {
            title: 'Speciality Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Speciality) => (
                <Space>
                    <Avatar size={32} src={record.icon} />
                    <span style={{ fontWeight: 500 }}>{text}</span>
                </Space>
            ),
            width: 250,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            width: 200,
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status: string) => (
        //         <Tag
        //             color={status === 'Active' ? 'success' : 'error'}
        //             style={{
        //                 borderRadius: '4px',
        //                 fontWeight: 500,
        //                 fontSize: '12px',
        //                 border: 'none',
        //             }}
        //         >
        //             {status}
        //         </Tag>
        //     ),
        //     width: 120,
        // },
    ];

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
                <SideHeader selectedKey="specialities" />
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
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    color: '#262626',
                                }}
                            >
                                Specialities
                            </h2>
                            <span
                                style={{
                                    color: '#1890ff',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                {specialities.length} total
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Input
                                placeholder="Search by name or department"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    width: 300,
                                    borderRadius: '6px',
                                }}
                            />
                            <Button
                                icon={<FilterOutlined />}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={specialities.filter((item) =>
                            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            item.department.toLowerCase().includes(searchText.toLowerCase())
                        )}
                        scroll={{ x: 800 }}
                        size="middle"
                        style={{ backgroundColor: 'white' }}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default SpecialitiesList;
