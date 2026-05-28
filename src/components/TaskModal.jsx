import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd';
import { useEffect } from 'react';
import { DAYS } from '../constants/days';
import { MAX_ATTACHMENT_SIZE } from '../constants/files';
import { DEFAULT_PRIORITY, PRIORITIES } from '../constants/priority';
import { formatFileSize, readFileAsAttachment } from '../utils/fileAttachment';
import PriorityLabel from './PriorityLabel';

const normFile = (event) => {
  if (Array.isArray(event)) return event;
  return event?.fileList;
};

function getAttachmentFileList(task) {
  if (!task?.attachment) return [];

  return [
    {
      uid: String(task.id),
      name: task.attachment.name,
      status: 'done',
    },
  ];
}

export default function TaskModal({ open, task, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const isEdit = Boolean(task);

  useEffect(() => {
    if (!open) return;

    if (task) {
      form.setFieldsValue({
        name: task.name,
        description: task.description,
        day: task.day,
        priority: task.priority,
        attachment: getAttachmentFileList(task),
      });
      return;
    }

    form.resetFields();
    form.setFieldsValue({ priority: DEFAULT_PRIORITY, attachment: [] });
  }, [open, task, form]);

  const handleFinish = async (values) => {
    try {
      const fileList = values.attachment || [];
      const newFile = fileList[0]?.originFileObj;
      let attachment;

      if (newFile) {
        attachment = await readFileAsAttachment(newFile);
      } else if (fileList.length === 0) {
        attachment = null;
      }

      onSubmit({
        name: values.name,
        description: values.description,
        day: values.day,
        priority: values.priority,
        attachment,
      });

      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Не удалось прикрепить файл');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={isEdit ? 'Редактирование задачи' : 'Создание задачи'}
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Сохранить"
      cancelText="Отменить"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Название задачи"
          name="name"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input placeholder="Например: Подготовить отчёт" />
        </Form.Item>

        <Form.Item label="Описание задачи" name="description">
          <Input.TextArea rows={3} placeholder="Дополнительные детали (необязательно)" />
        </Form.Item>

        <Form.Item
          label="Приоритет"
          name="priority"
          rules={[{ required: true, message: 'Выберите приоритет' }]}
        >
          <Select
            placeholder="Выбрать приоритет"
            options={PRIORITIES.map((priority) => ({
              value: priority.value,
              label: priority.label,
            }))}
            optionRender={(option) => (
              <PriorityLabel priority={option.value} className="priority-label--option" />
            )}
            labelRender={(props) => <PriorityLabel priority={props.value} />}
          />
        </Form.Item>

        <Form.Item
          label="День недели"
          name="day"
          rules={[{ required: true, message: 'Выберите день недели' }]}
        >
          <Select placeholder="Выбрать день">
            {DAYS.map((day) => (
              <Select.Option key={day.key} value={day.key}>
                {day.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Прикрепить файл"
          name="attachment"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra={`Необязательно. До ${formatFileSize(MAX_ATTACHMENT_SIZE)}, хранится локально в браузере.`}
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="text">
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
