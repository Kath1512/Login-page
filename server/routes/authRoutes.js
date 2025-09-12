const { login, register, authenticateToken, getProfile, getNewAccessToken, getAllUsers, setAvatar } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/myProfile', authenticateToken, getProfile);
router.post("/refresh", getNewAccessToken);
router.get("/allUsers", getAllUsers);
router.post("/set-avt", setAvatar);

module.exports = router;