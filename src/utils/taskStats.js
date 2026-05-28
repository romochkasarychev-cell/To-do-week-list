import { DAYS } from '../constants/days';
import { PRIORITIES } from '../constants/priority';

export function getAllTasks(tasks) {
  return DAYS.flatMap((day) => tasks[day.key] ?? []);
}

export function getTaskStats(tasks) {
  const allTasks = getAllTasks(tasks);

  const byDay = DAYS.map((day) => ({
    key: day.key,
    label: day.label,
    count: tasks[day.key]?.length ?? 0,
  }));

  const byPriority = PRIORITIES.map((priority) => ({
    key: priority.value,
    label: priority.label,
    color: priority.tagBg,
    count: allTasks.filter((task) => task.priority === priority.value).length,
  }));

  const withAttachments = allTasks.filter((task) => task.attachment).length;

  return {
    total: allTasks.length,
    byDay,
    byPriority,
    withAttachments,
  };
}
