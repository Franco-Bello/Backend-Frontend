import { Post } from "../models/Post.js";



export const getOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const onePost = await Post.findByPk(id);
        res.json(onePost);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo para mostrar todas las publicaciones que existen
export const getPost = async (req, res) => {
    try {
        const Posts = await Post.findAll();
        res.json(Posts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo para crear un nueva publicacion
export const uploadPost = async (req, res) => {
    try {
        const { content, userId } = req.body
        const newPost = Post.create({
            content,
            userId
        })
        res.json(newPost)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//Metodo Put
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        //Verificar si el user existe
        if (!post) {return res.status(404).json({ message: 'Usuario no encontrado' });}

        //Actualizar al usuario
        post.set(req.body)

        //Guardar los cambios
        await post.save();

        res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Metodo Delete para borrar una publicación
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {return res.status(404).json({ message: 'Usuario no encontrado' });}

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