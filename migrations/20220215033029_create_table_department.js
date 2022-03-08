exports.up = function(knex) {
    return knex.schema.createTable('department', table => {
        table.increments('department_key').primary()
        table.string('name').notNullable()
        table.string('description').notNullable().unique()
        table.integer('church_key').notNullable()
        table.foreign('church_key').references('church_key').inTable('church')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('department')
};
