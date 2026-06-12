import type { MetadataRoute } from "next";
import { isSitePreview } from "@/lib/site-mode";

export default function robots(): MetadataRoute.Robots {
  if (isSitePreview()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
