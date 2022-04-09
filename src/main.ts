import { getPubIP } from './get-ip'
import { getCloudflareReadToken, getCloudflareWriteToken, getCloudflareZoneID } from './get-tokens'
import { getRecords, editRecord } from './cloudflare-api'
import { getConf, getInterval, getIPOutput, getUseRecordList, getRecordList } from './read-conf'	

// define variables for current and old IP's
let currentIP = ''
let oldPubIP = ''

// get the config file
const configString = getConf()

// get the interval config
const interval = getInterval(configString)

// get the ip every interval config
const OutIPOnInterval = getIPOutput(configString)

// get the use_record_list config
const UseRecordList = getUseRecordList(configString)

// create a async main function
async function main()
{
    // get the current public ip
    currentIP = await getPubIP(OutIPOnInterval)

    // check if the public ip has changed or is currently undefined
    if(currentIP != oldPubIP && currentIP != undefined)
    {
        let JsonRecords = await getRecords(getCloudflareZoneID(), getCloudflareReadToken())

        // print a info to the console
        console.info('[ INFO ] Public IP has changed to ' + currentIP)

        if(UseRecordList == 'true')
        {
            // get the record list
            const recordList = getRecordList()

            // create a new variable for the json body
            let APIJsonBody = ''

            // loop through the record list
            for(let index in JsonRecords)
            {
                // check if the record is an A record
                if(JsonRecords[index]['type'] == 'A')
                {
                    // loop through the record list
                    for(let recordName in recordList)
                    {
                        // check if the record name is the same as the record name in the record list
                        if(JsonRecords[index]['name'] == recordList[recordName])
                        {
                            // create a new json body
                            APIJsonBody = JSON.stringify({
                                "type": JsonRecords[index]['type'],
                                "name": JsonRecords[index]['name'],
                                "content": currentIP.toString(),
                                "ttl": JsonRecords[index]['ttl'],
                                "proxied": JsonRecords[index]['proxied']
                            })

                            // edit the record
                            await editRecord(getCloudflareZoneID(), getCloudflareWriteToken(), JsonRecords[index]['id'], APIJsonBody)
                        }
                    }
                }
            }
        }
        else
        {
            // loop through all the records
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