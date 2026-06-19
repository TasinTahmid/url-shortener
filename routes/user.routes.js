import express from "express";
import db from "../db";
import { usersTable } from "../models/user.model";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";
import { signupPostRequestBodySchema } from "../validations/request.validation";

const router = express.Router();

router.post("/signup", async (req, res) => {
	const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

	if(validationResult.error) {
		return res.status(400).json({ error: validationResult.error.message });
	}

	const { firstname, lastname, email, password } = validationResult.data;

	const [exitingUser] = db
		.select({ id: usersTable.id })
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (exitingUser)
		return res
			.status(400)
			.json({ error: "User already exists with this email!" });

	const salt = randomBytes(256).toString("hex");
	const hashedPassword = createHmac("sha256", salt)
		.update(password)
		.digest("hex");

	const [user] = await db
		.insert(usersTable)
		.values({
			email,
			firstname,
			lastname,
			salt,
			password: hashedPassword,
		})
		.returning({
			id: usersTable.id,
		});

	return res
		.status(201)
		.json({
			data: { userId: user.id },
			message: "User created successfully!",
		});
});

export default router;
