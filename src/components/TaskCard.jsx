import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';
import { getPriorityMeta } from '../constants/priority';
import PriorityLabel from './PriorityLabel';
import TaskAttachment from './TaskAttachment';

const { Text, Paragraph } = Typography;

export default function TaskCard({ task, onDelete, onDragStart, onDragEnd }) {
  const priority = getPriorityMeta(task.priority);

  return (
    <Card
      size="small"
      className={`task-card task-card--${priority.value}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      style={{
        backgroundColor: priority.bgColor,
        borderColor: priority.borderColor,
      }}
      styles={{ body: { padding: '12px' } }}
    >
      <div className="task-card__header">
        <HolderOutlined className="task-card__drag-icon" />
        <Popconfirm
          title="Удалить задачу?"
          description="Это действие нельзя отменить"
          okText="Удалить"
          cancelText="Отмена"
          onConfirm={() => onDelete(task.id)}
        >
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            aria-label="Удалить задачу"
          />
        </Popconfirm>
      </div>
      <div className="task-card__meta">
        <PriorityLabel priority={task.priority} />
      </div>
      <Text strong className="task-card__title">
        {task.name}
      </Text>
      {task.description && (
        <Paragraph type="secondary" className="task-card__description" ellipsis={{ rows: 3 }}>
          {task.description}
        </Paragraph>
      )}
      <TaskAttachment attachment={task.attachment} />
      <Text type="secondary" className="task-card__time">
        Создано: {dayjs(task.createdAt).format('DD.MM.YYYY HH:mm')}
      </Text>
    </Card>
  );
}
