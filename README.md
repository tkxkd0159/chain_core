![](https://img.shields.io/badge/Node.js-14.15.0-green)
![](https://img.shields.io/badge/cURL-7.71.1-red)

# Modified
### Dockerfile
About setting directories and volumes
### package.json
Exclude body-parser and add new function
### .babelrc
Modify configuration
### src
Modify some logics and add some testing files


 
```
$ npm install --save-dev @babel-node @babel/preset-env @babel/core
$ npx babel-node src/main.js
```


# Docker Quick Start

```bash
docker run -it -p 3001:3001 -p 6001:6001 tkxkd0159/mycontainer
```

# How to Start

## Run Nodes

### Start node #1
```bash
npm start
```

### Start node #2

* Set `HTTP_PORT` for HTTP communication <br>
  ```gci env:``` or `set`

  ```$env:HTTP_PORT=3002```
  *or*
  ```export HTTP_PORT=3002```
  *or*
  `set HTTP_PORT=3002`

* Set `P2P_PORT` for P2P communication among peers

  ```$env:P2P_PORT=6002```
  *or*
  ```export P2P_PORT=6002```

* (*option*) Set pre-connected `PEERS` before running

  ```$env:PEERS="ws://127.0.0.1:6001[, ws://127.0.0.1:6003, ...]"```
  *or*
  ```export PEERS="ws://127.0.0.1:6001[, ws://127.0.0.1:6003, ...]"```

* (*option*) Set `PRIVATE_KEY` where private_key is located

  ```$env:PRIVATE_KEY="second"```
  *or*
  ```export PRIVATE_KEY="second"```

  Now private_key is located in `./wallet/second/` instead of default location `./wallet/default/`.

```bash
npm start
```

# Tutorial
[Link](https://youtu.be/uBeUTRtgGxI)



### Get blockchain
```bash
curl http://127.0.0.1:3001/blocks
```

Use 'pretty-print JSON' for better readability:
```bash
curl http://127.0.0.1:3001/blocks | python -m json.tool
```
Python >= 2.6 is required.

### Get a particular block
```bash
curl http://127.0.0.1:3001/block/:number
```

For example, let us get a block whose number (index) is 3:

```bash
curl http://127.0.0.1:3001/block/3
```

### Add new block
```bash
curl -X POST http://127.0.0.1:3001/mineBlock
curl -H "Content-type:application/json" --data "{\"data\" : [\"Anything you want\", \"Anything you need\"]}" http://127.0.0.1:3001/mineBlock
curl -H "Content-Type: application/json" -d @../post_src/posttest.json http://127.0.0.1:3001/mineBlock
```

### Get current version
```bash
curl http://127.0.0.1:3001/version
```

### Get the version of particular block
```bash
curl http://127.0.0.1:3001/blockVersion/:number
```

For example, let's get a version of a block whose number (index) is 3:

```bash
curl http://127.0.0.1:3001/blockVersion/3
```

### Get connected peer(s)
```bash
curl http://127.0.0.1:3001/peers
```

### Add peer(s)
```bash
curl -H "Content-type:application/json" --data "{\"peers\" : [\"ws://127.0.0.1:6002\", \"ws://127.0.0.1:6003\"]}" http://127.0.0.1:3001/addPeers
```

### Get Address
```bash
curl http://127.0.0.1:3001/address
```

### Stop
```bash
curl -X POST http://127.0.0.1:3001/stop
```
