## KNEX
### HOW TO CREATE TABLE 
- knex migrate:make create_table_<tablename>

### RUN MIGRATION
- knex migrate:latest

### RUN ROLLBACK
- knex migrate:rollback


# SMART CHURCH API
### SIGN-UP
- URL: /smart-church-api/signup
- METHOD: POST
- BODY: { "username": value, "email": , "password": value , "churchKey": value }

### SIGN-IN
- URL: /smart-church-api/signIn
- METHOD: POST
- BODY: { "username": value, "password": value }
{ "email": value, "password": value }

### LIST ALL USERS FROM APP
- URL: /smart-church-api/users
- METHOD: GET

### LIST USERS FROM CHURCH
- URL: smart-church-api/list-users-from-church/:church
- METHOD: GET
- PARAMS: CHURCH_KEY

### ADD CHURCH
- URL: smart-church-api/church
- METHOD: POST
- BODY: { "name": value, "cnpj": value, "dateBirth": value }


### ADD ADDRESS
- URL: /smart-church-api/add-address
- METHOD: POST
- BODY: 
{ "street": value, "number": value, "zipcode": value, "estate": value, "city": value,"country": value "churchKey": value }
