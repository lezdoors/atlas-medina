import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Ethos from "@/components/Ethos";
import Guides from "@/components/Guides";
import Manifesto from "@/components/Manifesto";
import Voices from "@/components/Voices";
import Footer from "@/components/Footer";
import { LOCALES, type Locale } from "@/lib/locales";

const META = {
  en: {
    title: "Ethos — Atlas & Medina",
    description:
      "Small groups, licensed Marrakchi guides, and standards we put in writing — who we are and how every departure runs.",
  },
  fr: {
    title: "Éthique — Atlas & Medina",
    description:
      "Petits groupes, guides marrakchis agréés et des engagements mis par écrit — qui nous sommes et comment se déroule chaque départ.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale as Locale] ?? META.en;
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function EthosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  const fr = locale === "fr";

  return (
    <>
      <Nav />
      <main>
        <section className="pt-28 md:pt-36 px-5 md:px-10 xl:px-16">
          <p className="text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60">
            {fr ? "À propos" : "About us"}
          </p>
          <h1 className="mt-6 font-display uppercase tracking-tight text-[clamp(3rem,9vw,8rem)] leading-[0.85] text-ink">
            <span className="block">
              {fr ? "Tenu par des locaux," : "Run by locals,"}
            </span>
            <span className="block">
              {fr ? "fait pour durer" : "built to last"}
              <span className="text-ember">.</span>
            </span>
          </h1>
        </section>
        <Ethos />
        <Guides />
        <Manifesto />
        <Voices />
      </main>
      <Footer />
    </>
  );
}
