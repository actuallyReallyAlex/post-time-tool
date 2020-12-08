import fetch from "node-fetch";

import { Article } from "./types";

export const getArticleData = async (
  days: number,
  resultsPerPage: number,
  page: number
): Promise<Article[] | void> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://dev.to/api/articles?top=${days}&per_page=${resultsPerPage}&page=${page}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data: Article[]) => {
          resolve(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
