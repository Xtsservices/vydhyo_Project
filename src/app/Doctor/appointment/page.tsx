"use client";
import React, { useEffect, useState } from 'react';
import { 
  Tabs, 
  Card, 
  Avatar, 
  Button, 
  Tag, 
  Row, 
  Col, 
  Statistic, 
  Space,
  Typography,
  List,
  Divider,
  Modal,
  DatePicker,
  TimePicker,
  message
} from 'antd';
import AppHeader from "@/app/Admin/components/header";
import SideHeader from '../components/sideheader';
import { 
  PhoneOutlined, 
  VideoCameraOutlined, 
  MoreOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Appointment = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [appointments, setAppointments] = useState({
        totalAppointmentsCount: 0,
        totalAppointments: []
    });
    const [isRescheduleModalVisible, setIsRescheduleModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
    const [newDate, setNewDate] = useState<moment.Moment | null>(null);
    const [newTime, setNewTime] = useState<moment.Moment | null>(null);

    type StatusType = 'scheduled' | 'completed' | 'rescheduled' | 'canceled';

    const getStatusTag = (status: StatusType | string) => {
        const statusConfig: Record<StatusType, { color: string; text: string }> = {
            scheduled: { color: 'green', text: 'Scheduled' },
            completed: { color: 'blue', text: 'Completed' },
            rescheduled: { color: 'purple', text: 'Rescheduled' },
            canceled: { color: 'red', text: 'Canceled' }
        };
        const config =
            statusConfig[status as StatusType] ||
            { color: 'default', text: String(status) };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    type AppointmentItem = {
        _id: string;
        appointmentId: string;
        patientName: string;
        doctorName: string;
        appointmentDate: string;
        appointmentTime: string;
        appointmentType: string;
        appointmentDepartment: string;
        appointmentReason: string;
        appointmentStatus: StatusType | string;
        appointmentNotes: string;
    };

    const handleReschedule = (appointment: AppointmentItem) => {
        setSelectedAppointment(appointment);
        setIsRescheduleModalVisible(true);
    };

    const handleRescheduleSubmit = async () => {
        if (!selectedAppointment || !newDate || !newTime) {
            message.error('Please select both date and time');
            return;
        }

        try {
            // Get current appointments from localStorage
            const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '{"totalAppointmentsCount": 0, "totalAppointments": []}');
            
            // Update the specific appointment
            const updatedAppointments = storedAppointments.totalAppointments.map((appt: AppointmentItem) => 
                appt.appointmentId === selectedAppointment.appointmentId ? {
                    ...appt,
                    appointmentDate: newDate.format('YYYY-MM-DD'),
                    appointmentTime: newTime.format('HH:mm'),
                    appointmentStatus: 'rescheduled',
                    updatedAt: new Date().toISOString()
                } : appt
            );

            // Update localStorage
            const updatedData = {
                totalAppointmentsCount: updatedAppointments.length,
                totalAppointments: updatedAppointments
            };
            
            localStorage.setItem('appointments', JSON.stringify(updatedData));
            setAppointments(updatedData);

            message.success('Appointment rescheduled successfully');
            setIsRescheduleModalVisible(false);
            setNewDate(null);
            setNewTime(null);
            setSelectedAppointment(null);
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            message.error('Failed to reschedule appointment');
        }
    };

    const renderAppointmentList = (appointments: AppointmentItem[] | undefined) => (
        <List
            dataSource={appointments}
            renderItem={(appointment) => (
                <List.Item
                    style={{ 
                        padding: '16px', 
                        marginBottom: '8px', 
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #f0f0f0'
                    }}
                    actions={[
                        <Button type="text" icon={<PhoneOutlined />} />,
                        <Button type="text" icon={<VideoCameraOutlined />} />,
                        <Button 
                            type="text" 
                            icon={<ReloadOutlined />} 
                            onClick={() => handleReschedule(appointment)}
                            disabled={appointment.appointmentStatus === 'completed' || appointment.appointmentStatus === 'canceled'}
                        />,
                        <Button type="text" icon={<MoreOutlined />} />
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar size={48} style={{ backgroundColor: '#1890ff' }}>
                                {appointment.patientName.charAt(0)}
                            </Avatar>
                        }
                        title={
                            <Space direction="vertical" size={0}>
                                <Text strong style={{ fontSize: '16px' }}>{appointment.patientName}</Text>
                                <Space>
                                    <CalendarOutlined style={{ color: '#666' }} />
                                    <Text type="secondary">{new Date(appointment.appointmentDate).toLocaleDateString()} {appointment.appointmentTime}</Text>
                                </Space>
                                <Text type="secondary">{appointment.appointmentType} - {appointment.appointmentDepartment}</Text>
                            </Space>
                        }
                        description={
                            <Space direction="vertical" size={4}>
                                {getStatusTag(appointment.appointmentStatus)}
                                <Text type="secondary">Reason: {appointment.appointmentReason}</Text>
                                {appointment.appointmentNotes && (
                                    <Text type="secondary">Notes: {appointment.appointmentNotes}</Text>
                                )}
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    );

    const tabItems = [
        {
            key: '1',
            label: `Scheduled (${appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'scheduled').length})`,
            children: renderAppointmentList(appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'scheduled'))
        },
        {
            key: '2',
            label: `Completed (${appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'completed').length})`,
            children: renderAppointmentList(appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'completed'))
        },
        {
            key: '3',
            label: `Rescheduled (${appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'rescheduled').length})`,
            children: renderAppointmentList(appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'rescheduled'))
        },
        {
            key: '4',
            label: `Canceled (${appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'canceled').length})`,
            children: renderAppointmentList(appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'canceled'))
        }
    ];

    const API_BASE_URL = "http://192.168.1.42:3000";
    const getAppointments = async () => {
        try {
            // Try to fetch from API
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/appointment/getAllAppointments`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // Store the API response in localStorage
                localStorage.setItem('appointments', JSON.stringify(data?.data));
                setAppointments(data?.data);
            } else {
                // Fallback to localStorage if API fails
                const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '{"totalAppointmentsCount": 1, "totalAppointments": [{"_id":"685bddbe34896a635716991f","appointmentId":"VYDAPMT1","userId":"VYDUSER1","doctorId":"685bcfdf29ad88ba7165ebaa","patientName":"Rani","doctorName":"Varun","appointmentType":"home-visit","appointmentDepartment":"General Physician","appointmentDate":"2025-07-01","appointmentTime":"08:15","appointmentReason":"Feeling not good with body pains","appointmentStatus":"scheduled","appointmentNotes":"Patient prefers early morning visits","createdBy":"VYDUSER16","updatedBy":"VYDUSER16","createdAt":"2025-06-25T11:30:06.991Z","updatedAt":"2025-06-25T11:30:06.991Z","__v":0}]}');
                setAppointments(storedAppointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            // Fallback to localStorage if API call fails
            const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '{"totalAppointmentsCount": 1, "totalAppointments": [{"_id":"685bddbe34896a635716991f","appointmentId":"VYDAPMT1","userId":"VYDUSER1","doctorId":"685bcfdf29ad88ba7165ebaa","patientName":"Rani","doctorName":"Varun","appointmentType":"home-visit","appointmentDepartment":"General Physician","appointmentDate":"2025-07-01","appointmentTime":"08:15","appointmentReason":"Feeling not good with body pains","appointmentStatus":"scheduled","appointmentNotes":"Patient prefers early morning visits","createdBy":"VYDUSER16","updatedBy":"VYDUSER16","createdAt":"2025-06-25T11:30:06.991Z","updatedAt":"2025-06-25T11:30:06.991Z","__v":0}]}');
            setAppointments(storedAppointments);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>
        <AppHeader />
        <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh',marginTop: '64px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <Title level={2} style={{ margin: 0, color: '#262626' }}>
                    Appointments
                </Title>
                <Text type="secondary">Manage your patient appointments</Text>
            </div>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Completed Appointments"
                            value={appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'completed').length}
                            valueStyle={{ color: '#1890ff' }}
                            prefix={<UserOutlined />}
                            suffix={
                                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> +4% From Last Week
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Scheduled Appointments"
                            value={appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'scheduled').length}
                            valueStyle={{ color: '#52c41a' }}
                            prefix={<UserOutlined />}
                            suffix={
                                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> +8% From Yesterday
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Rescheduled Appointments"
                            value={appointments.totalAppointments.filter((appt: AppointmentItem) => appt.appointmentStatus === 'rescheduled').length}
                            valueStyle={{ color: '#fa8c16' }}
                            prefix={<CalendarOutlined />}
                            suffix={
                                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> +2% From Yesterday
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div>
                            <Text type="secondary" style={{ fontSize: '14px' }}>Cancelled Appointments</Text>
                            <div style={{ marginTop: '8px' }}>
                                <Text strong style={{ fontSize: '16px', display: 'block' }}>
                                    {(appointments.totalAppointments as AppointmentItem[]).find((appt) => appt.appointmentStatus === 'canceled')?.patientName || 'No recent cancellations'}
                                </Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    {(
                                        (appointments.totalAppointments as AppointmentItem[]).find((appt) => appt.appointmentStatus === 'canceled')
                                    )?.appointmentDate
                                        ? new Date(
                                            (appointments.totalAppointments as AppointmentItem[]).find((appt) => appt.appointmentStatus === 'canceled')!.appointmentDate
                                        ).toLocaleDateString()
                                        : 'N/A'}
                                    {' '}
                                    {(appointments.totalAppointments as AppointmentItem[]).find((appt) => appt.appointmentStatus === 'canceled')?.appointmentTime || ''}
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Appointments Tabs */}
            <Card>
                <Tabs
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    type="line"
                    size="large"
                    items={tabItems}
                    tabBarStyle={{ 
                        marginBottom: '24px',
                        borderBottom: '1px solid #f0f0f0'
                    }}
                />
            </Card>

            {/* Reschedule Modal */}
            <Modal
                title="Reschedule Appointment"
                open={isRescheduleModalVisible}
                onOk={handleRescheduleSubmit}
                onCancel={() => {
                    setIsRescheduleModalVisible(false);
                    setNewDate(null);
                    setNewTime(null);
                    setSelectedAppointment(null);
                }}
                okText="Reschedule"
                cancelText="Cancel"
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>Select new date:</Text>
                    <DatePicker 
                        style={{ width: '100%' }}
                        onChange={(date) => setNewDate(date ? moment(date.toDate()) : null)}
                        disabledDate={(current) => current && current < moment().startOf('day')}
                    />
                    <Text style={{ marginTop: 16 }}>Select new time:</Text>
                    <TimePicker 
                        style={{ width: '100%' }}
                        format="HH:mm"
                        onChange={(time) => setNewTime(time ? moment(time.toDate()) : null)}
                    />
                </Space>
            </Modal>
        </div></>
        
    );
};

export default Appointment;