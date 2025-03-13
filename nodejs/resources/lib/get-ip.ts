import fetch from 'node-fetch';

// export the getPubIP function (is async)
export async function getPubIP(OutIPInterval: boolean) {
    try {
        // Get public ip address
        let response = await fetch('https://ip-adresim.app')

        const publicIpAddr: string = await response.text()

        // check if ip should be outputted every interval
        if (OutIPInterval == true) {
            // print the ip to the console
            console.info('[  IP  ] Current public IP is ' + publicIpAddr)
        }
        //return the public ip
        return publicIpAddr
    }
    catch (err) {
        console.error('[ ERROR ] An error occurred during public ip retrieval')
        console.error(err)
    }
}