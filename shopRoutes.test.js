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

describe('POST /items', () => {
  test('Posts a new item', async() => {
    const newItem = {name: 'Onion', price: 1.05}
    const resp = await request(app).post('/items').send(newItem);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({added: newItem})
  })

  test('Returns 400 and error if no item name', async() => {
    const noName = {price: 1.05}
    const resp = await request(app).post('/items').send(noName);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual({error: 'Item name and price required'})
  })

  test('Returns 400 and error if no item price', async() => {
    const noPrice = {name: 'Onion'}
    const resp = await request(app).post('/items').send(noPrice);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual({error: 'Item name and price required'})
  })
})