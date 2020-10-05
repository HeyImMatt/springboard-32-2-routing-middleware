process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

beforeEach(() => {
  items.push({
    name: 'popsicle', 
    price: 1.45
  });
})

afterEach(() => {
  items.length = 0;
});

describe('GET /items', () => {
  test('Gets a list of items', async () => {
    const resp = await request(app).get('/items');

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({items: items});
  })
})