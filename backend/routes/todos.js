const Router = require('koa-router');
const router = new Router();
const { findAll, create, update, destroy } = require('../controllers/todos');

router.get('/', findAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router.routes();
