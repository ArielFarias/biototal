# Test Biologia Total

This appication was built with node.js (v10.15.3), express.js (v4.16.4)
    
## Installation guide

Clone the repository

```bash

$ git clone https://github.com/ArielFarias/biototal.git
$ cd biototal

```
> IMPORTANT: The following steps must be done inside the directory.

### Linux

In the terminal:

#### Node

If your linux is based on Debian (e.g. Ubuntu, Mint), follow the instructions with no change. In case you use other distribution, go to https://nodejs.org/en/download/

```bash

$ sudo apt install curl

$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

$ sudo apt install nodejs

# check node version
$ node --version

```

## Dependencies

```bash

# install server dependencies
$ npm install

# install client dependencies
$ cd frontend && npm install

```

## Run

> IMPORTANT: In order to run you need to be in the project root folder.

```bash

$ npm start

```

Open ```http://localhost:3000``` in your browser.

## Troubleshooting

### Clear PORT 3000
If you receive an error when trying to run the app as: port ```3000``` is already been used, you need to kill the process.

```bash
# list processes running at port 3000
lsof -i :3000

fuser -k 3000/tcp
```
### Node Installation Page
https://nodejs.org/en/download/

