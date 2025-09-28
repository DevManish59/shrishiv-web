import { DynamicPageItem } from "@/lib/types";
import React from "react";

const DynamicPageContent = ({ pageData }: { pageData: DynamicPageItem }) => {
  const {
    name,
    id: pageId,
    title,
    description,
    longDesc,
    pageUrl,
    displayOrder,
    imageUrls,
  } = pageData;
  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
          <h1 className="text-center font-semibold text-5xl">{name}</h1>
        </div>
      </div>

      <section className="py-10 bg-gradient-to-r ">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>{name}</p>
          <p>{title}</p>
          <p>{description}</p>
          <div dangerouslySetInnerHTML={{ __html: longDesc ?? "" }} />
          <img src={imageUrls?.[0]} />
        </div>
      </section>
    </>
  );
};

export default DynamicPageContent;
