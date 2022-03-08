
exports.up = function(knex) {
    return knex.schema.createTable('member', table => {
        table.increments('member_key').primary()
        table.string('name').notNullable()
        table.string('cpf').notNullable().unique()
        table.date('date_of_birth')
        table.string('telphone')
        table.integer('church_key').notNullable()
        table.foreign('church_key').references('church_key').inTable('church')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('member')
};
