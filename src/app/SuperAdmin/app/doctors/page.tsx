"use client";

import React, { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, Tag, Space, Select, Avatar, Modal, Spin, message, Layout } from 'antd';
import { SearchOutlined, CalendarOutlined, DownloadOutlined} from '@ant-design/icons';
import  AppHeader from '../../components/header';
const { RangePicker } = DatePicker;
const { Option } = Select;
import { useRouter } from 'next/navigation';
import SideHeader from '../../components/sideheader';
const { Header: AntHeader, Content } = Layout;

interface Specialization {
    _id: string;
    name: string;
    experience: number;
    id: string;
    drgreeCertificate?: {
        data: string;
        mimeType: string;
    };
    specializationCertificate?: {
        data: string;
        mimeType: string;
    };
}

interface Doctor {
    key: string;
    _id: string;
    firstname: string;
    lastname: string;
    mobile: string;
    email: string;
    specialization: Specialization[];
    status: string;
    createdAt: string;
    profilepic?: {
        data: string;
        mimeType: string;
    };
    medicalRegistrationNumber: string;
    gender: string;
    DOB: string;
    bloodgroup: string;
    maritalStatus: string;
    isVerified: boolean;
    userId?: string;
    role?: string;
}

const DoctorList = () => {
    const [searchText, setSearchText] = useState('');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [specializationFilter, setSpecializationFilter] = useState('all');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [specializationModalVisible, setSpecializationModalVisible] = useState(false);
    const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);
    const [selectedDoctorName, setSelectedDoctorName] = useState('');
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const router = useRouter();

    const applyFilters = (doctorList: Doctor[]) => {
        let filtered = doctorList;

        if (searchText) {
            filtered = filtered.filter(doctor =>
                `${doctor.firstname} ${doctor.lastname}`.toLowerCase().includes(searchText.toLowerCase()) ||
                doctor.email.toLowerCase().includes(searchText.toLowerCase()) ||
                doctor.medicalRegistrationNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
                doctor.specialization.some(specialization => 
                    specialization.name?.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(doctor => 
                doctor.status?.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (specializationFilter !== 'all') {
            filtered = filtered.filter(doctor => 
                doctor.specialization.some(specialization => 
                    specialization.name?.toLowerCase().includes(specializationFilter.toLowerCase())
                )
            );
        }

        setFilteredDoctors(filtered);
    };

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                message.error('No authentication token found. Please login again.');
                return;
            }

            const response = await fetch('http://192.168.1.42:3000/users/AllUsers?type=doctor&status=approved', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    message.error('Session expired. Please login again.');
                    return;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            
            let doctorsData: Doctor[] = [];
            if (data.status === 'success' && data.data) {
                doctorsData = Array.isArray(data.data) ? data.data : [data.data];
            } else if (Array.isArray(data)) {
                doctorsData = data;
            } else {
                doctorsData = data.data || [];
            }
            
            setDoctors(doctorsData);
            setFilteredDoctors(doctorsData);
            
        } catch (error) {
            console.error('Error fetching doctors:', error);
            message.error('Failed to fetch doctors data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const updateDoctorStatus = async (doctorId: string, newStatus: string) => {
        setUpdatingStatus(doctorId);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                message.error('No authentication token found');
                return;
            }

            const response = await fetch(`http://192.168.1.42:3000/admin/approveDoctor`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: doctorId, 
                    status: newStatus === 'active' ? 'Approved' : 'Rejected'
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update doctor status');
            }

            const result = await response.json();
            
            const updatedDoctors = doctors.map(doctor => 
                doctor._id === doctorId ? { ...doctor, status: newStatus } : doctor
            );
            
            setDoctors(updatedDoctors);
            applyFilters(updatedDoctors);

            message.success(`Doctor ${newStatus === 'active' ? 'approved' : 'rejected'} successfully`);
            
        } catch (error) {
            console.error('Error updating doctor status:', error);
            if (error instanceof Error) {
                message.error(error.message || 'Failed to update doctor status');
            } else {
                message.error('Failed to update doctor status');
            }
        } finally {
            setUpdatingStatus(null);
        }
    };

    const handleApprove = (doctorId: string) => {
        Modal.confirm({
            title: 'Approve Doctor',
            content: 'Are you sure you want to approve this doctor?',
            okText: 'Yes, Approve',
            okType: 'primary',
            cancelText: 'Cancel',
            onOk: () => updateDoctorStatus(doctorId, 'active'),
        });
    };

    const handleReject = (doctorId: string) => {
        Modal.confirm({
            title: 'Reject Doctor',
            content: 'Are you sure you want to reject this doctor? This action cannot be undone.',
            okText: 'Yes, Reject',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => updateDoctorStatus(doctorId, 'inactive'),
        });
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        applyFilters(doctors);
    }, [searchText, doctors, statusFilter, specializationFilter]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getImageSrc = (profilepic: any) => {
        if (profilepic && profilepic.data && profilepic.mimeType) {
            return `data:${profilepic.mimeType};base64,${profilepic.data}`;
        }
        return null;
    };

    const showImageModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setImageModalVisible(true);
    };

    const showSpecializationModal = (specializations: Specialization[], doctorName: string) => {
        setSelectedSpecializations(specializations);
        setSelectedDoctorName(doctorName);
        setSpecializationModalVisible(true);
    };

    const downloadCertificate = (certificate: any, fileName: string) => {
        if (certificate && certificate.data && certificate.mimeType) {
            try {
                const link = document.createElement('a');
                link.href = `data:${certificate.mimeType};base64,${certificate.data}`;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                message.success('Certificate downloaded successfully');
            } catch (error) {
                message.error('Failed to download certificate');
            }
        } else {
            message.error('Certificate not available');
        }
    };

    const getUniqueSpecializations = () => {
        const allSpecs = doctors.flatMap(doctor => 
            Array.isArray(doctor.specialization)
                ? doctor.specialization.map(specialization => specialization.name)
                : []
        );
        return [...new Set(allSpecs)].filter(specialization => specialization && String(specialization).trim() !== '');
    };

    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase();
        switch (statusLower) {
            case 'active':
            case 'approved':
                return 'success';
            case 'inactive':
            case 'rejected':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    const columns = [
        {
            title: 'Doctor',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Doctor) => {
                const imageSrc = getImageSrc(record.profilepic);
                return (
                    <Space>
                        <Avatar 
                            size={40} 
                            src={imageSrc}
                            style={{ flexShrink: 0, cursor: imageSrc ? 'pointer' : 'default' }}
                            onClick={imageSrc ? () => showImageModal(imageSrc) : undefined}
                        >
                            {!imageSrc && `${record.firstname?.[0] ?? ''}${record.lastname?.[0] ?? ''}`}
                        </Avatar>
                        <span style={{ fontWeight: 500 }}>
                            Dr. {record.firstname || ''} {record.lastname || ''}
                        </span>
                    </Space>
                );
            },
        },
        {
            title: 'Doctor ID',
            dataIndex: 'medicalRegistrationNumber',
            key: 'medicalRegistrationNumber',
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
            render: (specializations: Specialization[], record: Doctor) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div>
                        {specializations && specializations.length > 0 
                            ? specializations.map(spec => spec.name).filter(name => name).join(', ') 
                            : 'Not specified'
                        }
                    </div>
                    {specializations && specializations.length > 0 && (
                        <Button 
                            type="link" 
                            size="small"
                            onClick={() => showSpecializationModal(
                                specializations, 
                                `Dr. ${record.firstname || ''} ${record.lastname || ''}`
                            )}
                            style={{ padding: '0 4px', height: 'auto', fontSize: '12px' }}
                        >
                            View
                        </Button>
                    )}
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Phone',
            dataIndex: 'mobile',
            key: 'mobile',
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Registered On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => formatDate(date),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag 
                    color={getStatusColor(status)}
                    style={{ 
                        borderRadius: '4px',
                        fontWeight: 500,
                        border: 'none',
                        textTransform: 'capitalize'
                    }}
                >
                    {status || 'Unknown'}
                </Tag>
            ),
        },
        {
            title: 'Verified',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (isVerified: boolean) => (
                <Tag 
                    color={isVerified ? 'success' : 'warning'}
                    style={{ 
                        borderRadius: '4px',
                        fontWeight: 500,
                        border: 'none'
                    }}
                >
                    {isVerified ? 'Verified' : 'Pending'}
                </Tag>
            ),
        }
    ];

    return (
        <>
    
            <AppHeader />
            <Layout style={{ minHeight: '100vh',marginTop: '64px' }}>
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
                <SideHeader selectedKey = 'doctors'/>
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
                        <h2 style={{ 
                            margin: 0, 
                            fontSize: '20px', 
                            fontWeight: 600,
                            color: '#262626'
                        }}>
                            Doctor List
                        </h2>
                        <Space>
                            <Input
                                placeholder="Search by name, ID, email, or specialization"
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{ 
                                    width: 350,
                                    borderRadius: '6px'
                                }}
                            />
                            <Button 
                                onClick={fetchDoctors}
                                loading={loading}
                                style={{ borderRadius: '6px' }}
                            >
                                Refresh
                            </Button>
                            <Button onClick={() => router.push('/SuperAdmin/app/doctorApproval')}>
                                Need For Approval of Doctors
                            </Button>
                        </Space>
                    </div>

                    {/* Filters */}
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        marginBottom: '20px',
                        alignItems: 'center'
                    }}>
                        {/* <Select
                            placeholder="All Status"
                            style={{ width: 120 }}
                            value={statusFilter}
                            onChange={setStatusFilter}
                        >
                            <Option value="all">All Status</Option>
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                            <Option value="pending">Pending</Option>
                        </Select> */}
                        
                        {/* <Select
                            placeholder="All Specializations"
                            style={{ width: 200 }}
                            value={specializationFilter}
                            onChange={setSpecializationFilter}
                        >
                            <Option value="all">All Specializations</Option>
                            {getUniqueSpecializations().map(specialization => (
                                <Option key={specialization} value={specialization}>{specialization}</Option>
                            ))}
                        </Select> */}

                        {/* <RangePicker 
                            placeholder={['Start Date', 'End Date']}
                            suffixIcon={<CalendarOutlined />}
                            style={{ borderRadius: '6px' }}
                        /> */}
                    </div>

                    {/* Table */}
                    <Spin spinning={loading}>
                        <Table
                            columns={columns}
                            dataSource={filteredDoctors.map(doctor => ({
                                ...doctor,
                                key: doctor._id
                            }))}
                            pagination={{
                                current: 1,
                                pageSize: 10,
                                total: filteredDoctors.length,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} doctors`,
                                style: { marginTop: '20px' }
                            }}
                            style={{
                                backgroundColor: 'white'
                            }}
                            scroll={{ x: true }}
                        />
                    </Spin>

                    {/* Footer */}
                    <div style={{ 
                        marginTop: '16px', 
                        color: '#8c8c8c', 
                        fontSize: '14px' 
                    }}>
                        Showing {filteredDoctors.length} of {doctors.length} doctors
                    </div>
                </div>

                {/* Image Modal */}
                <Modal
                    title="Profile Picture"
                    open={imageModalVisible}
                    onCancel={() => setImageModalVisible(false)}
                    footer={null}
                    width={600}
                    centered
                >
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={selectedImage} 
                            alt="Profile" 
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '500px',
                                objectFit: 'contain'
                            }} 
                        />
                    </div>
                </Modal>

                {/* Specialization Modal */}
                <Modal
                    title={`Specialization Details - ${selectedDoctorName}`}
                    open={specializationModalVisible}
                    onCancel={() => setSpecializationModalVisible(false)}
                    footer={null}
                    width={700}
                    centered
                >
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        {selectedSpecializations.map((specialization, index) => (
                            <div key={specialization._id || index} style={{ 
                                border: '1px solid #e8e8e8', 
                                borderRadius: '8px', 
                                padding: '16px', 
                                marginBottom: '16px',
                                backgroundColor: '#fafafa'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                    <div>
                                        <strong>Specialization:</strong>
                                        <div style={{ marginTop: '4px', color: '#595959' }}>{specialization.name || 'Not specified'}</div>
                                    </div>
                                    <div>
                                        <strong>Experience:</strong>
                                        <div style={{ marginTop: '4px', color: '#595959' }}>{specialization.experience || 0} years</div>
                                    </div>
                                    <div>
                                        <strong>ID:</strong>
                                        <div style={{ marginTop: '4px', color: '#595959' }}>{specialization.id || 'Not available'}</div>
                                    </div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <div>
                                        <strong>Certificates:</strong>
                                        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {specialization.drgreeCertificate && specialization.drgreeCertificate.data ? (
                                                <Button 
                                                    type="primary" 
                                                    size="small"
                                                    icon={<DownloadOutlined />}
                                                    onClick={() => downloadCertificate(
                                                        specialization.drgreeCertificate, 
                                                        `${specialization.name}_Degree_Certificate.${specialization.drgreeCertificate?.mimeType?.split('/')[1] || 'jpg'}`
                                                    )}
                                                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', width: 'fit-content' }}
                                                >
                                                    Download Degree Certificate
                                                </Button>
                                            ) : null}
                                            
                                            {specialization.specializationCertificate && specialization.specializationCertificate?.data ? (
                                                <Button 
                                                    type="primary" 
                                                    size="small"
                                                    icon={<DownloadOutlined />}
                                                    onClick={() => downloadCertificate(
                                                        specialization.specializationCertificate, 
                                                        `${specialization.name}_Specialization_Certificate.${specialization.specializationCertificate?.mimeType?.split('/')[1] || 'jpg'}`
                                                    )}
                                                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', width: 'fit-content' }}
                                                >
                                                    Download Specialization Certificate
                                                </Button>
                                            ) : null}
                                            
                                            {(!specialization.drgreeCertificate || !specialization.drgreeCertificate.data) && 
                                             (!specialization.specializationCertificate || !specialization.specializationCertificate.data) && (
                                                <span style={{ color: '#8c8c8c', fontStyle: 'italic' }}>No certificates available</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {selectedSpecializations.length === 0 && (
                            <div style={{ textAlign: 'center', color: '#8c8c8c', padding: '40px' }}>
                                No specialization details available
                            </div>
                        )}
                    </div>
                </Modal>
            </Content>
        </Layout></>
        
    );
};

export default DoctorList;