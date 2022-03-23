import fs from 'fs';

// set file locations
const cloudflare_api_token_file = './resources/tokens/cloudflare_api_token.txt'
const cloudflare_zone_id_file = './resources/tokens/cloudflare_zone_id.txt'

// export function import
export function getCloudflareToken() 
{
    var cloudflare_api_token = ''

    // read token file
    cloudflare_api_token = fs.readFileSync(cloudflare_api_token_file, 'utf-8')

    // check if the token files is empty
    if(cloudflare_api_token != '')
    {
        cloudflare_api_token = cloudflare_api_token.replace('\n', '')
        // return token
        return cloudflare_api_token
    }
    else
    {
        console.error('Cloudflare token file is empty!')
        process.exit()
    }
}

// export function import
export function getApexToken() 
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
