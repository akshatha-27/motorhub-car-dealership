const express = require("express");
const Vehicle = require("../models/Vehicle");
const { authenticate, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    if (
      !make?.trim() ||
      !model?.trim() ||
      !category?.trim() ||
      price == null ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 0
    ) {
      return res.status(400).json({ message: "Invalid vehicle details" });
    }

    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: "Could not create vehicle" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      const searchRegex = new RegExp(
        String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );

      filter.$or = [
        { make: searchRegex },
        { model: searchRegex },
        { category: searchRegex },
      ];
    }

    if (category) {
      filter.category = {
        $regex: `^${String(category).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      };
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ message: "Could not retrieve vehicles" });
  }
});

router.post("/:id/purchase", authenticate, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        quantity: { $gt: 0 },
      },
      { $inc: { quantity: -1 } },
      { returnDocument: "after", runValidators: true },
    );

    if (!vehicle) {
      const exists = await Vehicle.exists({ _id: req.params.id });

      if (!exists) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      return res.status(409).json({ message: "Vehicle is out of stock" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    return res.status(500).json({ message: "Purchase failed" });
  }
});

router.post("/:id/restock", authenticate, requireAdmin, async (req, res) => {
  try {
    const quantity = req.body.quantity;

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Restock quantity must be a positive integer",
      });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity } },
      { returnDocument: "after", runValidators: true },
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    return res.status(500).json({ message: "Restock failed" });
  }
});

router.put("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    if (
      (make !== undefined && (typeof make !== "string" || !make.trim())) ||
      (model !== undefined && (typeof model !== "string" || !model.trim())) ||
      (category !== undefined &&
        (typeof category !== "string" || !category.trim())) ||
      (price !== undefined &&
        (!Number.isFinite(Number(price)) || Number(price) < 0)) ||
      (quantity !== undefined &&
        (!Number.isInteger(Number(quantity)) || Number(quantity) < 0))
    ) {
      return res.status(400).json({ message: "Invalid vehicle details" });
    }

    const updates = {};
    if (make !== undefined) updates.make = make.trim();
    if (model !== undefined) updates.model = model.trim();
    if (category !== undefined) updates.category = category.trim();
    if (price !== undefined) updates.price = Number(price);
    if (quantity !== undefined) updates.quantity = Number(quantity);

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { returnDocument: "after", runValidators: true },
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }
    return res.status(500).json({ message: "Could not update vehicle" });
  }
});

router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }
    return res.status(500).json({ message: "Could not delete vehicle" });
  }
});

module.exports = router;
