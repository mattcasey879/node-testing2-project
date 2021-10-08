const request = require("supertest");
const server = require("./server");
const db = require("../dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.run.seed();
});

afterAll(async () => {
  await db.destroy();
});

describe("[GET] /forceUsers", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).get("/forceUsers");
  })
    test("responds with a 200 status code", async() => {
        expect(res.status).toBe(200)
    })
});
