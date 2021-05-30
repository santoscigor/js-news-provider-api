const { Model } = require('objection')

class Author extends Model {
    $beforeInsert() {
      this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
      this.updated_at = new Date().toISOString();
    }

    // Table name is the only required property.
    static get tableName() {
      return 'authors'
    }
  
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
      return {
        type: 'object',
        required: ['name', 'userId'],
  
        properties: {
          id: { type: 'uuid' },
          userId: { type: 'uuid' },
          name: { type: 'string', minLength: 1, maxLength: 255 },
          picture: { type: 'string', minLength: 1, maxLength: 255 },
        },
      }
    }

    static get relationMappings() {
        // One way to prevent circular references
        // is to require the model classes here.
        const User = require('./user')
    
        return {
          owner: {
            relation: Model.BelongsToOneRelation,
    
            // The related model. This can be either a Model subclass constructor or an
            // absolute file path to a module that exports one.
            modelClass: User,
    
            join: {
              from: 'authors.userId',
              to: 'users.id',
            },
          },
        }
    }
  }
  
  module.exports = Author