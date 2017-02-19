const uuid = require('uuid');
const auth = require('./auth')({
    clientId: process.env.AuthId,
    clientSecret: process.env.AuthSecret,
    domain: process.env.AuthDomain
});

module.exports = auth((context, req, todoList) => {
    if (!todoList) {
        context.res = {
            status: 404,
            body: 'Could not find todo list'
        }
    } else if (!req.body || !req.body.text) {
        context.res = {
            status: 400,
            body: 'Todo must have text'
        }
    } else {
        context.bindings.newTodo = {
            id: uuid.v4(),
            text: req.body.text,
            completed: false,
            listId: todoList.id,
            user: req.user
        };;
        context.res = {
            body: context.bindings.newTodo
        }
    }
    context.done();
});