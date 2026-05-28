import { Badge, Card, Empty, Typography } from 'antd';
import { useState } from 'react';
import { isTaskInDateRange } from '../utils/filterTasks';
import TaskCard from './TaskCard';

const { Title } = Typography;

export default function DayColumn({
  dayKey,
  label,
  tasks,
  dateRange,
  onDelete,
  onMove,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const visibleTasks = tasks.filter((task) => isTaskInDateRange(task, dateRange));

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = Number(e.dataTransfer.getData('text/plain'));
    if (taskId) onMove(taskId, dayKey);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', String(taskId));
    e.currentTarget.classList.add('task-card--dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('task-card--dragging');
  };

  return (
    <Card
      className={`day-column ${isDragOver ? 'day-column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      title={
        <div className="day-column__title">
          <Title level={5} style={{ margin: 0 }}>
            {label}
          </Title>
          <Badge count={visibleTasks.length} showZero color="#722ed1" />
        </div>
      }
      styles={{ body: { padding: '12px', minHeight: 280 } }}
    >
      <div className="day-column__tasks">
        {visibleTasks.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Нет задач"
            style={{ margin: '24px 0' }}
          />
        ) : (
          visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </div>
    </Card>
  );
}
