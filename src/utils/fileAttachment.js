import { MAX_ATTACHMENT_SIZE } from '../constants/files';

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export function readFileAsAttachment(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    if (file.size > MAX_ATTACHMENT_SIZE) {
      reject(new Error(`Файл слишком большой. Максимальный размер — ${formatFileSize(MAX_ATTACHMENT_SIZE)}`));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        data: reader.result,
      });
    };

    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

export function downloadAttachment(attachment) {
  if (!attachment?.data) return;

  const link = document.createElement('a');
  link.href = attachment.data;
  link.download = attachment.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
