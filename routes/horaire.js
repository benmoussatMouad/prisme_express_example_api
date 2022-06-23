var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/:idParking', function(req, res, next) {
    try {
        prisma.associer.findMany({
            select:{
                horaireIdHoraire:true
            },
            where: {
                parkingIdParking: parseInt(req.params.idParking)
            }
        }).then(associer => {
            var temp = []
            for (let index = 0; index < associer.length; index++) {
                temp[index] = (associer[index].horaireIdHoraire);
                
            }
            prisma.horaire.findMany({
                where: {
                    idHoraire: { in: temp }
                }
            })
            .then(horaires => {
                res.json(horaires);
            })
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.get('/', function(req, res, next) {
    try {
        prisma.horaire.findMany().then(users => {
            res.json(users);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

router.get('/:id', function(req, res, next) {
    try {
        prisma.horaire.findUnique({
            where: {
                idHoraire: req.params.id
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
        prisma.horaire.create({
            data: {
                horaireOuverture: req.body.horaireOuverture,
                horaireFermeture: req.body.horaireFermeture,
                jour: req.body.jour
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
        prisma.horaire.update({
            where: {
                idHoraire: req.params.id
            },
            data: {
                horaireOuverture: req.body.horaireOuverture,
                horaireFermeture: req.body.horaireFermeture,
                jour: req.body.jour
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
        prisma.horaire.delete({
            where: {
                idHoraire: req.body.id
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
