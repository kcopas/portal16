"use strict";
let express = require('express'),
    nunjucks = require('nunjucks'),
    fs = require('fs'),
    log = rootRequire('config/log'),
    router = express.Router(),
    issueTemplateString = fs.readFileSync(__dirname + '/metadata.nunjucks', "utf8");

module.exports = function (app) {
    app.use('/api/datarepo', router);
};

router.get('/metadata', function (req, res) {
    res.send(getDescription(req.form));
});



function getDescription(data) {
    //transform data if needed and return the rendered template
    return nunjucks.renderString(issueTemplateString, data);
}


