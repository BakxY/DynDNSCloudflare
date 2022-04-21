# DynDNS with cloudflare API
This node.js application is a simple DynDNS client that uses the cloudflare API to update your DNS record with your current IP address. 


## Documentation
You can find the documentation for this application in the docs folder. I'm currently still updating it, so it may not be complete yet. If you have any questions, feel free to contact me on discord(BREXIT#2164) or github(@BakxY).

## I found a issue
If you find any issues please create a issue in the repo or if it is dire, please send me a message on discord(BREXIT#2164). I will look into any issues as soon as possible.

## How to run
If you want to run this ddns client yourself, just download the install.sh from [this](https://github.com/BakxY/DynDNSCloudflareInstall/tree/main) repo and run it as root (or sudo). The script will create a service that can be started and stopped with the systemctl command. If you want to run it in windows, I will create a windows installer soon.

## Configs
You can comment your config by using the `#` symbol at the start of a line, the entire line will be ignored.

### main.conf
In the main.conf you can set the interval for checking your public ip. This can be done with the `interval` keyword, the value given needs to be in ms. If the `ip_output` is set to true the client will output your public ip to the log everytime the it is pulled. This is mainly done for debugging. If the `use_record_list` is set to true all of the records given in the record_list.conf will be edited, even if the the current ip of the record is not equal to the old. 

### record_list.conf
In this file you can put all of the records that need to be edited. This list will be used if the `use_record_list` keyword is set to true in the main.conf file.

### zones.conf
In this file you can define all of your zones. How to create a new zone is described in the zones.conf file.