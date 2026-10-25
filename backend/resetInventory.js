require("dotenv").config();
const mongoose = require("mongoose");
const Vehicle = require("./src/models/Vehicle");

const vehicles = [
  ["Renault", "Kwid", "Hatchback", 453000, 8],
  ["Tata", "Tiago", "Hatchback", 477000, 8],
  ["Nissan", "Magnite", "SUV", 569000, 6],
  ["Tata", "Punch", "SUV", 575000, 7],
  ["Hyundai", "Exter", "SUV", 581000, 5],
  ["Renault", "Triber", "MUV", 581000, 4],
  ["Maruti Suzuki", "Swift", "Hatchback", 584000, 12],
  ["Maruti Suzuki", "Baleno", "Hatchback", 599000, 9],
  ["Hyundai", "i20", "Hatchback", 600000, 7],
  ["MG", "Comet EV", "Hatchback", 641000, 5],
  ["Maruti Suzuki", "Fronx", "SUV", 690000, 6],
  ["Tata", "Nexon", "SUV", 740000, 10],
  ["Kia", "Sonet", "SUV", 741000, 6],
  ["Mahindra", "XUV 3XO", "SUV", 779000, 5],
  ["Skoda", "Slavia", "Sedan", 999000, 4],
  ["Mahindra", "Thar", "SUV", 1032000, 3],
  ["Skoda", "Kushaq", "SUV", 1069000, 4],
  ["Hyundai", "Creta", "SUV", 1091000, 10],
  ["Hyundai", "Verna", "Sedan", 1099000, 5],
  ["Kia", "Seltos", "SUV", 1100000, 6],
  ["Kia", "Carens", "MUV", 1112000, 4],
  ["Toyota", "Urban Cruiser Hyryder", "SUV", 1131000, 5],
  ["MG", "Hector", "SUV", 1199000, 4],
  ["Honda", "City", "Sedan", 1204000, 6],
  ["Tata", "Harrier", "SUV", 1300000, 4],
  ["Mahindra", "XUV 7XO", "SUV", 1399000, 3],
  ["Jeep", "Compass", "SUV", 1799000, 2],
  ["Toyota", "Innova Crysta", "MUV", 1972000, 5],
  ["BYD", "Atto 3", "SUV", 2499000, 2],
  ["Toyota", "Fortuner", "SUV", 3476000, 3],
];

async function resetInventory() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from your .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Deletes all existing vehicle records in this database.
    await Vehicle.deleteMany({});

    await Vehicle.insertMany(
      vehicles.map(([make, model, category, price, quantity]) => ({
        make,
        model,
        category,
        price,
        quantity,
      })),
    );

    console.log("Successfully added 30 vehicles!");
  } catch (error) {
    console.error("Inventory reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

resetInventory();
