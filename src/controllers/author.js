import Author from "../models/author";
import { v4 as uuid } from "uuid";

export async function getAuthors(req, res) {
    const { name } = req.query;

    const nameParse = name ? String(name) : null;

    try {
        const authors = await Author.query()
            .select("authors.*")
            .where(builder => {
                if(nameParse){
                    builder.where("name", "=", nameParse);
                }
            });

        return res.status(200).send(authors);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "There were an error when trying to get Article" });
    }
}

export async function createAuthor(req, res) {
    const input = req.body;

    try {
        const createdAuthor = await Author.query().insert({
            id: uuid(),
            name: input.name,
            picture: input.picture,
            userId: input.userId,
        });

        return res.status(200).send(createdAuthor);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "errorMessages.Fatal.admin.post" });
    }
}

export async function updateAuthor(req, res) {
    const { id } = req.params;
    const input = req.body;

    try {
        const author = await Author.query()
            .patchAndFetchById(id, {
                name: input.name,
                picture: input.picture,
            });

        if (!author) {
            return res.status(404).send({ error: "errorMessages.NotFound.author" });
        }

        return res.status(200).send(author);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "errorMessages.Fatal.author.post" });
    }
}

export async function deleteAuthor(req, res) {
    const { id } = req.params;

    try {
        const deletedAuthorsNumber = await Author.query().deleteById(id);

        return res.status(200).send({ message: `${deletedAuthorsNumber} authors deleted.`});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "errorMessages.Fatal.author.post" });
    }
}
