import dayjs from 'dayjs';

export function isTaskInDateRange(task, dateRange) {
  if (!dateRange?.[0] || !dateRange?.[1]) return true;

  const created = dayjs(task.createdAt);
  const start = dateRange[0].startOf('day');
  const end = dateRange[1].endOf('day');

  return (
    (created.isAfter(start) || created.isSame(start, 'day')) &&
    (created.isBefore(end) || created.isSame(end, 'day'))
  );
}
