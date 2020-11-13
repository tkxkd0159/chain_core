```bash
set PRIVATE_KEY="first"
npm start

set HTTP_PORT=3002
set P2P_PORT=6002
set PEERS="ws://127.0.0.1:6001"
set PRIVATE_KEY="second"
npm start

set HTTP_PORT=3003
set P2P_PORT=6003
$env:PEERS="ws://127.0.0.1:6001, ws://127.0.0.1:6002"
set PRIVATE_KEY="third"
npm start

curl http://127.0.0.1:3001/blocks
curl http://127.0.0.1:3001/block/:number
curl -X POST http://127.0.0.1:3001/mineBlock
curl -H "Content-type:application/json" --data "{\"data\" : [\"Anything you want\", \"Anything you need\"]}" http://127.0.0.1:3001/mineBlock
curl http://127.0.0.1:3001/version
curl http://127.0.0.1:3001/blockVersion/:number
curl http://127.0.0.1:3001/peers
curl -H "Content-type:application/json" --data "{\"peers\" : [\"ws://127.0.0.1:6002\", \"ws://127.0.0.1:6003\"]}" http://127.0.0.1:3001/addPeers
curl http://127.0.0.1:3001/address
curl -X POST http://127.0.0.1:3001/stop

```