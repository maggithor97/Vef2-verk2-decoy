import express from 'express';
import { getAllData } from './database/db.js';


export const router = express.Router();

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 * Fall fengið frá sýnilausn á v1 frá Óla 
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Athugar hvort kt sé nú þegar í gagnagrunninum.
 * Skilar true ef svo er, annars false
 * @param {string} kt 10 stafa kennitala
 */
export async function isRegistered(kt) {
    let data = getAllData()
    data.then((data) => {
        let ret = false;
        data.forEach(person => {
            if (kt === person.nationalid) {
                return true;
            }
        });
        return ret;
    })

}

/**
 * Route handler sem formið og undirskirftirnar
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function index(req, res) {
    let data = getAllData()

    data.then((data) => {
        res.render('index', { data });
    })

}


router.get('/', catchErrors(index));
