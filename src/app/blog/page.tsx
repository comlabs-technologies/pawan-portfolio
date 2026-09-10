import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogRow } from "@/components/BlogRow";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { sortedArticles } from "@/data/articles";
import { site } from "@/data/site";

const description =
  "Essays on rendering, design systems, and the parts of front-end engineering that only show up under real load.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `Blog — ${site.name}`,
    description,
    url: `${site.url}/blog`,
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: `${site.name} — writing` }],
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader title="Writing" description={description} />

      <StaggerGroup className="mt-9 space-y-1" stagger={0.07}>
        {sortedArticles.map((article) => (
          <StaggerItem key={article.slug}>
            <BlogRow article={article} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}
