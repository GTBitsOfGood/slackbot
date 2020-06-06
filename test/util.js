import connection from "../server/connection";

async function clearModels(...models) {
  await connection();
  models.forEach(async (Model) => {
    await Model.deleteMany({});
  });
}

export default clearModels;
