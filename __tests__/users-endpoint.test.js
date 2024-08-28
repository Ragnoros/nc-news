const data = require("../db//data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Users Endpoint Testing", () => {
  describe("GET /api/users", () => {
    test("200: get 200 response", () => {
      return request(app).get("/api/users").expect(200);
    });
    test("200: returns all users from the database", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.forEach((user) => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("avatar_url");
          });
        });
    });
    test("404: get 404 response when endpoint spelt wrong", () => {
      return request(app).get("/api/us").expect(404);
    });
  });
});
