import Image from "next/image";

type Project = {
  id: string;
  title: string;
  tags: { label: string; category: "garden" | "works" }[];
  before: string | null;
  after: string | null;
};

// Photos fournies par Samuel : avant puis après pour chaque réalisation.
const projects: Project[] = [
  { id: "01", title: "Aménagement d’un massif avec galets", tags: [{ label: "Aménagement extérieur", category: "garden" }], before: "/assets/realisation-01-before.webp", after: "/assets/realisation-01-after.webp" },
  { id: "02", title: "Entretien d’un terrain", tags: [{ label: "Entretien de terrain", category: "garden" }], before: "/assets/realisation-02-before.webp", after: "/assets/realisation-02-after.webp" },
];

export function Projects() {
  return <section className="projects" id="realisations" aria-labelledby="projects-title">
    <div className="projects-heading">
      <div><p className="eyebrow">LES RÉALISATIONS</p><h2 id="projects-title">Avant. Après.<br />Ça change tout.</h2></div>
      <p>Un aperçu du travail sur le terrain.</p>
    </div>
    <div className="projects-grid">
      {projects.map(project => <article className="project-card" key={project.id} aria-label={project.title}>
        <div className="project-pair">
          {([['Avant', project.before], ['Après', project.after]] as const).map(([label, src]) => <figure className={`project-photo project-photo-${label === 'Avant' ? 'before' : 'after'}`} key={label}>
            {src ? <Image src={src} alt={`${project.title} — ${label.toLowerCase()} les travaux`} fill sizes="(max-width: 700px) 44vw, 23vw" /> : <div className="project-placeholder" aria-label={`Photo ${label.toLowerCase()} à venir`}><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x="5" y="7" width="30" height="26" rx="3" /><circle cx="27" cy="15" r="3" /><path d="m5 27 10-10 10 10 5-5 5 5" /></svg><span>Photo à venir</span></div>}
            <figcaption className="project-state">{label}</figcaption>
          </figure>)}
          <span className="project-transition" aria-hidden="true">↗</span>
        </div>
        <div className="project-caption"><span className="project-number">{project.id}</span><ul className="project-tags" aria-label="Prestations réalisées">{project.tags.map(tag => <li className={`project-tag project-tag-${tag.category}`} key={tag.label}>{tag.label}</li>)}</ul></div>
      </article>)}
    </div>
  </section>;
}
