//import { promises as fs } from 'fs';
import express from 'express';
import {getAllData} from './database/db.js';

export const router = express.Router();

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}



/**
 * Route handler sem birtir lista af myndböndum.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function index(req, res) {
    let data = getAllData()

    data.then((data)=>{

        res.render('index', { data });
    })
 
}


router.get('/', catchErrors(index));
//router.get('/:id', catchErrors(video));