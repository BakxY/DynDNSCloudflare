# DynDNS for cloudflare API
This is a small node.js application to use a cloudflare registered domain with a DynDNS. This is done by using the Cloudflare API


## Documentation
Currently there is no documentation, but im going to add this soon.

## I found a issue
If you find any issues please create a issue in the repo or if it is dire, please send me a message on discord (BREXIT#2164). I will look into any issues as soon as possible.

## How to run
If you want to run this ddns client yourself, just download the install.sh script to your linux machine and run it as root (or with sudo). This script will install all needed packages and install everything on your system. After running the script you can set everything to you liking in the /etc/DynDNSCloudflare folder. 

## Configs
You can comment your config by using the `#` symbol, the entire line will be ignored if it startes with a `#`
### main.conf
In the main.conf you can set the interval for checking your public ip. This can be done with the `interval` keyword, the value given needs to be in ms. If the `ip_output` is set to true the client will output your public ip to the log everytime the it is pulled. This is mainly done for debugging. If the `use_record_list` is set to true all of the records given in the record_list.conf will be edited, even if the the current ip of the record is not equal to the old. 

### record_list.conf
In this file you can put all of the records that need to be edited. This list will be used if the `use_record_list` keyword is set to true in the main.conf file.

### zones.conf
In this file you can define all of your zones. How to create a new zone is described in the zones.conf file.