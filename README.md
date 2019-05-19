# Test Biologia Total

This appication was built with node.js (v10.15.3), express.js (v4.16.4)
    
## Installation guide

Clone this repository at your current location:

```bash

git clone https://github.com/ArielFarias/biototal.git

# enter at the directory
cd biototal

```

> IMPORTANT: The following steps must be done inside the directory.

### Linux

In the terminal:

#### Node

If your linux is based on Debian (e.g. Ubuntu, Mint), follow the instructions with no change. In case you use other distribution, go to https://nodejs.org/en/download/

```bash

sudo apt install curl

curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

sudo apt install nodejs

# check node version
node --version

```

## Dependencies

```bash

# install server dependencies
npm install

# install client dependencies
cd frontend && npm install

```

## Running the application

```bash

# after frontend deps instalation, go back to the main folder :
cd ..

# then run the server using:
npm start

```

Open ```http://localhost:3000``` in your browser.

## Guides and Helpers

### node installation page
https://nodejs.org/en/download/

### Occupied port
If node throws an error telling the port ```3000``` is already been used, end the processes:

```bash
# list processes running at port 3000
lsof -i :3000

kill -9 PID_OF_THE_PROCESS
```

## Heroku Deployment

    visit: https://biologia-total.herokuapp.com/admin/alunos
