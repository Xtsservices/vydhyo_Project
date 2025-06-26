"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Button,
  List,
  Typography,
  Row,
  Col,
  Menu,
  Badge,
  Statistic,
  Tag,
  Select,
  Space,
  Pagination,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import AppHeader from "../components/header"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import axios from "axios";
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function MedicalDashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  type UserData = {
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    specialization?: {
      name?: string;
    };
  };
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dashboardData, setDashboardData] = useState({
    success: true,
    totalAmount: { today: 0, week: 0, month: 0, total: 0 },
    appointmentTypes: { "In-Person": 0, Video: 0, "home-visit": 0 },
    appointmentCounts: {
      today: 0,
      upcoming: 0,
      completed: 0,
      rescheduled: 0,
      cancelled: 0,
      active: 0,
      total: 0,
    },
    uniquePatients: { total: 0, today: 0, week: 0, month: 0 },
  });
  const [appointmentsPage, setAppointmentsPage] = useState(1);
  const [patientsPage, setPatientsPage] = useState(1);
  const [invoicesPage, setInvoicesPage] = useState(1);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  // Sample data
  const appointments = [
    {
      id: 1,
      name: "Adrian Marshall",
      time: "11 Nov 2024 10:45 AM",
      type: "General Visit",
      status: "confirmed",
      avatar: "👨‍💼",
    },
    {
      id: 2,
      name: "Kelly Stevens",
      time: "10 Nov 2024 11:30 AM",
      type: "Routine Checkup",
      status: "confirmed",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      name: "Samuel Anderson",
      time: "09 Nov 2024 02:00 PM",
      type: "Follow-up",
      status: "pending",
      avatar: "👨‍💻",
    },
    {
      id: 4,
      name: "Catherine Griffin",
      time: "07 Nov 2024 04:00 PM",
      type: "Consultation",
      status: "completed",
      avatar: "👩‍🦳",
    },
    {
      id: 5,
      name: "Robert Hutchinson",
      time: "28 Oct 2024 05:30 PM",
      type: "Surgery",
      status: "completed",
      avatar: "👨‍🦲",
    },
  ];

  const recentPatients = [
    { name: "Adrian Marshall", lastVisit: "Mar 2024", id: "P0001" },
    { name: "Kelly Stevens", lastVisit: "Mar 2024", id: "P0002" },
    { name: "Samuel Anderson", lastVisit: "Mar 2024", id: "P0003" },
    { name: "Catherine Griffin", lastVisit: "Mar 2024", id: "P0004" },
    { name: "Robert Hutchinson", lastVisit: "Feb 2024", id: "P0005" },
  ];

  const recentInvoices = [
    { patient: "Adrian", amount: "$450", date: "11 Nov 2024", status: "paid" },
    { patient: "Kelly", amount: "$500", date: "10 Nov 2024", status: "pending" },
    { patient: "Samuel", amount: "$320", date: "09 Nov 2024", status: "paid" },
    { patient: "Catherine", amount: "$245", date: "01 Nov 2024", status: "overdue" },
    { patient: "Robert", amount: "$380", date: "28 Oct 2024", status: "paid" },
  ];

  const notifications = [
    { type: "success", title: "Booking Confirmed", message: "on 21 Mar 2024 10:30 AM", time: "1 min ago" },
    { type: "info", title: "You have a New Review", message: "for your Appointment", time: "2 Days ago" },
    { type: "warning", title: "You have Appointment", message: "with Ahmed by 01:20 PM", time: "12:56 PM" },
    { type: "error", title: "You have missed $200", message: "for an Appointment by 01:20 PM", time: "2 Days ago" },
  ];

  const clinics = [
    {
      name: "Sofia Clinic",
      price: "$900",
      hours: "07:00 AM - 09:00 PM",
      days: "Tue: 07:00 AM - 09:00 PM, Wed: 07:00 AM - 09:00 PM",
    },
    {
      name: "The Family Dentistry Clinic",
      price: "$600",
      hours: "07:00 AM - 09:00 PM",
      days: "Sat: 07:00 AM - 09:00 PM, Tue: 07:00 AM - 09:00 PM",
    },
  ];

  const menuItemsData = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", path: "/Doctor/dashboard" },
    { key: "appointments", icon: <CalendarOutlined />, label: "Appointments", path: "/Doctor/appointment" },
    { key: "patients", icon: <TeamOutlined />, label: "My Patients", path: "/Doctor/patients" },
    { key: "reviews", icon: <UserOutlined />, label: "Walkin Patients", path: "/Doctor/walkin" },
    { key: "services", icon: <SettingOutlined />, label: "Staff Management", path: "/Doctor/staffManagement" },
    { key: "availability", icon: <DashboardOutlined />, label: "Availability", path: "/Doctor/Availability" },
    { key: "accounts", icon: <FileTextOutlined />, label: "Accounts", path: "/Doctor/accounts" },
    { key: "invoices", icon: <FileTextOutlined />, label: "Invoices", path: "/Doctor/invoices" },
    { key: "messages", icon: <MailOutlined />, label: "Messages", path: "/Doctor/messages" },
    { key: "logout", icon: <UserOutlined />, label: "Logout", path: "/logout" },
  ];

  const menuItems = menuItemsData.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => router.push(item.path),
  }));

  const getStatusColor = (status: any) => {
    switch (status) {
      case "confirmed": return "green";
      case "pending": return "orange";
      case "completed": return "blue";
      default: return "default";
    }
  };

  const getInvoiceStatusColor = (status: any) => {
    switch (status) {
      case "paid": return "green";
      case "pending": return "orange";
      case "overdue": return "red";
      default: return "default";
    }
  };

  const API_BASE_URL = "http://192.168.1.42:3000";
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken") || "your-token-here";
    }
    return "your-token-here";
  };

  const getCurrentUserData = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/users/getUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setUserData(data?.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const getDashboardData = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/doctorDashboard/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    getCurrentUserData();
    getDashboardData();
  }, []);

  // Pagination data slices
  const paginatedAppointments = appointments.slice((appointmentsPage - 1) * pageSize, appointmentsPage * pageSize);
  const paginatedPatients = recentPatients.slice((patientsPage - 1) * pageSize, patientsPage * pageSize);
  const paginatedInvoices = recentInvoices.slice((invoicesPage - 1) * pageSize, invoicesPage * pageSize);
  const paginatedNotifications = notifications.slice((notificationsPage - 1) * pageSize, notificationsPage * pageSize);

  return (
    <>
      <AppHeader />
      <Layout style={{ minHeight: "100vh", marginTop: "4rem" }}>
        <Sider
          width={250}
          style={{ background: "#fff" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // Handle responsive sider collapse if needed
          }}
        >
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "#1890ff",
              color: "white",
            }}
          >
            <Avatar size={64} style={{ marginBottom: "10px" }}>
              <UserOutlined />
            </Avatar>
            <Title level={5} style={{ color: "white", margin: 0 }}>
              Dr {userData?.firstname} {userData?.lastname}
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", display: "block" }}>
              {userData?.email}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
              {userData?.mobile}
            </Text>
            <div style={{ marginTop: "10px" }}>
              <Tag color="blue">{userData?.specialization?.name}</Tag>
            </div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            onSelect={({ key }) => setSelectedMenuItem(key)}
            style={{
              borderRight: 0,
              height: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: "0 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Dashboard
            </Title>
          </Header>
          <Content style={{ margin: "20px", background: "#f0f2f5" }}>
            {/* Appointment Counts Row */}
            <Row gutter={[16, 16]} justify="space-between">
              {[
                { title: "Today", value: dashboardData.appointmentCounts.today, color: "#1890ff" },
                { title: "Upcoming", value: dashboardData.appointmentCounts.upcoming, color: "#fa8c16" },
                { title: "Completed", value: dashboardData.appointmentCounts.completed, color: "#52c41a" },
                { title: "Rescheduled", value: dashboardData.appointmentCounts.rescheduled, color: "#faad14" },
                { title: "Cancelled", value: dashboardData.appointmentCounts.cancelled, color: "#f5222d" },
                { title: "Active", value: dashboardData.appointmentCounts.active, color: "#1890ff" },
                { title: "Total", value: dashboardData.appointmentCounts.total, color: "#13c2c2" },
              ].map((item) => (
                <Col xs={24} sm={12} md={6} lg={3} key={item.title} className="ant-col-appointment">
                  <Card>
                    <Statistic
                      title={item.title}
                      value={item.value}
                      valueStyle={{ color: item.color }}
                      prefix={<CalendarOutlined />}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Revenue Row */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }} justify="space-between">
              {[
                { title: "Today Revenue", value: dashboardData.totalAmount.today, color: "#1890ff" },
                { title: "This Week", value: dashboardData.totalAmount.week, color: "#52c41a" },
                { title: "This Month", value: dashboardData.totalAmount.month, color: "#fa8c16" },
                { title: "Total Revenue", value: dashboardData.totalAmount.total, color: "#13c2c2" },
              ].map((item) => (
                <Col xs={24} sm={12} md={6} key={item.title}>
                  <Card>
                    <Statistic
                      title={item.title}
                      value={item.value}
                      valueStyle={{ color: item.color }}
                      prefix="$"
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Patients Row */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }} justify="space-between">
              {[
                { title: "Today Patients", value: dashboardData.uniquePatients.today, color: "#1890ff", icon: <UserOutlined /> },
                { title: "This Week", value: dashboardData.uniquePatients.week, color: "#52c41a", icon: <UserOutlined /> },
                { title: "This Month", value: dashboardData.uniquePatients.month, color: "#fa8c16", icon: <UserOutlined /> },
                { title: "Total Patients", value: dashboardData.uniquePatients.total, color: "#13c2c2", icon: <UserOutlined /> },
              ].map((item) => (
                <Col xs={24} sm={12} md={6} key={item.title}>
                  <Card>
                    <Statistic
                      title={item.title}
                      value={item.value}
                      valueStyle={{ color: item.color }}
                      prefix={item.icon}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Appointment Types Row */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }} justify="space-between">
              {[
                { title: "In-Person", value: dashboardData.appointmentTypes["In-Person"], color: "#1890ff", icon: <UserOutlined /> },
                { title: "Video", value: dashboardData.appointmentTypes.Video, color: "#52c41a", icon: <VideoCameraOutlined /> },
                { title: "Home Visit", value: dashboardData.appointmentTypes["home-visit"], color: "#fa8c16", icon: <TeamOutlined /> },
              ].map((item) => (
                <Col xs={24} sm={12} md={8} key={item.title}>
                  <Card>
                    <Statistic
                      title={item.title}
                      value={item.value}
                      valueStyle={{ color: item.color }}
                      prefix={item.icon}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Weekly Overview - Full Row */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Card
                  title="Weekly Overview"
                  extra={<Text>Mar 15 - Mar 21</Text>}
                  style={{ padding: "16px" }}
                >
                  <div style={{ position: "relative", height: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        height: "200px",
                        padding: "16px",
                        background: "#f5f7fa",
                        borderRadius: "8px",
                      }}
                    >
                      {[
                        { day: "M", appointments: 60, patients: 40 },
                        { day: "T", appointments: 50, patients: 30 },
                        { day: "W", appointments: 80, patients: 60 },
                        { day: "T", appointments: 30, patients: 20 },
                        { day: "F", appointments: 70, patients: 50 },
                        { day: "S", appointments: 20, patients: 15 },
                        { day: "S", appointments: 50, patients: 35 },
                      ].map((item, index) => (
                        <div key={item.day} style={{ textAlign: "center", flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              height: "100%",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                width: "20px",
                                height: `${item.appointments}px`,
                                background: "#1890ff",
                                borderRadius: "4px 4px 0 0",
                                transition: "height 0.3s ease",
                              }}
                              title={`Appointments: ${item.appointments}`}
                            ></div>
                            <div
                              style={{
                                width: "20px",
                                height: `${item.patients}px`,
                                background: "#faad14",
                                borderRadius: "4px 4px 0 0",
                                transition: "height 0.3s ease",
                              }}
                              title={`Patients: ${item.patients}`}
                            ></div>
                          </div>
                          <Text style={{ marginTop: "8px", fontSize: "12px" }}>{item.day}</Text>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "16px",
                        right: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        color: "#888",
                      }}
                    >
                      {["0", "20", "40", "60", "80", "100"].map((label) => (
                        <Text key={label}>{label}</Text>
                      ))}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "-40px",
                        transform: "rotate(-90deg)",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      Count
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "24px",
                      marginTop: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: "#1890ff",
                          marginRight: "8px",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <Text>Appointments</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: "#faad14",
                          marginRight: "8px",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <Text>Patients</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 2x2 Grid for Appointments, Recent Patients, Recent Invoices, Notifications */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} md={12}>
                <Card title="Appointments" extra={<Button type="link">View All</Button>}>
                  <List
                    itemLayout="horizontal"
                    dataSource={paginatedAppointments}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="text" icon={<PhoneOutlined />} />,
                          <Button type="text" icon={<VideoCameraOutlined />} />,
                          <Button type="text" icon={<MoreOutlined />} />,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar>{item.avatar}</Avatar>}
                          title={
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <Text strong>{item.name}</Text>
                              <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                            </div>
                          }
                          description={
                            <div>
                              <Text type="secondary">{item.time}</Text>
                              <br />
                              <Text>{item.type}</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={appointmentsPage}
                    pageSize={pageSize}
                    total={appointments.length}
                    onChange={(page) => setAppointmentsPage(page)}
                    style={{ marginTop: "16px", textAlign: "right" }}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Recent Patients" extra={<Button type="link">View All</Button>}>
                  <List
                    size="small"
                    dataSource={paginatedPatients}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar style={{ background: "#87d068" }}>{item.name.charAt(0)}</Avatar>}
                          title={item.name}
                          description={`Patient ID: ${item.id} | Last Appointment: ${item.lastVisit}`}
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={patientsPage}
                    pageSize={pageSize}
                    total={recentPatients.length}
                    onChange={(page) => setPatientsPage(page)}
                    style={{ marginTop: "16px", textAlign: "right" }}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Recent Invoices" extra={<Button type="link">View All</Button>}>
                  <List
                    size="small"
                    dataSource={paginatedInvoices}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.patient} description={`${item.amount} • ${item.date}`} />
                        <Tag color={getInvoiceStatusColor(item.status)}>{item.status}</Tag>
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={invoicesPage}
                    pageSize={pageSize}
                    total={recentInvoices.length}
                    onChange={(page) => setInvoicesPage(page)}
                    style={{ marginTop: "16px", textAlign: "right" }}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Notifications" extra={<Button type="link">View All</Button>}>
                  <List
                    size="small"
                    dataSource={paginatedNotifications}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundColor:
                                  item.type === "success"
                                    ? "#52c41a"
                                    : item.type === "info"
                                    ? "#1890ff"
                                    : item.type === "warning"
                                    ? "#faad14"
                                    : "#f5222d",
                              }}
                            >
                              {item.title.charAt(0)}
                            </Avatar>
                          }
                          title={item.title}
                          description={`${item.message} • ${item.time}`}
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={notificationsPage}
                    pageSize={pageSize}
                    total={notifications.length}
                    onChange={(page) => setNotificationsPage(page)}
                    style={{ marginTop: "16px", textAlign: "right" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Clinics & Availability - Full Row */}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Card title="Clinics & Availability">
                  <Row gutter={[16, 16]}>
                    {clinics.map((clinic, index) => (
                      <Col xs={24} md={12} key={index}>
                        <Card size="small" style={{ marginBottom: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <Text strong>{clinic.name}</Text>
                              <br />
                              <Text type="secondary">{clinic.hours}</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: "12px" }}>
                                {clinic.days}
                              </Text>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                                {clinic.price}
                              </Text>
                              <br />
                              <Button size="small" style={{ marginTop: "5px" }}>
                                Change
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      <style jsx>{`
        .appointment-row:hover {
          background-color: #f5f5f5;
        }
        .ant-card {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border-radius: 8px;
        }
        .ant-list-item {
          border-bottom: none !important;
        }
        .ant-layout-sider {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
        }
        .ant-menu-item:hover {
          background-color: #f0f5ff !important;
        }
        .ant-menu-item-selected {
          background-color: #e6f7ff !important;
        }
        .ant-col-appointment:hover .ant-card {
          transform: translateY(-4px);
          transition: transform 0.2s ease;
        }
        @media (max-width: 768px) {
          .ant-layout-sider {
            position: fixed;
            height: 100vh;
            z-index: 1000;
          }
          .ant-card {
            margin-bottom: 16px;
          }
        }
        @media (max-width: 992px) {
          .ant-col {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        @media (min-width: 1200px) {
          .ant-col-appointment {
            flex: 0 0 14.28%;
            max-width: 14.28%;
          }
        }
      `}</style>
    </>
  );
}