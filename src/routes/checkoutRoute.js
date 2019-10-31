import express from 'express';
import CheckoutController from '../controllers/checkoutController';

const router = express.Router();

router.post('/:id/checkout', CheckoutController.checkoutItem);

export default router;
