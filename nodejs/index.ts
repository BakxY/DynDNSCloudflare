import * as ip from './resources/lib/get-ip'
import * as cloudflare from './resources/lib/cloudflare-api'
import * as conf from './resources/lib/read-conf'

// define variables for current and old IP's
let currentIP: string = ''
let oldPubIP: string = ''

// get the config file
const configString: string = conf.getConf()

// get the interval config
const interval: number = conf.getInterval(configString)

// get the ip every interval config
const OutIPOnInterval: boolean = conf.getIPOutput(configString)

// get the use_record_list config
const UseRecordList: boolean = conf.getUseRecordList(configString)

// create a async main function
async function main() {
    // get the current public ip
    currentIP = await ip.getPubIP(OutIPOnInterval)

    // check if the public ip has changed or is currently undefined
    if (currentIP !== oldPubIP && currentIP !== undefined) {
        // print a info to the console
        console.info('[ INFO ] Public IP has changed to ' + currentIP)

        // edit the records
        cloudflare.editRecordsZoneList(conf.getZones(), UseRecordList, currentIP)

        // set the old ip to the current
        oldPubIP = currentIP
    }
}

// print some info messages to the console
console.info('[ INFO ] Starting DDNS')
console.info('[ INFO ] IP is pulled every ' + interval + 'ms')

// Run function manually once at startup
main()

// call the main function every interval
setInterval(main, interval)