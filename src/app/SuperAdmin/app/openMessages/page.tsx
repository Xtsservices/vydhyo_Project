// MessageDashboard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Typography, Badge, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { Text } = Typography;

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

const MessageDashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace this with your actual API call
  const fetchMessages = async () => {
    try {
      // Example: replace this with `await axios.get('/api/messages')`
      const response: Message[] = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 1,
              sender: 'Dr. Sharma',
              content: 'Patient report uploaded.',
              timestamp: new Date().toLocaleTimeString(),
              unread: true,
            },
            {
              id: 2,
              sender: 'Nurse Meera',
              content: 'Medication updated for Room 402.',
              timestamp: new Date().toLocaleTimeString(),
              unread: true,
            },
          ]);
        }, 1000)
      );
      setMessages(response);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Optional: auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };
  return (
    <>
        <AppHeader />        

    <Card
      title="📨 Message Dashboard"
      style={{
        maxWidth: 600,
        margin: '40px auto',
        borderRadius: 16,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        marginTop:100,
      }}
    >
        
      {loading ? (
        <Spin />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              onClick={() => markAsRead(item.id)}
              style={{
                cursor: 'pointer',
                backgroundColor: item.unread ? '#f0f9ff' : 'white',
                borderRadius: 10,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={item.unread}>
                    <Avatar icon={<UserOutlined />} />
                  </Badge>
                }
                title={
                  <Text strong>
                    {item.sender}{' '}
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      ({item.timestamp})
                    </Text>
                  </Text>
                }
                description={<Text>{item.content}</Text>}
              />
            </List.Item>
          )}
        />
        
      )}
    </Card>
    </>
  );
};


export default MessageDashboard;
