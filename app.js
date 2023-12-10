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

const head = `<!DOCTYPE html>
<html>
  <head>
    <title>Losowanko</title>
    <style>
      html, body { padding: 0; margin: 0; height: 100%; width: 100%; font-family: 'Verdana'; color: #fbfbfb;
        background: rgb(131,58,180); 
        background: linear-gradient(36deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%); }
      .container { position: absolute; width: 100%; text-align: center; }
      .welcome { padding-top: 9%; font-size: 4.3em; }
      .text { padding-top: 1.7em; font-size: 2.3em; }
      .name { padding-top: .7em; font-size: 9em; }
    </style>
  </head>
  <body>`

const people = [
  "Ada",
  "Aleksandra",
  "Filip",
  "Jakub",
  "Janek",
  "Janko",
  "Kacper",
  "Kamila",
  "Klaudia",
  "Magda",
  "Mateusz",
  "Mikołaj",
  "Patryk",
  "Paulina"
]

const codes = [
  'ada-2c7d4f08-de7e-4c84-9200-764290b42bb5',
  'aleksandra-579fdfe9-0ca2-4685-8888-849d23decbdb',
  'filip-6d80f9a5-9907-4370-a4ec-a20071a1c527',
  'jakub-31eced1d-709e-42e5-a82b-3c0998dc62be',
  'janek-8ad475c3-0736-4568-b68d-54fe5be0072b',
  'janko-27031478-4a5e-4902-b3bb-32e8a7cf1cc5',
  'kacper-801a1bfd-6151-4e5e-876b-3889f48a5e81',
  'kamila-a7ed44f3-2bfb-4419-adc9-bbb11edc6032',
  'klaudia-17176de2-de7f-4dd7-a69c-c517dd6a5ca0',
  'magda-5301b6ca-25dd-487c-b69d-f69cf4841874',
  'mateusz-0e911c70-de11-4236-b1f7-b09f1c2487f1',
  'mikolaj-50aced09-956a-4c4b-b356-e65015798445',
  'patryk-34f589ec-49ad-4ef6-bbfc-3b4634cd91f8',
  'paulina-fe29aeed-8b74-4b66-a391-e30d2754b799'
]

const peopleEncripted = [103337837, 103587735, 108530049, 106964235, 109677818, 103050676, 106312127, 106256354, 101862781, 100866471, 106629431, 108888440, 107061105, 102198504]

const matchesEncoded = {
   103337837: 106312127,
   103587735: 101862781,
   108530049: 106256354,
   106964235: 103587735,
   109677818: 107061105,
   103050676: 102198504,
   106312127: 103337837,
   106256354: 103050676,
   101862781: 100866471,
   100866471: 108530049,
   106629431: 109677818,
   108888440: 106629431,
   107061105: 106964235,
   102198504: 108888440,
}

// #############################################################################
// Get url param, and send response
app.get('/:param', function (req, res) {
  // Prints Output on the browser in response 
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
  res.write(head);

  if (codes.includes(req.params.param)) {
    // get server data based on :param variable
    const idx = codes.indexOf(req.params.param);
    const id = peopleEncripted[idx];
    const personEncripted = matchesEncoded[id];

    const name = people[idx];
    const person = people[peopleEncripted.indexOf(personEncripted)];

    const body = 
    `<div class="container">
      <div class="welcome">Heja ${name}!</div>
      <div class="text">Twoim świątecznym losem jest:</div>
      <div class="name">${person}</div>
    </div>`
    res.write(body, 'utf8');
  }
  else {
    const body = `
    <div class="container">
      <div class="welcome">mordo,</div>
      <div class="text">coś źle link spasował</div>
      <div class="name">BO NIE DZIAŁA</div>
    </div>`
    
    res.write(body, 'utf8');
  }

  res.write(`</body></html>`);
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

  // Prints Output on the browser in response 
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
  res.write(head);

  const body = `
  <div class="container">
    <div class="welcome">Losowanko</div>
    <div class="text">wpisz swój kod po ukośniku w adresie strony</div>
    <div class="name">i co.. komu sprawisz radość?</div>
  </div>`
  

  res.write(body, 'utf8');

  res.write(`</body></html>`);
  res.end(); 
})

module.exports = app
