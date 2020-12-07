import fetch from "node-fetch";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

import { Article } from "./types";

const main = async (): Promise<void> => {
  try {
    fetch("https://dev.to/api/articles/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: Article[]) => {
        const todaysArticles = data.filter((datum) =>
          isToday(new Date(datum.published_at))
        );
        todaysArticles.forEach((datum, i) => {
          const publishedDate = new Date(datum.published_at);
          const today = isToday(publishedDate);

          console.log(
            `#${i}. -\tTitle - ${datum.title}\n\tPublish Time - ${format(
              publishedDate,
              "pppp"
            )}\n\tIs Today? - ${today}\n`
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

main();
