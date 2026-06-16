import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Noto_Sans_SC, Noto_Sans_Thai } from "next/font/google";
import { Providers } from "@/components/Providers";
import { defaultLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { hasPreviewBypass, isSitePreview, PREVIEW_BYPASS_COOKIE } from "@/lib/site-mode";
import "./globals.css";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0077b6" },
    { media: "(prefers-color-scheme: dark)", color: "#041e2e" },
  ],
};

const thai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  display: "swap",
});

const chinese = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-chinese",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const heading = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thailand Moto Rent — Phuket",
  description:
    "Corporate motorcycle rental across Phuket. Insurance, top case and flexible booking.",
  ...(isSitePreview()
    ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
    : {}),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialPreviewBypass = hasPreviewBypass(
    cookieStore.get(PREVIEW_BYPASS_COOKIE)?.value,
  );
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale: Locale =
    localeCookie && locales.includes(localeCookie as Locale)
      ? (localeCookie as Locale)
      : defaultLocale;

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var langs=["tr","en","th","de","fr","ar","zh","ru"];var chosen=localStorage.getItem("tmr-locale-chosen");var loc=localStorage.getItem("tmr-locale");var m=document.cookie.match(/(?:^|;\\s*)tmr-locale=([^;]+)/);if(m)loc=m[1];if(chosen!=="1"||!loc||langs.indexOf(loc)<0)loc="en";document.documentElement.lang=loc;document.documentElement.dir=loc==="ar"?"rtl":"ltr";}catch(e){}})();`,
          }}
        />
        {/* Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("tmr_theme_pref");if(p==="dark"){document.documentElement.classList.add("dark");return}if(p==="light")return;var lat=7.8804,lng=98.3923,d=new Date(),n=d.getTime()/864e5,t=2*Math.PI*(n-2451545),L=4.895063+0.017202792*(n-2451545),M=6.24006+0.01720197*(n-2451545),C=1.9148*Math.sin(M)+0.02*Math.sin(2*M)+0.0003*Math.sin(3*M),lam=L+C+Math.PI+0,phi=Math.asin(Math.sin(lat*Math.PI/180)*Math.sin(lam)+Math.cos(lat*Math.PI/180)*Math.cos(lam)*Math.cos(0)),h=Math.acos(Math.max(-1,Math.min(1,(Math.sin(-0.833*Math.PI/180)-Math.sin(lat*Math.PI/180)*Math.sin(phi))/(Math.cos(lat*Math.PI/180)*Math.cos(phi))))*180/Math.PI/15,utc=d.getUTCHours()+d.getUTCMinutes()/60,local=utc+7,sunrise=12-h-7,sunset=12+h-7;if(local<sunrise||local>=sunset)document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "LocalBusiness",
              name: "Thailand Moto Rent",
              image: "https://images.pexels.com/photos/914619/pexels-photo-914619.jpeg",
              description: "Phuket'te motosiklet kiralama hizmeti. Güvenli, sigortalı motosikletler.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bang Tao Beach, Patong",
                addressLocality: "Phuket",
                addressRegion: "Phuket",
                postalCode: "83110",
                addressCountry: "TH",
              },
              telephone: "+66991234567",
              url: "https://thailand-moto-rent.com",
              sameAs: [
                "https://www.google.com/search?q=Thailand+Moto+Rent+Phuket",
              ],
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "500",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body className={`${sans.variable} ${heading.variable} ${thai.variable} ${chinese.variable} min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] antialiased transition-colors duration-300`}>
        <Providers initialPreviewBypass={initialPreviewBypass} initialLocale={initialLocale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
