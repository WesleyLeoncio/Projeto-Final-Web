const bcrypt = require('bcrypt-nodejs'); // responsavel pela criptografia

module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation;

    const encryptPassword = password =>{ //responsavel por criptografar as senhas
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    const save = async(req, res) =>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id;

        // previne que qualquer um se cadastre como admim
        if(!req.originalUrl.startsWith('/users')) user.admin = false;
        if(!req.user || !req.user.admin) user.admin = false;

        try{
            existsOrError(user.name, 'Nome não informado');
            existsOrError(user.email, 'E-mail não informado');
            existsOrError(user.password, 'Senha não informada');
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')
            
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password); //criptografar as senhas
        delete user.confirmPassword;

        if(user.id){  //  UPDATE 
            app.db('users')
                .update(user)
                .where({ id: user.id})
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }else{
            app.db('users') // INSERT
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const get = (req, res) =>{ // SELECT
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .whereNull('deletedAt')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) =>{ // SELECT
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .where({ id: req.params.id})
        .whereNull('deletedAt')
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
    }


    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}
