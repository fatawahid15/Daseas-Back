const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let access_token;
let access_token_staff;

beforeAll(async () => {
  try {
    let user = require("../data/Users.json");
    let users = user.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      el.password = hash(el.password);
      return el;
    });

    const data = require("../data/products.json");
    const products = data.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const category = require("../data/categories.json");
    const categories = category.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await sequelize.queryInterface.bulkInsert("Users", users, {});
    await sequelize.queryInterface.bulkInsert("Categories", categories, {});
    await sequelize.queryInterface.bulkInsert("Products", products, {});

    const payload = {
      id: 1,
      email: "admin@gmail.com",
      role: "Admin",
    };

    const payload_staff = {
      id: 2,
      email: "staff@gmail.com",
      role: "Staff",
    };
    access_token = signToken(payload);
    access_token_staff = signToken(payload_staff);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Products", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

let body = {
  name: "New Product",
  description: "This is a new product",
  price: 1534100,
  stock: 20,
  imgUrl: "http://example.com/newimage.jpg",
  categoryId: 1,
};

describe("POST /products", () => {
  describe("Success Cases", () => {
    it("should create a new product successfully", async () => {
      const response = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${access_token}`)
        .send(body);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Success creating new Product!"
      );
      expect(response.body).toHaveProperty("product");
    });
  });

  describe("Failure Cases", () => {
    it("should fail when no access token is provided", async () => {
      const response = await request(app).post("/products").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });

    it("should fail when required fields are missing", async () => {
      const response = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${access_token}`)
        .send({
          name: "",
          description: "",
          price: "",
          stock: "",
          imgUrl: "",
          categoryId: "",
        });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    it("should fail when token is invalid", async () => {
      const response = await request(app)
        .post("/products")
        .set("Authorization", "Bearer invalid_token")
        .send({
          name: "Another Product",
          description: "Another description",
          price: 1500,
          stock: 20,
          imgUrl: "http://example.com/image.jpg",
          categoryId: 1,
        });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
  });
});

describe("PUT /products/:id", () => {
  describe("Sucess Cases", () => {
    it("Should success updating main entity", async () => {
      const response = await request(app)
        .put("/products/1")
        .set("Authorization", `Bearer ${access_token}`)
        .send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
  describe("Failur Cases", () => {
    it("should fail when no access token is provided", async () => {
      const response = await request(app).put("/products/1").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
    it("should fail when provided token is invalid", async () => {
      const response = await request(app)
        .put("/products/1")
        .set("Authorization", `Bearer invalid_token`)
        .send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
    it("should fail when entity id is not exist", async () => {
      const response = await request(app)
        .put("/products/28")
        .set("Authorization", `Bearer ${access_token}`)
        .send(body);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Data is not Found!");
    });
    it("should fail when the role is staff and the product is not owned by them", async () => {
      const response = await request(app)
        .put("/products/1")
        .set("Authorization", `Bearer ${access_token_staff}`)
        .send(body);

      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `You don't have the permission`
      );
    });
    it("should fail when the sended data is not valid", async () => {
      const response = await request(app)
        .put("/products/1")
        .set("Authorization", `Bearer ${access_token}`)
        .send({
          name: "",
          description: "",
          price: "",
          stock: "",
          imgUrl: "",
          categoryId: "",
        });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("DELETE /products/:id", () => {
  describe("Success Cases", () => {
    it("should success deleting data from main entity", async () => {
      const response = await request(app)
        .delete("/products/1")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "success delete");
    });
  });
  describe("Failure Cases", () => {
    it("should fail when no access token provided", async () => {
      const response = await request(app).delete("/products/1");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
    it("should fail when provided token is invalid", async () => {
      const response = await request(app)
        .delete("/products/1")
        .set("Authorization", `Bearer sakjfdtb`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username/password"
      );
    });
    it("should fail when entity is not found", async () => {
      const response = await request(app)
        .delete("/products/28")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Data is not Found!");
    });
    it("should fail when the role is staff and the product is not owned by them", async () => {
      const response = await request(app)
        .delete("/products/3")
        .set("Authorization", `Bearer ${access_token_staff}`);

      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `You don't have the permission`
      );
    });
  });
});

describe("GET /pub/products", () => {
  describe("Success Cases", () => {
    it("should return all products without filter and pagination", async () => {
      const response = await request(app).get("/pub/products");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("should return products with a specific filter", async () => {
      const response = await request(app).get("/pub/products?filter=1");

      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("should return products with pagination", async () => {
      const response = await request(app).get("/pub/products?page[size]=10&page[number]=1");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data.length).toBeLessThanOrEqual(10);
    });
  });
});

describe("GET /pub/products/:id", () => {
  describe("Success Cases", () => {
    it("should return a product by ID", async () => {
      const response = await request(app).get("/pub/products/5");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("name", expect.any(String));
    });
  });

  describe("Failure Cases", () => {
    it("should return 404 if product ID is not found", async () => {
      const response = await request(app).get("/pub/products/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Data is not Found!");
    });
  });
});
