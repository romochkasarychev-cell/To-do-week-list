import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space, Typography } from 'antd';
import { useState } from 'react';
import TaskModal from '../components/TaskModal';
import WeekBoard from '../components/WeekBoard';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export default function TaskListTab({ tasks, onAddTask, onDeleteTask, onMoveTask }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const handleCreateTask = (values) => {
    onAddTask(values);
    setModalOpen(false);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates ?? null);
  };

  return (
    <>
      <Space wrap size="middle" className="app-toolbar" style={{ marginBottom: 24, width: '100%' }}>
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
        onDelete={onDeleteTask}
        onMove={onMoveTask}
      />

      <TaskModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </>
  );
}
