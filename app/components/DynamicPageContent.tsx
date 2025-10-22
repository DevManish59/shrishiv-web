import { DynamicPageItem } from "@/lib/types";
import Link from "next/link";
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
        <div className="max-w-screen-2xl mx-auto py-10  px-5 sm:px-8 lg:px-10">
          <div className="flex gap-2 text-xs">
            <Link href="/">Home</Link>/<p>{name}</p>
          </div>
          <h1 className="text-center font-semibold text-5xl py-10">{name}</h1>
        </div>
      </div>

      <section className="py-10 bg-gradient-to-r ">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <p className="mb-5">{description}</p>
            <div
              className="dynamic-content"
              dangerouslySetInnerHTML={{ __html: longDesc ?? "" }}
            />
            {imageUrls?.[0] && <img src={imageUrls?.[0]} className="my-4" />}
          </div>
        </div>
      </section>
    </>
  );
};

export default DynamicPageContent;
