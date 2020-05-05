const db = require('../_helpers/database');


module.exports = {
    createArticle,
    getArticles,
    findArticle,
    editArticle,
    deleteArticle
};

function getCollection(collectionName) {
    collectionName = collectionName.toLowerCase();

    if (collectionName === "recipes")
        return db.Recipes;
    else if (collectionName === "discussions")
        return db.Discussions;
    else if (collectionName === "concepts")
        return db.Concepts;
    else
        return null;
}

async function createArticle(article, collectionName) {

    let collection = getCollection(collectionName);

    console.log(collectionName, "----",  collection);

    if (!collection)
        return { result: 'could not find collection' };

    // validate
    if (await collection.findOne({ createdBy: article.createdBy, createdDate: article.createdDate  })) {
        throw 'article created by"' + article.createdBy +" on "+ article.createdDate +'" already exists';
    }
    else if(!article.createdBy){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    console.log('***************************************************');
    console.log('in db service ', article);

    dbrecord = new collection(article);


    // save the record
    await dbrecord.save();

    return { result: 'Article Added Successfully' }

}

async function getArticles(collectionName){

    console.log(' in service get ', collectionName);

    let collection = getCollection(collectionName);

    if (!collection)
        return { result: 'could not find collection' };

    let articles = await collection.find({}).populate('createdBy');

    console.log(articles);

    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(articles);
        },10);

    });
}

async function findArticle(collectionName, id){

    let collection = getCollection(collectionName);

    if (!collection)
        return { result: 'could not find collection' };

    let article = await collection.findById(id).populate('createdBy');


    console.log(article);
    if (article) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(article);
            },10);

        });
    }
    else {
        return { result: 'could not find article' };
    }

}

async function editArticle(collectionName, id, userID, article) {

    let collection = getCollection(collectionName);

    if (!collection)
        return { result: 'could not find collection' };

    console.log('in service ', id, userID, article);

    let updateArticle = await collection.findById(id);

    updateArticle.title = article.title;
    updateArticle.description = article.description;
    updateArticle.body = article.body;
    updateArticle.ingredients = article.ingredients;
    updateArticle.instructions = article.instructions;
    updateArticle.image = article.image;
    updateArticle.tags = article.tags;

    await updateArticle.save();

    return { res: 'success', newPA: updateArticle }
}

async function deleteArticle(collectionName, date, userID) {

    let collection = getCollection(collectionName);

    if (!collection)
        return { result: 'could not find collection' };

    let deletedArticle = await collection.findOne({ createdBy: userID, createdDate: date });

    console.log(deletedArticle);

    if (deletedArticle) {
        collection.deleteOne({ createdBy: userID, createdDate: date }, function (err) {
            if (err){
                console.log('delete article of other user');
                return { result: 'Can not delete article of other user' };
            }
        });
    }

    return deletedArticle;
}