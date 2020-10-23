import { app } from "./app";

const start = async () => {

  app.listen(6999, () => {
    console.log(`SquashListProject v0.0.0 listening on port 6999...`);
  });
};

start();
