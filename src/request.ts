import fetch from "node-fetch";

import { Article } from "./types";

export const getArticleData = async (
  resultsPerPage: number,
  page: number,
  days?: number
): Promise<Article[] | void> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        days
          ? `https://dev.to/api/articles?top=${days}&per_page=${resultsPerPage}&page=${page}`
          : `https://dev.to/api/articles?per_page=${resultsPerPage}&page=${page}`,
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
