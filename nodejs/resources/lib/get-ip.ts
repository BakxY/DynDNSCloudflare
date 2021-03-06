import fetch from "node-fetch";

// export the getPubIP function (is async)
export async function getPubIP(OutIPInterval:boolean)
{
    try
    {
        // make a request to the ipify api
        let response = await fetch('https://api.ipify.org?format=json')

        // convert the response to json format
        response = await response.json()

        // check if ip should be outputted every interval
        if(OutIPInterval == true)
        {
            // print the ip to the console
            console.info('[  IP  ] Current public IP is ' + response['ip'])
        }
        //return the public ip
        return response['ip']
    }
    catch {} // try and catch any error thrown by the fetch command
}