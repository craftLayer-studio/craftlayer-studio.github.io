import s from './work.module.css';

/** Simple left-to-right (top-to-bottom on mobile) diagram of architecture parts. */
export function ArchitectureDiagram({parts, title}: {parts: string[]; title: string}) {
  return (
    <figure className={s.arch} style={{margin: 0}}>
      <ol className={s.archList} aria-label={`${title} architecture components`}>
        {parts.map((part, i) => (
          <li key={part} className={s.archNode}>
            <span className={s.archIndex} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={s.archName}>{part}</span>
          </li>
        ))}
      </ol>
      <figcaption className={s.archCaption}>
        Simplified view of the main parts of {title}, in the order a request meets them.
      </figcaption>
    </figure>
  );
}
