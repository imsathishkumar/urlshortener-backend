const mergeController = require('../controllers/mergeController');
const PostController = require('../controllers/postController')

const router = require('express').Router()


router.route('/url').post(PostController)
router.route('/get').get(mergeController)

module.exports = router;