import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd';
import { DAYS } from '../constants/days';
import { MAX_ATTACHMENT_SIZE } from '../constants/files';
import { DEFAULT_PRIORITY, PRIORITIES } from '../constants/priority';
import { formatFileSize, readFileAsAttachment } from '../utils/fileAttachment';
import PriorityLabel from './PriorityLabel';

const normFile = (event) => {
  if (Array.isArray(event)) return event;
  return event?.fileList;
};

export default function TaskModal({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const file = values.attachment?.[0]?.originFileObj;
      const attachment = file ? await readFileAsAttachment(file) : null;

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
      title="Создание задачи"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Сохранить"
      cancelText="Отменить"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ priority: DEFAULT_PRIORITY }}
      >
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
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
