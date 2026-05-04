import express from 'express';
import { deleteThings, getThings, updateThings, uploadThings } from '../controller/pantryController.js';

const router = express.Router();

router.get("/",getThings);
router.post("/",uploadThings);
router.put("/:id",updateThings);
router.delete("/:id",deleteThings);

export default router;