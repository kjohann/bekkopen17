export const apiPromiseWrapper = (requestCall) => {
  return new Promise((resolve, reject) => {
    requestCall
      //.withCredentials()
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
