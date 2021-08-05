const express = require('express');
const router = express.Router();
require('path');


router.get('/', (req, res) => {

    res.render("index");

});


module.exports = router;
