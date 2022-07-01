var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', function(req, res, next) {
    try {
        prisma.historiqueParking.findMany({
            take:1,
            orderBy: {
                idHistoriqueParking: 'desc',
              }
        }).then(historique => {
            res.json(historique);
        })
    } catch (e) {
        console.log(e);
        res.status(502)
    }
});

module.exports = router;
