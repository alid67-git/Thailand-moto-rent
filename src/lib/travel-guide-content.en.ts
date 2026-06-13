const COMPANY_POLICY_EN = `
## Thailand Moto Rent policy

- **We do not hold passports.** A **credit card pre-authorization** is used for deposit; released when you return the bike.
- **IDP (International Driving Permit) is mandatory.** Thai police accept only a **Thai licence or IDP** for foreigners — a home licence alone is not valid.
- **Rental terms:** Valid **motorcycle IDP** required; no rental without it.
- **Riding without IDP** and any fines are entirely the customer's responsibility.
- **Daily rental.** If returning late, notify us on **WhatsApp**.
- **No test rides.**
- **Damage:** Without insurance, repair cost + lost rental days. **Full coverage** recommended.
- **Drunk riding** carries severe penalties.
`;

const ARTICLE_BODIES_EN: Record<string, string> = {
  "international-license": `
In Thailand you need a **Thai motorcycle licence** or **IDP** for scooters/motorcycles.

## The only foreign document police accept: IDP

- ✅ Thai motorcycle licence
- ✅ **IDP** (motorcycle class — tied to your home licence)
- ❌ Home licence only (without IDP)
- ❌ Passport only
- ❌ Other "international" documents alone

**IDP is the only international licence type Thai police recognise** (except Thai licence).

## Get it before you arrive

Obtain IDP in your home country with **motorcycle/scooter class**. Getting IDP as a tourist in Thailand is not practical.

## Thailand Moto Rent

Rental requires valid **motorcycle IDP**; no rental without it.

${COMPANY_POLICY_EN}
`,

  "thai-laws": `
Essential rules and fines when riding in Thailand.

## Licence and documents

- **IDP (motorcycle)** or **Thai licence** — nothing else accepted at checkpoints
- Carry passport
- Rental contract and insurance papers

## Common fines

| Violation | Approx. fine |
|-----------|----------------|
| No licence/IDP | 1,000–2,000+ THB |
| No helmet | 500–1,000 THB |
| Drunk riding | 5,000–20,000+ THB, jail risk |
| Speed / red light | 500–2,000 THB |
| Plate/insurance issue | Vehicle may be impounded |

## Police checkpoints

Very frequent in tourist areas (Patong, Kata, airport road, Phang Nga). Stay calm; keep documents ready.

${COMPANY_POLICY_EN}
`,

  "drunk-driving": `
**Drunk motorcycle riding** in Thailand is extremely risky with **very high penalties**.

## Legal limit

Blood alcohol limits are low; practically **near-zero tolerance** for tourists. Even one drink can cause problems.

## Penalties

- Fine: **5,000 THB and up** (increases on repeat)
- Licence may be suspended
- Serious cases: **jail** and deportation risk
- In an accident, **insurance void** — all costs on you

## Motorcycle-specific risk

Balance is affected by alcohol; Phuket traffic is chaotic. **Never** ride after bar crawls or full-moon parties — use Grab or taxi.

${COMPANY_POLICY_EN}
`,

  "police-checkpoints": `
Motorcycle checkpoints are common in Phuket and surrounding areas.

## What is checked?

- IDP and home licence
- Helmet (rider and passenger)
- Plate and rental papers
- Alcohol (random breath test)

## At a checkpoint

1. Slow down and stop safely
2. Do not remove helmet before stopping
3. Show passport, IDP, licence and rental documents
4. Stay calm and respectful — arguing increases fines

## Common locations

- Patong entrance/exit
- Chalong roundabout
- Airport road
- Highway toward Phang Nga / Krabi

${COMPANY_POLICY_EN}
`,

  "insurance-claims": `
Insurance choice when renting a motorcycle is critical.

## Insurance types

- **Basic (legal minimum):** Third-party liability — low limits, does not cover your bike damage
- **Standard package:** Lower excess, theft cover
- **Premium / full cover:** Minimum excess, roadside assistance — **recommended for tourists**

## Uninsured damage scenario

Without insurance or for excluded damage, Thailand Moto Rent applies:

1. Bike goes to authorised repair shop
2. **Repair cost** as invoiced is charged
3. **Lost rental days × daily rate** while bike is unavailable

This is why **full coverage** is the sensible choice.

## After an accident

- Police report (damage over ~1,000 THB)
- Photos, witness details
- Immediate notification to us and insurer

${COMPANY_POLICY_EN}
`,

  "safety-phuket": `
Millions of tourists ride motorcycles in Phuket; it is safe for careful riders.

## Basic rules

1. **Helmet** — rider and passenger (legal requirement)
2. **IDP + licence** always with you
3. **No alcohol** — heavy fines and crash risk
4. Keep **lights on** even by day
5. ~50 km/h in town; careful speed on highways

## Traffic realities

- Sudden lane changes
- Overtaking from left and right
- Dogs and pedestrians on the road

## First-time renters

- Start with Click 160 or ADV 160
- Practice around Patong on day one
- Choose full insurance
- Get your **IDP before arriving in Thailand**

${COMPANY_POLICY_EN}
`,

  "best-scooter": `
Thailand Moto Rent fleet — five models optimised for Phuket:

## Honda Click 160 — 350 THB/day
City, short trips, budget-friendly. Ideal for first-time renters.

## Honda ADV 160 — 490 THB/day
High seat, storage, light tours and winding roads. Most popular model.

## Honda ADV 350 — 690 THB/day
More power, comfortable for two-up and longer distances.

## Honda Forza 350 — 790 THB/day
Maxi scooter — highways, Krabi/Phang Nga day trips.

## Yamaha XMAX 300 — 750 THB/day
Sport maxi, stable ride, wide seat.

**Note:** We do **not** rent outdoor/enduro or large BMW-style bikes — our fleet is scooter/maxi focused.

${COMPANY_POLICY_EN}
`,

  "fuel-guide": `
## Fuel type
Scooters use **petrol 91/95** (not diesel).

## Price
As of 2026, roughly **35–40 THB per litre** (varies).

## Stations
Shell, PTT, Bangchak — plentiful in Patong, Chalong and on Highway 402.

## Tips
- **Full tank** before long tours
- Few stations on Khao Sok / forest roads — fill up in Phang Nga
- Avoid expensive roadside bottles — use proper stations
`,

  "accident-procedure": `
## At the scene

1. Move to a safe place; call **1669** ambulance if injured
2. Police: **191** — report required if damage exceeds ~1,000 THB
3. Photos (all angles, plates, documents)
4. Notify Thailand Moto Rent on WhatsApp immediately

## Insurance

Without a police report, full claim is difficult. Premium insurance speeds up the process.

${COMPANY_POLICY_EN}
`,

  "helmet-laws": `
Helmets are **legally mandatory** in Thailand — rider and passenger.

## Fine
500–1,000 THB; higher on repeat offences.

## Type
DOT-approved; **helmet included** with our rentals.

## Tip
Strap it tightly — police fine loose helmets too.
`,

  "rental-vs-buying": `
For tourists, **renting** is almost always smarter:

- No maintenance, insurance or registration hassle
- Economical for short stays
- Replacement option if breakdown occurs

## Our deposit model
We do **not** hold passports — **credit card pre-authorization**; released on return.

${COMPANY_POLICY_EN}
`,
};

function categoryTemplateEn(category: string, title: string): string {
  return `
# ${title}

This guide is for tourists planning to explore Phuket and surroundings by motorcycle.

## Overview

This ${category} article covers practical tips aligned with safe riding, IDP requirements, and Thailand Moto Rent rental terms.

## Key reminders

- Get your **IDP** before arriving in Thailand
- **Drunk riding** = heavy fines
- **Full insurance** recommended
- No passport deposit — **credit card hold** only

## More info

Related articles: International Licence, Thai Fines, Insurance Guide.

Contact us on WhatsApp for detailed questions.

${COMPANY_POLICY_EN}
`.trim();
}

export function getArticleBodyEn(articleId: string, title: string, category: string): string {
  if (ARTICLE_BODIES_EN[articleId]) return ARTICLE_BODIES_EN[articleId].trim();
  return categoryTemplateEn(category, title);
}

export function hasCustomArticleBodyEn(articleId: string): boolean {
  return articleId in ARTICLE_BODIES_EN;
}
