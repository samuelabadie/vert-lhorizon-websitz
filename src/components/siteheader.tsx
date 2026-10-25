import { SocialLinks } from "./social-links";
import { QuoteButton } from "./quote-provider";

export function SiteHeader() {
  return (
  <header className="header">
    <a href="#" aria-label="Vert l’Horizon, accueil"><img className="logo" src="/assets/logo-vert-lhorizon-64.svg" alt="Vert l’Horizon 64" width="244" height="83" /></a>
    <nav aria-label="Navigation principale"><a href="#prestations">Les prestations</a><a href="#realisations">Les réalisations</a><a href="#martin">Moi, c’est Martin</a></nav>
    <div className="nav-actions"><QuoteButton className="button primary">Demande de devis <span aria-hidden="true">↗</span></QuoteButton><a className="button secondary" href="tel:+33669111424">Appeler Martin <span aria-hidden="true">↗</span></a><SocialLinks /></div>
  </header>
  );
}
