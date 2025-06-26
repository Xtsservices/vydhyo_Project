"use client";
import { Layout, Avatar, Badge, Button, Dropdown, Typography } from "antd";
import { BellOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const router = useRouter();

  const adminMenuItems = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
    },
    {
      key: "3",
      label: "Logout",
    },
  ];

  const handleMenuClick = (e: { key: any }) => {
    if (e.key === "3") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      sessionStorage.clear();
      router.push("/Admin/app/login");
    }
    if (e.key === "1") {
      // Profile navigation logic
    }
    if (e.key === "2") {
      // Settings navigation logic
    }
  };

  return (
    <>
      <Header
        style={
          {
            position: "fixed",
            top: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            height: "64px",
            zIndex: 1000,
            paddingTop: "24px",
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
            } as CSSProperties
          }
          onClick={() => router.push("/Admin/app/dashboard")}
        >
          <img
            src="/images/vydh_logo.png"
            alt="Logo"
            style={
              {
                width: "140px",
                height: "120px", // Fixed height
                borderRadius: "8px",
                marginRight: "12px",
                objectFit: "contain",
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
              <Text style={{ fontWeight: "500", color: "#000" }}>Doctor</Text>
              <DownOutlined style={{ fontSize: "12px", color: "#666" }} />
            </div>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
