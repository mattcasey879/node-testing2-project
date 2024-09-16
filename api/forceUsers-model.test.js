const Force = require("./forceUsers-model");
const db = require("../dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("forceUsers-model", () => {
  describe("getAll", () => {
    test("returns all forceUsers in the table", async () => {
      const users = await Force.getAll();
      expect(users).toHaveLength(3);
    });
    test("returns forceUsers in the correct shape", async () => {
      const expected = [
        {
          id: 1,
          name: "Luke Skywalker",
        },
        {
          id: 2,
          name: "Obi-Wan-Kenobi",
        },
        {
          id: 3,
          name: "Yoda",
        },
      ];
      const users = await Force.getAll();
      expect(users).toMatchObject(expected);
    });
  });
  describe("inserts new user into database", () => {
    test("adds user to database", async () => {
      await Force.insert({ name: "Anakin Skywalker" });
      const forceUsers = await db("forceUsers");
      expect(forceUsers).toHaveLength(4);
    });
    test("returns newly create forceUser", async () => {
        const inserted = await Force.insert({ name: 'Qui-gon'})
        expect(inserted).toMatchObject({ id: 4, name: "Qui-gon"})
    })
  });

  describe("Deletes user", () => {
      test("removes the user from the database", async () => {
          await Force.remove(3) 
          const forceUsers = await db("forceUsers")
          expect(forceUsers).toHaveLength(2)
      })
      test("returns deleted deletion", async () => {
         const deletedUser = await db("forceUsers").where("id", 3).first()
         await Force.remove(3)
         expect(deletedUser).toMatchObject({id: 3, name: 'Yoda'})
      })
  })
});
