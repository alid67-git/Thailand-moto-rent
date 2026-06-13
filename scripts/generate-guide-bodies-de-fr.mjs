/**
 * Generates complete guide article body files for DE and FR (all 54 articles).
 * Run: node scripts/generate-guide-bodies-de-fr.mjs
 */
import fs from "fs";
import path from "path";
import { SUPPLEMENT_DE, SUPPLEMENT_FR } from "./guide-supplements-de-fr.mjs";

const ROOT = path.resolve("src");

const enMeta = fs.readFileSync(
  path.join(ROOT, "i18n/messages/guide-articles.en.i18n.ts"),
  "utf8"
);
const articles = [];
const enRe =
  /"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?excerpt:\s*"([^"]+)"/g;
let m;
while ((m = enRe.exec(enMeta))) {
  articles.push({ id: m[1], category: m[3] });
}

const POLICY_DE = `## Thailand Moto Rent Richtlinien

- **Kein Pass als Pfand.** **Kreditkarten-Pre-Authorisierung** als Kaution; wird bei Rückgabe aufgehoben.
- **IDP (Internationaler Führerschein) Pflicht.** Thai-Polizei akzeptiert nur **thailändischen Führerschein oder IDP**.
- **Mietbedingungen:** Gültiger **Motorrad-IDP** erforderlich.
- **Fahren ohne IDP** und Bußgelder trägt der Kunde allein.
- **Tagesmiete.** Bei verspäteter Rückgabe **WhatsApp**-Nachricht.
- **Keine Probefahrten.**
- **Schaden:** Ohne Versicherung Reparatur + entgangene Miettage. **Vollkasko** empfohlen.
- **Alkoholfahrt** wird hart bestraft.`;

const POLICY_FR = `## Politique Thailand Moto Rent

- **Pas de retenue de passeport.** **Pré-autorisation carte bancaire** pour la caution; libérée au retour.
- **IDP (permis international) obligatoire.** La police thaïlandaise n'accepte que **permis thaïlandais ou IDP**.
- **Conditions de location :** **IDP moto** valide requis.
- **Conduite sans IDP** et amendes : responsabilité du client.
- **Location à la journée.** Retard : prévenez via **WhatsApp**.
- **Pas d'essai.**
- **Dommages :** sans assurance = réparation + jours perdus × tarif journalier. **Assurance complète** recommandée.
- **Alcool au guidon** : sanctions lourdes.`;

const META_DE = {
  "safety-phuket": { title: "Ist Motorradfahren in Phuket sicher?", excerpt: "Sicherheit beim Motorradfahren in Phuket und wichtige Regeln" },
  "thai-laws": { title: "Motorradregeln und Bußgelder in Thailand", excerpt: "Verkehrsrecht, Führerscheinanforderungen und Strafsystem" },
  "international-license": { title: "Ist ein internationaler Führerschein in Thailand nötig?", excerpt: "IDP-Anforderungen, Beschaffung und Gültigkeit in Thailand" },
  "police-checkpoints": { title: "Polizeikontrollen in Thailand — Was Sie wissen müssen", excerpt: "Verhalten an Kontrollen, Bußgelder und Ihre Rechte" },
  "drunk-driving": { title: "Alkohol am Steuer in Thailand — Strafen und Folgen", excerpt: "Alkoholgrenzen, Bußgelder und rechtliche Konsequenzen" },
  "helmet-laws": { title: "Helmpflicht und Durchsetzung in Thailand", excerpt: "Helmtypen, Pflicht und Bußgelder" },
  "accident-procedure": { title: "Was tun nach einem Motorradunfall?", excerpt: "Schritte unmittelbar nach einem Unfall" },
  "insurance-claims": { title: "Motorradversicherung in Thailand — Schadensfall", excerpt: "Versicherungstypen und Schadensmeldung" },
  "fuel-guide": { title: "Tankstellen und Benzinpreise in Thailand", excerpt: "Tanken finden, Preise und Zahlungsmethoden" },
  "parking-guide": { title: "Motorrad parken in Phuket — Wo abstellen?", excerpt: "Sichere Parkplätze und Diebstahlschutz" },
  "atm-locations": { title: "Geldautomaten in Phuket — Bargeld abheben", excerpt: "ATM-Standorte und Geld-Tipps" },
  "sim-card": { title: "SIM-Karten in Thailand — Verbunden bleiben", excerpt: "SIM kaufen und aktivieren" },
  "weather-preparation": { title: "Wetter in Phuket — sich vorbereiten", excerpt: "Jahreszeiten, Regen und Hitze" },
  "toll-roads": { title: "Autobahnen und Mautstraßen in Thailand", excerpt: "Autobahnnetz und Gebühren" },
  "petrol-vs-diesel": { title: "Benzin oder Diesel beim Bike wählen", excerpt: "Kraftstoffwahl und Verbrauch" },
  "night-riding": { title: "Nachtfahrt in Phuket — Sicherheitstipps", excerpt: "Technik und Gefahren bei Dunkelheit" },
  "monsoon-riding": { title: "Fahren in Phuket während der Regenzeit", excerpt: "Sicheres Fahren bei Regen" },
  "temple-visits": { title: "Tempel-Etikette für Motorradfahrer", excerpt: "Was beim Tempelbesuch zu beachten ist" },
  "local-restaurants": { title: "Lokale Küche in Phuket für Biker", excerpt: "Sichere und leckere lokale Restaurants" },
  "photography-spots": { title: "Fotospots per Motorrad — Phuket", excerpt: "Beste Fotopunkte und Technik" },
  "best-scooter": { title: "Welchen Roller in Phuket wählen?", excerpt: "Click vs ADV vs Forza — Vergleich" },
  "click-vs-adv": { title: "Click 160 vs ADV 160 — Detailvergleich", excerpt: "Tiefenvergleich zweier beliebter Modelle" },
  "couples-motorcycle": { title: "Bestes Motorrad für Paare", excerpt: "Komfort und Sicherheit zu zweit" },
  "solo-traveler": { title: "Motorradwahl für Alleinreisende", excerpt: "Ideales Modell für Solo-Fahrten" },
  "beginner-bike": { title: "Bestes Bike für Erstmieter", excerpt: "Anfängerfreundliche Modelle und Tipps" },
  "long-distance-bike": { title: "Bestes Motorrad für Langstrecken", excerpt: "Komfort und Effizienz unterwegs" },
  "automatic-vs-manual": { title: "Automatik vs Schaltung — Was in Phuket?", excerpt: "Vor- und Nachteile beider Typen" },
  "helmet-types": { title: "Motorradhelm wählen — Typen und Preise", excerpt: "Helmtypen und Sicherheitszertifikate" },
  "complete-phuket": { title: "Phuket Komplettführer für Besucher", excerpt: "Jede Ecke Phukets aus Biker-Sicht" },
  "complete-krabi": { title: "Krabi per Motorrad entdecken", excerpt: "Alle Highlights in Krabi" },
  "complete-khao-sok": { title: "Khao Sok Nationalpark — Abenteuerführer", excerpt: "Dschungel- und Naturfahrten" },
  "complete-phang-nga": { title: "Phang-Nga-Bucht — Kalksteinwunder", excerpt: "Einzigartige Landschaft Phang Ngas" },
  "phuket-town": { title: "Was in Phuket Town sehen?", excerpt: "Alt und neu im Vergleich" },
  "patong-guide": { title: "Patong Beach — Im Touristenzentrum", excerpt: "Patong bei Tag und Nacht" },
  "kata-karon": { title: "Kata und Karon — Ruhigere Alternativen", excerpt: "Strände ruhiger als Patong" },
  "rawai-guide": { title: "Rawai — Lokaler Strand und Meeresfrüchte", excerpt: "Geheimtipp an Phukets Südspitze" },
  "bang-tao": { title: "Bang Tao — Luxus-Resort-Strand", excerpt: "Premium-Strand und Resort-Erlebnis" },
  "old-phuket-town": { title: "Old Phuket Town — Sino-portugiesische Architektur", excerpt: "Historisches Phuket entdecken" },
  "scooter-vs-motorcycle": { title: "Scooter vs Motorrad — Was in Phuket?", excerpt: "Automatik-Roller vs Schalt-Motorrad" },
  "rental-vs-buying": { title: "Mieten vs Kaufen — Langzeit in Thailand", excerpt: "Was ist langfristig günstiger?" },
  "tourist-vs-local": { title: "Touristen- vs Lokale Preise — Verhandeln", excerpt: "Wie man in Thailand handelt" },
  "high-vs-low-season": { title: "Hochsaison vs Nebensaison — Wann reisen?", excerpt: "Welche Reisezeit ist besser?" },
  "package-vs-diy": { title: "Pauschalreise vs DIY — Was ist besser?", excerpt: "Geführte vs selbstgeplante Touren" },
  "group-vs-solo": { title: "Gruppenfahrt vs Solo — Vorteile", excerpt: "Was macht mehr Spaß?" },
  "daytrip-vs-multiday": { title: "Tagesausflug vs Mehrtagestour", excerpt: "Fahrtdauer planen" },
  "backpacker-vs-luxury": { title: "Backpacker-Tour vs Luxus-Motorradreise", excerpt: "Budgetoptionen im Vergleich" },
  "beginner-pov": { title: "Erstmieter in Phuket — Eine Anfängergeschichte", excerpt: "Erfolge und Fehler von Anfängern" },
  "worst-mistakes": { title: "Meine schlimmsten Fehler beim Mieten in Phuket", excerpt: "Warnungen und gelernte Lektionen" },
  "sunset-spots": { title: "Die schönsten Sonnenuntergänge per Motorrad", excerpt: "Fotos und Erinnerungen" },
  "solo-female": { title: "Alleinreisende Frau am Motorrad in Phuket", excerpt: "Sicherheit und Unabhängigkeit" },
  "first-time-riding": { title: "Erstes Mal Motorrad in Thailand — Herzklopfen", excerpt: "Verkehrsschock und Gewöhnung" },
  "phuket-to-krabi": { title: "Phuket nach Krabi — Biker-Abenteuer", excerpt: "Mehrtagesrouten-Erfahrung" },
  "budget-trip": { title: "5 Tage Phuket mit 100-USD-Budget", excerpt: "Tipps für Budgetreisen" },
  "luxury-tour": { title: "Luxus-Motorradtour in Phuket — VIP-Erlebnis", excerpt: "Premium-Mietservice" },
};

const META_FR = {
  "safety-phuket": { title: "Conduire une moto à Phuket est-il sûr ?", excerpt: "Sécurité à moto à Phuket et règles essentielles" },
  "thai-laws": { title: "Règles moto et amendes en Thaïlande", excerpt: "Code de la route, permis et système de sanctions" },
  "international-license": { title: "Faut-il un permis international en Thaïlande ?", excerpt: "IDP : exigences, obtention et validité" },
  "police-checkpoints": { title: "Contrôles de police en Thaïlande — À savoir", excerpt: "Comportement, amendes et droits" },
  "drunk-driving": { title: "Alcool au guidon en Thaïlande — Sanctions", excerpt: "Limites, amendes et conséquences légales" },
  "helmet-laws": { title: "Casque obligatoire en Thaïlande", excerpt: "Types de casque, obligation et amendes" },
  "accident-procedure": { title: "Que faire après un accident moto ?", excerpt: "Étapes immédiates après un crash" },
  "insurance-claims": { title: "Assurance moto en Thaïlande — Réclamation", excerpt: "Types d'assurance et procédure" },
  "fuel-guide": { title: "Stations-service et prix de l'essence", excerpt: "Trouver du carburant, prix et paiement" },
  "parking-guide": { title: "Parking moto à Phuket — Où garer ?", excerpt: "Emplacements sûrs et conseils antivol" },
  "atm-locations": { title: "Distributeurs à Phuket — Retirer de l'argent", excerpt: "Emplacements ATM et conseils" },
  "sim-card": { title: "Carte SIM en Thaïlande — Rester connecté", excerpt: "Achat et activation d'une SIM" },
  "weather-preparation": { title: "Se préparer à la météo de Phuket", excerpt: "Saisons, pluie et chaleur" },
  "toll-roads": { title: "Autoroutes et péages en Thaïlande", excerpt: "Réseau routier et tarifs" },
  "petrol-vs-diesel": { title: "Essence ou diesel pour votre moto", excerpt: "Choix du carburant et consommation" },
  "night-riding": { title: "Conduite de nuit à Phuket — Conseils", excerpt: "Techniques et dangers nocturnes" },
  "monsoon-riding": { title: "Rouler à Phuket en saison des pluies", excerpt: "Conduite sécurisée sous la pluie" },
  "temple-visits": { title: "Étiquette aux temples pour motards", excerpt: "À savoir lors d'une visite de temple" },
  "local-restaurants": { title: "Guide culinaire local à Phuket", excerpt: "Restaurants locaux sûrs et savoureux" },
  "photography-spots": { title: "Photos à moto — Meilleurs spots de Phuket", excerpt: "Lieux photo et techniques" },
  "best-scooter": { title: "Quel scooter choisir à Phuket ?", excerpt: "Click vs ADV vs Forza — comparatif" },
  "click-vs-adv": { title: "Click 160 vs ADV 160 — Comparatif détaillé", excerpt: "Comparaison approfondie de deux modèles" },
  "couples-motorcycle": { title: "Meilleure moto pour les couples", excerpt: "Confort et sécurité à deux" },
  "solo-traveler": { title: "Choix moto pour voyageurs solo", excerpt: "Modèle idéal en solo" },
  "beginner-bike": { title: "Meilleure moto pour premiers locataires", excerpt: "Modèles débutants et conseils" },
  "long-distance-bike": { title: "Meilleure moto pour longues distances", excerpt: "Confort et efficacité" },
  "automatic-vs-manual": { title: "Automatique vs manuelle — Que choisir ?", excerpt: "Avantages et inconvénients" },
  "helmet-types": { title: "Choisir un casque moto — Types et prix", excerpt: "Types et certifications de sécurité" },
  "complete-phuket": { title: "Guide complet de Phuket pour visiteurs", excerpt: "Tout Phuket vu du guidon" },
  "complete-krabi": { title: "Découvrir Krabi à moto", excerpt: "Tous les incontournables de Krabi" },
  "complete-khao-sok": { title: "Parc national de Khao Sok — Guide aventure", excerpt: "Jungle et routes nature" },
  "complete-phang-nga": { title: "Baie de Phang Nga — Monde calcaire", excerpt: "Géographie unique de Phang Nga" },
  "phuket-town": { title: "Que voir à Phuket Town ?", excerpt: "Ancien et nouveau Phuket comparés" },
  "patong-guide": { title: "Plage de Patong — Cœur touristique", excerpt: "Patong jour et nuit" },
  "kata-karon": { title: "Kata et Karon — Alternatives calmes", excerpt: "Plages plus tranquilles que Patong" },
  "rawai-guide": { title: "Rawai — Plage locale et fruits de mer", excerpt: "Perle cachée au sud de Phuket" },
  "bang-tao": { title: "Bang Tao — Plage de resort de luxe", excerpt: "Plage premium et resorts" },
  "old-phuket-town": { title: "Old Phuket Town — Architecture sino-portugaise", excerpt: "Découvrir le Phuket historique" },
  "scooter-vs-motorcycle": { title: "Scooter vs moto — Que choisir à Phuket ?", excerpt: "Scooter auto vs moto manuelle" },
  "rental-vs-buying": { title: "Location vs achat — Long séjour en Thaïlande", excerpt: "Quelle option est plus économique ?" },
  "tourist-vs-local": { title: "Prix touristes vs locaux — Négociation", excerpt: "Comment marchander en Thaïlande" },
  "high-vs-low-season": { title: "Haute vs basse saison — Quand partir ?", excerpt: "Quelle période choisir ?" },
  "package-vs-diy": { title: "Circuit organisé vs DIY — Le meilleur choix", excerpt: "Guidé vs autonome" },
  "group-vs-solo": { title: "Groupe vs solo — Avantages", excerpt: "Quelle option est plus fun ?" },
  "daytrip-vs-multiday": { title: "Excursion d'un jour vs multi-jours", excerpt: "Planifier la durée du trajet" },
  "backpacker-vs-luxury": { title: "Road trip backpacker vs tour moto luxe", excerpt: "Options budget comparées" },
  "beginner-pov": { title: "Premiers locataires à Phuket — Récit débutant", excerpt: "Succès et erreurs des novices" },
  "worst-mistakes": { title: "Mes pires erreurs de location à Phuket", excerpt: "Avertissements et leçons" },
  "sunset-spots": { title: "Plus beaux couchers de soleil à moto", excerpt: "Photos et souvenirs" },
  "solo-female": { title: "Femme seule à moto à Phuket", excerpt: "Sécurité et indépendance" },
  "first-time-riding": { title: "Première fois à moto en Thaïlande", excerpt: "Choc du trafic et adaptation" },
  "phuket-to-krabi": { title: "Phuket vers Krabi — Aventure motard", excerpt: "Expérience d'un itinéraire multi-jours" },
  "budget-trip": { title: "5 jours à Phuket avec 100 USD", excerpt: "Conseils voyage budget" },
  "luxury-tour": { title: "Tour moto luxe à Phuket — Expérience VIP", excerpt: "Services de location premium" },
};

const RICH_DE = {
  "safety-phuket": `Millionen Touristen fahren in Phuket Motorrad oder Roller — mit Vorsicht und den richtigen Vorbereitungen ist das sicher machbar.

## Grundregeln für sicheres Fahren

1. **Helm** — Fahrer und Beifahrer (gesetzliche Pflicht)
2. **IDP + Führerschein** immer griffbereit
3. **Kein Alkohol** — hohe Bußgelder und Unfallrisiko
4. **Licht an** auch tagsüber
5. In der Stadt ca. 50 km/h; auf Landstraßen defensiv fahren

## Verkehrsrealität in Phuket

Phuket unterscheidet sich stark vom europäischen Verkehr. Plötzliche Spurwechsel, Überholen von links und rechts, Hunde und Fußgänger auf der Fahrbahn sind alltäglich. Viele Fahrer blinken nicht. Sand an Strandstraßen und nasse Fahrbahnen in der Monsunzeit erhöhen das Risiko.

## Tipps für Erstfahrer

- Starten Sie mit Honda Click 160 oder ADV 160
- Üben Sie am ersten Tag in ruhigeren Gegenden rund um Patong
- Wählen Sie **Vollkasko-Versicherung**
- Besorgen Sie Ihren **IDP vor der Anreise nach Thailand**

## Notrufnummern

- Polizei: **191** | Rettungsdienst: **1669** | Touristenpolizei: **1155**`,

  "thai-laws": `Wer in Thailand Motorrad fährt, muss die Verkehrsregeln kennen — Bußgelder sind real und werden in Touristengegenden konsequent kontrolliert.

## Führerschein und Dokumente

- **IDP (Motorradklasse)** oder **thailändischer Führerschein** — nichts anderes wird an Kontrollen akzeptiert
- Reisepass mitführen
- Mietvertrag und Versicherungsunterlagen

## Häufige Bußgelder

| Verstoß | Ca. Bußgeld |
|---------|-------------|
| Kein Führerschein/IDP | 1.000–2.000+ THB |
| Kein Helm | 500–1.000 THB |
| Alkohol am Steuer | 5.000–20.000+ THB, Haftstrafe möglich |
| Geschwindigkeit / Rotlicht | 500–2.000 THB |
| Plaketten-/Versicherungsproblem | Fahrzeug kann beschlagnahmt werden |

## Polizeikontrollen

Sehr häufig in Touristengegenden (Patong, Kata, Flughafenstraße, Phang Nga). Bleiben Sie ruhig; halten Sie Dokumente bereit.

## Rechtslage für Ausländer

Ausländer sind **nicht** von Verkehrsregeln ausgenommen. Ein nationaler EU-Führerschein ohne IDP gilt in Thailand nicht.`,

  "international-license": `In Thailand benötigen Sie für Roller und Motorräder einen **thailändischen Motorradführerschein** oder einen **IDP**.

## Das einzige akzeptierte Auslandsdokument: IDP

- ✅ Thailändischer Motorradführerschein
- ✅ **IDP** (Motorradklasse — an Ihren Heimatführerschein gebunden)
- ❌ Nur nationaler Führerschein (ohne IDP)
- ❌ Nur Reisepass
- ❌ Andere „internationale" Dokumente allein

**Der IDP ist der einzige internationale Führerscheintyp, den die thailändische Polizei anerkennt** (außer thailändischem Führerschein).

## Vor der Anreise besorgen

Holen Sie den IDP in Ihrem Heimatland mit **Motorrad-/Rollerklasse**. Als Tourist in Thailand einen IDP zu bekommen, ist praktisch nicht möglich.

## Thailand Moto Rent

Miete erfordert gültigen **Motorrad-IDP**; ohne IDP keine Vermietung.`,

  "best-scooter": `Die Thailand Moto Rent Flotte — fünf Modelle, optimiert für Phuket und Südthailand:

## Honda Click 160 — 350 THB/Tag
Stadt, Kurztrips, budgetfreundlich. Ideal für Erstmieter.

## Honda ADV 160 — 490 THB/Tag
Hoher Sitz, Stauraum, leichte Touren und kurvige Straßen. Unser beliebtestes Modell.

## Honda ADV 350 — 690 THB/Tag
Mehr Leistung, komfortabel zu zweit und für längere Strecken.

## Honda Forza 350 — 790 THB/Tag
Maxi-Scooter — Autobahnen, Tagestouren nach Krabi/Phang Nga.

## Yamaha XMAX 300 — 750 THB/Tag
Sport-Maxi, stabile Fahrt, breiter Sitz.

**Hinweis:** Wir vermieten **keine** Enduro- oder große BMW-Tourer — unsere Flotte ist Scooter/Maxi-fokussiert.

## Auswahlhilfe

Patong-only: Click 160. Tagesausflüge und Hügel: ADV 160. Zwei Personen + Gepäck: ADV 350 oder Forza.`,

  "complete-phuket": `Phuket ist Thailands größte Insel und ein Paradies für Motorradfahrer — von Stränden über Tempel bis zu spektakulären Viewpoints.

## Die Insel verstehen

Phuket misst ca. 50 km von Nord nach Süd. Die Westküste (Patong, Kata, Karon, Bang Tao) ist touristisch; die Ostküste (Chalong, Rawai) authentischer. Die Insel ist bergig — kurvige Straßen erfordern Vorsicht. Linksverkehr und thailändische Fahrgewohnheiten brauchen 1–2 Tage Gewöhnung.

## Must-See per Motorrad

- **Promthep Cape** — legendärer Sonnenuntergang, komme früh für Parkplatz
- **Karon Viewpoint** — drei Buchten auf einmal (Kata Noi, Kata, Karon)
- **Old Phuket Town** — Sino-portugiesische Architektur, Street Art, Cafés
- **Wat Chalong** — wichtigster Tempel, respektvolle Kleidung
- **Freedom Beach / Nai Harn** — ruhigere Strände, weniger Massentourismus
- **Big Buddha** — imposante Statue, Panoramablick (steiler Anstieg)

## Routenempfehlungen

**Tag 1:** Patong → Karon → Kata → Promthep (Halbtag, Anfänger geeignet)
**Tag 2:** Old Phuket Town → Wat Chalong → Rawai → Nai Harn → Seafood-Markt
**Tag 3:** Nordküste Bang Tao → Surin → Flughafenstraße → Rückkehr über Chalong
**Tag 4 (optional):** Tagesausflug Phang Nga mit Samet Nangshe Viewpoint

## Praktische Hinweise

Tanken vor Bergfahrten — auf Hügelstraßen keine Stationen. IDP immer dabei. Monsun Mai–Oktober: Regenjacke, langsam fahren, rutschige Markierungen. Premium-Versicherung bei Thailand Moto Rent buchen. Hitze März–Mai: früh starten, viel Wasser.`,

  "complete-krabi": `Krabi liegt östlich von Phuket und bietet spektakuläre Kalksteinfelsen, Mangroven und Strände — ideal für einen Mehrtagesausflug mit dem Motorrad.

## Anreise von Phuket

Über Highway 402 und 4, ca. 160 km, 3–4 Stunden Fahrzeit. Landschaftlich reizvoll durch Phang Nga mit Kalksteinformationen. Pause in Phang Nga Town zum Tanken und Essen. Forza 350 oder ADV 350 empfohlen für Komfort auf längerer Strecke.

## Highlights in Krabi

- **Ao Nang** — Touristenzentrum mit Strand, Restaurants, Ausgangspunkt für Bootstouren
- **Railay Beach** — nur per Longtail-Boot, aber Ao Nang als Basis ideal
- **Tiger Cave Temple (Wat Tham Suea)** — 1.237 Stufen, atemberaubende Aussicht über Krabi
- **Emerald Pool & Hot Springs** — Naturbad in Khlong Thom, halber Tag
- **Krabi Town** — authentischer, günstiger als Ao Nang, Night Market

## Übernachtung und Planung

1–2 Nächte in Ao Nang oder Krabi Town. Früh starten, Mittagsheat meiden. Rückfahrt am dritten Tag oder zweiter Tag nachmittags. Fähren nach Koh Lanta oder Phi Phi: Motorrad am Hafen parken, nicht mitnehmen.

## Sicherheit und Ausrüstung

Bergstraßen kurvig; nur tagsüber fahren. Volltanken in Phang Nga. Regenjacke in der Monsunzeit. IDP und Premium-Versicherung vor Abfahrt prüfen. Bei Thailand Moto Rent Rückgabezeit per WhatsApp abstimmen, falls verspätet.`,

  "phuket-to-krabi": `Die Strecke Phuket → Krabi per Motorrad ist ein Klassiker unter erfahrenen Reisenden — landschaftlich grandios, aber anspruchsvoll.

## Die Route im Detail

Phuket (Patong/Kata) → Phang Nga Town (Pause, Tanken, Mittagessen) → Takua Thung optional → Krabi Town oder Ao Nang. Ca. 160 km, 3–4 Stunden reine Fahrzeit plus Pausen. Highway 4 ist meist gut, aber kurvige Abschnitte und lokaler Verkehr erfordern Aufmerksamkeit.

## Vorbereitung

- **IDP** und Versicherung vor Abfahrt prüfen
- ADV 350 oder Forza 350 für Komfort zu zweit mit Gepäck
- Voller Tank, 1–2 Liter Wasser pro Person, Sonnenschutz
- Offline-Karten (Google Maps) laden — Mobilfunk kann in Tälern schwach sein
- Leichte Regenjacke auch in der „trockenen" Saison

## Unterwegs lohnenswert

Phang Nga Bay Viewpoints, lokale Restaurants in Phang Nga Town, Fotostopp bei Kalksteinen. Vermeiden Sie Nachtfahrten auf unbekannten Strecken — Straßenbeleuchtung ist lückenhaft.

## Rückfahrt und Logistik

Planen Sie einen Tag Puffer für Wetter und Müdigkeit. Übernachtung in Ao Nang empfohlen. Rückgabezeit bei Thailand Moto Rent per WhatsApp kommunizieren, wenn Sie länger bleiben. Ein Tag Hin- und Rückfahrt ist möglich, aber anstrengend — zwei Tage entspannter.`,
};

const RICH_FR = {
  "safety-phuket": `Des millions de touristes roulent en moto ou scooter à Phuket — avec prudence et bonne préparation, c'est tout à fait faisable.

## Règles essentielles

1. **Casque** — conducteur et passager (obligation légale)
2. **IDP + permis** toujours sur vous
3. **Zéro alcool** — amendes lourdes et risque d'accident
4. **Feux allumés** même de jour
5. ~50 km/h en ville ; vitesse défensive sur routes secondaires

## Réalité du trafic

Changements de file soudains, dépassements gauche/droite, chiens et piétons sur la chaussée. Peu d'indicateurs. Sable près des plages et routes mouillées en mousson augmentent les risques.

## Premiers locataires

- Commencez avec Honda Click 160 ou ADV 160
- Entraînez-vous le premier jour autour de Patong
- Choisissez l'**assurance complète**
- Obtenez votre **IDP avant d'arriver en Thaïlande**

## Urgences

- Police : **191** | Ambulance : **1669** | Police touristique : **1155**`,

  "thai-laws": `En Thaïlande, les règles de circulation s'appliquent strictement aux étrangers — les amendes sont réelles.

## Permis et documents

- **IDP (classe moto)** ou **permis thaïlandais** — rien d'autre accepté
- Passeport sur vous
- Contrat de location et assurance

## Amendes courantes

| Infraction | Amende approx. |
|------------|----------------|
| Pas de permis/IDP | 1 000–2 000+ THB |
| Pas de casque | 500–1 000 THB |
| Alcool au guidon | 5 000–20 000+ THB, prison possible |
| Excès de vitesse / feu rouge | 500–2 000 THB |
| Problème plaque/assurance | Véhicule saisi possible |

## Contrôles police

Très fréquents à Patong, Kata, route aéroport, Phang Nga. Restez calme ; documents prêts.

## Étrangers et loi

Les étrangers ne sont **pas** exemptés. Un permis national sans IDP n'est pas valide en Thaïlande.`,

  "international-license": `En Thaïlande, il faut un **permis moto thaïlandais** ou un **IDP** pour scooter et moto.

## Seul document étranger accepté : l'IDP

- ✅ Permis moto thaïlandais
- ✅ **IDP** (classe moto — lié à votre permis national)
- ❌ Permis national seul (sans IDP)
- ❌ Passeport seul
- ❌ Autres documents « internationaux » seuls

**L'IDP est le seul permis international reconnu par la police thaïlandaise** (hors permis thaïlandais).

## Avant le départ

Obtenez l'IDP dans votre pays avec la **classe moto/scooter**. Impossible pratiquement en tant que touriste en Thaïlande.

## Thailand Moto Rent

Location avec **IDP moto** valide obligatoire ; sans IDP, pas de location.`,

  "best-scooter": `Flotte Thailand Moto Rent — cinq modèles optimisés pour Phuket :

## Honda Click 160 — 350 THB/jour
Ville, trajets courts, budget. Idéal pour premiers locataires.

## Honda ADV 160 — 490 THB/jour
Siège haut, rangement, tours légers et routes sinueuses. Notre modèle le plus populaire.

## Honda ADV 350 — 690 THB/jour
Plus de puissance, confortable à deux et longues distances.

## Honda Forza 350 — 790 THB/jour
Maxi-scooter — autoroutes, excursions Krabi/Phang Nga.

## Yamaha XMAX 300 — 750 THB/jour
Maxi sport, conduite stable, large selle.

**Note :** Nous ne louons **pas** d'enduro ni de grosses BMW — flotte scooter/maxi uniquement.

## Comment choisir

Patong seul : Click 160. Excursions et collines : ADV 160. Deux personnes + bagages : ADV 350 ou Forza.`,

  "complete-phuket": `Phuket est la plus grande île de Thaïlande — un paradis pour les motards, des plages aux temples en passant par les viewpoints.

## Comprendre l'île

Environ 50 km du nord au sud. Côte ouest (Patong, Kata, Karon, Bang Tao) touristique ; est (Chalong, Rawai) plus authentique. Relief montagneux — routes sinueuses, prudence requise. Conduite à gauche : 1–2 jours d'adaptation.

## Incontournables à moto

- **Promthep Cape** — coucher de soleil légendaire, arriver tôt
- **Karon Viewpoint** — trois baies (Kata Noi, Kata, Karon)
- **Old Phuket Town** — architecture sino-portugaise, street art
- **Wat Chalong** — temple principal, tenue respectueuse
- **Freedom Beach / Nai Harn** — plages plus calmes
- **Big Buddha** — statue imposante, vue panoramique

## Itinéraires suggérés

**Jour 1 :** Patong → Karon → Kata → Promthep (demi-journée, débutants)
**Jour 2 :** Old Phuket Town → Wat Chalong → Rawai → Nai Harn
**Jour 3 :** Côte nord Bang Tao → Surin → route aéroport → Chalong
**Jour 4 (option) :** Excursion Phang Nga, Samet Nangshe

## Conseils pratiques

Plein d'essence avant les cols. IDP obligatoire. Mousson mai–octobre : veste de pluie, routes glissantes. Assurance premium Thailand Moto Rent. Chaleur mars–mai : départs matinaux, hydratation.`,

  "complete-krabi": `Krabi, à l'est de Phuket, offre falaises de calcaire, mangroves et plages — parfait pour une excursion de plusieurs jours en scooter.

## Depuis Phuket

Highway 402 et 4, ~160 km, 3–4 heures. Paysages spectaculaires via Phang Nga. Pause à Phang Nga Town pour essence et repas. Forza 350 ou ADV 350 conseillés pour le confort.

## Points forts

- **Ao Nang** — base touristique, plage, restaurants
- **Railay** — accessible en longtail depuis Ao Nang
- **Tiger Cave Temple** — 1 237 marches, vue spectaculaire
- **Emerald Pool & Hot Springs** — baignade naturelle, demi-journée
- **Krabi Town** — plus authentique, night market

## Hébergement

1–2 nuits à Ao Nang. Départs tôt, éviter la chaleur de midi. Ferries vers îles : scooter au port, pas à bord.

## Sécurité

Routes sinueuses — de jour uniquement. Plein à Phang Nga. IDP et assurance premium. Retard : WhatsApp Thailand Moto Rent.`,

  "phuket-to-krabi": `Phuket → Krabi en moto : classique, magnifique et exigeant.

## Itinéraire détaillé

Phuket → Phang Nga Town (pause, essence) → Krabi Town ou Ao Nang. ~160 km, 3–4 h + pauses. Highway 4 généralement bonne, virages et trafic local demandent attention.

## Préparation

- Vérifier **IDP** et assurance
- ADV 350 ou Forza 350 à deux avec bagages
- Plein, eau, protection solaire
- Cartes hors ligne — réseau faible dans les vallées
- Veste de pluie légère même en saison sèche

## Sur la route

Viewpoints Phang Nga Bay, restaurants locaux. Pas de nuit sur routes inconnues — éclairage insuffisant.

## Retour

Marge pour météo et fatigue. Nuit à Ao Nang recommandée. Aller-retour en un jour possible mais fatigant — deux jours plus agréable.`,
};

function categoryBodyDe(category) {
  const sections = {
    Safety: `## Wichtige Sicherheitsregeln

1. **Helm immer** — Fahrer und Beifahrer (gesetzliche Pflicht)
2. **IDP + Führerschein** stets dabei
3. **Kein Alkohol** beim Fahren — hohe Bußgelder und Unfallrisiko
4. **Licht an** auch tagsüber
5. **Defensiv fahren** — Phuket-Verkehr ist unberechenbar

## Praktische Tipps

- Kurze Fahrten in Patong vor langen Touren
- **Premium-Versicherung** bei Buchung wählen
- Nachtfahrten vermeiden, bis Sie die Straßen kennen
- Hunde, Sand in Kurven und plötzliche Spurwechsel beachten

## Notrufnummern

- Polizei: **191** | Rettung: **1669** | Touristenpolizei: **1155**`,
    Legal: `## Was Sie wissen müssen

Thailand setzt Verkehrsregeln in Touristengegenden konsequent durch. Ausländer sind **nicht** ausgenommen.

## Dokumente

- Gültiger **IDP (Motorradklasse)** oder thailändischer Führerschein
- Reisepass (Original)
- Mietvertrag und Versicherungspapiere

## Typische Bußgelder

| Verstoß | Ca. Bußgeld |
|---------|-------------|
| Kein IDP/Führerschein | 1.000–2.000+ THB |
| Kein Helm | 500–1.000 THB |
| Alkohol am Steuer | 5.000–20.000+ THB |
| Geschwindigkeit / Rotlicht | 500–2.000 THB |

## Bei Polizeikontrollen

Ruhig bleiben, Dokumente zeigen, nicht diskutieren. Kontrollen häufig in Patong, Chalong und an der Flughafenstraße.`,
    Documents: `## IDP — der einzige anerkannte Auslandsführerschein

Thai-Polizei akzeptiert:
- ✅ Thailändischer Motorradführerschein
- ✅ **IDP mit Motorradklasse**
- ❌ Nur nationaler Führerschein
- ❌ Nur Reisepass

## Vor der Reise

IDP im Heimatland **vor** dem Flug nach Thailand besorgen. Als Tourist vor Ort praktisch unmöglich.

## Thailand Moto Rent

Wir vermieten nur mit gültigem **Motorrad-IDP**. Kein IDP = keine Miete.`,
    Practical: `## Fahrt planen

Phuket und Umgebung belohnen Vorbereitung: Tankstopps, Bargeld, SIM-Daten und Wettercheck sind auf zwei Rädern wichtig.

## Wichtige Ratschläge

- Tank voll vor Fahrt nach Krabi, Phang Nga oder Khao Sok
- **Regenjacke** Mai–Oktober mitführen
- Google Maps offline für Bergabschnitte speichern
- **Kleine THB-Scheine** für Parken und Maut

## Thailand Moto Rent Tipps

Versicherungsupgrade online buchen, IDP vor Abholung prüfen, bei verspäteter Rückgabe per WhatsApp melden.`,
    Tips: `## Lokale Fahrweisheit

- Fahrten **früh morgens** starten — kühler und weniger Verkehr
- Thai-Fahrer blinken oft nicht — Abstand halten
- Wochenenden in Patong voll; Wochentage besser zum Üben
- Keine rücksichtslosen Stunts nachahmen

## Typische Touristenfehler

Barfuß fahren, kein Helm, Handy während der Fahrt, Fahren nach Bar-Nächten — häufigste Ursachen für Bußgelder und Verletzungen.`,
    Culture: `## Lokale Sitten respektieren

Bei Tempeln, Märkten oder Old Phuket Town:

- Schultern und Knie in Tempeln bedecken
- Schuhe ausziehen, wo erforderlich
- In Wohngebieten leise sein
- Vor Fotos von Menschen fragen

## Park-Etikette

Designierte Scooter-Bereiche nutzen; Laden- oder Hoteleingänge nicht blockieren.`,
    Motorcycles: `## Thailand Moto Rent Flotte

| Modell | Täglich | Ideal für |
|--------|---------|----------|
| Honda Click 160 | ฿350 | Stadt, Anfänger |
| Honda ADV 160 | ฿490 | Allround-Touren |
| Honda ADV 350 | ฿690 | Zu zweit, Hügel |
| Honda Forza 350 | ฿790 | Autobahn, Komfort |
| Yamaha XMAX 300 | ฿750 | Sport-Maxi |

## Auswahl

Motorgröße an Route anpassen: Patong-only braucht weniger Leistung als Phuket→Krabi. Im Zweifel: **ADV 160**.`,
    Gear: `## Helmqualität

DOT- oder ECE-zertifizierte Helme sind legal. Bei uns ist ein Helm **inklusive** — Kinnriemen fest schnallen.

## Kleidung

- Langärmelig gegen Sonne und Stürze
- Geschlossene Schuhe (keine Flip-Flops)
- Regenjacke in der Regenzeit

## Optionales Zubehör

Handyhalter (nur beim Parken), Drybag für Dokumente, Sonnencreme.`,
    Guide: `## Routenplanung

Patong, Kata oder Karon als Basis für Süd-Phuket-Schleifen. Extra Zeit für Fotos, Essen und Fähren einplanen.

## Sehenswürdigkeiten

- Viewpoints: Promthep, Karon, Samet Nangshe (Phang Nga)
- Strände: Freedom, Nai Harn, Bang Tao
- Kultur: Old Phuket Town, Wat Chalong

## Fahrhinweise

Bergstraßen nach Phang Nga und Krabi sind landschaftlich, aber kurvig — tagsüber fahren, tanken, IDP mitführen.`,
    Comparison: `## Zusammenfassung

Jeder Reisende hat anderes Budget, Können und Zeit. Dieser Vergleich hilft, **Ihre** Reise zu planen — nicht den Instagram-Traum anderer.

## Faktoren

- **Kosten** — Miete + Sprit + Versicherung vs. Pauschalpreis
- **Freiheit** — festes Programm vs. spontane Abstecher
- **Erfahrung** — Vertrauen im Thai-Verkehr
- **Zeit** — Tagesausflug oder Mehrtagestour?

## Unsere Empfehlung

Die meisten Besucher mit 5–10 Tagen profitieren von **2–3 Tagen Scooter-Miete mit Premium-Versicherung** statt Kauf oder Bus-Tour.`,
    Experience: `## Perspektive aus der Praxis

Typische Touristenerfahrungen in Phuket — Erfolge, Fehler und Lehren.

## Was funktioniert

- IDP vor Abreise besorgen
- Am ersten Tag langsam fahren
- Premium-Versicherung bei unbekannten Straßen
- Frühe Starts gegen Hitze und Verkehr

## Worauf achten

Plötzlicher Regen, Kies in Kurven, Sand an Strandausfahrten, Müdigkeit nach Sonnenuntergang.`,
  };
  return sections[category] ?? sections.Practical;
}

function categoryBodyFr(category) {
  const sections = {
    Safety: `## Règles de sécurité essentielles

1. **Casque toujours** — conducteur et passager (obligation légale)
2. **IDP + permis** sur vous en permanence
3. **Zéro alcool** — amendes lourdes et risque d'accident
4. **Feux allumés** même de jour
5. Conduite **défensive** — trafic imprévisible à Phuket

## Conseils pratiques

- Courtes sorties à Patong avant longs trajets
- Choisir l'**assurance premium** à la réservation
- Éviter la nuit tant que vous ne connaissez pas les routes
- Chiens, sable en virage et changements de file soudains

## Urgences

- Police : **191** | Ambulance : **1669** | Police touristique : **1155**`,
    Legal: `## À savoir

La Thaïlande applique strictement le code de la route dans les zones touristiques. Les étrangers ne sont **pas** exemptés.

## Documents

- **IDP (classe moto)** ou permis thaïlandais valide
- Passeport (original)
- Contrat de location et assurance

## Amendes typiques

| Infraction | Amende approx. |
|------------|----------------|
| Pas d'IDP/permis | 1 000–2 000+ THB |
| Pas de casque | 500–1 000 THB |
| Alcool au guidon | 5 000–20 000+ THB |
| Excès de vitesse / feu rouge | 500–2 000 THB |

## Contrôles

Restez calme, montrez les documents, ne discutez pas. Fréquents à Patong, Chalong et route aéroport.`,
    Documents: `## IDP — seul permis étranger accepté

La police thaïlandaise accepte :
- ✅ Permis moto thaïlandais
- ✅ **IDP avec classe moto**
- ❌ Permis national seul
- ❌ Passeport seul

## Avant le voyage

Obtenez l'IDP dans votre pays **avant** le vol. Impossible pratiquement sur place en tant que touriste.

## Thailand Moto Rent

Location uniquement avec **IDP moto** valide. Sans IDP = pas de location.`,
    Practical: `## Planifier votre trajet

Phuket et environs récompensent la préparation : carburant, cash, SIM et météo comptent à deux roues.

## Conseils clés

- Plein avant Krabi, Phang Nga ou Khao Sok
- **Veste de pluie** mai–octobre
- Google Maps hors ligne pour les cols
- **Petites coupures THB** pour parking et péages

## Conseils Thailand Moto Rent

Assurance en ligne, vérifier l'IDP avant retrait, prévenir via WhatsApp en cas de retard.`,
    Tips: `## Sagesse locale

- Départs **tôt le matin** — plus frais, moins de trafic
- Peu de clignotants — gardez vos distances
- Week-ends chargés à Patong ; semaine calme pour apprendre
- Ne imitez pas les cascades locales

## Erreurs fréquentes

Pieds nus, pas de casque, téléphone en roulant, conduite après bars — amendes et blessures.`,
    Culture: `## Respect des coutumes

Aux temples, marchés ou Old Phuket Town :

- Épaules et genoux couverts au temple
- Chaussures retirées si requis
- Voix basse en zone résidentielle
- Demander avant de photographier

## Stationnement

Zones scooter désignées ; ne bloquez pas commerces ou hôtels.`,
    Motorcycles: `## Flotte Thailand Moto Rent

| Modèle | Jour | Idéal pour |
|--------|------|------------|
| Honda Click 160 | ฿350 | Ville, débutants |
| Honda ADV 160 | ฿490 | Tours variés |
| Honda ADV 350 | ฿690 | À deux, collines |
| Honda Forza 350 | ฿790 | Autoroute, confort |
| Yamaha XMAX 300 | ฿750 | Maxi sport |

## Choisir

Adaptez la cylindrée à l'itinéraire. Patong seul ≠ Phuket→Krabi. En cas de doute : **ADV 160**.`,
    Gear: `## Qualité du casque

Casques DOT ou ECE acceptés. Casque **inclus** à la location — sangle bien serrée.

## Vêtements

- Manches longues (soleil et chutes)
- Chaussures fermées (pas de tongs)
- Veste de pluie en mousson

## Extras

Support téléphone (à l'arrêt), sac étanche pour documents, crème solaire.`,
    Guide: `## Planification

Base à Patong, Kata ou Karon pour les boucles sud. Prévoir photos, repas et ferries.

## Incontournables

- Viewpoints : Promthep, Karon, Samet Nangshe (Phang Nga)
- Plages : Freedom, Nai Harn, Bang Tao
- Culture : Old Phuket Town, Wat Chalong

## Conduite

Routes montagneuses vers Phang Nga et Krabi — de jour, plein d'essence, IDP sur vous.`,
    Comparison: `## Résumé

Budget, compétence et temps diffèrent. Ce comparatif aide **votre** voyage — pas celui des autres sur Instagram.

## Facteurs

- **Coût** — location + essence + assurance vs circuit
- **Liberté** — programme fixe vs détours spontanés
- **Compétence** — confiance dans le trafic thaï
- **Temps** — journée ou multi-jours ?

## Recommandation

Pour 5–10 jours, **2–3 jours de scooter + assurance premium** bat souvent achat ou bus touristique.`,
    Experience: `## Regard terrain

Expériences typiques à Phuket — succès, erreurs et leçons.

## Ce qui marche

- IDP avant le départ
- Lenteur le premier jour
- Assurance premium sur routes inconnues
- Départs tôt (chaleur et trafic)

## Vigilance

Pluie soudaine, gravier en virage, sable aux sorties de plage, fatigue après le coucher du soleil.`,
  };
  return sections[category] ?? sections.Practical;
}

function buildBody(id, category, meta, richMap, supplementMap, categoryFn, policy) {
  const { title, excerpt } = meta[id];
  let content = richMap[id] ?? categoryFn(category);
  const supplement = supplementMap[id];
  if (supplement) content += `\n\n${supplement}`;
  return `# ${title}\n\n${excerpt}\n\n${content}\n\n${policy}`.trim();
}

function emitFile(locale, constName, bodies) {
  const lines = [
    `/** Complete guide bodies — ${locale.toUpperCase()} — all ${articles.length} articles */`,
    "",
    `export const ${constName}: Record<string, string> = {`,
  ];
  for (const art of articles) {
    const body = bodies[art.id] ?? "";
    const escaped = body
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");
    lines.push(`  "${art.id}": \`${escaped}\`,`);
  }
  lines.push("};", "");
  const outDir = path.join(ROOT, "lib/guide-articles/bodies");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${locale}.ts`), lines.join("\n"));
  console.log(`Wrote ${locale}.ts (${articles.length} articles)`);
}

const deBodies = {};
const frBodies = {};
for (const art of articles) {
  deBodies[art.id] = buildBody(
    art.id,
    art.category,
    META_DE,
    RICH_DE,
    SUPPLEMENT_DE,
    categoryBodyDe,
    POLICY_DE
  );
  frBodies[art.id] = buildBody(
    art.id,
    art.category,
    META_FR,
    RICH_FR,
    SUPPLEMENT_FR,
    categoryBodyFr,
    POLICY_FR
  );
}

emitFile("de", "GUIDE_BODIES_DE", deBodies);
emitFile("fr", "GUIDE_BODIES_FR", frBodies);
console.log("Done DE + FR");
