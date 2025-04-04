import express, { Router } from 'express';
import { handler } from './api.js';

const router = Router();

/*==========SERVER EXPRESS========== */

router.post('/recipe', handler);

export default router;