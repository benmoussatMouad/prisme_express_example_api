var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', function(req, res, next) {
    try {
        prisma.parking.findMany({
            include:{
                HistoriqueParking:{
                    take:1,
                    select:{
                        nombrePlace:true,
                    },
                    orderBy: {
                        idHistoriqueParking: 'desc',
                      }
                }
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
        prisma.parking.findUnique({
            where: {
                idParking: req.params.id
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
        prisma.parking.create({
            data: {
                nomParking: req.body.nomParking,
                tauxOccupation: req.body.tauxOccupation,
                tarifHeure: req.body.tarifHeure,
                adresseParking: req.body.adresseParking,
                nombrePlaceMax: req.body.nombrePlaceMax,
                commune: req.body.commune,
                etat: req.body.etat
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
        prisma.parking.update({
            where: {
                idParking: req.params.id
            },
            data: {
                nomParking: req.body.nomParking,
                tauxOccupation: req.body.tauxOccupation,
                tarifHeure: req.body.tarifHeure,
                adresseParking: req.body.adresseParking,
                nombrePlaceMax: req.body.nombrePlaceMax,
                commune: req.body.commune,
                etat: req.body.etat
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
        prisma.parking.delete({
            where: {
                idParking: req.params.id
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
