var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        prisma.noter.findMany({
            include: {
                Parking: true,
                Compte: true
            }
        }).then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.get('/:id', function(req, res, next) {
    try {
        prisma.noter.findUnique({
            where: {
                idNote: req.params.id
            },
            include: {
                Parking: true,
                Compte: true,
            }
        }).then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.post('/', function(req, res, next) {
    try {
        prisma.noter.create({
            data: {
                note: req.body.note,
                commentaire: req.body.commentaire,
                compteIdCompte: req.body.compteIdCompte,
                parkingIdParking: req.body.parkingIdParking

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
        prisma.noter.update({
            where: {
                idNote: req.params.id
            },
            data: {
                note: req.body.note,
                commentaire: req.body.commentaire,
                compteIdCompte: req.body.idCompte,
                parkingIdParking: req.body.idParking
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
        prisma.noter.delete({
            where: {
                idNote: req.params.id
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
