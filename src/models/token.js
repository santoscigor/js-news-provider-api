import { Model } from "objection";

class Token extends Model {
    // Table name is the only required property.
    static get tableName() {
        return "tokens";
    }
  
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: "object",
  
            properties: {
                id: { type: "integer" },
                isValid: { type: "boolean" },
                userId: { type: "uuid" },
                token: { type: "string", minLength: 1, maxLength: 255 },
            },
        };
    }

    static get relationMappings() {
        // One way to prevent circular references
        // is to require the model classes here.
        const User = require("./user").default;
    
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
    
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one.
                modelClass: User,
    
                join: {
                    from: "tokens.userId",
                    to: "users.id",
                },
            },
        };
    }
}
  
export default Token;