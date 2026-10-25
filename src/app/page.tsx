import { Projects } from "@/components/projects";
import { SiteHeader } from "@/components/siteheader";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { QuoteProvider } from "@/components/quote-provider";

export default function Home() {
  return <QuoteProvider><SiteHeader /><main><Hero /><Services /><Projects /><About /><Contact /></main>
  <footer><span>VERT L’HORIZON © <span id="year">2026</span></span><a href="mailto:vertlhorizon64@gmail.com">vertlhorizon64@gmail.com ↗</a></footer>
</QuoteProvider>;
}
