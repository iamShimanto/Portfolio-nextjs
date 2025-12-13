export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://shimanto.dev/sitemap.xml",
  };
}
