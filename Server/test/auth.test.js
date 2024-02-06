const request = require('supertest');
const app = require('../server'); // Import your Express app
const { sequelize } = require('../config/database'); // Import your Sequelize instance

beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will clear and re-create the tables
});

afterAll(async () => {
    await sequelize.close(); // Close the connection
});

describe('Authentication Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('should authenticate a registered user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // Add more tests as needed, e.g., login failure, registration with existing email, etc.
});
