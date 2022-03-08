
module.exports = app => {
    const save = (req, res) => {
        app.database('address')
        .insert({
            'street': req.body.street,
            'number': req.body.number,
            'zipcode': req.body.zipcode,
            'city': req.body.city,
            'estate': req.body.estate,
            'country': req.body.country,
            'church_key': req.body.churchKey
        })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).send(err.detail))
    }

    return { save }
}