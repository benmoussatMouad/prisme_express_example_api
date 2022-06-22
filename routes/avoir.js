var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        prisma.avoir.findMany({
            include: {
                Compte:true,
                Reservation: true,
                Parking: true
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
        prisma.compte.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                Parking: true,
                Reservation: true,
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

router.post('/', function(req, res, next) {
    try {
        prisma.avoir.create({
            data: {
                compteIdCompte: req.body.idCompte,
                reservationNumReservation: req.body.idReservation,
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

router.put('/:id', function(req, res, next) {
    try {
        prisma.avoir.update({
            where: {
                id: req.params.id
            },
            data: {
                compteIdCompte: req.body.idCompte,
                reservationNumReservation: req.body.idReservation,
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
        prisma.avoir.delete({
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
