import { getCategorizedArticles } from "@/lib/articles";
import Link from "next/link";

const HomePage = async () => {
  const articles = await getCategorizedArticles();

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
        <h1>minimal blog</h1>
      </header>
      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {Object.entries(articles).map(([category, articles]) => {
          return (
            <section key={category} className="flex flex-col gap-4">
              <header className="font-poppins font-light text-4xl text-neutral-900">
                <h2>{category}</h2>
              </header>
              <ul className="flex flex-col gap-2">
                {articles.map((article) => (
                  <li
                    key={article.id}
                    className="flex flex-col gap-1 border-2 p-5"
                  >
                    <Link href={`/${article.id}`}>
                      <h3 className="font-poppins font-light text-2xl text-neutral-900">
                        {article.title}
                      </h3>
                      <p className="font-poppins font-light text-neutral-700">
                        {article.date}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default HomePage;
