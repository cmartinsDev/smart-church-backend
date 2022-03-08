exports.up = function(knex) {
    return knex.schema.createTable('department_leader', table => {
        table.increments('department_leader_key').primary()
        table.integer('department_key')
        table.integer('leader_key')
        table.foreign('department_key').references('department_key').inTable('department')
        table.foreign('leader_key').references('leader_key').inTable('leader')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('department_leader')
};
