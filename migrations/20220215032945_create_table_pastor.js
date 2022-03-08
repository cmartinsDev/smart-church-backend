

exports.up = function (knex) {
	return knex.schema.createTable('pastor', table => {
		table.increments('pastor_key').primary()
        table.string('name').notNullable()
        table.string('cpf').notNullable().unique()
        table.date('date_of_birth').notNullable()
        table.date('date_ordination')
        table.string('level')
        table.integer('church_key')
        table.foreign('church_key').references('church_key').inTable('church')
	})
};

exports.down = function (knex) {
	return knex.schema.dropTable('pastor')
};
