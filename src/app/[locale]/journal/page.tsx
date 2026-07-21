import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JournalIndex from "@/components/pages/JournalIndex";
import { LOCALES, type Locale } from "@/lib/locales";

const META = {
  en: {
    title: "Field Notes — Atlas & Medina",
    description:
      "Dispatches from the routes — what we saw, scouted and ate around Marrakech, the Atlas and the coast.",
  },
  fr: {
    title: "Notes de terrain — Atlas & Medina",
    description:
      "Dépêches des routes — ce que nous avons vu, repéré et goûté autour de Marrakech, de l'Atlas et de la côte.",
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
      languages: { en: "/en/journal", fr: "/fr/journal" },
    },
  };
}

export default async function JournalPage({
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
        <JournalIndex />
      </main>
      <Footer />
    </>
  );
}
