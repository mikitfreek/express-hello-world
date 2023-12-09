const express = require('express')
const path = require("path");
const app = express()

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// Get url param, and send response
app.get('/:param', function (req, res) {
  
  // get server data based on :param variable

  const name = req.params.param;
  const person = req.params.param;

  const body = `
<div style="text-align: center; height: 100%; color: #fbfbfb; font-family: 'Verdana'; background: rgb(131,58,180); background: linear-gradient(36deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);">
  <div style="padding-top: 9%; font-size: 4.3em;">Heja ${name}!</div>
  <div style="padding-top: 1.7em; font-size: 2.3em;">Twoim świątecznym losem jest:</div>
  <div style="padding-top: .7em; font-size: 9em;">${person}</div>
</div>`

  // Prints Output on the browser in response 
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
  res.write(body, 'utf8');
  res.end(); 
});

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  // res.json({
  //     at: new Date().toISOString(),
  //     method: req.method,
  //     hostname: req.hostname,
  //     ip: req.ip,
  //     query: req.query,
  //     headers: req.headers,
  //     cookies: req.cookies,
  //     params: req.params
  //   })
  //   .end()

  const body = `
  <div style="text-align: center; height: 100%; color: #fbfbfb; font-family: 'Verdana'; background: rgb(131,58,180); background: linear-gradient(36deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);">
    <div style="padding-top: 9%; font-size: 4.3em;">mordo,</div>
    <div style="padding-top: 1.7em; font-size: 2.3em;">coś źle link spasował</div>
    <div style="padding-top: .7em; font-size: 9em;">BO NIE DZIAŁA</div>
  </div>`
  
    // Prints Output on the browser in response 
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
    res.write(body, 'utf8');
    res.end(); 
})

module.exports = app
