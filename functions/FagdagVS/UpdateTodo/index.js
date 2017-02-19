const auth = require('./auth')({
    clientId: process.env.AuthId,
    clientSecret: process.env.AuthSecret,
    domain: process.env.AuthDomain
});

module.exports = auth((context, req, todo) => {
    if (!todo || !req.body) {
        context.res = {
            status: 404,
            body: 'Could not find todo'
        }
    } else {
        const completed = req.body.completed !== undefined && req.body.completed !== null
            ? req.body.completed
            : todo.completed;
        const updatedTodo = {
            id: todo.id,
            text: req.body.text || todo.text,
            completed,
            listId: todo.listId
        };
        context.bindings.updatedTodo = updatedTodo;
        context.res = {
            body: updatedTodo
        }
    }
    context.done();
});