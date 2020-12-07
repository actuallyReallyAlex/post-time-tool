import fetch from "node-fetch";
import format from "date-fns/format";
// import isToday from "date-fns/isToday";
// import intervalToDuration from "date-fns/intervalToDuration";
import startOfYear from "date-fns/startOfYear";
import differenceInDays from "date-fns/differenceInDays";
import getDay from "date-fns/getDay";

import { Article, DayGroup } from "./types";

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

    fetch(
      `https://dev.to/api/articles?top=${daysSinceStartOfYear}&per_page=100`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data: Article[]) => {
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

        // * Sort into days of the week
        // * Add sum of `postitve_reactions_count`
        data.forEach((datum) => {
          // * Number 0 - 6, 0 being Sunday
          const publishDay = getDay(new Date(datum.published_at));
          const dayGroup = dayGroups[publishDay];
          dayGroup.group.push(datum);
          dayGroup.positiveReactionsSum += datum.positive_reactions_count;
        });

        // * Find positiveReactionsAverage for each day
        dayGroups.forEach((dayGroup) => {
          dayGroup.positiveReactionsAverage =
            dayGroup.positiveReactionsSum / dayGroup.group.length;
        });

        // * Most published day of week
        const mostPublishedDay = [...dayGroups].sort((a, b) => {
          if (a.group.length > b.group.length) {
            return -1;
          } else {
            return 1;
          }
        })[0].day;
        console.log(
          `Of the top 100 posts in that time, most are published on a ${mostPublishedDay}.`
        );

        // * Most successful day of the week
        const mostSuccessfulDay = [...dayGroups].sort((a, b) => {
          if (a.positiveReactionsAverage > b.positiveReactionsAverage) {
            return -1;
          } else {
            return 1;
          }
        })[0].day;
        console.log(
          `The most successful day to publish a post is on ${mostSuccessfulDay}.`
        );
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

main();
