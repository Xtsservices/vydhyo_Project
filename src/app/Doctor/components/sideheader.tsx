// components/SiderHeader.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Layout, Avatar, Menu, Tag, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Sider } = Layout;
const { Title, Text } = Typography;

type UserData = {
  firstname?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  specialization?: {
    name?: string;
  };
};

const API_BASE_URL = "http://192.168.1.42:3000";

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

export default function SiderHeader() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

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

  const menuItems = menuItemsData.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => router.push(item.path),
  }));

  useEffect(() => {
    getCurrentUserData();
  }, []);

  return (
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
      <style jsx>{`
        .ant-layout-sider {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
        }
        .ant-menu-item:hover {
          background-color: #f0f5ff !important;
        }
        .ant-menu-item-selected {
          background-color: #e6f7ff !important;
        }
        @media (max-width: 768px) {
          .ant-layout-sider {
            position: fixed;
            height: 100vh;
            z-index: 1000;
          }
        }
      `}</style>
    </Sider>
  );
}