import request from 'supertest';
import app from '../server.js';

describe('Backend Server API Tests', () => {
  // Test 1: Valid request flow
  it('should process a valid request flow correctly', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ input: 'This is a valid test input' })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data', 'This is a valid test input');
  });

  // Test 2: Invalid input handling
  it('should handle invalid input appropriately', async () => {
    // Missing input
    let res = await request(app)
      .post('/api/evaluate')
      .send({})
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Input is required');

    // Wrong type
    res = await request(app)
      .post('/api/evaluate')
      .send({ input: 123 })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Input must be a string');
  });

  // Test 3: Edge case (empty input and very large input)
  it('should handle edge cases like empty or very large inputs', async () => {
    // Empty string
    let res = await request(app)
      .post('/api/evaluate')
      .send({ input: '' })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Input cannot be empty');

    // Very large string (over 1000 chars)
    const largeInput = 'a'.repeat(1001);
    res = await request(app)
      .post('/api/evaluate')
      .send({ input: largeInput })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Input is too large');
  });

  // Additional test for status endpoint
  it('should return 200 OK for /api/status', async () => {
    const res = await request(app).get('/api/status');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  // Test 404 Not Found handling
  it('should return 404 for unknown API routes', async () => {
    const res = await request(app).post('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });
});
