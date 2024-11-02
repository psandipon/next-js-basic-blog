import fs from "fs";
import path from "path";

import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

import { Article } from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles");

const getArticles = (): Article[] => {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames.map((fileName) => {
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
  });

  return articles;
};

const getCategorizedArticles = (): Record<string, Article> => {
  const articles = getArticles();
  const categorizedArticles: Record<string, Article> = {};
  articles.forEach((article) => {
    categorizedArticles[article.id] = article;
  });

  return categorizedArticles;
};

const getArticlesByCategory = (category: string): Article[] => {
  const allArticles = getArticles();
  const filteredArticles = allArticles.filter(
    (article) => article.category === category
  );
  return filteredArticles;
};

export { getArticles, getCategorizedArticles, getArticlesByCategory };
