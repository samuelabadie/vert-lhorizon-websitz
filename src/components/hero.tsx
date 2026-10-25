export function Hero() {
  return (
    <section className="hero hero-centered" aria-labelledby="hero-title">
      <h1 id="hero-title">Entretien de jardins<br />& terrassement.</h1>
      <div className="hero-collage">
        <img className="hero-photo photo-earth" src="/assets/martin-terrassement.png" alt="Illustration générée de Martin aux commandes d’une mini-pelle" width="1536" height="1024" fetchPriority="high" />
        <img className="hero-photo photo-hedge" src="/assets/martin-taille-haie.png" alt="Illustration générée de Martin taillant une haie" width="1536" height="1024" />
      </div>
    </section>

  );
}
