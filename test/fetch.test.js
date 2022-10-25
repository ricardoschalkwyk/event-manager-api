const supertest = require("supertest");

const app = require("../src/app");

describe("/api", () => {
  it("responds with a json message", async () => {
    const res = await supertest(app)
      .get("/api")
      .expect("Content-Type", /json/)
      .expect(200, {
        message: "API - 👋🌎🌍🌏",
      });

    expect(res.body).toMatchSnapshot();
  });
});
