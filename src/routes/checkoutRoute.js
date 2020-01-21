import express from 'express';
import CheckoutController from '../controllers/checkoutController';

const router = express.Router();

router.post('/:id/checkout', CheckoutController.checkoutItem);
router.put('/:id/checkout/:id', CheckoutController.editCheckout);

export default router;
