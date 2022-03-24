import fs from 'fs';

// set file locations
const cloudflare_api_read_token_file = './resources/tokens/cloudflare_api_read_token.txt'
const cloudflare_api_write_token_file = './resources/tokens/cloudflare_api_write_token.txt'
const cloudflare_zone_id_file = './resources/tokens/cloudflare_zone_id.txt'

// export function import
export function getCloudflareReadToken() 
{
    var cloudflare_api_read_token = ''

    // read token file
    cloudflare_api_read_token = fs.readFileSync(cloudflare_api_read_token_file, 'utf-8')

    // check if the token files is empty
    if(cloudflare_api_read_token != '')
    {
        cloudflare_api_read_token = cloudflare_api_read_token.replace('\n', '')
        // return token
        return cloudflare_api_read_token
    }
    else
    {
        console.error('Cloudflare read token file is empty!')
        process.exit()
    }
}

// export function import
export function getCloudflareWriteToken() 
{
    var cloudflare_api_write_token = ''

    // read token file
    cloudflare_api_write_token = fs.readFileSync(cloudflare_api_write_token_file, 'utf-8')

    // check if the token files is empty
    if(cloudflare_api_write_token != '')
    {
        cloudflare_api_write_token = cloudflare_api_write_token.replace('\n', '')
        // return token
        return cloudflare_api_write_token
    }
    else
    {
        console.error('Cloudflare write token file is empty!')
        process.exit()
    }
}

// export function import
export function getCloudflareZoneID() 
{
    var cloudflare_zone_id = ''

    // read token file
    cloudflare_zone_id = fs.readFileSync(cloudflare_zone_id_file, 'utf-8')

    // check if the token files is empty
    if(cloudflare_zone_id != '')
    {
        cloudflare_zone_id = cloudflare_zone_id.replace('\n', '')
        // return token
        return cloudflare_zone_id
    }
    else
    {
        console.error('Zone id file is empty!')
        process.exit()
    }
}
