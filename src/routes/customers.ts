import express from "express";
import {
	createCustomer,
	deleteCustomer,
	getCustomers,
	updateCustomer,
} from "../modules/customers/customer.controller";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;