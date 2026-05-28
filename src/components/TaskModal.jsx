import { Form, Input, Modal, Select } from 'antd';
import { DAYS } from '../constants/days';

export default function TaskModal({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
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
      </Form>
    </Modal>
  );
}
