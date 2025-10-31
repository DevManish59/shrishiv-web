export const website = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://www.shrishiv.com#website",
      "@type": "WebSite",
      url: "https://www.shrishiv.com/",
      name: "Shrishiv Jewelry",
      description:
        "Shop lab grown diamond and engagement rings and fine jewelry at Shrishiv. Ethical, handcrafted pieces for your forever moments.",
      inLanguage: "en",
    },
    {
      "@id": "https://shrishiv.com/#webpage",
      "@type": "WebPage",
      name: "Shrishiv Jewelry",
      description:
        "Shop lab grown diamond and engagement rings and fine jewelry at Shirishiv. Ethical, handcrafted pieces for your forever moments.",
      url: "https://shrishiv.com/",
      isPartOf: {
        "@id": "https://shrishiv.com/#website",
        "@type": "WebSite",
      },
      potentialAction: [
        {
          "@type": "ReadAction",
          target: ["https://shrishiv.com/"],
        },
      ],
    },
  ],
};

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shrishiv Jewelry",
  url: "https://www.shrishiv.com",
  logo: "/logo.png",
  sameAs: [
    "https://www.facebook.com/shrishiv",
    "https://www.linkedin.com/company/shrishiv",
    "https://www.instagram.com/shrishiv",
    "https://www.youtube.com/@shrishiv",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "<sales@shrishiv.com>",
  },
  //   address: {
  //     "@type": "PostalAddress",
  //     streetAddress: "128 City Road",
  //     addressLocality: "London",
  //     addressRegion: "ENG",
  //     postalCode: "EC1V 2NX",
  //     addressCountry: "GB",
  //   },
};

export function generateBreadcrumb(
  secondPositionName?: string,
  thirdPositionName?: string
) {
  const breadCrumbList = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shrishiv.com/",
      },
      ...(secondPositionName
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: secondPositionName,
            },
          ]
        : ""),
      ...(thirdPositionName
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: thirdPositionName,
            },
          ]
        : []),
    ],
  };

  return JSON.stringify(breadCrumbList);
}
