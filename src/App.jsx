import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, DatePicker, Layout, Space, Typography, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import TaskModal from './components/TaskModal';
import WeekBoard from './components/WeekBoard';
import { useTasks } from './hooks/useTasks';
import './index.css';

dayjs.locale('ru');

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function App() {
  const { tasks, addTask, deleteTask, moveTask } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const handleCreateTask = (values) => {
    addTask(values);
    setModalOpen(false);
  };

  const handleDateChange = (dates) => {
    if (!dates) {
      setDateRange(null);
      return;
    }
    setDateRange(dates);
  };

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
            Список задач на неделю
          </Title>
        </Header>

        <Content className="app-content">
          <Space
            wrap
            size="middle"
            className="app-toolbar"
            style={{ marginBottom: 24, width: '100%' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setModalOpen(true)}
            >
              Создать задачу
            </Button>

            <Space direction="vertical" size={4}>
              <Text type="secondary">
                <CalendarOutlined /> Фильтр по дате создания
              </Text>
              <RangePicker
                value={dateRange}
                onChange={handleDateChange}
                format="DD.MM.YYYY"
                placeholder={['Начало', 'Конец']}
                allowClear
              />
            </Space>
          </Space>

          <WeekBoard
            tasks={tasks}
            dateRange={dateRange}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        </Content>

        <TaskModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      </Layout>
    </ConfigProvider>
  );
}
