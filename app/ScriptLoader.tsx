"use client";
import { useEffect } from "react";
import { organization, website } from "./lib/schema-code";

const LoadScripts = () => {
  useEffect(() => {
    const loadScripts = () => {
      setTimeout(() => {
        // Organization Script
        const organizationScript = document.createElement("script");
        organizationScript.type = "application/ld+json";
        organizationScript.innerHTML = JSON.stringify(organization);
        document.body.appendChild(organizationScript);

        // Website Script
        const websiteScript = document.createElement("script");
        websiteScript.type = "application/ld+json";
        websiteScript.innerHTML = JSON.stringify(website);
        document.body.appendChild(websiteScript);

        // Local Business Script
        // const localBusinessScript = document.createElement("script");
        // localBusinessScript.type = "application/ld+json";
        // localBusinessScript.innerHTML = JSON.stringify(localBusiness);
        // document.body.appendChild(localBusinessScript);

        // GTM Script
        // const gtmScript = document.createElement("script");
        // gtmScript.async = true;
        // gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
        // document.body.appendChild(gtmScript);
      }, 3000); // 3 seconds delay
    };

    if (document.readyState === "complete") {
      loadScripts();
    } else {
      window.addEventListener("load", loadScripts);
      return () => window.removeEventListener("load", loadScripts);
    }
  }, [organization, website]);

  return null;
};

export default LoadScripts;
