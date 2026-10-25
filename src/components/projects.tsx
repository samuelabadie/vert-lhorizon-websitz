import Image from "next/image";

type Project = {
  id: string;
  title: string;
  tags: { label: string; category: "garden" | "works" }[];
  before: string | null;
  after: string | null;
};

// Emplacements de maquette : photos et prestations à confirmer pour chaque chantier.
const projects: Project[] = [
  { id: "01", title: "Réalisation 01", tags: [{ label: "Taille de haies", category: "garden" }], before: null, after: null },
  { id: "02", title: "Réalisation 02", tags: [{ label: "Terrassement", category: "works" }, { label: "Évacuation", category: "works" }], before: null, after: null },
  { id: "03", title: "Réalisation 03", tags: [{ label: "Débroussaillage", category: "garden" }, { label: "Tonte", category: "garden" }], before: null, after: null },
  { id: "04", title: "Réalisation 04", tags: [{ label: "Aménagement extérieur", category: "garden" }], before: null, after: null },
];

export function Projects() {
  return <section className="projects" id="realisations" aria-labelledby="projects-title">
    <div className="projects-heading">
      <div><p className="eyebrow">LES RÉALISATIONS</p><h2 id="projects-title">Avant. Après.<br />Ça change tout.</h2></div>
      <p>Un aperçu du travail sur le terrain.<br /><span>Photos à venir · aperçu de la mise en page.</span></p>
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
        <div className="project-caption"><span className="project-number">{project.id}</span><ul className="project-tags" aria-label="Prestations prévues pour cet emplacement">{project.tags.map(tag => <li className={`project-tag project-tag-${tag.category}`} key={tag.label}>{tag.label}</li>)}</ul></div>
      </article>)}
    </div>
  </section>;
}
