//Sequelize traido como instacia desde database.js
import { sequelize } from '../config/database.js';

//Importando el objeto DataTypes de sequelize
import { DataTypes } from 'sequelize';

//Importacion del Modelo Post
import { Post } from './Post.js';

//Creacion del modelo User
export const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


//Definición de la relación uno a muchos entre User y Post
User.hasMany(Post, {
    foreignKey: 'userId',   // Clave externa en la tabla Post
    sourceKey: 'id',       // Clave primaria en la tabla User
});

//Definición de la pertenencia de Post a User
Post.belongsTo(User, {
    foreignKey: 'userId',  // Clave externa en la tabla Post
    targetKey: 'id',      // Clave primaria en la tabla User
});