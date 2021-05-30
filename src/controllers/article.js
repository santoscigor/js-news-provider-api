import Article from "../models/article";
import { v4 as uuid } from "uuid";
import Author from "../models/author";

export async function getArticles(req, res) {
  const { category } = req.query;

  const categoryParse = category ? String(category) : null;

  try {
    const articles = await Article.query()
      .select("authors.name","authors.picture","category", "title", "summary")
      .where(builder => {
        if(categoryParse){
          builder.where("category", "=", categoryParse);
        }
      })
      .innerJoin("authors", "authors.id", "=", "articles.author_id")

    return res.status(200).send(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: `There were an error when trying to get Article` });
  }
}

export async function getArticleDetail(req, res) {
  const { id } = req.params;

  try {
    const user = req.user;
    let articles;

    if(user){
      articles = await Article.query()
        .findById(id)
        .select("authors.name","authors.picture","category", "title", "summary", "firstParagraph", "body")
        .innerJoin("authors", "authors.id", "=", "articles.author_id");
    } else {
      articles = await Article.query()
        .findById(id)
        .select("authors.name","authors.picture","category", "title", "summary", "firstParagraph")
        .innerJoin("authors", "authors.id", "=", "articles.author_id");
    }

    return res.status(200).send(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: `There were an error when trying to get Article` });
  }
}

export async function getArticle(req, res) {
  const { title, summary, category } = req.query;

  const categoryParse = category ? String(category) : null;
  const summaryParse = summary ? String(summary) : null;
  const titleParse = title ? String(title) : null;

  try {
    const articles = await Article.query()
      .select("articles.*")
      .where(builder => {
        if(categoryParse){
          builder.where("category", "=", categoryParse);
        }
        if(titleParse){
          builder.where("title", "=", titleParse);
        }
        if(summaryParse){
          builder.where("summary", "=", summaryParse);
        }
      })

    return res.status(200).send(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: `There were an error when trying to get Article` });
  }
}

export async function createArticle(req, res) {
  const input = req.body;

  try {

    const author = await Author.query().findById(input.authorId);

    if (!author) {
        res.status(404).send({ error: "Author not found." });
    }

    const createdArticle = await Article.query().insert({
      id: uuid(),
      authorId: input.authorId,
      category: input.category,
      title: input.title,
      summary: input.summary,
      firstParagraph: input.firstParagraph,
      body: input.body,
    });

    return res.status(200).send(createdArticle);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: `errorMessages.Fatal.admin.post` });
  }
}

export async function updateArticle(req, res) {
  const { id } = req.params;
  const input = req.body;

  try {
    const article = await Article.query()
      .patchAndFetchById(id, {
        category: input.category,
        title: input.title,
        summary: input.summary,
        firstParagraph: input.firstParagraph,
        body: input.body,
      });

    if (!article) {
      return res.status(404).send({ error: `errorMessages.NotFound.article` });
    }

    return res.status(200).send(article);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: `errorMessages.Fatal.article.post` });
  }
}

export async function deleteArticle(req, res) {
  const { id } = req.params;

  try {
    const deletedArticleNumber = await Article.query().deleteById(id);

    return res.status(200).send({ message: `${deletedArticleNumber} articles deleted.`});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: `errorMessages.Fatal.article.post` });
  }
}
