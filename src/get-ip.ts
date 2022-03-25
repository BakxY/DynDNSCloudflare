import fetch from "node-fetch";

// export the getPubIP function (is async)
export async function getPubIP()
{
    try
    {
        // make a request to the ipify api
        let response = await fetch('https://api.ipify.org?format=json')

        // convert the response to json format
        response = await response.json()

        //return the public ip
        return response['ip']
    }
    catch {} // try and catch any error thrown by the fetch command
}