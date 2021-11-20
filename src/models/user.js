import { Model } from "objection";

class User extends Model {
    // Table name is the only required property.
    static get tableName() {
        return "users";
    }
  
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["username", "password"],
  
            properties: {
                id: { type: "uuid" },
                isAdmin: { type: "boolean" },
                username: { type: "string", minLength: 1, maxLength: 255 },
                picture: { type: "string", minLength: 1, maxLength: 255 },
            },
        };
    }
}
  
export default User;