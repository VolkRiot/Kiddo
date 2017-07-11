'use strict';

const express = require('express'),
      router  = express.Router();

const controllers = require('../controllers');

/* GET */
/*
  Example : http://.../api/user?_id=5958...                = to id matching doc
  or      : http://.../api/user?_id=5958...&kid_id=4356... = to specific kid from specific user
*/

router.get('/:collection', (req, res, next) => {
  let collection   = req.params.collection,
      controller   = controllers[collection],
      query        = req.query;

  if (controller === undefined) {
    return next({message: 'Invalid Query' , err: `Param : ${collection}`});
  }

  if (query.constructor === Object && Object.keys(query).length <= 0) {
    return next({message: 'Invalid Query', err: 'Missing one or more arguments'});
  } else {
    controller.findById( query, (err, results) => {
      if (err) {
        return next({message: 'Invalid Query' , err: err.message});

      } else if (results === null){
        return res.status(200).json({message: 'Not Found!', body: null});

      } else {
        return res.status(200).json({message: 'Success', body: results});
      }
    });
  }

});

/* POST */
/*
  Example: http://.../api/user?method=create
  body : { obj to be saved }

  -- to add Kids and Events the body request must follow the example:

 {
    "user_id":"595fe...",
    "body": { obj to be saved }
 }
*/

router.post('/:collection', (req, res, next) => {
  let collection = req.params.collection,
      method     = req.query.method,
      controller = controllers[collection],
      body       = req.body;

  if (controller === undefined) {
    return next({message: 'Invalid Query' , err: `Param : ${collection}`});

  } else if (controller[method] === undefined) {
    return next({message: 'Invalid Query', err: `Param : ${ method || 'Missing' }`});

  } else if (Object.keys(body).length === 0 && body.constructor === Object){
    return next({message: 'Invalid Query', err: `Body : ${ 'Missing' }`});
  }

  if (method === 'create') {
    controller.create(body, (err, results) => {
      if (err) {
        //11000 is MongoDB code for duplicate
        if (err.code === 11000) {
          return next('User already Exist\'s! ');
        } else {
          return next(err);
        }
      } else {
        return res.status(200).json({message: 'Success', body: results});
      }
    });
  } else {
    return next({message: 'Invalid Query', err: `Invalid param for POST Request: ${method}`});
  }
});

/* PUT */
/*
  Example: http://.../api/user?method=update&_id=59589...
  body : { obj with fields to be updated }
*/

router.put('/:collection', (req, res, next) => {
  let collection = req.params.collection,
      method     = req.query.method,
      controller = controllers[collection],
      id         = req.query._id,
      body       = req.body;

  if (controller === undefined) {
    return next({message: 'Invalid Query', err: `Invalid param : ${collection}`});

  } else if (controller[method] === undefined) {
    return next({message: 'Invalid Query', err: `Invalid param : ${method || 'Missing'}`});

  } else if (Object.keys(body).length === 0 && body.constructor === Object){
    return next({message: 'Invalid Query', err: `Body : ${ 'Missing' }`});
  }

  if (method === 'update') {
    if (id !== undefined) {
      controller.update(id, body, (err, results) => {
        if (err) {
          return next({message: `Fail on Update ${collection}`, err: `${collection} not found!`});

        } else {
          return res.status(200).json({message: 'Success', body: results});
        }
      });

    } else {
      return next({message: 'Invalid Query', err: `Missing ${collection} ID`});
    }

  } else {
    return next({message: 'Invalid Query', err: `Invalid Method for PUT Request: ${method}`});
  }
});

/* DELETE */
/*
 Example: http://.../api/user?method=delete&_id=59589...
*/

router.delete('/:collection', (req, res, next) => {
  let collection = req.params.collection,
      method     = req.query.method,
      controller = controllers[collection],
      id         = req.query._id;

  if (controller === undefined) {
    return next({message: 'Invalid Query', err: `Invalid param : ${collection}`});

  } else if (controller[method] === undefined) {
    return next({message: 'Invalid Query', err: `Invalid param : ${method || 'Missing'}`});
  }

  if (method === 'destroy') {
    if (id !== undefined) {
      controller.destroy(id, (err, results) => {
        if (err) {
          return next({message: err.message, err: `${collection} not found!`});
        } else {
          return res.status(200).json({message: (results ? 'Success' : 'Not Found'), body: results});
        }
      });

    } else {
      return res.status(500).json({message: 'fail', err: 'missing id'});
    }
  } else {
    return res.status(500).json({message: 'fail', err: `Invalid Method for DELETE Request: ${method}`});
  }
});

module.exports = router;
