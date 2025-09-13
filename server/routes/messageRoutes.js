const { addMessage, getMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessage);

module.exports = router;