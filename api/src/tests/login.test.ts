import request from "supertest";
import { API_USERNAME, API_PASS} from '../config/api.config';
import { LoginController } from "../controllers/login.controller";
import app from './appTest';
app.get("/login", LoginController);
describe('GET /login', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/login')
      .set('Accept', 'application/json')
      .set('Authorization', `Basic ${btoa(`${API_USERNAME}:${API_PASS}`)}`)
      .expect('Content-Type', /json/)
      .expect(function(res) {
          res.body.Authenticated = true;
      })
      .expect(200, done);
  });
});