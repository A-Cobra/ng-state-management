import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    service = new LoginService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error when login fails', (done) => {
    const user = { email: 'test@test.com', password: 'Test@123' };
    service.login(user).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('Unable to login user');
        done();
      }
    );
  });
});
