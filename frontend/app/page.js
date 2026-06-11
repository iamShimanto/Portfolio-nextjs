import Banner from "./components/home/Banner";
import Portfolio from "./components/home/Portfolio";
import Footer from "./components/Footer";
import Technology from "./components/home/Technology";
import AOSWrapper from "./components/aos/AOSWrapper";
import Features from "./components/home/Features";
import { serverFetch } from "./lib/serverFetch";

const SITE_URL = "https://shimanto.dev";

async function getProfile() {
  const res = await serverFetch("/v1/profile/get");
  return res?.data?.profile ?? null;
}

export async function generateMetadata() {
  const profile = await getProfile();
  const name    = profile?.name  ?? "Shimanto Sarkar";
  const title   = profile?.title ?? "Full Stack Web Developer";
  const bio     = profile?.bio   ?? `Portfolio of ${name} — ${title} from Bangladesh.`;

  return {
    title: `${name} – ${title} | Portfolio`,
    description: bio,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: `${name} – ${title}`,
      description: bio,
      url: SITE_URL,
      siteName: name,
      images: [
        {
          url: `${SITE_URL}/images/main.webp`,
          width: 1200,
          height: 630,
          alt: `${name} Portfolio`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description: bio,
      images: [`${SITE_URL}/images/main.webp`],
    },
  };
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home() {
  const [profileRes, socialsRes, techsRes, projectsRes, servicesRes] =
    await Promise.all([
      serverFetch("/v1/profile/get"),
      serverFetch("/v1/social/get"),
      serverFetch("/v1/tech/get"),
      serverFetch("/v1/project/get"),
      serverFetch("/v1/service/get"),
    ]);

  const profile  = profileRes?.data?.profile   ?? null;
  const socials  = socialsRes?.data?.socials    ?? [];
  const techs    = techsRes?.data?.techs        ?? [];
  const projects = projectsRes?.data?.projects  ?? [];
  const services = servicesRes?.data?.services  ?? [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name ?? "Shimanto Sarkar",
    url: SITE_URL,
    jobTitle: profile?.title ?? "Full Stack Web Developer",
    description: profile?.bio,
    image: profile?.avatarUrl ?? `${SITE_URL}/images/shimanto.webp`,
    sameAs: socials.map((s) => s.url),
    knowsAbout: techs.map((t) => t.name),
    offers: services.map((s) => ({
      "@type": "Offer",
      name: s.title,
      description: s.description,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile?.name ?? "Shimanto Sarkar",
    url: SITE_URL,
  };

  return (
    <main>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />

      <AOSWrapper>
        <Banner profile={profile} socials={socials} />
        <Technology techs={techs} />
        <Portfolio projects={projects} />
        <Features services={services} />
        <Footer profile={profile} socials={socials} />
      </AOSWrapper>
    </main>
  );
}
