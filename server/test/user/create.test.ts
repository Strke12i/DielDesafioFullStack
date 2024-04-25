import app from "../../src/index"
import request from 'supertest';

describe('Create User', () => {
    it('should create a new user', done => {
        request(app)
            .post('/api/user')
            .send({
                email: "felipe1@mail.com",
                name: "Felipe",
                password: "123456"
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    }
    )
}
);

describe('Create User Failed', () => {
    it('should create a new user', done => {
        request(app)
            .post('/api/user')
            .send({
                email: "test@mail",
                name: "Test",
                password: "12345"
            })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    }
    )
} 
);