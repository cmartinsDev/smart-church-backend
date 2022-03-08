module.exports = {
	client: 'postgresql',
	connection: {
		database: 'smart_church',
		user: 'postgres',
		password: 'postgres'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
