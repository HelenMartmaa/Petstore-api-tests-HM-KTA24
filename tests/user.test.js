const client = require("../helpers/client");

jest.setTimeout(30000);

const runId = Date.now();
const username = `qa_user_${runId}`;

const user = {
  id: runId,
  username,
  firstName: "QA",
  lastName: "Tester",
  email: `${username}@example.com`,
  password: "Password123!",
  phone: "555-12345",
  userStatus: 1,
};

describe("User endpoints", () => {
  afterAll(async () => {
    await client.delete(`/user/${username}`);
  });

  it("POST /user — creates a user", async () => {
    const res = await client.post("/user", user);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("code", 200);
  });

  it("GET /user/:username — returns created user using path parameter", async () => {
    const res = await client.get(`/user/${username}`);

    expect(res.status).toBe(200);
    expect(res.data.username).toBe(username);
    expect(res.data.email).toBe(user.email);
  });

  it("GET /user/login — logs in user using query parameters", async () => {
    const res = await client.get("/user/login", {
      params: {
        username,
        password: user.password,
      },
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("message");
  });

  it("PUT /user/:username — updates existing user", async () => {
    const updatedUser = {
      ...user,
      firstName: "Updated",
      lastName: "User",
      phone: "555-99999",
    };

    const res = await client.put(`/user/${username}`, updatedUser);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("code", 200);
  });

  it("GET /user/:username — returns updated user data", async () => {
    const res = await client.get(`/user/${username}`);

    expect(res.status).toBe(200);
    expect(res.data.firstName).toBe("Updated");
    expect(res.data.lastName).toBe("User");
    expect(res.data.phone).toBe("555-99999");
  });

  it("GET /user/:username — negative test: returns 404 for non-existing user", async () => {
    const res = await client.get(`/user/not_existing_user_${runId}`);

    expect(res.status).toBe(404);
    expect(res.data).toHaveProperty("message");
  });

  it("DELETE /user/:username — deletes user", async () => {
    const res = await client.delete(`/user/${username}`);

    expect(res.status).toBe(200);
  });

  it("GET /user/:username — returns 404 after user deletion", async () => {
    const res = await client.get(`/user/${username}`);

    expect(res.status).toBe(404);
  });
});