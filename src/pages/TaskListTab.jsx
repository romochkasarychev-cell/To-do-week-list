import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space, Typography } from 'antd';
import { useState } from 'react';
import TaskModal from '../components/TaskModal';
import WeekBoard from '../components/WeekBoard';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export default function TaskListTab({ tasks, onAddTask, onUpdateTask, onDeleteTask, onMoveTask }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (values) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, values);
    } else {
      onAddTask(values);
    }
    closeModal();
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
          onClick={openCreateModal}
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
        onEdit={openEditModal}
        onMove={onMoveTask}
      />

      <TaskModal
        open={modalOpen}
        task={editingTask}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
