// backend\routes\accountRoute.js
import express from "express";
import {
  deposit,
  withdraw,
  transfer,
  viewBalance,
  miniStatement,
} from "../controllers/accountController.js";

const router = express.Router();
console.log(`At Account Route`);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);
router.get("/balance/:userId", viewBalance);
router.get("/mini-statement/:userId", miniStatement);

export default router;
