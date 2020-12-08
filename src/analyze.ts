import format from "date-fns/format";
import getDay from "date-fns/getDay";
import getHours from "date-fns/getHours";

import { Article, DayGroup, TimeList } from "./types";

export const analyzeArticles = (
  articles: Article[],
  dayGroups: DayGroup[]
): void => {
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

export const analyzeDayGroups = (dayGroups: DayGroup[]): void => {
  // * Find positiveReactionsAverage for each day
  dayGroups.forEach((dayGroup) => {
    dayGroup.positiveReactionsAverage =
      dayGroup.positiveReactionsSum / dayGroup.group.length;
  });
};

export const getMostPublishedDay = (dayGroups: DayGroup[]): string =>
  [...dayGroups].sort((a, b) => {
    if (a.group.length > b.group.length) {
      return -1;
    } else {
      return 1;
    }
  })[0].day;

export const getMostSuccessfulDay = (dayGroups: DayGroup[]): string =>
  [...dayGroups].sort((a, b) => {
    if (a.positiveReactionsAverage > b.positiveReactionsAverage) {
      return -1;
    } else {
      return 1;
    }
  })[0].day;

export const getMostSuccessfulHourOfMostSuccessfulDay = (
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

  return format(new Date(`January 1, 2020, ${mostSuccessfulHour}:00:0`), "ppp");
};

export const getMostSuccessfulHourThroughoutTheWeek = (
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

  return format(new Date(`January 1, 2020, ${bestTime}:00:0`), "ppp");
};
