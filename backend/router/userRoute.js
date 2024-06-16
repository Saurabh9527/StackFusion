
import express from 'express';
import { Form } from '../controllers/user.js';

const router = express.Router();

router.route('/user-form').post(Form);

export default router;