export const dynamic = 'force-dynamic';
export const revalidate = 0;           

import { MetadataRoute } from "next";
import { products } from "./[lng]/(main)/[categories]/[product]/page";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://i321ionline.store",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant",
          en: "https://i321ionline.store/en",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/login",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/login",
          en: "https://i321ionline.store/en/login",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/about",
          en: "https://i321ionline.store/en/about",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/logistics",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/logistics",
          en: "https://i321ionline.store/en/logistics",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/payment",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/payment",
          en: "https://i321ionline.store/en/payment",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/tables",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/tables",
          en: "https://i321ionline.store/en/tables",
        },
      },
    },
    {
      url: "https://i321ionline.store/zh-Hant/storage",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "zh-Hant": "https://i321ionline.store/zh-Hant/storage",
          en: "https://i321ionline.store/en/storage",
        },
      },
    },
    ...products
      .filter((item) => /table/.exec(item))
      .map((item) => ({
        url: `https://i321ionline.store/zh-Hant/tables/${item}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: {
          languages: {
            "zh-Hant": `https://i321ionline.store/zh-Hant/tables/${item}`,
            en: `https://i321ionline.store/en/tables/${item}`,
          },
        },
      })),
    ...products
      .filter((item) => /storage/.exec(item))
      .map((item) => ({
        url: `https://i321ionline.store/zh-Hant/storage/${item}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: {
          languages: {
            "zh-Hant": `https://i321ionline.store/zh-Hant/storage/${item}`,
            en: `https://i321ionline.store/en/storage/${item}`,
          },
        },
      })),
  ];
}
