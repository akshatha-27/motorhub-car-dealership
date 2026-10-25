const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../src/app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  test("should register a new user successfully", async () => {
    const user = {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "TestPass123!",
    };

    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user).not.toHaveProperty("password");
  });

  test("should log in an existing user successfully", async () => {
    const user = {
      name: "Login Test User",
      email: `login${Date.now()}@example.com`,
      password: "TestPass123!",
    };

    await request(app).post("/api/auth/register").send(user);

    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(user.email);
  });
});
