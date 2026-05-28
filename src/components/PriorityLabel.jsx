import { getPriorityMeta } from '../constants/priority';

export default function PriorityLabel({ priority, className = '' }) {
  const meta = getPriorityMeta(priority);

  return (
    <span
      className={`priority-label priority-label--${meta.value} ${className}`.trim()}
      style={{
        '--priority-color': meta.color,
        '--priority-bg': meta.bgColor,
        '--priority-border': meta.borderColor,
        '--priority-tag-bg': meta.tagBg,
        '--priority-tag-text': meta.tagText,
      }}
    >
      <span className="priority-label__dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}
