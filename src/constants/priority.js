export const DEFAULT_PRIORITY = 'medium';

export const PRIORITIES = [
  {
    value: 'high',
    label: 'Высокий',
    color: '#cf1322',
    bgColor: '#fff1f0',
    borderColor: '#ffa39e',
    tagBg: '#ff4d4f',
    tagText: '#ffffff',
  },
  {
    value: 'medium',
    label: 'Средний',
    color: '#d46b08',
    bgColor: '#fff7e6',
    borderColor: '#ffd591',
    tagBg: '#fa8c16',
    tagText: '#ffffff',
  },
  {
    value: 'low',
    label: 'Низкий',
    color: '#389e0d',
    bgColor: '#f6ffed',
    borderColor: '#b7eb8f',
    tagBg: '#52c41a',
    tagText: '#ffffff',
  },
];

export const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
};

export function getPriorityMeta(priority) {
  return (
    PRIORITIES.find((item) => item.value === priority) ??
    PRIORITIES.find((item) => item.value === DEFAULT_PRIORITY)
  );
}
