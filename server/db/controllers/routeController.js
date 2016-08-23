var Route = require('../models/route.js');

module.exports = {
  createRoute: (body, cb)=>{
    console.log(body)
      const data = {
        title: JSON.stringify(body.title),
        start: JSON.stringify(body.start),
        start_address: JSON.stringify(body.startAddress),
        end: JSON.stringify(body.end),
        end_address: JSON.stringify(body.endAddress),
        route_object: JSON.stringify(body.routeObject)
      }
     return new Route(data).save();
  }
}
