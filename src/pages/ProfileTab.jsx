import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const PROFILE_KEY = 'todo-week-profile';

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : { name: 'Пользователь', email: '' };
  } catch {
    return { name: 'Пользователь', email: '' };
  }
}

export default function ProfileTab() {
  const [profile, setProfile] = useState(loadProfile);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(profile);
  }, [form, profile]);

  const handleSave = (values) => {
    setProfile(values);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(values));
    message.success('Профиль сохранён');
  };

  return (
    <div className="profile-tab">
      <Card className="profile-tab__card">
        <div className="profile-tab__header">
          <Avatar size={72} icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {profile.name || 'Пользователь'}
            </Title>
            <Text type="secondary">
              {profile.email || 'Email не указан'}
            </Text>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={profile}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ваше имя" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Введите корректный email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="email@example.com" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Сохранить профиль
          </Button>
        </Form>
      </Card>
    </div>
  );
}
