const data = require("../db//data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Testing Comments ID endpoint", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("204: get 204 response", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("204: returns an object with an empty array", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
    test("404: returns a 404 error when comment id does not exist", () => {
      return request(app)
        .delete("/api/comments/11111111")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
    test("400: returns a 400 error when id is a string", () => {
      return request(app)
        .delete("/api/comments/hello")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
