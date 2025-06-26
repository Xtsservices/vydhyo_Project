"use client";
import { Layout, Avatar, Badge, Button, Dropdown, Typography } from "antd";
import { BellOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const router = useRouter(); // Initialize the router hook

  // Dropdown menu items for admin profile
  const adminMenuItems = [
    {
      key: "1",
      label: "Profile",
      onClick: () => router.push("/Doctor/profile"),
    },
    {
      key: "2",
      label: "Settings",
      onClick: () => router.push("/Doctor/app/settings"),
    },
    {
      key: "3",
      label: "Logout",
    },
  ];

  const handleMenuClick = (e: { key: any }) => {
    console.log("Menu clicked:", e.key);

    // Handle logout functionality
    if (e.key === "3") {
      // Logout option
      // Remove token from localStorage
      localStorage.removeItem("token");

      // You might also want to remove other auth-related items
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");

      // Clear sessionStorage if you're using it
      sessionStorage.clear();

      // Redirect to login page
      router.push("/Admin/app/login");
    }

    // Handle other menu items
    if (e.key === "1") {
      // Profile
      // Add profile navigation logic here
      console.log("Navigate to profile");
    }

    if (e.key === "2") {
      // Settings
      // Add settings navigation logic here
      console.log("Navigate to settings");
    }
  };

  return (
    <>
      <Header
        style={
          {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            height: "64px",
            zIndex: 1000,
            position: "fixed",
            top: 0,
            paddingTop: "12px",
            padding: "0 24px",
            paddingBottom: "12px",
          } as CSSProperties
        }
      >
        <div
          style={
            {
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              paddingTop: "20px",
            } as CSSProperties
          }
          onClick={() => router.push("/Admin/app/dashboard")}
        >
          <img
            src="/images/vydh_logo.png"
            alt="Logo"
            style={
              {
                width: "120px",
                height: "120px",
                borderRadius: "8px",
                marginRight: "12px",
              } as CSSProperties
            }
          />
        </div>

        <div
          style={
            {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginLeft: "auto",
              marginRight: "44px",
            } as CSSProperties
          }
        >
          {/* Notifications */}
          <Badge count={3} size="small">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  color: "#666",
                } as CSSProperties
              }
            />
          </Badge>

          {/* Admin Profile Dropdown */}
          <Dropdown
            menu={{
              items: adminMenuItems,
              onClick: handleMenuClick,
            }}
            trigger={["click"]}
          >
            <div
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition: "background-color 0.2s",
                } as CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Avatar
                size={32}
                style={
                  {
                    backgroundColor: "#1890ff",
                    color: "white",
                  } as CSSProperties
                }
                icon={<UserOutlined />}
              />
              <Text style={{ fontWeight: "500", color: "#000" }}>Admin</Text>
              <DownOutlined style={{ fontSize: "12px", color: "#666" }} />
            </div>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
