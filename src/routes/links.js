const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { tittle, url, description } = req.body;
    const newLink = {
        tittle,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash("success", "Link Saved Successfully");
    res.redirect('/links')
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash("success", "Link Deleted Successfully");
    res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id])
    res.render('links/edit', {link: links[0]});
});
(
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { tittle, url, description } = req.body;
    const editedLink = {
        tittle,
        url,
        description
    };
    const links = await pool.query('UPDATE links set ? WHERE id = ?', [editedLink, id]);
    req.flash("success","Link Edited");
    //req.flash("message", "Incorrect Password");
    res.redirect('/links')
}));

module.exports = router;