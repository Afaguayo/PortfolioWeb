import { KAGGLE_PROFILE, KAGGLE_REPO, kaggleEntries } from "@/lib/kaggle";
import type { Copy } from "@/lib/content";

export default function KaggleEntries({ copy }: { copy: Copy["kaggle"] }) {
  return (
    <>
      <div className="repo-grid">
        {kaggleEntries.map((e, i) => (
          <article key={e.code} className="repo-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="repo-slot">{copy.slot}-{String(i + 1).padStart(2, "0")}</div>
            <h3 className="repo-name">
              <a className="link" href={e.competition} target="_blank" rel="noopener noreferrer">
                {e.name}
              </a>
            </h3>
            {e.approach && <p className="repo-desc">{e.approach}</p>}
            <div className="repo-meta kaggle-score">
              <span className="chip">{e.metric}</span>
              <span className="stat-label">{copy.score}</span>
              <span className="kaggle-value">{e.score}</span>
            </div>
            <div className="repo-actions">
              <a className="btn-blade" href={e.code} target="_blank" rel="noopener noreferrer">
                {copy.code}
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="center kaggle-links">
        <a className="btn-orb" href={KAGGLE_PROFILE} target="_blank" rel="noopener noreferrer">
          {copy.profile}
        </a>
        <a className="btn-orb" href={KAGGLE_REPO} target="_blank" rel="noopener noreferrer">
          {copy.repo}
        </a>
      </div>
    </>
  );
}
