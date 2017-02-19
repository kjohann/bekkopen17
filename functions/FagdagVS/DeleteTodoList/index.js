const DocumentDBClient = require('documentdb').DocumentClient;
const auth = require('./auth')({
    clientId: process.env.AuthId,
    clientSecret: process.env.AuthSecret,
    domain: process.env.AuthDomain
});

module.exports = auth((context, req, todoList) => {
    if (todoList) {
        const client = new DocumentDBClient(process.env.DbHost, {
             masterKey: process.env.DbAuthKey
        });
        client.deleteDocument(todoList._self,
            err => {
                context.res = {
                    status: err ? 500 : 200,
                    err,
                    id: err ? null : todoList.id
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