const uuid = require('uuid');
const auth = require('./auth')({
    clientId: process.env.AuthId,
    clientSecret: process.env.AuthSecret,
    domain: process.env.AuthDomain
});

module.exports = auth((context, req) => {
    if (!req.body || !req.body.name) {
        context.res = {
            status: 400,
            body: 'Todo lists must have a name'
        }
    } else {
        context.bindings.newTodoList = {
            id: uuid.v4(),
            name: req.body.name,
            user: req.user
        };;
        context.res = {
            body: context.bindings.newTodoList
        }
    }
    context.done();
});