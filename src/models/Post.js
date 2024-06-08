//Sequelize traido como instacia desde database.js
import { sequelize } from '../config/database.js';

//Importando el objeto DataTypes de sequelize
import { DataTypes } from 'sequelize';

//Creacion del modelo Post
export const Post = sequelize.define('post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
});