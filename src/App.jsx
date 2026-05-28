import {
  BarChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Tabs, Typography, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import DashboardTab from './pages/DashboardTab';
import ProfileTab from './pages/ProfileTab';
import TaskListTab from './pages/TaskListTab';
import './index.css';

dayjs.locale('ru');

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [activeTab, setActiveTab] = useState('tasks');

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Личный кабинет
        </span>
      ),
      children: <ProfileTab />,
    },
    {
      key: 'dashboard',
      label: (
        <span>
          <BarChartOutlined />
          Дашборды
        </span>
      ),
      children: <DashboardTab tasks={tasks} />,
    },
    {
      key: 'tasks',
      label: (
        <span>
          <UnorderedListOutlined />
          Список задач
        </span>
      ),
      children: (
        <TaskListTab
          tasks={tasks}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onMoveTask={moveTask}
        />
      ),
    },
  ];

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#722ed1',
          borderRadius: 8,
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout className="app-layout">
        <Header className="app-header">
          <Title level={3} style={{ margin: 0, color: '#fff' }}>
            Планировщик задач
          </Title>
        </Header>

        <Content className="app-content">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="app-tabs"
            size="large"
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
