import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactPage from "@/components/pages/ContactPage";
import { LOCALES, type Locale } from "@/lib/locales";

const META = {
  en: {
    title: "Contact — Atlas & Medina",
    description:
      "A question, a private group, a tailor-made day — talk to a human who knows the city.",
  },
  fr: {
    title: "Contact — Atlas & Medina",
    description:
      "Une question, un groupe privé, une journée sur mesure — parlez à un humain qui connaît la ville.",
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

export default async function Page({
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
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
