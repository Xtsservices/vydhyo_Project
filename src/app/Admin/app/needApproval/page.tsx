'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  DatePicker,
  Tag,
  Space,
  Select,
  Avatar,
  Drawer,
  Spin,
  message,
  Layout,
  Descriptions,
  Card,
  Row,
  Col,
  Alert,
  Modal
} from 'antd';
import {
  SearchOutlined,
  CalendarOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Header: AntHeader, Content } = Layout;

interface ConsultationFee {
  type: string;
  fee: number;
  currency: string;
  _id: string;
}

interface BankDetails {
  accountNumber: string | null;
  accountHolderName: string | null;
  ifscCode: string | null;
  bankName: string | null;
}

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
  gender: string | null;
  DOB: string | null;
  bloodgroup: string | null;
  maritalStatus: string | null;
  isVerified: boolean;
  userId?: string;
  role?: string;
  bankDetails: BankDetails;
  consultationModeFee: ConsultationFee[];
  spokenLanguage: string[];
  rejectionReason: string | null;
  language: string;
  relationship: string;
  appLanguage: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  __v: number;
}

const NeedApproval = () => {
  const [searchText, setSearchText] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedDoctorUserId, setSelectedDoctorUserId] = useState<string | null>(null);

  const applyFilters = (doctorList: Doctor[]) => {
    let filtered = doctorList;

    if (searchText) {
      filtered = filtered.filter(doctor =>
        `${doctor.firstname} ${doctor.lastname}`.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.medicalRegistrationNumber?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(doctor =>
        doctor.status?.toLowerCase() === statusFilter.toLowerCase()
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

      const response = await fetch('http://192.168.1.42:3000/users/AllUsers?type=doctor', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const doctorsData = Array.isArray(data.data) ? data.data : [data.data];

      setDoctors(
        doctorsData.map((doctor: Doctor): Doctor => ({
          ...doctor,
          key: doctor.userId ?? ''
        }))
      );

      // Store the first doctor's userId in state for later API use
      // Store all doctor userIds in state (for later API use)
      if (doctorsData.length > 0) {
        // Example: store the userId of the first doctor, or you can store all userIds in an array if needed
        setSelectedDoctorUserId(doctorsData[0].userId);
        // If you want to store all userIds:
        // const allUserIds = doctorsData.map((doctor: Doctor) => doctor.userId);
        // setSelectedDoctorUserId(allUserIds);
      }
      setFilteredDoctors(doctorsData.map((doctor: { userId: any; }) => ({
        ...doctor,
        key: doctor.userId
      })));

    } catch (error) {
      console.error('Error fetching doctors:', error);
      message.error('Failed to fetch doctors data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorStatus = async (doctorId: string, newStatus: string, rejectionReason?: string) => {
    setUpdatingStatus(doctorId);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        message.error('No authentication token found');
        return;
      }

      message.loading(`${newStatus === 'active' ? 'Approving' : 'Rejecting'} doctor...`, 0);

      const response = await fetch(`http://192.168.1.42:3000/admin/approveDoctor`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedDoctorUserId ,
          status: newStatus === 'active' ? 'Approved' : 'Rejected',
          rejectionReason: rejectionReason || undefined
        }),
      });

      message.destroy();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      const updatedDoctors = doctors.map(doctor =>
        doctor.userId === doctorId ? {
          ...doctor,
          status: newStatus,
          rejectionReason: rejectionReason ?? null,
          isVerified: newStatus === 'active'
        } : doctor
      );

      setDoctors(updatedDoctors);
      applyFilters(updatedDoctors);

      if (newStatus === 'active') {
        setAlertMessage(`Doctor Dr. ${selectedDoctor?.firstname} ${selectedDoctor?.lastname} has been approved successfully!`);
        setTimeout(() => setAlertMessage(null), 5000);
        setDrawerVisible(false); // Close drawer after approval
      } else {
        message.success('Doctor rejected successfully!');
      }

    } catch (error) {
      console.error('Error updating doctor status:', error);
      message.error(error instanceof Error ? error.message : 'Failed to update doctor status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };


  const handleApprove = (doctorId: string) => {
    updateDoctorStatus(doctorId, 'active');
  };

  const handleReject = (doctorId: string) => {
    const doctor = doctors.find(d => d._id === doctorId);
    let rejectionReason = '';

    Modal.confirm({
      title: 'Confirm Rejection',
      content: (
        <div>
          <p>Are you sure you want to reject Dr. {doctor?.firstname} {doctor?.lastname}?</p>
          <Input.TextArea
            placeholder="Reason for rejection (optional)"
            rows={3}
            onChange={(e) => rejectionReason = e.target.value}
            style={{ marginTop: '12px' }}
          />
        </div>
      ),
      okText: 'Reject',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => updateDoctorStatus(doctorId, 'inactive', rejectionReason),
    });
  };

  const showDoctorDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters(doctors);
  }, [searchText, doctors, statusFilter]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageSrc = (imageData: any) => {
    if (imageData && imageData.data && imageData.mimeType) {
      return `data:${imageData.mimeType};base64,${imageData.data}`;
    }
    return null;
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


  return (
    <Layout style={{ minHeight: '100vh', marginTop: '64px' }}>
      <AntHeader style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: 0,
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        zIndex: 1,
        height: 'auto',
        lineHeight: 'normal',
        marginTop: '-84px',
      }}>
        <SideHeader />
        <AppHeader />
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
          {alertMessage && (
            <Alert
              message={alertMessage}
              type="success"
              showIcon
              closable
              onClose={() => setAlertMessage(null)}
              style={{ marginBottom: '16px' }}
            />
          )}

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
              Doctor Approval List
            </h2>
            <Space>
              <Input
                placeholder="Search by name, ID, or email"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 350 }}
              />
              <Button onClick={fetchDoctors} loading={loading}>
                Refresh
              </Button>
            </Space>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Select
              placeholder="All Status"
              style={{ width: 120 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </div>

          <Spin spinning={loading}>
            <Table
              columns={[
                {
                  title: 'Doctor',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string, record: Doctor) => {
                    const imageSrc = getImageSrc(record.profilepic);
                    return (
                      <Space>
                        <Avatar size={40} src={imageSrc}>
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
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                    <Tag color={getStatusColor(status)}>
                      {status || 'Unknown'}
                    </Tag>
                  ),
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text: string, record: Doctor) => (
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => showDoctorDetails(record)}
                    >
                      View Details
                    </Button>
                  ),
                },
              ]}
              dataSource={filteredDoctors}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} doctors`
              }}
              scroll={{ x: true }}
            />
          </Spin>
        </div>

        <Drawer
          title={`Doctor Details - Dr. ${selectedDoctor?.firstname} ${selectedDoctor?.lastname}`}
          width={720}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          extra={
            <Space>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(selectedDoctor?._id || '')}
                loading={updatingStatus === selectedDoctor?._id}
                disabled={selectedDoctor?.status?.toLowerCase() === 'active'}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(selectedDoctor?._id || '')}
                disabled={selectedDoctor?.status?.toLowerCase() === 'inactive'}
              >
                Reject
              </Button>
            </Space>
          }
        >
          {selectedDoctor && (
            <>
              <Card title="Personal Information">
                <Descriptions column={2}>
                  <Descriptions.Item label="Name">{selectedDoctor.firstname} {selectedDoctor.lastname}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selectedDoctor.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selectedDoctor.mobile}</Descriptions.Item>
                  <Descriptions.Item label="Registration">{selectedDoctor.medicalRegistrationNumber}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={getStatusColor(selectedDoctor.status)}>
                      {selectedDoctor.status}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              <Card title="Consultation Fees" style={{ marginTop: 16 }}>
                {selectedDoctor.consultationModeFee?.map(fee => (
                  <div key={fee._id} style={{ marginBottom: 8 }}>
                    <strong>{fee.type}:</strong> {fee.currency} {fee.fee}
                  </div>
                ))}
              </Card>
            </>
          )}
        </Drawer>
      </Content>
    </Layout>
  );
};

export default NeedApproval;