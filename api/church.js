module.exports = app => {

    const save = (req, res) => {
        app
        .database('church')
        .insert({ 
            'name': req.body.name,
            'cnpj': req.body.cnpj,
            'date_of_birth': req.body.dateBirth
        })
        .then(_ => res.status(204).send())
        .catch(err => {
            res.status(400).send(err.detail)
            console.log(err)
        })
    }

    const churchs = (req, res) => {
        app.database('church')
            .select('church.*', 'address.*')
            .from('church')
            .join('users as u', 'church.church_key', '=', 'u.church_key')
            .join('address', 'church.church_key', '=', 'address.church_key')
            .where({ 'user_key': req.params.user })
        .then(churchs => res.status(200).json(churchs))
        .catch(err => res.status(400).send(err))
    }
    
    return { save, churchs }
}