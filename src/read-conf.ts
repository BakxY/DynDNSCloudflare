import fs from 'fs';

// set file locations
const conf_file = './resources/configs/main.conf'
const record_list_file = './resources/configs/record_list.conf'
const zones_file = './resources/configs/zones.conf'

export function getConf() 
{
    // define a variable for the token
    let conf = ''

    // read token file
    conf = fs.readFileSync(conf_file, 'utf-8')

    // check if the token files is empty
    if(conf != '')
    {
        // split the sting into an array
        let confArray = conf.split('\n');

        // remove all comments
        let confNoCommentsArray = confArray.filter(function (line) {
            return line.indexOf('#') != 0;
        });

        // make the array a sting
        let confNoComments = confNoCommentsArray.join('\n');

        // return the string
        return confNoComments
    }
    else // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Config file is empty!')
        process.exit()
    }
}

export function getZones() 
{
    // define a variable for the token
    let zonesContent = ''

    // read token file
    zonesContent = fs.readFileSync(zones_file, 'utf-8')

    // check if the token files is empty
    if(zonesContent != '')
    {
        // split the sting into an array
        let zonesArray = zonesContent.split('\n');

        // remove all comments
        let zonesNoCommentsArray = zonesArray.filter(function (line) {
            return line.replace(/ /g, '').replace(/\t/g, '').replace('{', '').indexOf('#') != 0;
        });

        // loop through all lines and remove all spaces and tabs
        for(let index in zonesNoCommentsArray)
        {
            zonesNoCommentsArray[index] = zonesNoCommentsArray[index].replace(/ /g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/'/g, '')
        }

        // declare the zone data array
        let zoneArray = []

        for(let index in zonesNoCommentsArray)
        {
            // check if the line contains a new zone
            if(zonesNoCommentsArray[index].includes('Zone') && (zonesNoCommentsArray[index].includes('{') || zonesNoCommentsArray[Number(index) + 1].includes('{')))
            {
                let IsolatedZoneData = ''
                for(let IsolateIndex = Number(index); IsolateIndex < zonesNoCommentsArray.length; IsolateIndex++)
                {
                    // check if the line contains a new zone
                    if(zonesNoCommentsArray[IsolateIndex].includes('}'))
                    {
                        // set the zone data
                        IsolatedZoneData += zonesNoCommentsArray[IsolateIndex]
                        break
                    }
                    else
                    {
                        // set the zone data
                        IsolatedZoneData += zonesNoCommentsArray[IsolateIndex] + '\n'
                    }
                }

                // error handling
                if(!IsolatedZoneData.includes('}') || !IsolatedZoneData.includes('{'))
                {
                    console.error('[ ERROR ] Zone is not properly defined! Missing {} somewhere!')
                    process.exit()
                }

                if(!IsolatedZoneData.includes('alias'))
                {
                    console.error('[ ERROR ] No alias defined in zone definition!')
                    process.exit()
                }

                if(!IsolatedZoneData.includes('base-domain'))
                {
                    console.error('[ ERROR ] No base domain defined in zone definition!')
                    process.exit()
                }

                if(!IsolatedZoneData.includes('zone-id'))
                {
                    console.error('[ ERROR ] No base zone id defined in zone definition!')
                    process.exit()
                }

                if(!IsolatedZoneData.includes('zone-read-token'))
                {
                    console.error('[ ERROR ] No read token defined in zone definition!')
                    process.exit()
                }

                if(!IsolatedZoneData.includes('zone-write-token'))
                {
                    console.error('[ ERROR ] No write token defined in zone definition!')
                    process.exit()
                }

                for(let DupeIdex in zoneArray)
                {
                    if(IsolatedZoneData.includes(zoneArray[DupeIdex]['ZoneDomain']))
                    {
                        console.error('[ ERROR ] Duplicate domains!')
                        process.exit()
                    }
                }

                let IsolatedZoneDataArray = []

                // split the isolated zone data into an array
                IsolatedZoneDataArray = IsolatedZoneData.split('\n')

                // create a new json object
                let ZoneData = JSON.parse(
                    '{"ZoneAlias":"",' +
                    '"ZoneDomain":"",' +
                    '"id":"",' +
                    '"readToken":"",' +
                    '"writeToken":""}'
                )

                // populate the zone data
                for(let PopulateIndex in IsolatedZoneDataArray)
                {
                    if(IsolatedZoneDataArray[Number(PopulateIndex)].includes('alias'))
                    {
                        ZoneData['ZoneAlias'] = IsolatedZoneDataArray[PopulateIndex].replace('alias', '').replace('=', '').replace('\r', '').replace('\n', '')
                    }

                    if(IsolatedZoneDataArray[Number(PopulateIndex)].includes('base-domain'))
                    {
                        ZoneData['ZoneDomain'] = IsolatedZoneDataArray[PopulateIndex].replace('base-domain', '').replace('=', '').replace('\r', '').replace('\n', '')
                    }

                    if(IsolatedZoneDataArray[Number(PopulateIndex)].includes('zone-id'))
                    {
                        ZoneData['id'] = IsolatedZoneDataArray[PopulateIndex].replace('zone-id', '').replace('=', '').replace('\r', '').replace('\n', '')
                    }

                    if(IsolatedZoneDataArray[Number(PopulateIndex)].includes('zone-read-token'))
                    {
                        ZoneData['readToken'] = IsolatedZoneDataArray[PopulateIndex].replace('zone-read-token', '').replace('=', '').replace('\r', '').replace('\n', '')
                    }

                    if(IsolatedZoneDataArray[Number(PopulateIndex)].includes('zone-write-token'))
                    {
                        ZoneData['writeToken'] = IsolatedZoneDataArray[PopulateIndex].replace('zone-write-token', '').replace('=', '').replace('\r', '').replace('\n', '')
                    }
                }
                zoneArray.push(ZoneData)
            }
        }
        return zoneArray
    }
    else // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Zones file is empty!')
        process.exit()
    }
}

export function getRecordList() 
{
    // define a variable for the token
    let recordList = ''

    // read token file
    recordList = fs.readFileSync(record_list_file, 'utf-8')

    // check if the token files is empty
    if(recordList != '')
    {
        // split the sting into an array
        let recordListArray = recordList.split('\n');

        // remove all comments
        let recordListNoCommentsArray = recordListArray.filter(function (line) {
            return line.indexOf('#') != 0;
        });
        
        // replace all the \r with nothing
        for(let index in recordListNoCommentsArray)
        {
            recordListNoCommentsArray[index] = recordListNoCommentsArray[index].replace(/\r/g, '')
        }

        // return the string
        return recordListNoCommentsArray
    }
    else // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Config file is empty!')
        process.exit()
    }
}

export function getInterval(confString)
{
    // split the sting into an array
    let confArray = confString.split('\n');

    // search string for line with content
    let confIntervalArray = confArray.filter(function (line) {
        if(line.includes('interval'))
        {
            return line
        }
    });

    if(confIntervalArray == '') // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Config file is missing the interval!')
        process.exit()
    }
    else
    {
        // clean up string
        let confInterval = confIntervalArray[0].replace(/ /g, '').replace(/\t/g, '').replace('interval', '').replace('\r', '') * 1

        // check if the interval is a number
        if(Number.isFinite(confInterval) != false)
        {
            // return the interval
            return confInterval
        }
        else // error handling
        {
            // print a error and exit
            console.error('[ ERROR ] Config file interval is not a number!')
            process.exit()
        }
    }
}

export function getIPOutput(confString)
{
    // split the sting into an array
    let confArray = confString.split('\n');

    // search string for line with content
    let confIPOutputArray = confArray.filter(function (line) {
        if(line.includes('ip_output'))
        {
            return line
        }
    });

    if(confIPOutputArray == '') // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Config file is missing the ip_output!')
        process.exit()
    }
    else
    {
        // clean up string
        let confIPOutput = confIPOutputArray[0].replace(/ /g, '').replace(/\t/g, '').replace('ip_output', '').replace('\r', '')

        // return the ip_output
        if(confIPOutput === 'true')
        {
            return true
        }
        else
        {
            return false
        }
    }
}

export function getUseRecordList(confString)
{
    // split the sting into an array
    let confArray = confString.split('\n');

    // search string for line with content
    let confUseRecordListArray = confArray.filter(function (line) {
        if(line.includes('use_record_list'))
        {
            return line
        }
    });

    if(confUseRecordListArray == '') // error handling
    {
        // print a error and exit
        console.error('[ ERROR ] Config file is missing the use_record_list!')
        process.exit()
    }
    else
    {
        // clean up string
        let confUseRecordList = confUseRecordListArray[0].replace(/ /g, '').replace(/\t/g, '').replace('use_record_list', '').replace('\r', '')

        // return the use_record_list config as a boolean
        if(confUseRecordList === 'true')
        {
            return true
        }
        else
        {
            return false
        }
    }
}