const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.json('Failed to register')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // to connect 2 tables we use transaction and commit
    res.json(hash)
    // db.transaction(trx => {
    //     trx
    //     .insert({
    //         hash: hash,
    //         email: email
    //     })
    //     .into('login')
    //     .returning('email')
    //     .then(loginEmail => {
    //         db('users')
    //         .returning('*')
    //         .insert({
    //             email: loginEmail[0],
    //             name: name,
    //             joined: new Date()
    //         }).then(user => {
    //             res.json(user[0])
    //         })
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })
    // .catch(err => {
    //     res.status(400).json('Error register')
    // });
}

module.exports = {
    handleRegister
}