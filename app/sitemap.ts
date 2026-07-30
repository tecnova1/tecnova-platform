import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tecnovaspa.cl';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/nosotros`, lastModified: new Date() },
    { url: `${baseUrl}/investigacion`, lastModified: new Date() },
    { url: `${baseUrl}/observatorio`, lastModified: new Date() },
    { url: `${baseUrl}/publicaciones`, lastModified: new Date() },
    { url: `${baseUrl}/libro-blanco`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
  ];
}