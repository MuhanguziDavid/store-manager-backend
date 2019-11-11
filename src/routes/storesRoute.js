import express from 'express';
import StoresController from '../controllers/storesController';

const router = express.Router();

router.post('/stores', StoresController.createStore);
router.get('/stores', StoresController.retrieveStores);
router.put('/stores/:id', StoresController.editStores);
router.delete('/stores/:id', StoresController.deleteStore);

export default router;
