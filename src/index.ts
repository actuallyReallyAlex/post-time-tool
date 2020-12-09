import chalk from "chalk";
import ProgressBar from "progress";

import { analyze, getTotalArticles } from "./commands";
import { getArticleData } from "./request";

import { Article } from "./types";

const main = async (): Promise<void> => {
  try {
    const totalArticles = await getTotalArticles(10000);

    // * 1000 is max number of articles per request
    const numberOfRequests = Math.ceil(totalArticles / 1000);

    let currentPage = 1;
    const allArticles: Article[] = [];

    console.log(
      `Fetching data on ${chalk.cyanBright.bold(totalArticles)} articles.`
    );
    console.log("");

    const bar = new ProgressBar("[:bar] :percent (:current / :total) :etas", {
      total: numberOfRequests,
      width: 50,
    });

    while (currentPage <= numberOfRequests) {
      const articleData = await getArticleData(1000, currentPage, 10000);

      if (!articleData || articleData.length === 0) {
        // eslint-disable-next-line
        debugger;

        throw new Error("No article data!");
      }

      allArticles.push(...articleData);
      currentPage += 1;
      bar.tick();
    }

    await analyze(allArticles);
  } catch (error) {
    console.error(error);
  }
};

main();
