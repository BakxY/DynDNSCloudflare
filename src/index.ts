import { getPubIP } from './get-ip'
import { editRecordsZoneList } from './cloudflare-api'
import { getConf, getZones, getInterval, getIPOutput, getUseRecordList } from './read-conf'	

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
        // print a info to the console
        console.info('[ INFO ] Public IP has changed to ' + currentIP)

        // edit the records
        editRecordsZoneList(getZones(), UseRecordList, currentIP)

        // set the old ip to the current
        oldPubIP = currentIP
    }
}

// print some info messages to the console
console.info('[ INFO ] Starting DDNS')
console.info('[ INFO ] IP is pulled every ' + interval + 'ms')

// call the main function every interval
setInterval(main, interval)