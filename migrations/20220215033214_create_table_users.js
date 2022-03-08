exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('user_key').primary()
        table.string('username').notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.integer('church_key').notNullable()
        table.foreign('church_key').references('church_key').inTable('church')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
