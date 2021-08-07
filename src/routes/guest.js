const express = require('express');
const router = express.Router();
require('path');


router.get("", (req, res) =>{
    res.render('index', {userId: null});
})

module.exports = router;
