const data = require("../db/data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Articles Endpoint Testing", () => {
  describe("GET /api/articles/:id", () => {
    test("200: get 200 response", () => {
      return request(app).get("/api/articles/1").expect(200);
    });
    test("200: return an article object using the id placeholder", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].article_id).toBe(1);
          expect(body[0]).toHaveProperty("article_id");
          expect(body[0]).toHaveProperty("title");
          expect(body[0]).toHaveProperty("topic");
          expect(body[0]).toHaveProperty("author");
          expect(body[0]).toHaveProperty("body");
          expect(body[0]).toHaveProperty("created_at");
          expect(body[0]).toHaveProperty("votes");
          expect(body[0]).toHaveProperty("article_img_url");
        });
    });
    test("404: get 404 response", () => {
      return request(app)
        .get("/api/articles/111111")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
    test("400: get 400 response", () => {
      return request(app)
        .get("/api/articles/hello")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200: get 200 response", () => {
      const voteInc = { inc_votes: 1 };
      return request(app).patch("/api/articles/1").send(voteInc).expect(200);
    });
    test("200: returns the updated article with votes incremented by 1", () => {
      const voteInc = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/1")
        .send(voteInc)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).toBe(101);
        });
    });
    test("200: returns the updated article with votes decreasing by 100", () => {
      const voteInc = { inc_votes: -100 };
      return request(app)
        .patch("/api/articles/1")
        .send(voteInc)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).toBe(0);
        });
    });
    test("404: response 404 when id does not exist", () => {
      const voteInc = { inc_votes: -100 };
      return request(app)
        .patch("/api/articles/11111111")
        .send(voteInc)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
    test("400: get 400 response when id is a string", () => {
      const voteInc = { inc_votes: -100 };
      return request(app)
        .patch("/api/articles/hello")
        .expect(400)
        .send(voteInc)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("400: get 400 votes increase is empty", () => {
      const voteInc = {};
      return request(app)
        .patch("/api/articles/hello")
        .expect(400)
        .send(voteInc)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
