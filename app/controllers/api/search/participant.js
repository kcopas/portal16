'use strict';

let apiConfig = rootRequire('app/models/gbifdata/apiConfig'),
    Participant = rootRequire('app/models/node/participant'),
    Fuse = require('fuse.js'),
    Q = require('q'),
    _ = require('lodash'),
    request = require('requestretry'),
    maxPatternLength = 50;


async function get(key, depth) {
    depth = depth || 0;
    let baseRequest = {
        url: apiConfig.participant.url + key,
        timeout: 30000,
        method: 'GET',
        json: true
    };
    let participant = await request(baseRequest);
    if (participant.statusCode > 299) {
        throw participant;
    }
    if (depth > 0) {
        depth--;
        return expand(participant.body, depth);
    } else {
        return participant.body;
    }
}

async function expand(participant) {
    // TODO stub. inteded to expand foreign keys, related etc. datasetKey, constituentDatasetKey, name, references etc
    return participant;
}

async function query(participantName) {
    if (!_.isString(participantName) || maxPatternLength <= participantName.length) {
        return;
    }
    let participants = await Participant.getParticipantsByType('OTHER');

    if (participants.statusCode > 299) {
        throw participants;
    }
    let fuse = new Fuse(participants.results, {
        keys: ['name', 'abbreviatedName'],
        threshold: 0.2,
        distance: 100,
        shouldSort: true,
        tokenize: false,
        matchAllTokens: true,
        includeScore: true,
        maxPatternLength: maxPatternLength
    });

    let participantResults = fuse.search(participantName).filter((p)=>{
 return p.score < 0.3;
}); // TODO how to best handle that fuse don't like pattern longer than around 50 chars

    let pts = await Q.all(_.map(participantResults, (p) =>{
        return Participant.get(p.item.id);
     }));
    let highlights = _.remove(pts, (ptcpt)=>{
        let p = ptcpt.participant;
        return (p.name.toLowerCase() === participantName.toLowerCase() || (p.abbreviatedName && p.abbreviatedName.toLowerCase() === participantName.toLowerCase()));
    });
    let response = {results: pts.slice(0, 4), count: pts.length};
    if (highlights.length > 0) {
        response.highlights = highlights;
    }
    return response;
}

module.exports = {
    get: get,
    query: query
};
