import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/locales";
import "../globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const META = {
  en: {
    title: "Atlas & Medina — Marrakech, With the People Who Know It",
    description:
      "Small-group tours and day trips from Marrakech, run by licensed local guides — the medina, the Atlas and the desert, without the guesswork.",
  },
  fr: {
    title: "Atlas & Medina — Marrakech, avec ceux qui la connaissent",
    description:
      "Visites en petit groupe et excursions au départ de Marrakech, menées par des guides locaux agréés — la médina, l'Atlas et le désert, sans les mauvaises surprises.",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale as Locale] ?? META.en;
  return {
    metadataBase: new URL("https://atlas-medina-premium.vercel.app"),
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  return (
    <html lang={locale} className={`${anton.variable} ${manrope.variable}`}>
      <body className="bg-ground text-ink font-body antialiased">
        <LocaleProvider locale={locale as Locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
