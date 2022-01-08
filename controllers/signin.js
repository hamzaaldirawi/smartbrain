const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body.body
    if(!email || !password) {
        return res.json('Failed to sign in');
    }
    db.select('email', 'hash').from('login')
    .where('email', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            db.select('*').from('users')
            .where('email', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('Error Signin'));
}

module.exports = {
    handleSignin
}