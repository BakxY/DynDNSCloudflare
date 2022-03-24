import { getPubIP } from './get-ip'
import { getCloudflareReadToken, getCloudflareWriteToken, getCloudflareZoneID } from './get-tokens'
import fetch from "node-fetch";

let currentIP = ''
let oldPubIP = ''
let APIResponse
let APIJsonBody = ''

// interval for checking ip in ms
const interval = 10000

async function main()
{
    currentIP = await getPubIP()

    if(currentIP != oldPubIP && currentIP != undefined)
    {
        console.info('[ INFO ] Public IP has changed to ' + currentIP)

        APIResponse = await fetch('https://api.cloudflare.com/client/v4/zones/' + getCloudflareZoneID() + '/dns_records', {
            method: 'GET',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + getCloudflareReadToken()]
            ],
        })
        APIResponse = await APIResponse.json()
        for(let index in APIResponse['result'])
        {
            if(APIResponse['result'][index]['content'] == oldPubIP)
            {
                APIJsonBody = JSON.stringify({ 
                    'type': APIResponse['result'][index]['type'], 
                    'name': APIResponse['result'][index]['name'], 
                    'content': currentIP.toString(), 
                    'ttl': APIResponse['result'][index]['ttl'],
                    'proxied' : APIResponse['result'][index]['proxied']
                })

                await fetch('https://api.cloudflare.com/client/v4/zones/' + getCloudflareZoneID() + '/dns_records/' + APIResponse['result'][index]['id'], {
                    method: 'PUT',
                    headers: [
                        ['Content-Type', 'application/json'],
                        ['Authorization', 'Bearer ' + getCloudflareWriteToken()]
                    ],
                    body: APIJsonBody
                })
                console.info('[ UPDATE ] Changed DNS record ' + APIResponse['result'][index]['name'])
            }
        }

        oldPubIP = currentIP
    }
}

console.info('[ INFO ] Starting DDNS')
console.info('[ INFO ] IP is pulled every ' + interval + 'ms')

setInterval(main, interval)