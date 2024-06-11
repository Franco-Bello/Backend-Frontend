//Importamos modelos
import { Post } from "../models/Post.js";


//Obtener un solo Post
export const getOnePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos el Post por us ID
        const onePost = await Post.findByPk(id, {
            //Excluimos campos no requeridos
            attributes: { exclude : ['createdAt', 'updatedAt']}
        });

         //Verificar si el user existe
         if (!onePost) {return res.status(404).json({ message: 'Post no encontrado' });}


        res.json(onePost);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo para mostrar todas las publicaciones que existen
export const getPost = async (req, res) => {
    try {
        
        const Posts = await Post.findAll({
            // Excluir el campo 'password' de la respuesta
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json(Posts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo para crear un nueva publicacion
export const uploadPost = async (req, res) => {
    try {
        const { content, userId } = req.body
        
        //Crear un nuevo Post
        const newPost = Post.create({
            content,
            userId
        })
        
        res.status(201).json({
            content: newPost.content,
            userId: newPost.userId
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo Put
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos un Post por su ID
        const post = await Post.findByPk(id);

        //Verificar si el Post existe
        if (!post) {return res.status(404).json({ message: 'Post no encontrado' });}

        //Actualizar el Post
        post.set(req.body)

        //Guardar los cambios
        await post.save();

        res.status(200).json({
            id: post.id,
            content: post.content,
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Metodo Delete para borrar una publicación
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        //Buscamos una Post por su ID
        const post = await Post.findByPk(id);

        //Verificamos si la Post existe
        if (!post) {return res.status(404).json({ message: 'Post no encontrado' });}

        //Borramos la Post
        await Post.destroy({
            where: {
                id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};