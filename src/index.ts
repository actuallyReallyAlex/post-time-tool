import format from "date-fns/format";
import startOfYear from "date-fns/startOfYear";
import differenceInDays from "date-fns/differenceInDays";

import {
  analyzeArticles,
  analyzeDayGroups,
  getMostPublishedDay,
  getMostSuccessfulDay,
  getMostSuccessfulHourOfMostSuccessfulDay,
  getMostSuccessfulHourThroughoutTheWeek,
} from "./analyze";
import { getArticleData } from "./request";
import { createDayGroups } from "./util";

import { DayGroup } from "./types";

const main = async (): Promise<void> => {
  try {
    const startOfYearDate = startOfYear(Date.now());
    const daysSinceStartOfYear = differenceInDays(
      Date.now(),
      startOfYear(Date.now())
    );
    console.log(
      `It's been ${daysSinceStartOfYear} days since ${format(
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

    // ? "Most successful hour throughout the week" vs "Most successful hour of most successful day"

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
