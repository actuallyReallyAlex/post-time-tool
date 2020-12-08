import { analyze } from "./commands";

const main = async (): Promise<void> => {
  try {
    await analyze(true);
  } catch (error) {
    console.error(error);
  }
};

main();
