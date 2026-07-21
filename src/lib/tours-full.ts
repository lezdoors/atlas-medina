/*
  Atlas & Medina — tour catalogue (v1 seed content)
  DRAFT content written from research; refine with local partners before launch.
  Images are verified Unsplash placeholders — replace with owned photography.
  Schema is deliberately flat/structured so it can later feed GYG/Viator exports.
*/

export type Locale = "en" | "fr";
export type L = { en: string; fr: string };

export type Category = "city" | "food" | "day-trip" | "desert";

export interface ItineraryStep {
  time: string;
  title: L;
  body: L;
}

export interface Tour {
  slug: string;
  category: Category;
  title: L;
  tagline: L;
  description: L;
  durationLabel: L;
  priceEUR: number;
  maxGroup: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  highlights: L[];
  itinerary: ItineraryStep[];
  includes: L[];
  excludes: L[];
  meetingPoint: { name: L; details: L; mapsQuery: string };
  faqs: { q: L; a: L }[];
}

/*
  Brand photography (Higgsfield, 2026-07-20 batch + regens) — originals archived
  in ~/brand-assets/atlas-medina/photos/ (superseded versions kept as *.v1).
  Optional future regen: agafay-3 (sand dunes vs Agafay stone plateau).
*/
export const IMG = {
  hero: "/photos/hero-1.webp", // Koutoubia skyline, crisp blue sky + snowy Atlas
  hero2: "/photos/hero-2.webp", // covered souk, midday light shafts
  hero3: "/photos/hero-3.webp", // Agafay stone plateau, amber + deep blue sky
  hero4: "/photos/hero-4.webp", // Essaouira harbour, bright and airy
  heroGolden: "/photos/hero.webp", // golden-hour skyline (v1 hero, kept as spare)
  heroAlt: "/photos/hero-alt.webp", // medina rooftops at blue hour (spare)
  medina1: "/photos/medina-1.webp", // guide leading group through covered souk
  medina2: "/photos/medina-2.webp", // carved cedar door detail
  medina3: "/photos/medina-3.webp", // tea pour over rooftop square at dusk
  food1: "/photos/food-1.webp", // tanjia pots in communal-oven embers
  food2: "/photos/food-2.webp", // overhead street-food feast
  food3: "/photos/food-3.webp", // night market stall, vendor grilling skewers
  atlas1: "/photos/atlas-1.webp", // kasbah village + snow-dusted peaks
  atlas2: "/photos/atlas-2.webp", // hikers with guide on mule path
  atlas3: "/photos/atlas-3.webp", // terrace lunch served in mountain village
  agafay1: "/photos/agafay-1.webp", // stone desert ridges at sunset
  agafay2: "/photos/agafay-2.webp", // candlelit camp dinner under stars
  agafay3: "/photos/agafay-3.webp", // tea pour on dune crest
  heritage1: "/photos/heritage-1.webp", // cobalt garden villa with cacti
  heritage2: "/photos/heritage-2.webp", // palace courtyard, zellige + light shaft
  heritage3: "/photos/heritage-3.webp", // mosaic fountain
  essaouira1: "/photos/essaouira-1.webp", // blue fishing boats in harbour
  essaouira2: "/photos/essaouira-2.webp", // couple on sea ramparts
  essaouira3: "/photos/essaouira-3.webp", // argan hands at the cooperative
  tileCity: "/photos/tile-city.webp",
  tileFood: "/photos/tile-food.webp",
  tileDaytrips: "/photos/tile-daytrips.webp",
  tileDesert: "/photos/tile-desert.webp",
  aboutPortrait: "/photos/about-portrait.webp", // smiling mountain guide
  aboutTea: "/photos/about-tea.webp", // mint tea macro
  aboutGuiding: "/photos/about-guiding.webp", // guide with travellers in lane
};

export const tours: Tour[] = [
  {
    slug: "marrakech-medina-souks-tour",
    category: "city",
    title: {
      en: "Marrakech Medina & Souks Walking Tour",
      fr: "Visite guidée de la médina et des souks de Marrakech",
    },
    tagline: {
      en: "The old city decoded by a licensed local guide — souks, riads, and the stories behind the walls.",
      fr: "La vieille ville décodée par un guide local agréé — souks, riads et histoires derrière les murailles.",
    },
    description: {
      en: "Nine centuries of history live inside the ochre walls of the medina — but without a guide, most of it stays invisible. On this small-group walking tour, a licensed Marrakchi guide leads you through the souks of the artisans, the hidden fondouks where caravans once traded, the Ben Youssef quarter, and the lanes even repeat visitors miss. You’ll learn how to read the medina: what the doors say about the families behind them, how the guilds still organise the souks, and where to come back on your own — with honest prices.",
      fr: "Neuf siècles d’histoire vivent entre les murs ocre de la médina — mais sans guide, l’essentiel reste invisible. Lors de cette visite à pied en petit groupe, un guide marrakchi agréé vous mène à travers les souks des artisans, les fondouks cachés où commerçaient les caravanes, le quartier Ben Youssef et les ruelles que même les habitués manquent. Vous apprendrez à lire la médina : ce que les portes révèlent des familles, comment les corporations organisent encore les souks, et où revenir seul — aux prix justes.",
    },
    durationLabel: { en: "3 hours", fr: "3 heures" },
    priceEUR: 39,
    maxGroup: 10,
    rating: 4.9,
    reviewCount: 187,
    image: IMG.medina1,
    gallery: [IMG.medina1, IMG.medina2, IMG.medina3],
    highlights: [
      { en: "Licensed local guide, small group (max 10)", fr: "Guide local agréé, petit groupe (10 max)" },
      { en: "Artisan souks: leather, brass, dyers’ quarter", fr: "Souks artisanaux : cuir, laiton, quartier des teinturiers" },
      { en: "Hidden fondouks and riad architecture", fr: "Fondouks cachés et architecture des riads" },
      { en: "Ends at a rooftop café over Jemaa el-Fnaa", fr: "Fin sur un café-terrasse dominant Jemaa el-Fnaa" },
    ],
    itinerary: [
      {
        time: "09:30",
        title: { en: "Koutoubia gardens — meet your guide", fr: "Jardins de la Koutoubia — rencontre avec votre guide" },
        body: {
          en: "Quick orientation under Marrakech’s landmark minaret before entering the old city.",
          fr: "Brève orientation sous le minaret emblématique de Marrakech avant d’entrer dans la vieille ville.",
        },
      },
      {
        time: "10:00",
        title: { en: "The artisan souks", fr: "Les souks artisanaux" },
        body: {
          en: "Leatherworkers, coppersmiths and the dyers’ souk — how the guilds work, what’s handmade and what isn’t.",
          fr: "Maroquiniers, dinandiers et souk des teinturiers — le fonctionnement des corporations, ce qui est artisanal et ce qui ne l’est pas.",
        },
      },
      {
        time: "11:15",
        title: { en: "Fondouks & Ben Youssef quarter", fr: "Fondouks et quartier Ben Youssef" },
        body: {
          en: "Step into the caravanserais where trans-Saharan caravans traded, and the medersa quarter’s finest doorways.",
          fr: "Entrez dans les caravansérails où commerçaient les caravanes transsahariennes, et découvrez les plus belles portes du quartier de la médersa.",
        },
      },
      {
        time: "12:15",
        title: { en: "Rooftop finish over Jemaa el-Fnaa", fr: "Fin en terrasse au-dessus de Jemaa el-Fnaa" },
        body: {
          en: "Mint tea with a view while your guide marks your map with honest addresses for the rest of your stay.",
          fr: "Thé à la menthe avec vue pendant que votre guide annote votre carte de bonnes adresses pour la suite de votre séjour.",
        },
      },
    ],
    includes: [
      { en: "Licensed English/French-speaking local guide", fr: "Guide local agréé anglophone/francophone" },
      { en: "Small group — never more than 10 travellers", fr: "Petit groupe — jamais plus de 10 voyageurs" },
      { en: "Mint tea on a rooftop terrace", fr: "Thé à la menthe en terrasse" },
      { en: "Personalised medina map with recommendations", fr: "Carte personnalisée de la médina avec recommandations" },
    ],
    excludes: [
      { en: "Hotel pickup (meeting point is central)", fr: "Transfert hôtel (le point de rencontre est central)" },
      { en: "Personal purchases in the souks", fr: "Achats personnels dans les souks" },
    ],
    meetingPoint: {
      name: { en: "Koutoubia Mosque gardens, main fountain", fr: "Jardins de la Koutoubia, fontaine principale" },
      details: {
        en: "Your guide holds an 'Atlas & Medina’ sign. 5 minutes’ walk from Jemaa el-Fnaa.",
        fr: "Votre guide tient une pancarte « Atlas & Medina ». À 5 minutes à pied de Jemaa el-Fnaa.",
      },
      mapsQuery: "Koutoubia Mosque, Marrakech",
    },
    faqs: [
      {
        q: { en: "Is this tour suitable for children?", fr: "Cette visite convient-elle aux enfants ?" },
        a: {
          en: "Yes — it’s a flat, easy walk with plenty of stops. Children under 6 join free.",
          fr: "Oui — c’est une marche facile et plate avec de nombreuses pauses. Gratuit pour les moins de 6 ans.",
        },
      },
      {
        q: { en: "Will I be pressured to buy in the souks?", fr: "Serai-je poussé à acheter dans les souks ?" },
        a: {
          en: "No. We don’t take commissions from shops — that’s the point of going with an independent licensed guide.",
          fr: "Non. Nous ne prenons aucune commission des boutiques — c’est tout l’intérêt d’un guide agréé indépendant.",
        },
      },
      {
        q: { en: "What should I wear?", fr: "Comment s’habiller ?" },
        a: {
          en: "Comfortable shoes and light, modest clothing. A hat and water in summer.",
          fr: "Chaussures confortables et tenue légère et respectueuse. Chapeau et eau en été.",
        },
      },
    ],
  },
  {
    slug: "marrakech-street-food-tour",
    category: "food",
    title: {
      en: "Marrakech Street Food Evening Tour",
      fr: "Tour gastronomique nocturne de Marrakech",
    },
    tagline: {
      en: "Eat where Marrakchis eat — tanjia, msemen, olives and the night theatre of Jemaa el-Fnaa.",
      fr: "Mangez là où mangent les Marrakchis — tanjia, msemen, olives et le théâtre nocturne de Jemaa el-Fnaa.",
    },
    description: {
      en: "Marrakech is one of the world’s great street-food cities — if you know which stalls locals trust. As the medina lights up, your food-obsessed local guide takes you through eight tastings: slow-cooked tanjia from the communal ovens, msemen off the griddle, olives and preserved lemons in the spice souk, seasonal fruit at the night market, and a proper glass of mint tea to finish. Every stop is a stall or family-run eatery we work with directly, chosen for hygiene as much as flavour.",
      fr: "Marrakech est l’une des grandes capitales mondiales de la cuisine de rue — quand on connaît les échoppes de confiance. Quand la médina s’illumine, votre guide passionné de cuisine vous emmène pour huit dégustations : tanjia mijotée dans les fours communaux, msemen sortis de la plaque, olives et citrons confits au souk aux épices, fruits de saison au marché nocturne, et un vrai thé à la menthe pour finir. Chaque étape est une échoppe ou une adresse familiale avec laquelle nous travaillons directement, choisie autant pour l’hygiène que pour le goût.",
    },
    durationLabel: { en: "3.5 hours", fr: "3 h 30" },
    priceEUR: 55,
    maxGroup: 8,
    rating: 4.9,
    reviewCount: 143,
    image: IMG.food1,
    gallery: [IMG.food1, IMG.food2, IMG.food3],
    highlights: [
      { en: "8 tastings across the medina — dinner included in practice", fr: "8 dégustations à travers la médina — un vrai dîner en pratique" },
      { en: "Tanjia from the communal ovens, the Marrakchi speciality", fr: "Tanjia des fours communaux, la spécialité marrakchie" },
      { en: "Stalls vetted for hygiene, visited daily", fr: "Échoppes contrôlées pour l’hygiène, visitées chaque jour" },
      { en: "Max 8 guests — it stays personal", fr: "8 convives max — l’expérience reste personnelle" },
    ],
    itinerary: [
      {
        time: "18:00",
        title: { en: "Spice souk warm-up", fr: "Mise en bouche au souk aux épices" },
        body: {
          en: "Olives, preserved lemons and amlou — the flavour base of Moroccan cooking, explained.",
          fr: "Olives, citrons confits et amlou — les bases aromatiques de la cuisine marocaine, expliquées.",
        },
      },
      {
        time: "18:45",
        title: { en: "The communal ovens: tanjia", fr: "Les fours communaux : la tanjia" },
        body: {
          en: "Meet the men who tend the fires and taste Marrakech’s signature dish, slow-cooked in embers for hours.",
          fr: "Rencontrez les gardiens du feu et goûtez le plat signature de Marrakech, mijoté des heures sous la braise.",
        },
      },
      {
        time: "19:45",
        title: { en: "Griddles & bakeries", fr: "Plaques et fournils" },
        body: {
          en: "Msemen, harcha and medina bread straight off the heat, with honey and fresh cheese.",
          fr: "Msemen, harcha et pain de la médina tout juste cuits, avec miel et fromage frais.",
        },
      },
      {
        time: "20:30",
        title: { en: "Jemaa el-Fnaa by night", fr: "Jemaa el-Fnaa la nuit" },
        body: {
          en: "The square at full tilt: snail broth for the brave, fresh juice, and mint tea to close.",
          fr: "La place en pleine effervescence : bouillon d’escargots pour les courageux, jus frais, et thé à la menthe pour clore.",
        },
      },
    ],
    includes: [
      { en: "All 8 tastings — arrive hungry", fr: "Les 8 dégustations — venez le ventre vide" },
      { en: "Licensed foodie guide (EN/FR)", fr: "Guide gourmand agréé (EN/FR)" },
      { en: "Bottled water throughout", fr: "Eau minérale tout au long du parcours" },
      { en: "Our medina food map to keep", fr: "Notre carte gourmande de la médina, à garder" },
    ],
    excludes: [
      { en: "Extra drinks beyond tastings", fr: "Boissons supplémentaires hors dégustations" },
      { en: "Hotel transfer", fr: "Transfert hôtel" },
    ],
    meetingPoint: {
      name: { en: "Place des Ferblantiers, main gate", fr: "Place des Ferblantiers, porte principale" },
      details: {
        en: "Look for the 'Atlas & Medina’ sign. 10 minutes’ walk from Jemaa el-Fnaa.",
        fr: "Cherchez la pancarte « Atlas & Medina ». À 10 minutes à pied de Jemaa el-Fnaa.",
      },
      mapsQuery: "Place des Ferblantiers, Marrakech",
    },
    faqs: [
      {
        q: { en: "Can you handle dietary restrictions?", fr: "Gérez-vous les restrictions alimentaires ?" },
        a: {
          en: "Vegetarian easily, vegan and gluten-free with notice at booking. Tell us in the booking form.",
          fr: "Végétarien sans problème ; végan et sans gluten avec préavis à la réservation. Précisez-le dans le formulaire.",
        },
      },
      {
        q: { en: "Is the street food safe?", fr: "La cuisine de rue est-elle sûre ?" },
        a: {
          en: "We only use stalls we visit daily and have worked with for years — hygiene is our first selection criterion.",
          fr: "Nous ne travaillons qu’avec des échoppes visitées quotidiennement depuis des années — l’hygiène est notre premier critère.",
        },
      },
      {
        q: { en: "How much food is it really?", fr: "Quelle quantité mange-t-on vraiment ?" },
        a: {
          en: "Eight tastings add up to a generous dinner. Skip lunch — you’ll thank us.",
          fr: "Huit dégustations équivalent à un dîner généreux. Sautez le déjeuner — vous nous remercierez.",
        },
      },
    ],
  },
  {
    slug: "atlas-mountains-berber-villages-day-trip",
    category: "day-trip",
    title: {
      en: "Atlas Mountains & Berber Villages Day Trip",
      fr: "Excursion Haut Atlas et villages berbères",
    },
    tagline: {
      en: "Snow-capped peaks an hour from the medina — valley walks, mountain tea, and lunch in a family home.",
      fr: "Des sommets enneigés à une heure de la médina — marche dans la vallée, thé de montagne et déjeuner chez l’habitant.",
    },
    description: {
      en: "The High Atlas rises less than an hour from Marrakech, and with it a different Morocco: Amazigh villages stacked on the hillsides, walnut groves, irrigation channels older than the city itself. With a licensed mountain guide you’ll walk the Imlil valley at an easy pace, cross villages linked by mule paths, and sit down to a home-cooked tagine with a local family — the kind of day that ends up being the one travellers remember.",
      fr: "Le Haut Atlas se dresse à moins d’une heure de Marrakech, et avec lui un autre Maroc : villages amazighs accrochés aux versants, noyeraies, canaux d’irrigation plus anciens que la ville elle-même. Avec un guide de montagne agréé, vous marcherez dans la vallée d’Imlil à un rythme tranquille, traverserez des villages reliés par des sentiers muletiers, et partagerez un tagine maison chez une famille locale — le genre de journée dont les voyageurs se souviennent le plus.",
    },
    durationLabel: { en: "Full day (9–10h)", fr: "Journée complète (9–10 h)" },
    priceEUR: 75,
    maxGroup: 8,
    rating: 4.8,
    reviewCount: 112,
    image: IMG.atlas1,
    gallery: [IMG.atlas1, IMG.atlas2, IMG.atlas3],
    highlights: [
      { en: "Hotel pickup in an air-conditioned minivan", fr: "Prise en charge à l’hôtel en minivan climatisé" },
      { en: "Licensed mountain guide for the valley walk", fr: "Guide de montagne agréé pour la marche en vallée" },
      { en: "Home-cooked lunch with a Berber family", fr: "Déjeuner fait maison chez une famille berbère" },
      { en: "Easy 2h walk — no experience needed", fr: "Marche facile de 2 h — aucune expérience requise" },
    ],
    itinerary: [
      {
        time: "08:30",
        title: { en: "Pickup & drive south", fr: "Départ vers le sud" },
        body: {
          en: "Collected from your riad or hotel; the road climbs through olive groves into the foothills.",
          fr: "Prise en charge à votre riad ou hôtel ; la route grimpe entre les oliveraies vers les contreforts.",
        },
      },
      {
        time: "10:00",
        title: { en: "Imlil valley walk", fr: "Marche dans la vallée d’Imlil" },
        body: {
          en: "Two easy hours on mule paths between villages, under Toubkal’s 4,167 m summit.",
          fr: "Deux heures faciles sur les sentiers muletiers entre les villages, sous les 4 167 m du Toubkal.",
        },
      },
      {
        time: "13:00",
        title: { en: "Lunch in a family home", fr: "Déjeuner chez l’habitant" },
        body: {
          en: "Tagine, mountain bread and walnut honey on a terrace facing the peaks.",
          fr: "Tagine, pain de montagne et miel aux noix sur une terrasse face aux sommets.",
        },
      },
      {
        time: "15:00",
        title: { en: "Villages & viewpoints, return by 18:00", fr: "Villages et belvédères, retour vers 18 h" },
        body: {
          en: "A last loop through the highest village and photo stops on the drive home.",
          fr: "Une dernière boucle par le village le plus haut et des arrêts photo sur la route du retour.",
        },
      },
    ],
    includes: [
      { en: "Hotel/riad pickup and drop-off", fr: "Transferts hôtel/riad aller-retour" },
      { en: "Licensed mountain guide", fr: "Guide de montagne agréé" },
      { en: "Home-cooked lunch and mint tea", fr: "Déjeuner fait maison et thé à la menthe" },
      { en: "Air-conditioned transport", fr: "Transport climatisé" },
    ],
    excludes: [
      { en: "Mule ride (bookable on site, ~€15)", fr: "Balade à dos de mule (réservable sur place, ~15 €)" },
      { en: "Tips for guide and host family", fr: "Pourboires guide et famille d’accueil" },
    ],
    meetingPoint: {
      name: { en: "Your Marrakech hotel or riad", fr: "Votre hôtel ou riad à Marrakech" },
      details: {
        en: "We confirm your exact pickup time by WhatsApp the evening before.",
        fr: "Nous confirmons l’heure exacte de prise en charge par WhatsApp la veille au soir.",
      },
      mapsQuery: "Imlil, Morocco",
    },
    faqs: [
      {
        q: { en: "How hard is the walk?", fr: "La marche est-elle difficile ?" },
        a: {
          en: "Easy — about 2 hours on good paths with ~200 m of gentle climb. Anyone who walks regularly will be fine.",
          fr: "Facile — environ 2 h sur de bons sentiers avec ~200 m de montée douce. Accessible à toute personne qui marche régulièrement.",
        },
      },
      {
        q: { en: "What about winter?", fr: "Et en hiver ?" },
        a: {
          en: "The valley walk runs year-round; in snow we adapt the route. The peaks are at their most beautiful December–April.",
          fr: "La marche en vallée se fait toute l’année ; en cas de neige, l’itinéraire est adapté. Les sommets sont les plus beaux de décembre à avril.",
        },
      },
      {
        q: { en: "Is it private or shared?", fr: "Privé ou partagé ?" },
        a: {
          en: "Small shared group, max 8. Private version available on request via the contact page.",
          fr: "Petit groupe partagé, 8 max. Version privée disponible sur demande via la page contact.",
        },
      },
    ],
  },
  {
    slug: "agafay-desert-sunset-dinner",
    category: "desert",
    title: {
      en: "Agafay Desert Sunset & Dinner Under the Stars",
      fr: "Coucher de soleil et dîner sous les étoiles au désert d’Agafay",
    },
    tagline: {
      en: "Stone desert, golden hour, campfire dinner — the Sahara feeling, 40 minutes from town.",
      fr: "Désert de pierre, heure dorée, dîner au feu de camp — l’émotion du Sahara à 40 minutes de la ville.",
    },
    description: {
      en: "You don’t need three days on the road to feel the desert. The Agafay plateau — a lunar expanse of stone hills southwest of Marrakech — turns pure gold at sunset, with the snow line of the Atlas floating behind it. We drive you out in the late afternoon, pour mint tea on a dune crest as the light drops, then sit you down at our partner camp for a candlelit Moroccan dinner with Amazigh musicians around the fire. Back in Marrakech by 22:30.",
      fr: "Pas besoin de trois jours de route pour ressentir le désert. Le plateau d’Agafay — une étendue lunaire de collines de pierre au sud-ouest de Marrakech — devient or pur au couchant, avec la ligne enneigée de l’Atlas en toile de fond. Départ en fin d’après-midi, thé à la menthe sur une crête au moment où la lumière tombe, puis dîner marocain aux chandelles au camp partenaire, avec musiciens amazighs autour du feu. Retour à Marrakech vers 22 h 30.",
    },
    durationLabel: { en: "Half day (5–6h, evening)", fr: "Demi-journée (5–6 h, soirée)" },
    priceEUR: 89,
    maxGroup: 12,
    rating: 4.8,
    reviewCount: 96,
    image: IMG.agafay1,
    gallery: [IMG.agafay1, IMG.agafay2, IMG.agafay3],
    highlights: [
      { en: "Sunset tea ceremony on the dunes", fr: "Cérémonie du thé au coucher du soleil sur les dunes" },
      { en: "Three-course dinner at a desert camp", fr: "Dîner trois plats dans un camp du désert" },
      { en: "Live Amazigh music by the fire", fr: "Musique amazighe en live au coin du feu" },
      { en: "Hotel pickup & return included", fr: "Transferts hôtel inclus" },
    ],
    itinerary: [
      {
        time: "16:30",
        title: { en: "Pickup & drive to Agafay", fr: "Départ vers l’Agafay" },
        body: {
          en: "40 minutes southwest through olive country to the edge of the stone desert.",
          fr: "40 minutes vers le sud-ouest, à travers les oliveraies, jusqu’à l’orée du désert de pierre.",
        },
      },
      {
        time: "17:30",
        title: { en: "Golden hour on the crests", fr: "Heure dorée sur les crêtes" },
        body: {
          en: "Walk the ridgelines, mint tea served as the Atlas turns pink behind you.",
          fr: "Marche sur les crêtes, thé à la menthe servi tandis que l’Atlas rosit derrière vous.",
        },
      },
      {
        time: "19:00",
        title: { en: "Dinner at the camp", fr: "Dîner au camp" },
        body: {
          en: "Moroccan salads, tagine and dessert by candlelight; musicians around the fire after.",
          fr: "Salades marocaines, tagine et dessert aux chandelles ; musiciens autour du feu ensuite.",
        },
      },
      {
        time: "21:45",
        title: { en: "Stargazing & return", fr: "Étoiles et retour" },
        body: {
          en: "A few minutes of real desert silence, then the drive back — at your hotel by ~22:30.",
          fr: "Quelques minutes du vrai silence du désert, puis retour — à votre hôtel vers 22 h 30.",
        },
      },
    ],
    includes: [
      { en: "Hotel pickup and return", fr: "Transferts hôtel aller-retour" },
      { en: "Sunset tea ceremony", fr: "Cérémonie du thé au couchant" },
      { en: "Full three-course dinner", fr: "Dîner complet trois plats" },
      { en: "Live music at the camp", fr: "Musique live au camp" },
    ],
    excludes: [
      { en: "Camel or quad rides (bookable at the camp)", fr: "Balades à dos de chameau ou en quad (réservables au camp)" },
      { en: "Drinks beyond water and tea", fr: "Boissons autres que l’eau et le thé" },
    ],
    meetingPoint: {
      name: { en: "Your Marrakech hotel or riad", fr: "Votre hôtel ou riad à Marrakech" },
      details: {
        en: "Pickup window 16:15–16:45 depending on your district; confirmed by WhatsApp.",
        fr: "Prise en charge entre 16 h 15 et 16 h 45 selon votre quartier ; confirmée par WhatsApp.",
      },
      mapsQuery: "Agafay Desert, Morocco",
    },
    faqs: [
      {
        q: { en: "Is Agafay a real desert?", fr: "L’Agafay est-il un vrai désert ?" },
        a: {
          en: "It’s a stone desert (reg), not Saharan sand dunes — a lunar landscape that photographs beautifully, without the 8-hour drive.",
          fr: "C’est un désert de pierre (reg), pas les dunes de sable du Sahara — un paysage lunaire superbe en photo, sans les 8 heures de route.",
        },
      },
      {
        q: { en: "What should I bring?", fr: "Que faut-il apporter ?" },
        a: {
          en: "A warm layer — desert evenings are cold even in summer — and your camera.",
          fr: "Une couche chaude — les soirées du désert sont fraîches même en été — et votre appareil photo.",
        },
      },
      {
        q: { en: "Is it suitable for families?", fr: "Adapté aux familles ?" },
        a: {
          en: "Very. Children love the camp; under-6s join free, 6–12 at half price.",
          fr: "Tout à fait. Les enfants adorent le camp ; gratuit pour les moins de 6 ans, demi-tarif de 6 à 12 ans.",
        },
      },
    ],
  },
  {
    slug: "majorelle-palaces-heritage-tour",
    category: "city",
    title: {
      en: "Majorelle, Palaces & Heritage Tour",
      fr: "Majorelle, palais et patrimoine de Marrakech",
    },
    tagline: {
      en: "Bahia Palace, the Saadian Tombs and Majorelle’s cobalt garden — the city’s masterpieces in one morning.",
      fr: "Palais de la Bahia, tombeaux saadiens et jardin cobalt de Majorelle — les chefs-d’œuvre de la ville en une matinée.",
    },
    description: {
      en: "Marrakech’s showpieces deserve context, not queues. With skip-the-line tickets and a licensed guide, this half-day loop covers the Bahia Palace’s painted cedar ceilings, the Saadian Tombs rediscovered in 1917, and the Jardin Majorelle — the cobalt-blue garden Yves Saint Laurent saved — with the stories that connect three dynasties of the city’s history. Timed to beat both the heat and the crowds.",
      fr: "Les joyaux de Marrakech méritent du contexte, pas des files d’attente. Avec billets coupe-file et guide agréé, cette boucle d’une demi-journée couvre les plafonds de cèdre peints du palais de la Bahia, les tombeaux saadiens redécouverts en 1917, et le Jardin Majorelle — le jardin bleu cobalt sauvé par Yves Saint Laurent — avec les histoires qui relient trois dynasties. Horaires pensés pour éviter chaleur et foule.",
    },
    durationLabel: { en: "4 hours", fr: "4 heures" },
    priceEUR: 49,
    maxGroup: 10,
    rating: 4.7,
    reviewCount: 88,
    image: IMG.heritage1,
    gallery: [IMG.heritage1, IMG.heritage2, IMG.heritage3],
    highlights: [
      { en: "Skip-the-line entry to all three sites", fr: "Entrées coupe-file aux trois sites" },
      { en: "Bahia Palace & Saadian Tombs with a licensed guide", fr: "Palais de la Bahia et tombeaux saadiens avec guide agréé" },
      { en: "Jardin Majorelle at the quietest hour", fr: "Jardin Majorelle à l’heure la plus calme" },
      { en: "Transport between sites included", fr: "Transport entre les sites inclus" },
    ],
    itinerary: [
      {
        time: "08:45",
        title: { en: "Bahia Palace", fr: "Palais de la Bahia" },
        body: {
          en: "First entry of the day into the grand vizier’s 19th-century palace — courtyards to ourselves.",
          fr: "Première entrée de la journée dans le palais du grand vizir — les cours presque pour nous seuls.",
        },
      },
      {
        time: "10:00",
        title: { en: "Saadian Tombs", fr: "Tombeaux saadiens" },
        body: {
          en: "The necropolis walled up for two centuries and rediscovered from the air in 1917.",
          fr: "La nécropole murée pendant deux siècles et redécouverte par avion en 1917.",
        },
      },
      {
        time: "11:15",
        title: { en: "Jardin Majorelle", fr: "Jardin Majorelle" },
        body: {
          en: "The painter’s cactus garden and its YSL story, timed after the morning rush.",
          fr: "Le jardin de cactus du peintre et son histoire YSL, après la vague matinale.",
        },
      },
    ],
    includes: [
      { en: "All entrance tickets (Bahia, Saadian Tombs, Majorelle)", fr: "Tous les billets d’entrée (Bahia, tombeaux saadiens, Majorelle)" },
      { en: "Licensed guide (EN/FR)", fr: "Guide agréé (EN/FR)" },
      { en: "Transport between the sites", fr: "Transport entre les sites" },
    ],
    excludes: [
      { en: "YSL Museum (optional add-on next door)", fr: "Musée YSL (option juste à côté)" },
      { en: "Hotel pickup", fr: "Transfert hôtel" },
    ],
    meetingPoint: {
      name: { en: "Bahia Palace entrance, Rue Riad Zitoun el Jdid", fr: "Entrée du palais de la Bahia, rue Riad Zitoun el Jdid" },
      details: {
        en: "Your guide holds an 'Atlas & Medina’ sign by the ticket office.",
        fr: "Votre guide tient une pancarte « Atlas & Medina » près de la billetterie.",
      },
      mapsQuery: "Bahia Palace, Marrakech",
    },
    faqs: [
      {
        q: { en: "Are tickets really included?", fr: "Les billets sont-ils vraiment inclus ?" },
        a: {
          en: "Yes — all three sites. No queuing at ticket offices; your guide has everything.",
          fr: "Oui — les trois sites. Aucune file d’attente ; votre guide a tout en main.",
        },
      },
      {
        q: { en: "Is Majorelle crowded?", fr: "Majorelle est-il bondé ?" },
        a: {
          en: "It can be — which is why we enter after the morning tour-bus wave, when the garden breathes again.",
          fr: "Il peut l’être — c’est pourquoi nous entrons après la vague des bus du matin, quand le jardin respire à nouveau.",
        },
      },
    ],
  },
  {
    slug: "essaouira-coast-day-trip",
    category: "day-trip",
    title: {
      en: "Essaouira Coast Day Trip",
      fr: "Excursion à Essaouira, la côte atlantique",
    },
    tagline: {
      en: "Blue boats, Atlantic air and a UNESCO medina — Morocco’s coolest port town in a day.",
      fr: "Barques bleues, air atlantique et médina UNESCO — le plus beau port du Maroc en une journée.",
    },
    description: {
      en: "When Marrakech turns up the heat, Essaouira answers with Atlantic wind. Three hours’ drive through argan country (with a stop at a women’s argan-oil cooperative) brings you to the white-and-blue port city the Portuguese fortified in the 16th century. Walk the ramparts from Game of Thrones, watch the blue fishing boats unload, eat grilled sardines on the quay, and lose yourself in a medina that’s everything Marrakech’s is — minus the crowds and the hustle.",
      fr: "Quand Marrakech monte en température, Essaouira répond par le vent de l’Atlantique. Trois heures de route à travers le pays de l’arganier (avec halte dans une coopérative féminine d’huile d’argan) mènent à la cité portuaire blanche et bleue fortifiée par les Portugais au XVIe siècle. Parcourez les remparts vus dans Game of Thrones, regardez les barques bleues décharger, mangez des sardines grillées sur le quai, et perdez-vous dans une médina qui a tout de celle de Marrakech — sans la foule ni la pression.",
    },
    durationLabel: { en: "Full day (10–11h)", fr: "Journée complète (10–11 h)" },
    priceEUR: 69,
    maxGroup: 12,
    rating: 4.7,
    reviewCount: 74,
    image: IMG.essaouira1,
    gallery: [IMG.essaouira1, IMG.essaouira2, IMG.essaouira3],
    highlights: [
      { en: "UNESCO-listed medina and Portuguese ramparts", fr: "Médina classée UNESCO et remparts portugais" },
      { en: "Argan oil cooperative stop en route", fr: "Halte dans une coopérative d’huile d’argan" },
      { en: "Free time for the port, beach and galleries", fr: "Temps libre pour le port, la plage et les galeries" },
      { en: "Hotel pickup, A/C transport", fr: "Prise en charge à l’hôtel, transport climatisé" },
    ],
    itinerary: [
      {
        time: "08:00",
        title: { en: "Pickup & argan country", fr: "Départ et pays de l’arganier" },
        body: {
          en: "Westward through argan groves; mid-route stop at a women’s cooperative to see the pressing.",
          fr: "Cap à l’ouest à travers les arganeraies ; halte dans une coopérative féminine pour voir le pressage.",
        },
      },
      {
        time: "11:00",
        title: { en: "Guided walk: ramparts & port", fr: "Visite guidée : remparts et port" },
        body: {
          en: "The Skala fortifications, the shipyard and the blue boats, and the medina’s main arteries.",
          fr: "La Skala, le chantier naval et les barques bleues, puis les artères principales de la médina.",
        },
      },
      {
        time: "13:00",
        title: { en: "Free afternoon", fr: "Après-midi libre" },
        body: {
          en: "Grilled fish on the quay, gallery-hopping or the beach — Essaouira rewards wandering.",
          fr: "Poisson grillé sur le quai, galeries d’art ou plage — Essaouira se savoure en flânant.",
        },
      },
      {
        time: "16:30",
        title: { en: "Return to Marrakech", fr: "Retour à Marrakech" },
        body: {
          en: "Back at your hotel around 19:00–19:30.",
          fr: "Arrivée à votre hôtel vers 19 h – 19 h 30.",
        },
      },
    ],
    includes: [
      { en: "Hotel pickup and drop-off", fr: "Transferts hôtel aller-retour" },
      { en: "A/C transport with professional driver", fr: "Transport climatisé avec chauffeur professionnel" },
      { en: "Guided walk of the ramparts and medina", fr: "Visite guidée des remparts et de la médina" },
      { en: "Argan cooperative visit", fr: "Visite de la coopérative d’argan" },
    ],
    excludes: [
      { en: "Lunch (we point you to the good quays)", fr: "Déjeuner (nous vous indiquons les bons quais)" },
      { en: "Personal purchases", fr: "Achats personnels" },
    ],
    meetingPoint: {
      name: { en: "Your Marrakech hotel or riad", fr: "Votre hôtel ou riad à Marrakech" },
      details: {
        en: "Pickup window 07:45–08:15; exact time confirmed by WhatsApp the evening before.",
        fr: "Prise en charge entre 7 h 45 et 8 h 15 ; heure exacte confirmée par WhatsApp la veille.",
      },
      mapsQuery: "Essaouira, Morocco",
    },
    faqs: [
      {
        q: { en: "Is three hours’ drive worth it?", fr: "Trois heures de route, ça vaut le coup ?" },
        a: {
          en: "If you have three or more days in Marrakech, yes — the ocean air and slower pace are the perfect counterpoint to the medina.",
          fr: "Si vous avez trois jours ou plus à Marrakech, oui — l’air marin et le rythme plus lent sont le contrepoint parfait de la médina.",
        },
      },
      {
        q: { en: "Can I surf or kitesurf there?", fr: "Peut-on surfer ou kitesurfer sur place ?" },
        a: {
          en: "Essaouira is a wind-sports hub; with notice we can extend your free time and connect you to a school.",
          fr: "Essaouira est un spot réputé ; avec préavis, nous prolongeons votre temps libre et vous mettons en contact avec une école.",
        },
      },
    ],
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);

export const categories: { key: Category | "all"; label: L }[] = [
  { key: "all", label: { en: "All tours", fr: "Tous les circuits" } },
  { key: "city", label: { en: "City", fr: "Ville" } },
  { key: "food", label: { en: "Food", fr: "Gastronomie" } },
  { key: "day-trip", label: { en: "Day trips", fr: "Excursions" } },
  { key: "desert", label: { en: "Desert", fr: "Désert" } },
];

/* Company constants — used in footer, policies, contact */
export const COMPANY = {
  brand: "Atlas & Medina",
  legal: "Altus Lumen Ltd",
  companyNumber: "17331447",
  registered: "Registered in England & Wales",
  email: "hello@atlasandmedina.com", // placeholder until domain/mailbox exist
  whatsapp: "+447828726017",
};
