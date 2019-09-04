//post de prueba , borrar

const router = require('express').Router();
const verify = require('./verifyToken');


// verify added as middleware and you can verify this from the verifyToken.js file
router.get('/',verify ,(req, res) => {
    res.json({ posts: { title: 'test post', desc: 'asd' } })
})

module.exports = router;