const articleService = require('../services/article.service');

module.exports = {
    createArticle,
    getArticles,
    findArticle,
    editArticle,
    deleteArticle
};

function createArticle(req, res, next) {
    articleService.createArticle(req.body.article, req.body.collection)
        .then(article => res.json(article))
        .catch(err => next(err));
}

function getArticles(req,res,next){
    let collection;
    if (req.url.length > 1) {
        collection = req.url.split('/')[1];
    }

    articleService.getArticles(collection)
        .then(articles => res.json(articles))
        .catch(err => next(err));
}

function findArticle(req,res,next){
    let collection, id;
    if (req.url.length > 1) {
        collection = req.url.split('/')[1];
        id = req.url.split('/')[3];
    }

    articleService.findArticle(collection, id)
        .then(articles => res.json(articles))
        .catch(err => next(err));
}

function editArticle(req, res, next) {
    let userID = req.user.sub;
    let collection, id;
    if (req.url.length > 4) {
        collection = req.url.split('/')[2];
        id = req.url.split('/')[3];
    }

    articleService.editArticle(collection, id, userID, req.body)
        .then(article => res.json(article))
        .catch(err => next(err));
}

function deleteArticle(req,res,next){

    let userID = req.user.sub;
    let collection, date;
    if (req.url.length > 1) {
        collection = req.url.split('/')[1];
        date = req.url.split('/')[2];
    }

    articleService.deleteArticle(collection, date, userID)
        .then(article => res.json(article))
        .catch(err => next(err));
}

