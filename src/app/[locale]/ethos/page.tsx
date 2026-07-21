import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import EthosHeader from "@/components/pages/EthosHeader";
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
    alternates: {
      languages: { en: "/en/ethos", fr: "/fr/ethos" },
    },
  };
}

export default async function EthosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  return (
    <>
      <Nav />
      <main>
        <EthosHeader />
        <Ethos index="01" />
        <Guides index="02" />
        <Manifesto />
        <Voices index="03" />
      </main>
      <Footer />
    </>
  );
}
