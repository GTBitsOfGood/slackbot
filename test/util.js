import connection from "../server/connection";

/*
 * A place for utility functions used for testing.
 */


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

export default clearModels;
