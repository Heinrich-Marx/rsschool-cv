import http from 'http'
import {createAutoComplete} from '../auto-complete/'
import cities from './cities.json'
const url = require('url');
const citiesJson = createAutoComplete(cities)


const server = http.createServer()
server.on('request',(req,res)=> {
  const queryObject = url.parse(req.url, true).query;
  const arrWithUrl:string[] = citiesJson(queryObject['complete'])
  const pathString = url.parse(req.url, true).pathname;

  if (pathString === '/') {
    res.writeHead(200,{
      'Content-type': 'application/json',
      'Cache-Control': 'max-age=31536000 private'
    })
    arrWithUrl.length === 0 ?  res.end(JSON.stringify('Cities not found')) :  res.end(JSON.stringify(arrWithUrl))
  } else {
    res.writeHead(404)
    res.end()
  }

})

server.listen(9000)