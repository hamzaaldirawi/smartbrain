const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body.body;
    if(!email || !name || !password) {
        return res.json('Failed to register')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    res.json(hash)
    // to connect 2 tables we use transaction and commit
    
    // db.transaction(trx => {
    //     db.insert({
    //         hash: hash,
    //         email: email
    //     })
    //     .into('login')
    //     .returning('email')
    //     .transaction(trx)
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