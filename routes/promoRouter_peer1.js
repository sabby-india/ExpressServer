const express = require("express");
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(function(req, res, next){
    Promotions.find({})
    .then(function(promotion){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err);
    });
})
.post(function(req, res, next){
    Promotions.create(req.body)
    .then(function(promotion){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err);
    });
})
.put(function(req, res, next){
    res.statusCode = 403;
    res.end('PUT not allowed on promotions');
})
.delete(function(req, res, next){
    Promotions.remove({})
    .then(function(resp){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err);
    });
});

promoRouter.route('/:promoId')
.get(function(req, res, next){
    Promotions.findById(req.params.promoId)
    .then(function(promotion){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err)
    });
})
.post(function(req, res, next){
    res.statusCode = 403;
    res.end('POST not allowed on /promotions/'+req.params.promoId );
})
.put(function(req, res, next){
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set : req.body
    }, {new:true})
    .then(function(promotion){
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err);
    });
})
.delete(function(req, res, next){
    Promotions.findByIdAndRemove(req.params.promoId)
    .then(function(resp){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, function(err){
        next(err);
    })
    .catch(function(err){
        next(err);
    });
});

module.exports = promoRouter;