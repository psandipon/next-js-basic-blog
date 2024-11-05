import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { Article } from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles");

const getArticles = async (): Promise<Article[]> => {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: matterResult.data.date,
      };
    })
  );

  return articles;
};

const getCategorizedArticles = async (): Promise<Record<string, Article[]>> => {
  const articles = await getArticles();
  const categorizedArticles: Record<string, Article[]> = {};

  articles.forEach((article) => {
    if (!categorizedArticles[article.category]) {
      categorizedArticles[article.category] = [];
    }
    categorizedArticles[article.category].push(article);
  });

  return categorizedArticles;
};

const getArticle = async (id: string): Promise<Article> => {
  const fileName = `${id}.md`;

  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  return {
    id: id,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: matterResult.data.date,
    content: processedContent.toString(),
  };
};

export { getArticles, getCategorizedArticles, getArticle };
