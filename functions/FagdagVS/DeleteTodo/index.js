const DocumentDBClient = require('documentdb').DocumentClient;
const auth = require('./auth')({
    clientId: process.env.AuthId,
    clientSecret: process.env.AuthSecret,
    domain: process.env.AuthDomain
});

module.exports = auth((context, req, todo) => {
    if (todo) {
        const client = new DocumentDBClient(process.env.DbHost, {
             masterKey: process.env.DbAuthKey
        });
        client.deleteDocument(todo._self,
            err => {
                context.res = {
                    status: err ? 500 : 200,
                    err,
                    id: err ? null : todo.id
                }
                context.done();
            });
    } else {
        context.res = {
            status: 404
        }
        context.done();
    }
});