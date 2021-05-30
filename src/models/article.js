const { Model } = require('objection');

class Article extends Model {
    $beforeInsert() {
      this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
      this.updated_at = new Date().toISOString();
    }

    // Table name is the only required property.
    static get tableName() {
      return 'articles'
    }
  
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
      return {
        type: 'object',
        required: ['authorId'],
  
        properties: {
          id: { type: 'uuid' },
          authorId: { type: 'uuid' },
          category: { type: 'string', minLength: 1, maxLength: 255 },
          title: { type: 'string', minLength: 1, maxLength: 255 },
          summary: { type: 'string', minLength: 1, maxLength: 255 },
          firstParagraph: { type: 'string', minLength: 1, maxLength: 255 },
          body: { type: 'string', minLength: 1, maxLength: 255 },
        },
      }
    }
  
    // This object defines the relations to other models.
    static get relationMappings() {
      // One way to prevent circular references
      // is to require the model classes here.
      const Author = require('./author')
  
      return {
        owner: {
          relation: Model.BelongsToOneRelation,
  
          // The related model. This can be either a Model subclass constructor or an
          // absolute file path to a module that exports one.
          modelClass: Author,
  
          join: {
            from: 'articles.authorId',
            to: 'author.id',
          },
        },
      }
    }
  }
  
  module.exports = Article