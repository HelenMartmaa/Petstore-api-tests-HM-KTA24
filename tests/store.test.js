const client = require("../helpers/client");

jest.setTimeout(30000);

// Swagger Petstore documentation recommends valid order IDs from 1 to 10.
const ORDER_ID = 9;

const order = {
  id: ORDER_ID,
  petId: 12345,
  quantity: 1,
  shipDate: new Date().toISOString(),
  status: "placed",
  complete: false,
};

describe("Store endpoints", () => {
  afterAll(async () => {
    await client.delete(`/store/order/${ORDER_ID}`);
  });

  it("POST /store/order — places an order", async () => {
    const res = await client.post("/store/order", order);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(ORDER_ID);
    expect(res.data.petId).toBe(order.petId);
    expect(res.data.quantity).toBe(order.quantity);
    expect(res.data.status).toBe("placed");
    expect(res.data.complete).toBe(false);
  });

  it("GET /store/order/:orderId — returns order using path parameter", async () => {
    const res = await client.get(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(ORDER_ID);
    expect(res.data.status).toBe("placed");
  });

  it("GET /store/order/:orderId — edge case: invalid boundary value outside 1-10", async () => {
    const res = await client.get("/store/order/11");

    expect([400, 404]).toContain(res.status);
    expect(res.data).toHaveProperty("message");
  });

  it("GET /store/order/:orderId — negative test: invalid order id", async () => {
    const res = await client.get("/store/order/0");

    expect([400, 404]).toContain(res.status);
    expect(res.data).toHaveProperty("message");
  });

  it("DELETE /store/order/:orderId — deletes order", async () => {
    const res = await client.delete(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(200);
  });

  it("GET /store/order/:orderId — returns 404 after order deletion", async () => {
    const res = await client.get(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(404);
  });
});