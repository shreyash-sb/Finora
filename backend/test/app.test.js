const request = require("supertest");
const mongoose = require("mongoose");
const { app, connectDB } = require("../index");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Zerodha Backend API Tests", () => {
  test("GET /health returns 200 OK and status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("zerodha-clone-backend");
  });

  test("GET /allHoldings returns array of holdings", async () => {
    const res = await request(app).get("/allHoldings");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /allPositions returns array of positions", async () => {
    const res = await request(app).get("/allPositions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("POST /newOrder creates a new trade order", async () => {
    const newOrderData = {
      name: "TCS",
      qty: 5,
      price: 3200,
      mode: "BUY",
    };
    const res = await request(app).post("/newOrder").send(newOrderData);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.order.name).toBe("TCS");
    expect(res.body.order.qty).toBe(5);
  });

  test("GET /allOrders returns list including placed order", async () => {
    const res = await request(app).get("/allOrders");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
