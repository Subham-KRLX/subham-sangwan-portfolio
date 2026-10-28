import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://subham-sangwan-portfolio-kappa.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://subham-sangwan-portfolio-kappa.vercel.app/projects/wine-quality-predictor",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://subham-sangwan-portfolio-kappa.vercel.app/projects/porsche-911-studio",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
