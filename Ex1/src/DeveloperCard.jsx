import { Fragment } from 'react';
import styles from './DeveloperCard.module.css';

function SkillBadge({ name, level }) {
  return (
    <span className={styles.skillBadge}>
      {name} ({level})
    </span>
  );
}

export function DeveloperCard({
  fullName = 'Gemma',
  role = 'Senior Systems Architect • UIT S3T',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240',
  metrics = {
    commits: 512,
    vdomNodes: 0,
    a11yScore: 100,
  },
  skills = [
    {
      id: 'sk-1',
      name: 'React 19 Fiber',
      level: 'Core',
    },
  ],
}) {
  return (
    <article
      className={styles.card}
      aria-labelledby="dev-heading"
    >
      <header className={styles.header}>
        <img
          src={avatarUrl}
          alt={fullName}
          width="64"
          height="64"
        />

        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <ul
        className={styles.skills}
        aria-label="Skills"
      >
        {skills.map((skill) => (
          <li key={skill.id}>
            <SkillBadge
              name={skill.name}
              level={skill.level}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}