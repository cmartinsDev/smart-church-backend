exports.up = function(knex) {
    return knex.schema.createTable('leader', table => {
        table.increments('leader_key').primary()
        table.date('start_date') 
        table.date('end_date')
        table.integer('member_key').notNullable()
        table.foreign('member_key').references('member_key').inTable('member')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('leader')
};
