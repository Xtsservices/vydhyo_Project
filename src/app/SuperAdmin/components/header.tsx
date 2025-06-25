"use client";
import { Layout, Avatar, Badge, Button, Dropdown, Space, Typography } from 'antd';
import { BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { MessageOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const router = useRouter(); // Initialize the router hook

    // Dropdown menu items for admin profile
    const adminMenuItems = [
        {
            key: '3',
            label: 'Logout',
        },
    ];

    const handleMenuClick = (e: { key: any }) => {
        console.log('Menu clicked:', e.key);
        localStorage.removeItem('accessToken'); // Clear the token from local storage
        router.push('/'); // Redirect to the home page
    };

    return (
        <Header
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                background: '#fff',
                borderBottom: '1px solid #f0f0f0',
                height: '74px',
                zIndex: 1000,
                paddingTop: '12px',
                paddingBottom: '12px',
            }}
        >
            {/* Left side - Logo */}
            <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => router.push('/Admin/app/dashboard')}
            >
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '8px',
                        marginRight: '12px',
                    }}
                />
            </div>

            <div style={{  gap: '16px', marginLeft: 'auto', marginRight: '0px' }}>
                {/* Message Icon */}
                <Badge count={1} size="small" style={{ marginRight: '5px' }}>

                <Button
                    type="text"
                    icon={<MessageOutlined style={{ fontSize: '18px' }} />}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '764px',
                        border: 'none',
                        color: '#666',
                    }}
                />
                </Badge>
            </div>

            {/* Right side - Notifications and Admin */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', marginRight: '44px' }}>
                {/* Notifications */}
                <Badge count={2} size="small" style={{ marginRight: '5px' }}>
                    <Button
                        type="text"
                        icon={<BellOutlined style={{ fontSize: '18px' }} />}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            color: '#666',
                        }}
                    />
                </Badge>

                {/* Admin Profile Dropdown */}
                <Dropdown
                    menu={{
                        items: adminMenuItems,
                        onClick: handleMenuClick,
                    }}
                    trigger={['click']}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <Avatar
                            size={32}
                            style={{
                                backgroundColor: '#1890ff',
                                color: 'white',
                            }}
                            icon={<UserOutlined />}
                        />
                        <Text style={{ fontWeight: '500', color: '#000' }}>Super Admin</Text>
                        <DownOutlined style={{ fontSize: '12px', color: '#666' }} />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
