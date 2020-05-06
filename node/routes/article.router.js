const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addarticle', authorize([Role.user, Role.admin]), articleController.createArticle);
router.get('/:collection/getarticles', authorize([Role.user, Role.admin]), articleController.getArticles);
router.get('/getuserarticles/:username', authorize([Role.user, Role.admin]), articleController.getUserArticles);
router.get('/:collection/findarticle/:id', authorize([Role.user, Role.admin]), articleController.findArticle);
router.post('/edit/:collection/:id', authorize([Role.user, Role.admin]), articleController.editArticle);
router.delete('/:collection/:date', authorize([Role.user, Role.admin]), articleController.deleteArticle);


module.exports = router;
