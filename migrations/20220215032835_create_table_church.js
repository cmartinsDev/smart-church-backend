exports.up = function (knex) {
	return knex.schema.createTable('church', table => {
		table.increments('church_key').primary()
        table.string('name').notNullable()
        table.string('cnpj').notNullable().unique()
        table.date('date_of_birth')
	})
};

exports.down = function (knex) {
	return knex.schema.dropTable('church')
};
