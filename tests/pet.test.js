const client = require("../helpers/client");

jest.setTimeout(30000);

const runId = Date.now();
const PET_ID = Number(`70${String(runId).slice(-7)}`);
const EDGE_PET_ID = PET_ID + 1;

const pet = {
  id: PET_ID,
  name: "Doggo",
  status: "available",
  photoUrls: ["https://example.com/dog.jpg"],
  category: {
    id: 1,
    name: "dogs",
  },
  tags: [
    {
      id: 1,
      name: "qa-test",
    },
  ],
};

describe("Pet endpoints", () => {
  afterAll(async () => {
    await client.delete(`/pet/${PET_ID}`, {
      headers: { api_key: "special-key" },
    });

    await client.delete(`/pet/${EDGE_PET_ID}`, {
      headers: { api_key: "special-key" },
    });
  });

  it("POST /pet — creates a pet", async () => {
    const res = await client.post("/pet", pet);

    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({
      id: PET_ID,
      name: "Doggo",
      status: "available",
    });
    expect(Array.isArray(res.data.photoUrls)).toBe(true);
  });

  it("GET /pet/:petId — returns the created pet using path parameter", async () => {
    const res = await client.get(`/pet/${PET_ID}`);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(PET_ID);
    expect(res.data.name).toBe("Doggo");
    expect(res.data.status).toBe("available");
  });

  it("GET /pet/findByStatus — returns pets using query parameter", async () => {
    const res = await client.get("/pet/findByStatus", {
      params: {
        status: "available",
      },
    });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);

    const createdPet = res.data.find((item) => item.id === PET_ID);
    expect(createdPet).toBeDefined();
    expect(createdPet.status).toBe("available");
  });

  it("PUT /pet — updates pet name and status", async () => {
    const updatedPet = {
      ...pet,
      name: "Doggo Updated",
      status: "sold",
    };

    const res = await client.put("/pet", updatedPet);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(PET_ID);
    expect(res.data.name).toBe("Doggo Updated");
    expect(res.data.status).toBe("sold");
  });

  it("GET /pet/:petId — returns updated pet data", async () => {
    const res = await client.get(`/pet/${PET_ID}`);

    expect(res.status).toBe(200);
    expect(res.data.name).toBe("Doggo Updated");
    expect(res.data.status).toBe("sold");
  });

  it("POST /pet — edge case: creates pet with unicode and special characters in name", async () => {
    const edgePet = {
      id: EDGE_PET_ID,
      name: "Äge Doggo 🐶 #QA-123",
      status: "pending",
      photoUrls: ["https://example.com/edge-dog.jpg"],
    };

    const res = await client.post("/pet", edgePet);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(EDGE_PET_ID);
    expect(res.data.name).toBe("Äge Doggo 🐶 #QA-123");
    expect(res.data.status).toBe("pending");
  });

  it("GET /pet/:petId — negative test: returns 404 for non-existing pet", async () => {
    const nonExistingPetId = 999999999999;
    const res = await client.get(`/pet/${nonExistingPetId}`);

    expect(res.status).toBe(404);
    expect(res.data).toHaveProperty("message");
  });

  it("DELETE /pet/:petId — deletes the pet", async () => {
    const res = await client.delete(`/pet/${PET_ID}`, {
      headers: { api_key: "special-key" },
    });

    expect(res.status).toBe(200);
  });

  it("GET /pet/:petId — returns 404 after pet deletion", async () => {
    const res = await client.get(`/pet/${PET_ID}`);

    expect(res.status).toBe(404);
  });
});