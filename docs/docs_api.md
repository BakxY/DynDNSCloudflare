# Docs on Cloudflare API
This file contains all of the documentation for the cloudflare API and how to use it. This documentation is for the cloudflare version 4.

## Communication
To communicate with the API I'm using the fetch API. Because fetch uses promise for the response I need to use a async function. This means the code wait's until the fetch API has its result.

For every request to need to add the `Content-Type:application/json` header. A header can be added to a fetch request by adding the `headers:` option to your request.
### Authorization
When communicating with the API you need to authorize yourself. This is simply done by adding `'Authorization', 'Bearer ' + YourAPIToken` to the request header. 

### Request method
When working with the API you need to define the method of you request. For example, when your getting a list of all the records you need to use the `GET` method, but when editing a record you need to use the `PUT` method. This method can be selected by just adding the `method:` option and your method to the fetch request.

Which request method you need to use of which request is visible in the [Cloudflare API documentation](https://api.cloudflare.com/).

### Example request (GET)
```
let APIResponse = await fetch('https://api.cloudflare.com/client/v4/zones/' + YourZoneID + '/dns_records', {
            method: 'GET',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + YourAPIToken]
            ],
        })

        APIResponse = await APIResponse.json()
```
With this code you list all of the records in the specified zone and convert it to JSON format. You can print this result to the console with the `console.log(APIResponse)` command. There you can see how the data is formatted.

### Example request (PUT)
```
let APIJsonBody = JSON.stringify({ 
                    'type': RecordType, 
                    'name': RecordName, 
                    'content': RecordContent, 
                    'ttl': RecordTimeToLife,
                    'proxied' : RecordIsProxied
                })

await fetch('https://api.cloudflare.com/client/v4/zones/' + YourZoneID + '/dns_records/' + RecordID, {
            method: 'PUT',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + YourAPIToken]
            ],
            body: APIJsonBody
        })
```

With this code we edit a defined record on our domain. The JSON body `APIJsonBody` contains all of the data needed for the API to make the changes. This JSON body is simply added to the request with the `body:` option.

## Sources
1. https://api.cloudflare.com/
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://jasonwatmore.com/post/2021/09/20/fetch-http-put-request-examples