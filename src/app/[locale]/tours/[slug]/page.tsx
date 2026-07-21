import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TourDetail from "@/components/pages/TourDetail";
import { LOCALES, type Locale } from "@/lib/locales";
import { getTour, tours } from "@/lib/tours-full";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTour(slug);
  if (!tour || !LOCALES.includes(locale as Locale)) return {};
  const l = locale as Locale;
  return {
    title: `${tour.title[l]} — Atlas & Medina`,
    description: tour.tagline[l],
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!LOCALES.includes(locale as Locale) || !getTour(slug)) notFound();
  return (
    <>
      <Nav />
      <main>
        <TourDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
