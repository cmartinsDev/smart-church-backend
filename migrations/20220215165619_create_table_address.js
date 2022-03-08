

exports.up = function (knex) {
	return knex.schema.createTable('address', table => {
		table.increments('address_key').primary()
        table.string('street').notNullable()
        table.integer('number').notNullable().unique()
        table.integer('zipcode').notNullable()
        table.string('city').notNullable()
        table.string('estate').notNullable()
        table.string('country').notNullable()
        table.integer('church_key').notNullable()
        table.foreign('church_key').references('church_key').inTable('church')  
	})
};

exports.down = function (knex) {
	return knex.schema.dropTable('address')
};
