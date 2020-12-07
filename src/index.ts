import fetch from "node-fetch";
import format from "date-fns/format";
// import isToday from "date-fns/isToday";
// import intervalToDuration from "date-fns/intervalToDuration";
import startOfYear from "date-fns/startOfYear";
import differenceInDays from "date-fns/differenceInDays";
import getDay from "date-fns/getDay";
import getHours from "date-fns/getHours";

import { Article, Day, DayGroup, TimeList } from "./types";

const days: Day[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createDayGroups = (): DayGroup[] => {
  const dayGroups: DayGroup[] = [];

  days.forEach((day: Day) => {
    dayGroups.push({
      day,
      group: [],
      positiveReactionsAverage: 0,
      positiveReactionsSum: 0,
      times: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
      },
    });
  });

  return dayGroups;
};

const getArticleData = async (days: number): Promise<Article[] | void> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`https://dev.to/api/articles?top=${days}&per_page=1000`, {
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
    const publishDate = new Date(article.published_at);
    const publishDay = getDay(publishDate);
    const dayGroup = dayGroups[publishDay];
    dayGroup.group.push(article);
    dayGroup.positiveReactionsSum += article.positive_reactions_count;

    // * Number from 0 - 23, representing the hour
    const publishHour = getHours(publishDate);

    // * Tally up each publishHour in the day
    dayGroup.times[publishHour] += 1;
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

const getMostSuccessfulHourOfMostSuccessfulDay = (
  dayGroups: DayGroup[]
): string => {
  const mostSuccessfulDay = [...dayGroups].sort((a, b) => {
    if (a.positiveReactionsAverage > b.positiveReactionsAverage) {
      return -1;
    } else {
      return 1;
    }
  })[0];

  const mostSuccessfulHour = Number(
    Object.entries(mostSuccessfulDay.times).sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else {
        return 1;
      }
    })[0][0]
  );

  return `${mostSuccessfulHour}`;
};

const getMostSuccessfulHourThroughoutTheWeek = (
  dayGroups: DayGroup[]
): string => {
  const times: TimeList = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  };

  dayGroups.forEach((dayGroup) => {
    Object.entries(dayGroup.times).forEach((entry) => {
      const hour = Number(entry[0]);
      const tally = entry[1];
      times[hour] += tally;
    });
  });

  const bestTime = Object.entries(times).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else {
      return 1;
    }
  })[0][0];

  return bestTime;
};

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

    const dayGroups: DayGroup[] = createDayGroups();

    analyzeArticles(data, dayGroups);

    analyzeDayGroups(dayGroups);

    // * Most published day of week
    const mostPublishedDay = getMostPublishedDay(dayGroups);
    console.log(
      `Of the top 1,000 articles in that time, most are published on a ${mostPublishedDay}.`
    );

    // * Most successful day of the week
    const mostSuccessfulDay = getMostSuccessfulDay(dayGroups);
    console.log(
      `${
        mostPublishedDay !== mostSuccessfulDay ? "However, t" : "T"
      }he most successful day to publish an article is on ${mostSuccessfulDay}.`
    );

    // * "Most successful hour throughout the week" vs "Most successful hour of most successful day"

    const mostSuccessfulHourOfMostSuccessfulDay = getMostSuccessfulHourOfMostSuccessfulDay(
      dayGroups
    );
    console.log(
      `The most successful hour of the most successful day is ${mostSuccessfulHourOfMostSuccessfulDay}.`
    );

    const mostSuccessfulHourThroughoutTheWeek = getMostSuccessfulHourThroughoutTheWeek(
      dayGroups
    );
    console.log(
      `The most successful hour throughout the week is ${mostSuccessfulHourThroughoutTheWeek}.`
    );
  } catch (error) {
    console.error(error);
  }
};

main();
