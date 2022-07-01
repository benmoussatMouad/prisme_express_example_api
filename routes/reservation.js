var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require('@prisma/client');
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    prisma.reservation.findMany().then(users => {
      res.json(users);
    })
  } catch (e) {
    console.log(e);
    res.status(502)
  }
});

router.get('/:selector', function(req, res, next) {
  try {
    if (req.query.type == "id")
    {
        prisma.reservation.findUnique({
        where: {
          numReservation: req.params.selector
        }}
      ).then(users => {
        res.json(users);
      })
    }
    if (req.query.type == "parking") {
      prisma.reservation.findMany({
        where: {
          idParking: parseInt(req.params.selector)
        }}
      ).then(users => {
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
    prisma.reservation.create({
      data: {
        dateReservation: new Date(req.body.dateReservation),
        heureEntre: req.body.heureEntre,
        heureSortie: req.body.heureSortie,
        numPlaceParking: req.body.numPlaceParking,
        paye:req.body.paye,
        idParking: req.body.idParking,
        idCompte: req.body.idCompte
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
    prisma.reservation.update({
      where: {
        idCompte: req.params.id
      },
      data: {
        dateReservation: req.body.dateReservation,
        heureEntre: req.body.heureEntre,
        heureSortie: req.body.heureSortie,
        numPlaceParking: req.body.numPlaceParking,
        codeQr: req.body.codeQr,
        paye:req.body.paye
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
    prisma.compte.delete({
      where: {
        idCompte: req.params.id
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