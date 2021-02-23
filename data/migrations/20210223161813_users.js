
exports.up = function(knex) {
  return knex.schema
  .createTable("users", table =>{
      table.increments()
      table.string("username",12).unique().notNullable().index()
      table.string("password",16).notNullable()     
})}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
}
