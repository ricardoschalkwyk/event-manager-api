const supertest = require("supertest");

const app = require("../src/app");

describe("GET /", () => {
  it("responds with a json message", (done) => {
    supertest(app)
      .get("/api")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏",
        },
        done
      );
  });
});
