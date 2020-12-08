import chalk from "chalk";
import differenceInDays from "date-fns/differenceInDays";
import format from "date-fns/format";
import startOfYear from "date-fns/startOfYear";

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

export const analyze = async (thisYear = false): Promise<void> => {
  try {
    let daysSinceStartOfYear = 0;

    if (thisYear) {
      const startOfYearDate = startOfYear(Date.now());
      daysSinceStartOfYear = differenceInDays(
        Date.now(),
        startOfYear(Date.now())
      );
      console.log(
        `It's been ${chalk.cyanBright.bold(
          daysSinceStartOfYear
        )} days since ${format(startOfYearDate, "PPP")}.`
      );
    }

    const data = await getArticleData(
      thisYear ? daysSinceStartOfYear : 10000,
      1000,
      1
    );

    if (!data) {
      throw new Error("No data!");
    }

    const dayGroups: DayGroup[] = createDayGroups();

    analyzeArticles(data, dayGroups);

    analyzeDayGroups(dayGroups);

    // * Most published day of week
    const mostPublishedDay = getMostPublishedDay(dayGroups);
    console.log(
      `Of the top ${chalk.cyanBright.bold(
        "1,000"
      )} articles in that time, most are published on a ${chalk.cyanBright.bold(
        mostPublishedDay
      )}.`
    );

    // * Most successful day of the week
    const mostSuccessfulDay = getMostSuccessfulDay(dayGroups);
    console.log(
      `${
        mostPublishedDay !== mostSuccessfulDay ? "However, t" : "T"
      }he most successful day to publish an article is on ${chalk.cyanBright.bold(
        mostSuccessfulDay
      )}.`
    );

    // ? "Most successful hour throughout the week" vs "Most successful hour of most successful day"

    const mostSuccessfulHourOfMostSuccessfulDay = getMostSuccessfulHourOfMostSuccessfulDay(
      dayGroups
    );
    console.log(
      `The most successful hour of the most successful day is ${chalk.cyanBright.bold(
        mostSuccessfulHourOfMostSuccessfulDay
      )}.`
    );

    const mostSuccessfulHourThroughoutTheWeek = getMostSuccessfulHourThroughoutTheWeek(
      dayGroups
    );
    console.log(
      `The most successful hour throughout the week is ${chalk.cyanBright.bold(
        mostSuccessfulHourThroughoutTheWeek
      )}.`
    );
  } catch (error) {
    console.error(error);
  }
};

export const getTotalArticles = async (log = false): Promise<number> => {
  try {
    // * Real easy logic --
    // * If the guess is too high, set that to the highLimit, take a halfway point between both limits and try again
    // * If the guess is too low, set that to the lowLimit, take a halfway point between both limits and try again.
    let stop = false;
    let highLimit = 250000;
    let lowLimit = 0;
    let finalGuess = 0;

    let previousGuess = 0;
    let nextGuess = highLimit;

    while (!stop) {
      const articleData = await getArticleData(10000, 1, nextGuess);

      const currentGuess = nextGuess;

      if (!articleData) {
        throw new Error("No article data!");
      }

      if (Math.abs(previousGuess - currentGuess) === 1) {
        if (articleData.length === 0) {
          // * Real Number is 1 less than currentGuess (i.e. lowLimit)
          finalGuess = lowLimit;
        } else {
          // * Real Number is currentGuess
          finalGuess = currentGuess;
        }
        stop = true;
      }

      if (articleData.length === 0) {
        if (log) {
          console.log(`${chalk.red(currentGuess)} was too high.`);
        }

        highLimit = currentGuess;
      } else {
        if (log) {
          console.log(`${chalk.blue(currentGuess)} was too low.`);
        }

        lowLimit = currentGuess;
      }

      previousGuess = currentGuess;
      nextGuess = Math.ceil((highLimit - lowLimit) / 2 + lowLimit);
    }

    if (log) {
      console.log(`Final Guess - ${chalk.green.bold(finalGuess)}`);
    }
    return finalGuess;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
