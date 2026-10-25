import { QuoteButton } from "./quote-provider";

export function Services() {
  return (
    <section className="service-details" id="prestations" aria-labelledby="services-title">
      <div className="services-heading"><p className="eyebrow">LES PRESTATIONS · PYRÉNÉES-ATLANTIQUES</p><h2 id="services-title">Vos extérieurs,<br />du début à l’entretien.</h2><p>Un jardin à entretenir ou un terrain à préparer ?<br />Deux savoir-faire pour donner forme à votre projet.</p></div>
      <div className="service-columns">
        <article className="service-panel service-green"><div className="service-top"><span>01 / ESPACES VERTS</span><img src="/assets/feuille.svg" alt="" /></div><h3>Un jardin dont<br />on prend soin.</h3><p>Pour retrouver un extérieur agréable et garder vos espaces verts bien entretenus.</p><dl><div><dt>Tonte & entretien</dt><dd>Entretenir la pelouse et prendre soin de votre jardin, ponctuellement ou régulièrement.</dd></div><div><dt>Taille de haies</dt><dd>Redonner une forme nette à vos haies et maîtriser leur développement.</dd></div><div><dt>Débroussaillage & aménagement</dt><dd>Dégager les espaces envahis par la végétation et vous accompagner dans l’aménagement de vos extérieurs.</dd></div></dl><QuoteButton className="button service-button">Parlons de votre jardin <span aria-hidden="true">↗</span></QuoteButton></article>
        <article className="service-panel service-yellow"><div className="service-top"><span>02 / TRAVAUX & TERRASSEMENT</span><img src="/assets/casque.svg" alt="" /></div><h3>Une bonne base<br />pour vos projets.</h3><p>Des travaux extérieurs pour préparer, transformer et dégager votre terrain.</p><dl><div><dt>Petits terrassements</dt><dd>Préparer le terrain et réaliser les travaux de terre nécessaires à votre aménagement.</dd></div><div><dt>Petites déconstructions</dt><dd>Retirer les éléments existants à déposer, selon la nature et les contraintes du chantier.</dd></div><div><dt>Évacuation</dt><dd>Prévoir l’enlèvement des gravats et des matériaux issus des travaux.</dd></div></dl><QuoteButton className="button service-button">Parlons de votre terrain <span aria-hidden="true">↗</span></QuoteButton></article>
      </div>
    </section>

  );
}
