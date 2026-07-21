import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ToursIndex from "@/components/pages/ToursIndex";
import { LOCALES, type Locale } from "@/lib/locales";

const META = {
  en: {
    title: "Tours & Day Trips — Atlas & Medina",
    description:
      "Six small-group experiences from Marrakech — the medina, the souks, the High Atlas, the Agafay desert and the Atlantic coast, each led by a licensed local guide.",
  },
  fr: {
    title: "Circuits & excursions — Atlas & Medina",
    description:
      "Six expériences en petit groupe au départ de Marrakech — la médina, les souks, le Haut Atlas, le désert d'Agafay et la côte atlantique, chacune menée par un guide local agréé.",
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
      languages: { en: "/en/tours", fr: "/fr/tours" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ToursPage({
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
        <ToursIndex />
      </main>
      <Footer />
    </>
  );
}
