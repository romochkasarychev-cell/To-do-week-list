import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

export default function TaskCard({ task, onDelete, onDragStart, onDragEnd }) {
  return (
    <Card
      size="small"
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
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
      <Text strong className="task-card__title">
        {task.name}
      </Text>
      {task.description && (
        <Paragraph type="secondary" className="task-card__description" ellipsis={{ rows: 3 }}>
          {task.description}
        </Paragraph>
      )}
      <Text type="secondary" className="task-card__time">
        Создано: {dayjs(task.createdAt).format('DD.MM.YYYY HH:mm')}
      </Text>
    </Card>
  );
}
