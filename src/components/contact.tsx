import { QuoteButton } from "./quote-provider";

export function Contact() {
  return (
    <section className="contact-banner" aria-labelledby="contact-title"><div><p className="eyebrow">ET SI ON PARLAIT DE VOTRE EXTÉRIEUR ?</p><h2 id="contact-title">Votre projet commence<br />par une conversation.</h2></div><div className="contact-actions"><QuoteButton className="button primary">Demander un devis <span aria-hidden="true">↗</span></QuoteButton><a href="tel:+33669111424">ou appelez-moi au <strong>06 69 11 14 24</strong></a></div></section>

  );
}
