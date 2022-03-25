import { getPubIP } from './get-ip'
import { getCloudflareReadToken, getCloudflareWriteToken, getCloudflareZoneID } from './get-tokens'
import { getRecords, editRecord } from './cloudflare-api'

// define variables for current and old IP's
let currentIP = ''
let oldPubIP = ''

// interval for checking ip in ms
const interval = 10000

// create a async main function
async function main()
{
    // get the current public ip
    currentIP = await getPubIP()

    // check if the public ip has changed or is currently undefined
    if(currentIP != oldPubIP && currentIP != undefined)
    {
        // print a info to the console
        console.info('[ INFO ] Public IP has changed to ' + currentIP)

        let JsonRecords = await getRecords(getCloudflareZoneID(), getCloudflareReadToken())

        // loop throug all the records
        for(let index in JsonRecords)
        {
            // check if a record contains the old ip
            if(JsonRecords[index]['content'] == oldPubIP)
            {
                // create a json body to send to the api
                let APIJsonBody = JSON.stringify({ 
                    'type': JsonRecords[index]['type'], 
                    'name': JsonRecords[index]['name'], 
                    'content': currentIP.toString(), 
                    'ttl': JsonRecords[index]['ttl'],
                    'proxied' : JsonRecords[index]['proxied']
                })

                await editRecord(getCloudflareZoneID(), getCloudflareWriteToken(), JsonRecords[index]['id'], APIJsonBody)

                // print the name of the record and a message
                console.info('[ UPDATE ] Changed DNS record ' + JsonRecords[index]['name'])
            }
        }

        // set the old ip to the current
        oldPubIP = currentIP
    }
}

// print some info messages to the console
console.info('[ INFO ] Starting DDNS')
console.info('[ INFO ] IP is pulled every ' + interval + 'ms')

// call the main function every interval
setInterval(main, interval)