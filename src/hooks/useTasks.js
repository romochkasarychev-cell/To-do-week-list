import { message } from 'antd';
import { useEffect, useState } from 'react';
import { EMPTY_TASKS, STORAGE_KEY } from '../constants/days';
import { DEFAULT_PRIORITY } from '../constants/priority';

function normalizeTask(task) {
  return {
    ...task,
    priority: task.priority || DEFAULT_PRIORITY,
  };
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...EMPTY_TASKS };

    const parsed = JSON.parse(saved);
    const normalized = { ...EMPTY_TASKS, ...parsed };

    for (const day of Object.keys(normalized)) {
      normalized[day] = Array.isArray(normalized[day])
        ? normalized[day].map(normalizeTask)
        : [];
    }

    return normalized;
  } catch {
    return { ...EMPTY_TASKS };
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
      if (error?.name === 'QuotaExceededError') {
        message.error('Недостаточно места в браузере. Удалите задачи с файлами или выберите файл меньшего размера.');
      }
    }
  }, [tasks]);

  const addTask = ({ name, description, day, priority, attachment }) => {
    const task = {
      id: Date.now(),
      name,
      description,
      day,
      priority: priority || DEFAULT_PRIORITY,
      createdAt: new Date().toISOString(),
      ...(attachment && { attachment }),
    };

    setTasks((prev) => ({
      ...prev,
      [day]: [...prev[day], task],
    }));
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => {
      const next = { ...prev };
      for (const day of Object.keys(next)) {
        next[day] = next[day].filter((task) => task.id !== taskId);
      }
      return next;
    });
  };

  const moveTask = (taskId, newDay) => {
    setTasks((prev) => {
      const next = { ...prev };
      let movedTask = null;

      for (const day of Object.keys(next)) {
        const index = next[day].findIndex((task) => task.id === taskId);
        if (index !== -1) {
          movedTask = next[day][index];
          next[day] = next[day].filter((_, i) => i !== index);
          break;
        }
      }

      if (movedTask) {
        next[newDay] = [...next[newDay], { ...movedTask, day: newDay }];
      }

      return next;
    });
  };

  return { tasks, addTask, deleteTask, moveTask };
}
