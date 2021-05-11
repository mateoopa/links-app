const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.redirect('')
    res.redirect('/signin')
});

module.exports = router;