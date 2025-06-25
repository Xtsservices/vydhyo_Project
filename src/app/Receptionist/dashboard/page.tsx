"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Table,
  Tag,
  List,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Select,
  Tabs,
  Layout,
  DatePicker,
  Modal,
  Avatar,
  Badge,
  Tooltip,
  Drawer,
  Progress,
} from "antd";
import AppHeader from '../component/header'
const { Option } = Select;
import dayjs from "dayjs";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  VideoCameraOutlined,
  BellOutlined,
  StarOutlined,
  DollarOutlined,
  SettingOutlined,
  PlusOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  FilterOutlined,
  EyeOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import TabPane from "antd/es/tabs/TabPane";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Content } = Layout;

interface Appointment {
  key: string;
  id: string;
  name: string;
  avatar: string;
  time?: string;
  type: string;
  status?: string;
  doctor?: string;
  reason?: string;
  originalTime?: string;
  newTime?: string;
  lastVisit?: string;
  nextFollowUp?: string;
  specialty?: string;
  experience?: string;
  rating?: number;
  availableToday?: boolean;
  nextAppointment?: string;
  totalToday?: number;
}

interface DashboardCard {
  id: string;
  title: string;
  count: number;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
  icon: React.ReactNode;
  data: Appointment[];
  percent?: number;
}

const ReceptionistDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);

  const Router = useRouter();

  // --- Sample Data (same as before, omitted for brevity) ---
  // ... (copy your data arrays here, unchanged) ...

  // Define appointmentColumns and appointmentData
  const appointmentColumns = [
    {
      title: "Patient",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Appointment) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar src={record.avatar} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "Confirmed") color = "green";
        else if (status === "Cancelled") color = "red";
        else if (status === "Pending") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
  ];

  const appointmentData: Appointment[] = [
    {
      key: "1",
      id: "APT-001",
      name: "Adrian Marshall",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "10:45 AM",
      type: "General Visit",
      status: "Confirmed",
      doctor: "Dr. Smith",
    },
    {
      key: "2",
      id: "APT-002",
      name: "Sarah Lee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "11:30 AM",
      type: "Dental",
      status: "Pending",
      doctor: "Dr. Brown",
    },
    {
      key: "3",
      id: "APT-003",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "12:15 PM",
      type: "Eye Checkup",
      status: "Cancelled",
      doctor: "Dr. Green",
    },
  ];

  // For brevity, only showing the dashboardCards array with percent for charts
  const invoiceData = [
    {
      key: "1",
      id: "INV-001",
      name: "Adrian Marshall",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      amount: "$120",
      paidOn: "2024-03-20",
    },
    {
      key: "2",
      id: "INV-002",
      name: "Sarah Lee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      amount: "$80",
      paidOn: "2024-03-19",
    },
    {
      key: "3",
      id: "INV-003",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      amount: "$150",
      paidOn: "2024-03-18",
    },
  ];

  // Add recentPatientsData definition
  const recentPatientsData = [
    {
      key: "1",
      id: "PAT-001",
      name: "Adrian Marshall",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastAppointment: "20 Mar 2024",
    },
    {
      key: "2",
      id: "PAT-002",
      name: "Sarah Lee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastAppointment: "19 Mar 2024",
    },
    {
      key: "3",
      id: "PAT-003",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastAppointment: "18 Mar 2024",
    },
  ];

  const dashboardCards: DashboardCard[] = [
    {
      id: "total",
      title: "Total Appointments",
      count: 156,
      change: "+12%",
      trend: "up",
      color: "#1890ff",
      icon: <CalendarOutlined />,
      data: [], // fill with your data
      percent: 80,
    },
    {
      id: "upcoming",
      title: "Upcoming Appointments",
      count: 23,
      change: "Next 24 hours",
      trend: "neutral",
      color: "#faad14",
      icon: <ClockCircleOutlined />,
      data: [],
      percent: 60,
    },
    {
      id: "cancelled",
      title: "Cancelled Appointments",
      count: 8,
      change: "-5%",
      trend: "down",
      color: "#ff4d4f",
      icon: <CloseCircleOutlined />,
      data: [],
      percent: 20,
    },
    {
      id: "reschedule",
      title: "Reschedule Appointments",
      count: 12,
      change: "Pending reschedule",
      trend: "neutral",
      color: "#722ed1",
      icon: <ReloadOutlined />,
      data: [],
      percent: 30,
    },
    {
      id: "new",
      title: "New Appointments",
      count: 34,
      change: "+18%",
      trend: "up",
      color: "#52c41a",
      icon: <PlusOutlined />,
      data: [],
      percent: 50,
    },
    {
      id: "followup",
      title: "Follow Up",
      count: 19,
      change: "Due this week",
      trend: "neutral",
      color: "#13c2c2",
      icon: <UserOutlined />,
      data: [],
      percent: 40,
    },
    {
      id: "doctors",
      title: "Doctor Availability",
      count: 3,
      change: "2 Available",
      trend: "neutral",
      color: "#1890ff",
      icon: <TeamOutlined />,
      data: [],
      percent: 66,
    },
    {
      id: "doctorlist",
      title: "Doctor List",
      count: 8,
      change: "6 Available today",
      trend: "neutral",
      color: "#fa8c16",
      icon: <UserDeleteOutlined />,
      data: [],
      percent: 75,
    },
  ];

  // --- Responsive ---
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = (card: DashboardCard) => {
    setSelectedCard(card);
    setDrawerVisible(true);
  };

  const handleWalkinbutton = () => {
    Router.push("/Receptionist/walk-in");
  };

  // --- Render ---
  return (
    <>
    <AppHeader/>
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5",marginTop: "64px" }}>
      
      
      <Content
        style={{
          padding: isMobile ? "16px 12px" : "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Title
            level={2}
            style={{ margin: 0, fontSize: isMobile ? "20px" : "24px" }}
          >
            Receptionist Dashboard
          </Title>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size={isMobile ? "middle" : "large"}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={handleWalkinbutton}
          >
            Add Walk-in
          </Button>
        </div>

        {/* Dashboard Cards with Pie/Bar Graphs */}
        <Row gutter={[16, 16]}>
          {dashboardCards.map((card, idx) => (
            <Col xs={24} sm={12} lg={6} key={card.id}>
              <Card
                className="dashboard-card"
                hoverable
                onClick={() => handleCardClick(card)}
                style={{
                  borderRadius: "16px",
                  cursor: "pointer",
                  border: `2px solid ${card.color}20`,
                  height: "220px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s",
                  overflow: "hidden",
                  background: "#fff",
                  position: "relative",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <div
                    style={{
                      backgroundColor: `${card.color}15`,
                      padding: "12px",
                      borderRadius: "8px",
                      marginRight: "12px",
                      fontSize: 24,
                      color: card.color,
                      boxShadow: `0 2px 8px ${card.color}10`,
                      transition: "background 0.3s",
                    }}
                  >
                    {card.icon}
                  </div>
                  <Text style={{ fontSize: "15px", color: "#8c8c8c", fontWeight: 500 }}>
                    {card.title}
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Progress
                    type="circle"
                    percent={card.percent}
                    width={60}
                    strokeColor={card.color}
                    strokeWidth={10}
                    trailColor="#f0f0f0"
                    format={percent => (
                      <span style={{ color: card.color, fontWeight: 700, fontSize: 18 }}>
                        {card.count}
                      </span>
                    )}
                    style={{
                      transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
                      boxShadow: `0 0 0 4px ${card.color}10`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Progress
                      percent={card.percent}
                      showInfo={false}
                      strokeColor={card.color}
                      trailColor="#f0f0f0"
                      style={{
                        marginBottom: 8,
                        transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {card.trend === "up" && (
                        <RiseOutlined style={{ color: "#52c41a", fontSize: "14px" }} />
                      )}
                      {card.trend === "down" && (
                        <FallOutlined style={{ color: "#ff4d4f", fontSize: "14px" }} />
                      )}
                      <Text
                        style={{
                          fontSize: "13px",
                          color:
                            card.trend === "up"
                              ? "#52c41a"
                              : card.trend === "down"
                              ? "#ff4d4f"
                              : "#8c8c8c",
                          fontWeight: 500,
                        }}
                      >
                        {card.change}
                      </Text>
                    </div>
                  </div>
                </div>
                {/* Animated overlay on hover */}
                <div className="card-anim-overlay" />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detail Drawer */}
        <Drawer
          title={selectedCard?.title}
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={isMobile ? "100%" : "60%"}
          style={{
            backgroundColor: "#f5f5f5",
          }}
          headerStyle={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #f0f0f0",
          }}
          bodyStyle={{
            backgroundColor: "#fff",
            padding: "24px",
          }}
        >
          {/* You can keep your renderDetailedList() here */}
          <div style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text type="secondary">[Detailed list goes here]</Text>
          </div>
        </Drawer>

        {/* Reschedule Modal */}
        <Modal
          title="Reschedule Appointment"
          open={rescheduleModalVisible}
          onCancel={() => setRescheduleModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setRescheduleModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary">
              Confirm Reschedule
            </Button>,
          ]}
        >
          <div style={{ margin: "20px 0" }}>
            <Text strong>Select new date range:</Text>
            <div style={{ marginTop: "12px" }}>
              <RangePicker
                style={{ width: "100%" }}
                onChange={(dates) => setSelectedDateRange(dates)}
                placeholder={["Start Date", "End Date"]}
              />
            </div>
          </div>
        </Modal>

            <style>{`
              .appointment-row:hover {
                background-color: #f5f5f5;
              }
              .ant-card {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
              }
              .ant-list-item {
                border-bottom: none !important;
              }
            `}</style>
          </Content>
        </Layout>
    </>
  );
};

export default ReceptionistDashboard;
