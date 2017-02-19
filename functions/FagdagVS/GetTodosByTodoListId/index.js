const DocumentDBClient = require('documentdb').DocumentClient;

module.exports = (context, req, todoList) => {
    if (!todoList) {
        context.res = {
            status: 404
        }
        context.done();
    } else {
        const querySpec = {
            query: 'SELECT * FROM Todos t WHERE t.listId = @listId',
            parameters: [{ name: '@listId', value: todoList.id }]
        };

        const client = new DocumentDBClient(process.env.DbHost, {
            masterKey: process.env.DbAuthKey
        });

        client.queryDocuments(`dbs/TodoApp/colls/Todos`, querySpec)
            .toArray((err, results) => {
                context.res = {
                    status: err ? 500 : 200,
                    err,
                    todos: results
                }
                context.done();
            });
    }
};