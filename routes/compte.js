var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        prisma.compte.findMany().then(users => {
            res.send(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.get('/:selector', function(req, res, next) {
    try {
        if (req.query.type == "id"){
            prisma.compte.findUnique({
                where: {
                    idCompte: req.params.selector
                }
            }).then(users => {
                res.json(users);
            })
        }

        if (req.query.type == "email") {
            prisma.compte.findUnique({
                where: {
                    email: req.params.selector
                }
            }).then(users => {
                res.json(users);
            })
        }
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.post('/', function(req, res, next) {
    try {
        prisma.compte.create({
            data: {
                email: req.body.email,
                numDelephone: req.body.numDelephone,
                motDePasse: req.body.motDePasse,
                motDePasseCompte: req.body.motDePasseCompte,
            }
        }).then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.put('/:id', function(req, res, next) {
    try {
        prisma.compte.update({
            where: {
                numReservation: req.params.id
            },
            data: {
                email: req.body.email,
                numDelephone: req.body.numDelephone,
                motDePasse: req.body.motDePasse,
                motDePasseCompte: req.body.motDePasseCompte,
            }
        }).then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.delete('/:id', function(req, res, next) {
    try {
        prisma.reservation.delete({
            where: {
                numReservation: req.params.id
            }
        }).then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

module.exports = router;
