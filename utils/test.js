import { MongoMemoryServer } from "mongodb-memory-server";
import _connection from "../server/connection";
import config from "./config";

/*
 * A place for utility testing functions.
 */

const mongod = new MongoMemoryServer();

/**
* Return a connection to the test MongoDB server
*/
async function connection() {
  const dbUrl = await mongod.getUri(config.dbName);
  await _connection(config.dbName, dbUrl);
}


/**
 * Removes all documents for each model
 * @param  {...Model} models The list of models to clear
 */
async function clearModels(...models) {
  await connection();
  models.forEach(async (Model) => {
    await Model.deleteMany({});
  });
}

export { connection, clearModels };
