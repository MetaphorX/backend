import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) =>{
    res.send({title:'Get all Users'})
})

//Get single user
userRouter.get('/:id', (req, res) =>{
    res.send({title:'Get single Users'})
})

userRouter.post('/', (req, res) =>{
    res.send({title:'Create a  Users'})
})

userRouter.put('/:id', (req, res) =>{
    res.send({title:'Update a User'})
})

userRouter.delete('/:id', (req, res) =>{
    res.send({title:'Get all Users'})
})

export default userRouter