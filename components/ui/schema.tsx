"use client";

import Script from "next/script";

interface SchemaProps {
  schema: Record<string, any>;
}

export function Schema({ schema }: SchemaProps) {
  return (
    <Script
      id="schema-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
