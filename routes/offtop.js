const router = require('express').Router();

let sockets = [];

router.ws('/echo', function(ws, req) {
    sockets.push(ws);
    ws.on('message', function(msg) {
        msg = JSON.parse(msg)['data'];
        if(msg['type'] == 'post'){
            sockets.forEach(soket=>{
                soket.send(msg['name'] + ' : ' + msg['text']);
            });
        }
    });
    ws.on('close', () => {
        sockets = sockets.filter(conn => {
            return (conn === ws) ? false : true;
        });
    });
});

module.exports = router;