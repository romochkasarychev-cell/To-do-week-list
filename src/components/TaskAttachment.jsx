import { DownloadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { downloadAttachment, formatFileSize } from '../utils/fileAttachment';

const { Text } = Typography;

export default function TaskAttachment({ attachment }) {
  if (!attachment) return null;

  return (
    <div className="task-attachment">
      <PaperClipOutlined className="task-attachment__icon" />
      <div className="task-attachment__info">
        <Text className="task-attachment__name" ellipsis title={attachment.name}>
          {attachment.name}
        </Text>
        <Text type="secondary" className="task-attachment__size">
          {formatFileSize(attachment.size)}
        </Text>
      </div>
      <Button
        type="link"
        size="small"
        icon={<DownloadOutlined />}
        onClick={() => downloadAttachment(attachment)}
      >
        Скачать
      </Button>
    </div>
  );
}
