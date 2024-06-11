//Importamos los modelos 
import { User } from '../models/User.js'
import { Post } from '../models/Post.js';

//Metodo de sequelize
import { where } from 'sequelize';

//Importamos bcrypt para hashear las contraseñas
import bcrypt from 'bcrypt';


//Obtener todas las Post de un User
export const getPostUser = async (req, res ) => {
    try {
        const { id } = req.params

        // Validar que el ID proporcionado sea un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        const user = await User.findOne({
            //Busco por el ID
            where:{id},
            //Excluyo los campos que quiero
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            //Pido los campos del modelos Post
            include: {
                model : Post,
                attributes: ['id', 'content']
            }
        });

        //Verificar si el user existe
        if (!user) { return res.status(404).json({ message: 'Post de usuario no encontradas' });}

        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo GEt a un solo usuario
export const getoneUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos el usuario por su ID
        const oneUser = await User.findByPk(id);

        //Verificar si el user existe
        if (!oneUser) {return res.status(404).json({ message: 'Usuario no encontrado' });}

        res.json({
            id: oneUser.id,
            username: oneUser.username,
            email: oneUser.email
            // No retornar la contraseñ
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Get a todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const Users = await User.findAll({
            // Excluir el campo 'password' de la respuesta
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } 
        });

        //Respuesta sin password y otros campos
        res.json(Users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Post
export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body

        // Verificar si el username ya existe
        const existingUserByUsername = await User.findOne({ 
            where: { username } 
        });

        if (existingUserByUsername) { return res.status(400).json({ message: 'Username ya existe' }); }

        // Verificar si el email ya existe
        const existingUserByEmail = await User.findOne({ 
            where: { email } 
        });
        
        if (existingUserByEmail) { return res.status(400).json({ message: 'Email ya existe' }); }


        // Hashing de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);


        //Crear el nuevo User
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
    
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
            // No retornar la contraseña
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    } 
};


//Metodo Put
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos un User por su ID
        const user = await User.findByPk(id);

        //Verificar si el user existe
        if (!user) {return res.status(404).json({ message: 'Usuario no encontrado' });}


        // Verificar si el nuevo username ya existe en otro usuario
        if (username && username !== user.username) {
            //Buscamos si el username ya esta en uso
            const existingUserByUsername = await User.findOne({ where: { username } });
            if (existingUserByUsername) {
                //Si esta en uso devolmemos un error 400
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }
            //Actualizar el campo
            user.username = username;
        }

        // Verificar si el nuevo email ya existe en otro usuario
        if (email && email !== user.email) {
            //Buscamos si el email ya esta en uso
            const existingUserByEmail = await User.findOne({ where: { email } });
            if (existingUserByEmail) {
                //Si esta en uso devolmemos un error 400
                return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            }
            //Actualizar el campo
            user.email = email;
        }

         // Hashear la nueva contraseña si se está actualizando
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        //Guardar los cambios
        await user.save();

        // Respuesta con los campos actualizados
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
            // No retornar la contraseña
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


//Metodo Delete
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos el ID del User que sera borrado
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