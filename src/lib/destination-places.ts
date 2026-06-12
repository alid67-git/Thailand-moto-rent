export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface DestinationPlace {
  lat: number;
  lng: number;
  googleMapsUrl: string;
  /** Ana görsel — Google Maps / yer fotoğrafı tarzı */
  heroImage?: string;
  /** Altta kaydırılabilir 5 küçük görsel */
  gallery: string[];
  reviews: GoogleReview[];
}

const DEFAULT_REVIEWS: GoogleReview[] = [
  {
    author: "Sarah M.",
    rating: 5,
    text: "Stunning views and easy to reach by scooter from Patong. Parking was straightforward.",
    relativeTime: "2 weeks ago",
  },
  {
    author: "Marco R.",
    rating: 5,
    text: "One of the best stops on our Phuket trip. Go early to avoid tour buses.",
    relativeTime: "1 month ago",
  },
  {
    author: "Yuki T.",
    rating: 4,
    text: "Beautiful place. Road is fine for ADV 160. Bring water and sun protection.",
    relativeTime: "2 months ago",
  },
];

/** Popüler destinasyonlar — koordinat + Google tarzı yorumlar */
export const DESTINATION_PLACES: Record<string, DestinationPlace> = {
  "big-buddha": {
    lat: 7.8276,
    lng: 98.3125,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Big+Buddha+Phuket",
    gallery: [
      "https://images.pexels.com/photos/3935683/pexels-photo-3935683.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/4179974/pexels-photo-4179974.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/3400743/pexels-photo-3400743.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/2913374/pexels-photo-2913374.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/4238649/pexels-photo-4238649.jpeg?w=800&q=85",
    ],
    reviews: [
      {
        author: "James K.",
        rating: 5,
        text: "Iconic Phuket landmark. The view from the top is incredible — worth the ride up.",
        relativeTime: "3 weeks ago",
      },
      {
        author: "Nina P.",
        rating: 5,
        text: "Peaceful morning visit by motorbike. Dress modestly for the temple area.",
        relativeTime: "1 month ago",
      },
      {
        author: "Ahmed H.",
        rating: 4,
        text: "Busy at sunset but still magical. Free parking for scooters near the entrance.",
        relativeTime: "2 months ago",
      },
    ],
  },
  "samet-nangshe": {
    lat: 8.2453,
    lng: 98.4025,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Samet+Nangshe+Viewpoint",
    gallery: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=800&q=85",
    ],
    reviews: [
      {
        author: "Lisa W.",
        rating: 5,
        text: "Best sunrise in Thailand! Stayed overnight at a bungalow nearby — magical.",
        relativeTime: "1 week ago",
      },
      {
        author: "Tom B.",
        rating: 5,
        text: "Instagram spot for a reason. Arrive before 6 AM for the famous panorama.",
        relativeTime: "3 weeks ago",
      },
      {
        author: "Chen L.",
        rating: 5,
        text: "Long ride from Patong but absolutely worth it. Cafe at the viewpoint is good.",
        relativeTime: "1 month ago",
      },
    ],
  },
  "freedom-beach": {
    lat: 7.8885,
    lng: 98.278,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Freedom+Beach+Phuket",
    gallery: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1590745/pexels-photo-1590745.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=800&q=85",
    ],
    reviews: [
      {
        author: "Emma S.",
        rating: 5,
        text: "Hidden gem! Crystal clear water. Longtail from Patong or hike down — both worth it.",
        relativeTime: "2 weeks ago",
      },
      {
        author: "Pierre D.",
        rating: 4,
        text: "Less crowded than Patong. Bring cash for the boat if you don't hike.",
        relativeTime: "1 month ago",
      },
    ],
  },
  "banana-beach": {
    lat: 7.82,
    lng: 98.31,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Banana+Beach+Phuket",
    gallery: [
      "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1590745/pexels-photo-1590745.jpeg?w=800&q=85",
    ],
    reviews: DEFAULT_REVIEWS,
  },
  "khao-sok-national-park": {
    lat: 8.914,
    lng: 98.529,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Khao+Sok+National+Park",
    gallery: [
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/2422591/pexels-photo-2422591.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?w=800&q=85",
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=800&q=85",
    ],
    reviews: [
      {
        author: "Olivia R.",
        rating: 5,
        text: "Stayed in a jungle bungalow — unforgettable. Cheow Lan lake tour is a must.",
        relativeTime: "2 weeks ago",
      },
      {
        author: "Klaus M.",
        rating: 5,
        text: "Epic scooter ride through the park. Book floating raft house in advance.",
        relativeTime: "1 month ago",
      },
    ],
  },
};

export function getDestinationPlace(slug: string, fallbackImage: string, fallbackImages: string[]): DestinationPlace {
  const known = DESTINATION_PLACES[slug];
  if (known) return known;

  const pool = fallbackImages.length > 0 ? fallbackImages : [fallbackImage];
  const gallery = [...pool.slice(0, 5)];
  while (gallery.length < 5) gallery.push(fallbackImage);

  return {
    lat: 7.88,
    lng: 98.39,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(slug.replace(/-/g, " ") + " Phuket Thailand")}`,
    heroImage: fallbackImage,
    gallery,
    reviews: DEFAULT_REVIEWS,
  };
}

export function buildGoogleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}
