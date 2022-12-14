const Article = require("../models/Article");
const { articleListViewModel, articleDetailsViewModel } = require("../utils/mapper/article");
const { Types: { ObjectId } } = require('mongoose');

async function create(title, content, image, jumboImage, category) {
    let article = await getByTitle(title);

    if (article) {
        throw new Error('Title is already taken');
    }

    article = new Article({
        title,
        content,
        image,
        jumboImage,
        category,
    });

    await article.save();

    return article;
}

async function all(take, skip, selectedCategory, searchedQuery) {
    return (await Article
        .find(selectedCategory ? { category: new ObjectId(selectedCategory) } : {})
        .find(searchedQuery ? { title: { "$regex": searchedQuery, "$options": "i" } } : {})
        .populate('category', 'name')
        .sort({ createdAt: -1, title: 1 })
        .skip(skip)
        .limit(take))
        .map(articleListViewModel);
}

async function getTotalCount(selectedCategory, searchedQuery) {
    return (await Article
        .find(selectedCategory ? { category: new ObjectId(selectedCategory) } : {})
        .find(searchedQuery ? { title: { "$regex": searchedQuery, "$options": "i" } } : {}))
        .length;
}

async function getById(id) {
    return articleDetailsViewModel(
        await Article
            .findById(id)
            .populate('category', 'name image'));
}

async function like(id, userId) {
    const article = await Article.findById(id);

    if (article.likes.includes(userId)) {
        const index = article.likes.indexOf(userId);
        article.likes.splice(index, 1);
    } else {
        article.likes.push(userId);
    }

    return article.save();
}

async function getByTitle(title) {
    return await Article
        .findOne({ title })
        .collation({ locale: 'en', strength: 2 });
}

module.exports = {
    create,
    all,
    getTotalCount,
    getById,
    like,
}