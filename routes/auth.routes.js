import { Router } from "express";
import { signOut, signIn, signUp } from "../controller/auth.controller.js";

const authRouter = Router()


authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.post('/sign-out', signOut)

export default authRouter