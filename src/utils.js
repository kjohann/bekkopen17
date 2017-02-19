import AuthService from './AuthService';

export const apiPromiseWrapper = (requestCall) => {
  return new Promise((resolve, reject) => {
    const auth = new AuthService();
    if (auth.loggedIn()) {
      requestCall.set('Authorization', `Bearer ${auth.getToken()}`);
    }
    requestCall
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        if (res.text) {
          const payload = JSON.parse(res.text);
          payload.status = res.status;
          resolve(payload);
        } else {
          resolve();
        }
      });
  });
};
