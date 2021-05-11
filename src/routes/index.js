const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.redirect('')
    res.redirect('/links')
});

module.exports = router;