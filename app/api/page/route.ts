import { NextResponse } from "next/server";

const CACHE_DURATION = 3600; // 1 hour
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    // Fetch from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "http://44.198.188.164:8080";

    const pageUrl = `${externalApiUrl}/pages`;
    const webPageUrl = `${externalApiUrl}/web/pages`;
    const storeDataUrl = `${externalApiUrl}/store-detail`;

    if (slug) {
      const specificPageRes = await fetch(`${webPageUrl}/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!specificPageRes.ok) {
        throw new Error(`External API error: ${specificPageRes.status}`);
      }

      const specificPageData = await specificPageRes.json();
      return NextResponse.json(specificPageData, {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    }

    const [storeDataResponse, pageDataResponse] = await Promise.all([
      fetch(storeDataUrl, { headers: { "Content-Type": "application/json" } }),
      fetch(pageUrl, { headers: { "Content-Type": "application/json" } }),
    ]);
    // const storeDataResponse = await fetch(storeDataUrl, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const pageDataResponse = await fetch(pageUrl, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    if (!pageDataResponse.ok || !storeDataResponse.ok) {
      throw new Error(`External API error: ${pageDataResponse.status}`);
    }

    const [pageListData, storeData] = await Promise.all([
      pageDataResponse.json(),
      storeDataResponse.json(),
    ]);
    // const pageListData = await pageDataResponse.json();
    // const storeData = await storeDataResponse.json();

    const storeSocialLinks = {
      socialTwitter: storeData?.[0]?.socialTwitter,
      socialInstagram: storeData?.[0]?.socialInstagram,
      socialPinterest: storeData?.[0]?.socialPinterest,
      socialFacebook: storeData?.[0]?.socialFacebook,
      socialYoutube: storeData?.[0]?.socialYoutube,
      socialTumblr: storeData?.[0]?.socialTumblr,
      socialLinkedin: storeData?.[0]?.socialLinkedin,
      socialTelegram: storeData?.[0]?.socialTelegram,
      socialSkype: storeData?.[0]?.socialSkype,
      socialSnapchat: storeData?.[0]?.socialSnapchat,
      socialTiktok: storeData?.[0]?.socialTiktok,
    };
    return NextResponse.json({
      pageListData: pageListData || [],
      storeSocialData: storeSocialLinks || {},
    });
  } catch (error) {
    console.error("Header data fetch error:", error);
  }
}
