import fetch from "node-fetch";

export async function getPubIP()
{
    try
    {
        let response = await fetch('https://api.ipify.org?format=json')
        response = await response.json()
        return response['ip']
    }
    catch {}
}