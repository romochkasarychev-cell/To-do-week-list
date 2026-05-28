import { Col, Row } from 'antd';
import { DAYS } from '../constants/days';
import DayColumn from './DayColumn';

export default function WeekBoard({ tasks, dateRange, onDelete, onEdit, onMove }) {
  return (
    <Row gutter={[12, 12]} className="week-board">
      {DAYS.map((day) => (
        <Col key={day.key} xs={24} sm={12} md={8} lg={6} xl={3}>
          <DayColumn
            dayKey={day.key}
            label={day.label}
            tasks={tasks[day.key]}
            dateRange={dateRange}
            onDelete={onDelete}
            onEdit={onEdit}
            onMove={onMove}
          />
        </Col>
      ))}
    </Row>
  );
}
