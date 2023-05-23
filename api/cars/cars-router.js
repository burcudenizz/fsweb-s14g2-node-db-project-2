// HOKUS POKUS
const router = require("express").Router();
const carsModel = require("./cars-model");
const carMw = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allCars = await carsModel.getAll();
    res.json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", carMw.checkCarId, (req, res, next) => {
  try {
    res.json(req.currentCar);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  carMw.checkCarPayload,
  carMw.checkVinNumberValid,
  carMw.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      let car = {
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        title: req.body.title,
      };
      const insertedCar = await carsModel.create(car);
      res.status(201).json(insertedCar);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
