const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Promos = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions,(req, res) => { res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promos.create(req.body)  
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions!');
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));  
});
promoRouter.route('/:promoId')
.options(cors.corsWithOptions,(req, res) => { res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403; 
    res.end('POST operation not supported on /promotions/'
    + req.params.promoId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        if(promo != null){
            if(req.body.price){
                promo.price = req.body.price;
            }
            if(req.body.label){
                promo.label = req.body.label;

            }
            if(req.body.description){
                promo.description = req.body.description;

            }
            if(req.body.featured){
                promo.featured = req.body.featured;

            }
            if(req.body.image){
                promo.image = req.body.image;

            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));

        }
        else{
            err = new Error('Promotion ' + req.params.promoId+ 'not exists!');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));

})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;
