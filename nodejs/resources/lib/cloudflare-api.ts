import fetch from 'node-fetch'
import * as conf from './read-conf'

export async function getRecords(zonesJSON: string[]) {
    // create a new variable for the json array
    let JsonRecords = []

    for (let index in zonesJSON) {
        try {
            // get all dns record from the cloudflare api
            let APIResponse: fetch.Response = await fetch('https://api.cloudflare.com/client/v4/zones/' + zonesJSON[index]['id'] + '/dns_records', {
                method: 'GET',
                headers: [
                    ['Content-Type', 'application/json'],
                    ['Authorization', 'Bearer ' + zonesJSON[index]['readToken']]
                ],
            })

            // convert the response to json format
            APIResponse = await APIResponse.json()

            // push all the records to the json records array
            JsonRecords.push(APIResponse['result'])
        }
        catch { } // try and catch any error thrown by the fetch command
    }

    // return the json records
    return JsonRecords
}

export async function editRecordsZoneList(zonesJSON: string[], useRecordList: boolean, currentIP: string) {
    let recordsToEdit: string[];
    if (useRecordList == true) {
        recordsToEdit = conf.getRecordList()
    }

    // loop through the zones
    for (let ZoneIndex in zonesJSON) {
        // get all records for the zone
        let ZoneRecordsJSON: fetch.Response = await fetch('https://api.cloudflare.com/client/v4/zones/' + zonesJSON[ZoneIndex]['id'] + '/dns_records', {
            method: 'GET',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', 'Bearer ' + zonesJSON[ZoneIndex]['readToken']]
            ],
        })

        // convert the response to json format
        ZoneRecordsJSON = await ZoneRecordsJSON.json()

        // check if the zone request was successful
        if (ZoneRecordsJSON['success'] == 'true') {
            console.error('[ ERROR ] Failed to get records from zone ' + zonesJSON[ZoneIndex]['alias'])
            process.exit()
        }

        // loop through all the records, check if they are a records and put them in an array
        for (let RecordIndex in ZoneRecordsJSON['result']) {
            // define a new variable for the json body
            let APIJsonBody: string = ''

            // check if the record is an A record
            if (ZoneRecordsJSON['result'][RecordIndex]['type'] == 'A') {
                // check if the list should be used
                if (useRecordList == true) {
                    // loop through the record list
                    for (let EditRecordIdex in recordsToEdit) {
                        // check if the record name is the same as the record name in the record list
                        if (ZoneRecordsJSON['result'][RecordIndex]['name'] == recordsToEdit[EditRecordIdex]) {
                            // populate the json body
                            APIJsonBody = JSON.stringify({
                                "type": ZoneRecordsJSON['result'][RecordIndex]['type'],
                                "name": ZoneRecordsJSON['result'][RecordIndex]['name'],
                                "content": currentIP,
                                "ttl": ZoneRecordsJSON['result'][RecordIndex]['ttl'],
                                "proxied": ZoneRecordsJSON['result'][RecordIndex]['proxied']
                            })

                            try {
                                // make the api request as put
                                await fetch('https://api.cloudflare.com/client/v4/zones/' + zonesJSON[ZoneIndex]['id'] + '/dns_records/' + ZoneRecordsJSON['result'][RecordIndex]['id'], {
                                    method: 'PUT',
                                    headers: [
                                        ['Content-Type', 'application/json'],
                                        ['Authorization', 'Bearer ' + zonesJSON[ZoneIndex]['writeToken']]
                                    ],
                                    body: APIJsonBody
                                })
                            }
                            catch { } // catch any error thrown by the fetch command
                            finally {
                                // print the success message
                                console.log('[ INFO ] Updated record ' + ZoneRecordsJSON['result'][RecordIndex]['name'] + ' in zone ' + zonesJSON[ZoneIndex]['ZoneAlias'])
                            }
                        }
                    }
                }
                else {
                    // populate the json body
                    APIJsonBody = JSON.stringify({
                        "type": ZoneRecordsJSON['result'][RecordIndex]['type'],
                        "name": ZoneRecordsJSON['result'][RecordIndex]['name'],
                        "content": currentIP,
                        "ttl": ZoneRecordsJSON['result'][RecordIndex]['ttl'],
                        "proxied": ZoneRecordsJSON['result'][RecordIndex]['proxied']
                    })

                    try {
                        // make the api request as put
                        await fetch('https://api.cloudflare.com/client/v4/zones/' + zonesJSON[ZoneIndex]['id'] + '/dns_records/' + ZoneRecordsJSON['result'][RecordIndex]['id'], {
                            method: 'PUT',
                            headers: [
                                ['Content-Type', 'application/json'],
                                ['Authorization', 'Bearer ' + zonesJSON[ZoneIndex]['writeToken']]
                            ],
                            body: APIJsonBody
                        })
                    }
                    catch { } // catch any error thrown by the fetch command
                    finally {
                        // print the success message
                        console.log('[ INFO ] Updated record ' + ZoneRecordsJSON['result'][RecordIndex]['name'] + ' in zone ' + zonesJSON[ZoneIndex]['ZoneAlias'])
                    }
                }
            }
        }
    }
}