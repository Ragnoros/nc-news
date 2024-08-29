const data = require("../db//data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Articles Endpoint Testing", () => {
  describe("/api/articles", () => {
    test("200: get 200 response", () => {
      return request(app).get("/api/articles").expect(200);
    });
    test("200: get an array of articles without the body property", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.forEach((article) => {
            expect(article).not.toHaveProperty("body");

            expect(typeof article.article_id).toBe("number");
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
          });
        });
    });
    test("200: recieve the articles in DESC order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].created_at).toBe("2020-11-03T09:12:00.000Z");
          expect(body[12].created_at).toBe("2020-01-07T14:08:00.000Z");
        });
    });
    test("404: get 404 response when endpoint spelt wrong", () => {
      return request(app).get("/api/artic").expect(404);
    });
  });
  describe("/api/articles?sort_by=column", () => {
    test("200: get 200 response", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc")
        .expect(200);
    });
    test("200: returns a list of article objects sorted by title in asc order", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].title).toBe("A");
          expect(body[12].title).toBe("Z");
        });
    });
    test("200: returns a list of article objects sorted by title in desc order", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body[12].title).toBe("A");
          expect(body[0].title).toBe("Z");
        });
    });
    test("200: returns a list of article objects sorted by defeault created_at in desc order", () => {
      return request(app)
        .get("/api/articles?order=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].created_at).toBe("2020-11-03T09:12:00.000Z");
          expect(body[12].created_at).toBe("2020-01-07T14:08:00.000Z");
        });
    });
    test("404: returns 404 when entering an incomplete query", () => {
      return request(app)
        .get("/api/articles?order=")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid Query");
        });
    });
  });
});
