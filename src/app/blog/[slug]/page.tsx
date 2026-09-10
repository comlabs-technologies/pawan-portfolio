import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { Reveal } from "@/components/Reveal";
import { articles, articleWordCount, getArticle, sortedArticles } from "@/data/articles";
import { site } from "@/data/site";
import { formatDate, readingTime } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${site.url}/blog/${article.slug}`,
      publishedTime: article.date,
      authors: [site.name],
      images: [{ url: "/images/og.png", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/images/og.png"],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = sortedArticles.findIndex((entry) => entry.slug === article.slug);
  const next = sortedArticles[index + 1];

  return (
    <article className="mx-auto max-w-article">
      <Reveal as="header" className="pt-2">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-1.5 text-label text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          All writing
        </Link>

        <h1 className="title-shadow mt-3 text-title-sm font-bold tracking-[-0.04em] text-ink md:text-title">
          {article.title}
        </h1>

        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-ink-3">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(articleWordCount(article))}</span>
          <span aria-hidden="true">·</span>
          <span>{article.topic}</span>
        </p>

        <p className="mt-4 max-w-[68ch] text-body text-ink-2">{article.excerpt}</p>
      </Reveal>

      <Reveal delay={0.12} className="mt-10 border-t border-line pt-8">
        <ArticleBody blocks={article.body} />
      </Reveal>

      <footer className="mt-14 border-t border-line pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 text-label text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Back to all writing
          </Link>

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group max-w-xs text-right"
            >
              <span className="block text-meta text-ink-3">Next</span>
              <span className="mt-0.5 block text-label font-medium text-ink-2 transition-colors group-hover:text-ink">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </footer>
    </article>
  );
}
