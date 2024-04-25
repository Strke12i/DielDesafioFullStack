import request from 'supertest';
import app from "../../src/index";

let id: string

describe('Get Users', () => {
    it('should get all users', done => {
        request(app)
            .get('/api/user')
            .expect(200)
            .end((err, res) => {
                res.body.forEach((user: { id: string }) => {
                    id = user.id
                })
                if (err) return done(err)
                done()
            })
    }
    )
});

describe('Get User', () => {
    it('should get a user', done => {
        request(app)
            .get(`/api/user/${id}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    }
    )
});

describe('Get User Failed', () => {
    it('should not get a user', done => {
        request(app)
            .get(`/api/user/1`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    }
    )
});