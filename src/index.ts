import fetch from "node-fetch";
import format from "date-fns/format";
// import isToday from "date-fns/isToday";
// import intervalToDuration from "date-fns/intervalToDuration";
import startOfYear from "date-fns/startOfYear";
import differenceInDays from "date-fns/differenceInDays";
import getDay from "date-fns/getDay";

import { Article, DayGroup } from "./types";

const getArticleData = async (days: number): Promise<Article[] | void> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`https://dev.to/api/articles?top=${days}&per_page=100`, {
        method: "GET",
      })
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

const analyzeArticles = (articles: Article[], dayGroups: DayGroup[]) => {
  // * Sort into days of the week
  // * Add sum of `postitve_reactions_count`
  articles.forEach((article) => {
    // * Number 0 - 6, 0 being Sunday
    const publishDay = getDay(new Date(article.published_at));
    const dayGroup = dayGroups[publishDay];
    dayGroup.group.push(article);
    dayGroup.positiveReactionsSum += article.positive_reactions_count;
  });
};

const analyzeDayGroups = (dayGroups: DayGroup[]) => {
  // * Find positiveReactionsAverage for each day
  dayGroups.forEach((dayGroup) => {
    dayGroup.positiveReactionsAverage =
      dayGroup.positiveReactionsSum / dayGroup.group.length;
  });
};

const getMostPublishedDay = (dayGroups: DayGroup[]) =>
  [...dayGroups].sort((a, b) => {
    if (a.group.length > b.group.length) {
      return -1;
    } else {
      return 1;
    }
  })[0].day;

const getMostSuccessfulDay = (dayGroups: DayGroup[]) =>
  [...dayGroups].sort((a, b) => {
    if (a.positiveReactionsAverage > b.positiveReactionsAverage) {
      return -1;
    } else {
      return 1;
    }
  })[0].day;

const main = async (): Promise<void> => {
  try {
    const startOfYearDate = startOfYear(Date.now());
    const daysSinceStartOfYear = differenceInDays(
      Date.now(),
      startOfYear(Date.now())
    );
    console.log(
      `It's been ${daysSinceStartOfYear} since ${format(
        startOfYearDate,
        "PPP"
      )}.`
    );

    const data = await getArticleData(daysSinceStartOfYear);

    if (!data) {
      throw new Error("No data!");
    }

    const dayGroups: DayGroup[] = [
      {
        day: "Sunday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Monday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Tuesday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Wednesday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Thursday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Friday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
      {
        day: "Saturday",
        group: [],
        positiveReactionsAverage: 0,
        positiveReactionsSum: 0,
      },
    ];

    analyzeArticles(data, dayGroups);

    analyzeDayGroups(dayGroups);

    // * Most published day of week
    const mostPublishedDay = getMostPublishedDay(dayGroups);
    console.log(
      `Of the top 100 posts in that time, most are published on a ${mostPublishedDay}.`
    );

    // * Most successful day of the week
    const mostSuccessfulDay = getMostSuccessfulDay(dayGroups);
    console.log(
      `${
        mostPublishedDay !== mostSuccessfulDay ? "However, t" : "T"
      }he most successful day to publish a post is on ${mostSuccessfulDay}.`
    );
  } catch (error) {
    console.error(error);
  }
};

main();
