const express = require('express');
const bodyParser = require('body-parser');

//will declare dishRouter as express router
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//mounting of an express router
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); //continue all to look for additional works
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!')
})
.post((req,res,next) => {
    res.end('Will add the dish: '+ req.body.name + 
    ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403; //operation not supported
    res.end('PUT operation not supported on dishes!');
})
.delete((req,res,next) => {
    res.end('Deleting all the dishes!');
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); //continue all to look for additional works
})
.get((req,res,next) => {
    res.end('Will send details of the dish: '
    + req.params.dishId + ' to you !');
})
.post((req,res,next) => {
    res.statusCode = 403; //operation not supported
    res.end('POST operation not supported on /dishes/'
    + req.params.dishId);
})
.put((req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId+ '\n');
    res.end('Will update the dish: '
    + req.body.name + ' with details '+ req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting dish: '+ req.params.dishId);
});

module.exports = dishRouter;
