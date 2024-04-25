import request from 'supertest';
import app from '../../src/index';

let id: string;
let email: string;
let name: string;
let password: string;

describe('Update User', () => {
    it('should update a user', done => {
        request(app)
            .get('/api/user')
            .expect(200)
            .end((err, res) => {
                res.body.forEach((user: { id: string; email: string; name: string; password: string }) => {
                    id = user.id;
                    email = user.email;
                    name = user.name;
                    password = user.password;
                });

                request(app)
                    .put(`/api/user/${id}`)
                    .send({
                        email: email,
                        name: name,
                        password: password + "1",
                    })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        done();
                    });
            });
    });
});