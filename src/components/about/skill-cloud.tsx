import { certifications, skills } from "@/data/profile";

/** Skills grouped as on the CV. */
export function SkillCloud() {
  return (
    <div className="space-y-6">
      {skills.map((g) => (
        <div key={g.group}>
          <h4 className="t-eyebrow mb-2.5">{g.group}</h4>
          <ul className="flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <li key={s} className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4 className="t-eyebrow mb-2.5">Certification</h4>
        <ul className="space-y-1 text-sm text-muted">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
