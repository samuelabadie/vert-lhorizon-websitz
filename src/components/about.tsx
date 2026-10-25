export function About() {
  return (
    <section className="about" id="martin" aria-labelledby="about-title">
      <div className="about-heading"><p className="eyebrow">LES MAINS DANS LA TERRE, DEPUIS 2020</p><h2 id="about-title">Bonjour à tous,<br />moi, c’est <em>Martin !</em></h2></div>
      <div className="about-grid">
        <div className="portrait-composition">
          <figure className="martin-photo"><img src="/assets/martin-portrait.png" alt="Martin Lahitette, responsable de Vert L’Horizon 64" width="668" height="910" loading="lazy" /><figcaption>Martin Lahitette <span>Vert L’Horizon 64</span></figcaption></figure>
        </div>
        <div className="about-copy">
          <p className="about-lead">J’ai 23 ans et je suis à la tête de Vert L’Horizon 64. Mon idée est simple : mettre mon savoir-faire au service de vos extérieurs.</p>
          <p>Mon parcours a commencé dans les jardins. Un CAP Jardinier Paysagiste en 2020, puis un Brevet Professionnel en Aménagements Paysagers en 2022 m’ont donné des bases solides et le goût du travail soigné.</p>
          <p>La curiosité m’a ensuite conduit vers les travaux publics : le transport routier en 2023, puis la conduite d’engins de grands terrassements en 2024. À chaque étape, j’ai gagné en polyvalence et en autonomie.</p>
          <p>Aujourd’hui, je partage mon temps entre mon activité salariée dans les travaux publics et ma propre entreprise. Deux univers qui se complètent, avec la même passion pour le travail en extérieur.</p>
          <blockquote>Du sérieux, de l’engagement et un travail soigné, adapté à vos besoins.</blockquote>
          <a className="about-contact" href="tel:+33669111424">Parlons de votre projet <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <ol className="timeline" aria-label="Le parcours de Martin">
        <li><span className="timeline-year">2020</span><h3>Les racines</h3><p>CAP Jardinier Paysagiste</p></li>
        <li><span className="timeline-year">2022</span><h3>Le savoir-faire</h3><p>Brevet Professionnel<br />Aménagements Paysagers</p></li>
        <li><span className="timeline-year">2023</span><h3>L’autonomie</h3><p>Formation conducteur de transport<br />routier de marchandises sur porteur</p></li>
        <li><span className="timeline-year">2024</span><h3>De nouveaux terrains</h3><p>Formation conducteur d’engins<br />de grands terrassements</p></li>
      </ol>
    </section>

  );
}
