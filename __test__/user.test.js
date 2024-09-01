const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

beforeAll(async () => {
  const users = [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: hash("adminpass"),
      role: "Admin",
      phoneNumber: "123-2134-213",
      address: "Pagedangan",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await sequelize.queryInterface.bulkInsert("Users", users);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("Success cases", () => {
    it("should login successfully and return an access_token", async () => {
      const response = await request(app).post("/login").send({
        email: "admin@gmail.com",
        password: "adminpass",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failure cases", () => {
    it("should fail when email is not provided", async () => {
      const response = await request(app).post("/login").send({
        password: "adminpass",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });

    it("should fail when password is not provided", async () => {
      const response = await request(app).post("/login").send({
        email: "admin@gmail.com",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });

    it("should fail when an invalid email is provided", async () => {
      const response = await request(app).post("/login").send({
        email: "invalid@gmail.com",
        password: "adminpass",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });

    it("should fail when the password is incorrect", async () => {
      const response = await request(app).post("/login").send({
        email: "admin@gmail.com",
        password: "wrongpass",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
  });
});
