#r "Microsoft.Azure.Documents.Client"
#r "Newtonsoft.Json"

using System;
using System.Collections.Generic;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using System.Linq.Expressions;
using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, [DocumentDB] DocumentClient client, TraceWriter log)
{
    var query = client.CreateDocumentQuery<TodoList>(
        UriFactory.CreateDocumentCollectionUri("TodoApp", "TodoLists")).AsDocumentQuery();

    var results = new List<TodoList>();
    while (query.HasMoreResults)
    {
        results.AddRange(await query.ExecuteNextAsync<TodoList>());
    }

    return req.CreateResponse(HttpStatusCode.OK, results);
}

public class TodoList
{
    [JsonProperty(PropertyName = "id")]
    public Guid Id { get; set; }
    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }
}