import { CheckSquareOutlined, PaperClipOutlined, ProjectOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row, Statistic, Typography } from 'antd';
import { getTaskStats } from '../utils/taskStats';

const { Title, Text } = Typography;

export default function DashboardTab({ tasks }) {
  const stats = getTaskStats(tasks);
  const maxDayCount = Math.max(...stats.byDay.map((day) => day.count), 1);

  return (
    <div className="dashboard-tab">
      <Title level={4} style={{ marginTop: 0 }}>
        Обзор задач
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Всего задач"
              value={stats.total}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="С вложениями"
              value={stats.withAttachments}
              prefix={<PaperClipOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Высокий приоритет"
              value={stats.byPriority.find((item) => item.key === 'high')?.count ?? 0}
              prefix={<CheckSquareOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Задачи по дням недели">
            <div className="dashboard-list">
              {stats.byDay.map((day) => (
                <div key={day.key} className="dashboard-list__item">
                  <Text>{day.label}</Text>
                  <div className="dashboard-list__bar">
                    <Progress
                      percent={Math.round((day.count / maxDayCount) * 100)}
                      showInfo={false}
                      strokeColor="#722ed1"
                    />
                  </div>
                  <Text strong>{day.count}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Задачи по приоритету">
            <div className="dashboard-list">
              {stats.byPriority.map((priority) => (
                <div key={priority.key} className="dashboard-list__item">
                  <Text>{priority.label}</Text>
                  <div className="dashboard-list__bar">
                    <Progress
                      percent={stats.total ? Math.round((priority.count / stats.total) * 100) : 0}
                      showInfo={false}
                      strokeColor={priority.color}
                    />
                  </div>
                  <Text strong>{priority.count}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
