import { getTotalArticles } from "./commands";

const main = async (): Promise<void> => {
  try {
    const num = await getTotalArticles(false);
    console.log(`Total Articles in Top - ${num}`);
  } catch (error) {
    console.error(error);
  }
};

main();
