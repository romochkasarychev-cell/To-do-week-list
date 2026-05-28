import { PRIORITY_ORDER } from '../constants/priority';

export function sortTasksByPriority(tasks) {
  return [...tasks].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
  );
}
