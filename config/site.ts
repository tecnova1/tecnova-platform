export const siteConfig = {
  name: "TECNOVA SpA",
  description: "Centro de Investigación y Observatorio de Fricción Organizacional.",
  url: "https://tecnovaspa.cl",
  email: "tecnocaspa.1@gmail.com",
  links: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com/tecnovaspa",
    facebook: "https://facebook.com/TECNOVA1.SpA."
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  "name": "TECNOVA SpA",
  "url": siteConfig.url,
  "email": siteConfig.email,
  "description": siteConfig.description
};

export const researchProjectSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  "name": "Índice de Fricción Organizacional (IFO / IFC)",
  "description": "Investigación sobre la experiencia humana en la gestión cotidiana.",
  "parentOrganization": {
    "@type": "Organization",
    "name": "TECNOVA SpA"
  }
};