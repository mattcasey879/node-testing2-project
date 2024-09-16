const request = require("supertest");
const server = require("./server");
const db = require("../dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("[GET] /forceUsers", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).get("/forceUsers");
  });
  test("responds with a 200 status code", async () => {
    expect(res.status).toBe(200);
  });
  test("responds with all forceUsers", () => {
    expect(res.body).toHaveLength(3);
    expect(res.body).toMatchObject([
      { id: 1, name: "Luke Skywalker" },
      { id: 2, name: "Obi-Wan-Kenobi" },
      { id: 3, name: "Yoda" },
    ]);
  });
});

describe("[POST] /forcUsers", () => {
  test("responds with new ForceUser", async () => {
    const res = await request(server)
      .post("/forceUsers")
      .send({ name: "Qui-gon" });
      expect(res.body).toMatchObject({id:4, name: "Qui-gon"})
  }, 600);
});

describe("[DELETE] /forceUsers/:id", () => {{
    test('deletes user', async () => {
        const res = await request(server).del("/forceUsers/:id")
        expect(res.status).toBe(200)
    })
}})