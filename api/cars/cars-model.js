const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = async (cars) => {
  let [id] = await db("cars").insert(cars);
  //let id = await db("cars").insert(cars);
  //return getById(id[0]);
  return getById(id);
};

module.exports = { getAll, getById, create, getByVin };
