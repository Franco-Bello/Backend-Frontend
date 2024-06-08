import { where } from 'sequelize';
import { User } from '../models/User.js'
import { Post } from '../models/Post.js';



export const getPostUser = async (req, res ) => {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where:{id},
            include: {
                model : Post
            }
        });

        //Verificar si el user existe
        if (!user) { return res.status(404).json({ message: 'User not found' });}

        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}




//Metodo GEt a un solo usuario
export const getoneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const oneUser = await User.findByPk(id);

        //Verificar si el user existe
        if (!oneUser) {return res.status(404).json({ message: 'Usuario no encontrado' });}

        res.json(oneUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Get a todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const Users = await User.findAll();

        res.json(Users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Post
export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const newUser = await User.create({
            username,
            email,
            password
        });
    
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    } 
};


//Metodo Put
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        //Verificar si el user existe
        if (!user) {return res.status(404).json({ message: 'Usuario no encontrado' });}

        //Actualizar al usuario
        user.set(req.body)

        //Guardar los cambios
        await user.save();

        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Delete
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        //Verificar si el user existe
        if (!user) {return res.status(404).json({ message: 'Usuario no encontrado' });}

        //Borrar User
        await User.destroy({
            where: {
                id
            }
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};