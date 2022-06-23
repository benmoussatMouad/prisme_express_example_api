var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        prisma.associer.findMany().then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.get('/:id', function(req, res, next) {
    try {
        prisma.associer.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                Parking: true,
                Horaire: true
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
        prisma.associer.create({
            data: {
                parkingIdParking: req.body.idParking,
                horaireIdHoraire: req.body.idHoraire
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
        prisma.associer.update({
            where: {
                id: req.params.id
            },
            data: {
                parkingIdParking: req.body.idParking,
                horaireIdHoraire: req.body.idHoraire
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
        prisma.associer.delete({
            where: {
                id: req.params.id
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
