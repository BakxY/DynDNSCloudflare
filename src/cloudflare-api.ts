import fetch from "node-fetch";

export async function getRecords(zoneID: string, apiToken: string)
{
    try{
        // get all dns record from the cloudflare api
        let APIResponse = await fetch('https://api.cloudflare.com/client/v4/zones/' + zoneID + '/dns_records', {
            method: 'GET',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + apiToken]
            ],
        })

        // convert the response to json format
        APIResponse = await APIResponse.json()

        return APIResponse['result']
    }
    catch {} // try and catch any error thrown by the fetch command
}

export async function editRecord(zoneID: string, apiToken: string, recordID, data: string)
{
    try
    {
        // make the api request as put
        await fetch('https://api.cloudflare.com/client/v4/zones/' + zoneID + '/dns_records/' + recordID, {
            method: 'PUT',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + apiToken]
            ],
            body: data
        })
    }
    catch {} // try and catch any error thrown by the fetch command
    
}