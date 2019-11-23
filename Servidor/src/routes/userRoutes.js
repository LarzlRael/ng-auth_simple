const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
// importtando el modelo de la bae de datos
const userModel = require('../models/UserModel')
router.get('/', (req, res) => {
    res.send('hola desde el enrutador de express xd')
});

// rutas post

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    const NewUser = new userModel({
        email,
        password
    });

    await NewUser.save();
    const token = jwt.sign({ _id: NewUser._id }, 'secretkey');
    return res.status(200).json({ token });
})


router.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send('the email does not exists');
    }
    if (user.password !== password)
        return res.status(401).send('the password is wrong');

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });


})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: "task One ",
            descripcion: "que weba",
            date: Date.now()
        },
        {
            _id: 2,
            name: "task two ",
            descripcion: "que weba xd",
            date: Date.now()
        },
        {
            _id: 3,
            name: "task trhee ",
            descripcion: "que we",
            date: Date.now()
        }

    ])
})

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: "task One",
            descripcion: "que weba",
            date: Date.now()
        },
        {
            _id: 2,
            name: "task two ",
            descripcion: "que weba xd",
            date: Date.now()
        },
        {
            _id: 3,
            name: "task trhee ",
            descripcion: "que we",
            date: Date.now()
        }

    ])
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorize token')
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token == null) {
        return res.status(401).send('unauthorize request')
    }

    const payload = jwt.verify(token, 'secretkey')
    console.log(payload);
    req.userId = payload._id;

    next();
}

module.exports = router;
