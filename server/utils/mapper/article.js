const { categoryNameViewModel } = require("./category");

function articleViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        shortContent: article.content.slice(0, 200) + '...',
        image: article.image,
        category: categoryNameViewModel(article.category),
        createdAt: createdAtViewModel(article.createdAt),
    };
}

function createdAtViewModel(createdAt) {
    return createdAt.getDate()
        + '/'
        + createdAt.getMonth()
        + '/'
        + createdAt.getFullYear().toString().substr(-2);
}

module.exports = {
    articleViewModel,
}