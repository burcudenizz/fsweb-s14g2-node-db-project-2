const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const isExistCar = await carsModel.getById(req.params.id);
    if (!isExistCar) {
      res.status(404).json({ message: "car is not found" });
    } else {
      req.currentCar = isExistCar; // car'ın bulunması halinde veri tabanından tekrardan veri çekmek yerine veriyi kaydetmek için currentCar adlı key'e value olarak atıyoruz.
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const willCheckFields = ["vin", "make", "model", "mileage", "transmission"];
    let missedFields = [];

    for (let i = 0; i < willCheckFields.length; i++) {
      const item = willCheckFields[i];
      if (!req.body[item]) {
        missedFields.push(item);
      }
    }
    if (missedFields.length > 0) {
      res.status(400).json({
        message: `${missedFields.toString()} ${
          missedFields.length == 1 ? "is" : "are"
        } missing`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let isExistCar = await carsModel.getByVin(req.body.vin);
    if (!isExistCar) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
