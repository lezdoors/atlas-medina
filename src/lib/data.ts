import type { L } from "./i18n";

export type Tour = {
  index: string;
  slug: string;
  title: L;
  category: L;
  duration: L;
  group: number;
  rating: string;
  reviews: number;
  priceEUR: number;
  image: string;
  blurb: L;
};

export const COORDINATES = "31.6295°N — 7.9811°W";

export const TOURS: Tour[] = [
  {
    index: "01",
    slug: "marrakech-medina-souks-tour",
    title: {
      en: "Medina & Souks Walking Tour",
      fr: "La médina & les souks, à pied",
    },
    category: { en: "City", fr: "Ville" },
    duration: { en: "3 hours", fr: "3 heures" },
    group: 10,
    rating: "4.9",
    reviews: 187,
    priceEUR: 39,
    image: "/images/medina-1.webp",
    blurb: {
      en: "Three hours through the lanes with a licensed Marrakchi guide who reads the medina like a book. Souks, fondouks, and the doors everyone else walks past.",
      fr: "Trois heures dans les ruelles avec un guide marrakchi agréé qui lit la médina comme un livre. Souks, fondouks, et les portes devant lesquelles tout le monde passe.",
    },
  },
  {
    index: "02",
    slug: "marrakech-street-food-tour",
    title: {
      en: "Street Food Evening Tour",
      fr: "Street food, à la nuit tombée",
    },
    category: { en: "Food", fr: "Gastronomie" },
    duration: { en: "3.5 hours", fr: "3 h 30" },
    group: 8,
    rating: "4.9",
    reviews: 143,
    priceEUR: 55,
    image: "/images/food-1.webp",
    blurb: {
      en: "Eight stops after dark, zero tourist traps. Tanjia from the embers, msemen off the griddle, and the stalls only locals queue at.",
      fr: "Huit étapes à la nuit tombée, zéro piège à touristes. Tanjia sortie des braises, msemen à la plancha, et les échoppes où seuls les locaux font la queue.",
    },
  },
  {
    index: "03",
    slug: "atlas-mountains-berber-villages-day-trip",
    title: {
      en: "Atlas Mountains & Berber Villages",
      fr: "Haut Atlas & villages berbères",
    },
    category: { en: "Day trip", fr: "Excursion" },
    duration: { en: "Full day", fr: "Journée complète" },
    group: 8,
    rating: "4.8",
    reviews: 112,
    priceEUR: 75,
    image: "/images/atlas-2.webp",
    blurb: {
      en: "A full day into the High Atlas with the people who were born on its trails. Valley walks, a village lunch on a clay terrace, peaks behind.",
      fr: "Une journée entière dans le Haut Atlas avec ceux qui sont nés sur ses sentiers. Marche dans la vallée, déjeuner chez l’habitant en terrasse, les sommets en toile de fond.",
    },
  },
  {
    index: "04",
    slug: "agafay-desert-sunset-dinner",
    title: {
      en: "Agafay Sunset & Dinner Under the Stars",
      fr: "Agafay — coucher de soleil & dîner sous les étoiles",
    },
    category: { en: "Desert", fr: "Désert" },
    duration: { en: "Evening, 5–6h", fr: "Soirée, 5–6 h" },
    group: 12,
    rating: "4.8",
    reviews: 96,
    priceEUR: 89,
    image: "/images/agafay-2.webp",
    blurb: {
      en: "The stone desert an hour from town, gold at sunset. Dinner by candlelight on the carpets, musicians by the fire, the city nowhere in sight.",
      fr: "Le désert de pierre à une heure de la ville, doré au couchant. Dîner aux chandelles sur les tapis, musiciens au coin du feu, la ville nulle part en vue.",
    },
  },
  {
    index: "05",
    slug: "majorelle-palaces-heritage-tour",
    title: {
      en: "Majorelle, Palaces & Heritage",
      fr: "Majorelle, palais & patrimoine",
    },
    category: { en: "City", fr: "Ville" },
    duration: { en: "4 hours", fr: "4 heures" },
    group: 10,
    rating: "4.7",
    reviews: 88,
    priceEUR: 49,
    image: "/images/heritage-1.webp",
    blurb: {
      en: "Skip-the-line at Majorelle, then the palaces and the quiet courtyards between them — four hours of the city’s history, without the crowds.",
      fr: "Coupe-file à Majorelle, puis les palais et les cours silencieuses qui les relient — quatre heures d’histoire, sans la foule.",
    },
  },
  {
    index: "06",
    slug: "essaouira-coast-day-trip",
    title: {
      en: "Essaouira Coast Day Trip",
      fr: "Essaouira, la côte atlantique",
    },
    category: { en: "Day trip", fr: "Excursion" },
    duration: { en: "Full day", fr: "Journée complète" },
    group: 12,
    rating: "4.7",
    reviews: 74,
    priceEUR: 69,
    image: "/images/essaouira-2.webp",
    blurb: {
      en: "Trade-wind coastline, blue boats in the harbour, ramparts over the Atlantic. A full day by the sea with the day’s catch on the table.",
      fr: "Côte aux alizés, barques bleues au port, remparts face à l’Atlantique. Une journée entière en bord de mer, la pêche du jour à table.",
    },
  },
];

export const STATS: { value: number; suffix: L; label: L }[] = [
  {
    value: 700,
    suffix: { en: "+", fr: "+" },
    label: { en: "Traveller reviews", fr: "Avis de voyageurs" },
  },
  {
    value: 6,
    suffix: { en: "", fr: "" },
    label: { en: "Experiences, refined", fr: "Expériences, affinées" },
  },
  {
    value: 24,
    suffix: { en: "h", fr: "\u00A0h" },
    label: { en: "Free-cancellation window", fr: "D’annulation gratuite" },
  },
  {
    value: 12,
    suffix: { en: "", fr: "" },
    label: { en: "Guests, never more", fr: "Voyageurs, jamais plus" },
  },
];

export const MANIFESTO: L = {
  en: "We believe the best days in Morocco are led by the people who live it. So every departure — medina, mountains or desert — runs with a licensed Marrakchi guide, a small group, and standards we put in writing.",
  fr: "Nous croyons que les plus belles journées au Maroc sont menées par ceux qui le vivent. Alors chaque départ — médina, montagnes ou désert — se fait avec un guide marrakchi agréé, un petit groupe et des engagements mis par écrit.",
};

export const JOURNAL: {
  index: string;
  title: L;
  tag: L;
  date: L;
  image: string;
}[] = [
  {
    index: "N.014",
    title: {
      en: "Reading the wind at Essaouira",
      fr: "Lire le vent à Essaouira",
    },
    tag: { en: "Field Note", fr: "Note de terrain" },
    date: { en: "March 2026", fr: "Mars 2026" },
    image: "/images/essaouira-1.webp",
  },
  {
    index: "N.013",
    title: {
      en: "Scouting the Ounila kasbah road",
      fr: "Repérage sur la route des kasbahs",
    },
    tag: { en: "Recce", fr: "Repérage" },
    date: { en: "February 2026", fr: "Février 2026" },
    image: "/images/atlas-1.webp",
  },
  {
    index: "N.012",
    title: {
      en: "Agafay at noon, before the tents",
      fr: "L’Agafay à midi, avant les tentes",
    },
    tag: { en: "Terrain", fr: "Terrain" },
    date: { en: "January 2026", fr: "Janvier 2026" },
    image: "/images/plateau.jpg",
  },
];

export const NAV_LINKS: { label: L; href: string }[] = [
  { label: { en: "Tours", fr: "Circuits" }, href: "#tours" },
  { label: { en: "Ethos", fr: "Éthique" }, href: "#ethos" },
  { label: { en: "Journal", fr: "Journal" }, href: "#journal" },
  { label: { en: "Contact", fr: "Contact" }, href: "#contact" },
];

export const TRUST: L[] = [
  { en: "Licensed local guides", fr: "Guides locaux agréés" },
  { en: "Free cancellation up to 24h", fr: "Annulation gratuite jusqu’à 24 h" },
  { en: "Small groups only", fr: "Petits groupes uniquement" },
  { en: "Instant confirmation", fr: "Confirmation immédiate" },
];
