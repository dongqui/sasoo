import { load } from "cheerio";

export async function POST(request: Request) {
  const { url } = await request.json();
  const res = await fetch(url);
  const htmlString = await res.text();
  const $ = load(htmlString);

  const title =
    $('meta[name="twitter:title"]').attr("content") ||
    $('meta[property="og:title"]').attr("content") ||
    $("title").text();

  const description =
    $('meta[name="twitter:description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content");

  const image =
    $('meta[name="twitter:image"]').attr("content") ||
    $('meta[property="og:image"]').attr("content");

  return Response.json({
    title,
    description,
    image,
    url,
  });
}
