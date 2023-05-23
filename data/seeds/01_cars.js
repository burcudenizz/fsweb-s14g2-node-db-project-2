/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const defaultCars = [
  { vin: "123", make: "Volkswagen", model: "Golf", mileage: 123 },
  { vin: "1234", make: "Audi", model: "A3", mileage: 123 },
  { vin: "1235", make: "Seat", model: "Leon", mileage: 123 },
  { vin: "1236", make: "Skoda", model: "Octavia", mileage: 123 },
  { vin: "1237", make: "Mercedes", model: "C200", mileage: 123 },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate();
  await knex("cars").insert(defaultCars);
};
