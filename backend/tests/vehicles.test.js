const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../src/app");
const Vehicle = require("../src/models/Vehicle");
const User = require("../src/models/User");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = `admin${Date.now()}@example.com`;

  await request(app).post("/api/auth/register").send({
    name: "Admin Test",
    email,
    password: "TestPass123!",
  });

  const User = require("../src/models/User");

  const user = await User.findOneAndUpdate(
    { email },
    { role: "admin" },
    { returnDocument: "after" },
  );

  const jwt = require("jsonwebtoken");
  token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/vehicles", () => {
  test("should create a vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Corolla",
        category: "Sedan",
        price: 25000,
        quantity: 5,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.make).toBe("Toyota");
    expect(response.body.quantity).toBe(5);
  });

  describe("GET /api/vehicles", () => {
    test("should list vehicles for an authenticated user", async () => {
      const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("GET /api/vehicles search", () => {
  test("should return only vehicles matching the make", async () => {
    await Vehicle.create({
      make: "Toyota",
      model: "Corolla",
      category: "Sedan",
      price: 25000,
      quantity: 5,
    });

    await Vehicle.create({
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 23000,
      quantity: 3,
    });

    const response = await request(app)
      .get("/api/vehicles?search=Toyota")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(
      response.body.every((vehicle) =>
        vehicle.make.toLowerCase().includes("toyota"),
      ),
    ).toBe(true);
  });
});

describe("POST /api/vehicles/:id/purchase", () => {
  test("should decrease vehicle quantity by one", async () => {
    const vehicle = await Vehicle.create({
      make: "Honda",
      model: "City",
      category: "Sedan",
      price: 20000,
      quantity: 3,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.quantity).toBe(2);
  });

  test("should reject a purchase when quantity is zero", async () => {
    const vehicle = await Vehicle.create({
      make: "Tata",
      model: "Nexon",
      category: "SUV",
      price: 18000,
      quantity: 0,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Vehicle is out of stock");
  });
});

describe("POST /api/vehicles/:id/restock", () => {
  test("should increase quantity for an admin", async () => {
    const vehicle = await Vehicle.create({
      make: "Hyundai",
      model: "Creta",
      category: "SUV",
      price: 22000,
      quantity: 2,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response.statusCode).toBe(200);
    expect(response.body.quantity).toBe(5);
  });
});
