import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { getArticle } from "@/lib/articles";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { title } = await getArticle(slug);
  return {
    title,
  };
}

const ArticleDetails = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { content } = await getArticle(slug);
  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
      <div className="flex justify-between font-poppins">
        <Link href={"/"} className="flex flex-row gap-1 place-items-center">
          <ArrowLeftIcon width={20} />
          <p>back to home</p>
        </Link>
      </div>
      <Markdown className="article">{content || ""}</Markdown>
    </section>
  );
};

export default ArticleDetails;
