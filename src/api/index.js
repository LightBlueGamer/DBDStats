const express = require("express");
const router = express.Router();

router.use(`/v1`, require(`./router/get.js`));
router.use(`/v1`, require(`./router/post.js`));

module.exports = router;
