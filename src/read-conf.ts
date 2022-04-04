import fs from 'fs';

// set file locations
const conf_file = './resources/configs/main.conf'

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
        let confInterval = confIntervalArray[0].replace(/ /g, '').replace(/\t/g, '').replace('interval', '') * 1

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
        let confIPOutput = confIPOutputArray[0].replace(/ /g, '').replace(/\t/g, '').replace('ip_output', '')

        // return the ip_output
        return confIPOutput
    }
}