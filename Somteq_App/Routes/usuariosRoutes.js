const { Router } = require('express');
const UsuariosController = require('../Controller/usuariosController');

const usuariosRouter = Router();

usuariosRouter.get('/', UsuariosController.getAll);
usuariosRouter.get('/:id', UsuariosController.getById);
usuariosRouter.post('/', UsuariosController.create);
usuariosRouter.put('/:id', UsuariosController.update);
usuariosRouter.delete('/:id', UsuariosController.delete);

module.exports = usuariosRouter;
