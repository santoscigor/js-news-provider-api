# Jungle Devs - Node Challenge #001 👋

## Description

This API is a simplified version of news provider API.

**Challenge goal**: The purpose of this challenge is to give my overall understanding of a backend application. Some of the concepts applied are:

- REST architecture;
- Authentication and permissions;
- Data modeling and migrations;
- SQL database;
- Query optimization;
- Serialization;
- Production builds.

## First steps

1. You'll need Node.JS and PostgreSQL 10
2. Install dependences with `npm install`
3. Set environment variables creating a copy of `.env.example` in `.env`
4. Run `docker-compose up` to start PostgreSQL DB
5. Run `npm run migration:run` to execute last version migration on database
6. Run project with `npm run dev`

## Instructions to create production build

1. Run `npm run build` to create production build
2. Run `npm run prod` to run production build


**Final accomplishment**: By the end of this challenge you’ll have a production ready API.

## Acceptance criteria

- Clear instructions on how to run the application in development mode [X] verified
- Clear instructions on how to create production builds [X] verified
- A good API documentation or collection [X] verified
- Models created using [Objection.js](https://vincit.github.io/objection.js/) [X]
- Login API: `/api/login` [X] verified
- Sign-up API: `/api/sign-up` [X] verified
- Administrator restricted APIs: [X] verified
  - CRUD `/api/admin/authors` [X]
  - CRUD `/api/admin/articles`[X]
- List article endpoint `/api/articles?category=:slug` with the following response: [X] [kind of]
```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```
- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:[X] [kind of]

    **Anonymous**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>"
    }
    ```

    **Logged user**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>",
      "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    }
    ```
