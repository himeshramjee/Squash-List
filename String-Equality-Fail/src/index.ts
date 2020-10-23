import { app } from "./app";

const start = async () => {
  if (
    !process.env.PORT ||
  ) {
    throw new Error("Missing environment variables.");
  } else {
    console.info(
      `\n[SquashListProject] Using environment variables: 
      \tPORT=${process.env.port}
      \n`
    );
  }

  app.listen(process.env.PORT, () => {
    console.log(`SquashListProject v0.0.0 listening on port ${process.env.PORT}...`);
  });
};

start();
