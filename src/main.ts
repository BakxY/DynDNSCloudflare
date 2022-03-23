import { getCloudflareToken, getApexToken } from './get-tokens'
import fetch from "node-fetch";

var response;

async function getPubIP()
{
    response = await fetch('https://api.ipify.org?format=json')
    response = await response.json()
    return response['ip']
}

async function main()
{
    console.log(getCloudflareToken())
    console.log(getApexToken())
    console.log(await getPubIP())
}

main()