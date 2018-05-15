'use strict';
const express = require('express'),
    router = express.Router(),
    reportRunner = require('gbif-country-reports'),
    log = require('../../../../config/log');

module.exports = (app) => {
    app.use('/api', router);
};

router.get('/country/report/:iso2?', (req, res, next) => {
    let iso2;
    if (req.params.hasOwnProperty('iso2') && req.params.iso2 !== undefined) {
        iso2 = req.params.iso2.toUpperCase();
    }
    let locale = (req.query.locale) ? req.query.locale : 'en';
    try {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Access-Control-Allow-Origin': '*',
            'Content-Disposition': 'attachment; filename=GBIF_CountryReport_' + iso2 + '.pdf'
        });
        reportRunner.runReport({
            countryCode: iso2,
            locale: locale,
            year: req.query.year || 2017,
            targetStream: res
           });
    } catch (err) {
        log.error(err);
        res.sendStatus(422);
    }
});
