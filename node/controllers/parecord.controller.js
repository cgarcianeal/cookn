const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};


function createPArecord(req, res, next) {
    parecordService.addPArecord(req.body, req.body.createdBy)
        .then(parecord => res.json(parecord))
        .catch(err => next(err));
}

//TODONE: finish this middleware function. Hint: it uses 'getAllPArecords' from 'parecordService'
function getPArecords(req,res,next){

    parecordService.getAllPArecords()
        .then(parecords => res.json(parecords))
        .catch(err => next('DB is empty'));
}

//TODONE: finish this middleware function. Hint: it uses 'deletePArecord' from 'parecordService'
function deletePArecord(req,res,next){
    let date;
    if (req.url.length > 1)
        date = req.url.slice(1);

    let userID = req.user.sub;

    console.log('in the controllers', date, userID);

    parecordService.deletePArecord(date, userID)
        .then(parecord => res.json(parecord))
        .catch(err => next('Cannot delete PARecord of another asdfasdfa user'));
}
