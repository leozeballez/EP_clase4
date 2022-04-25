const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

class Usuarios extends Sequelize.Model {}
Usuarios.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });


/* crea usuario y actualiza registro*/
sequelize.sync()
  .then(() => Usuarios.create({
    firstName: 'Pablo',
    lastName: 'Zeballez'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })
  .then(() => Usuarios.destroy({
    where: {
      firstName: "Pablo",
      lastName: "Zeballez"
    }
  }).then(() => {
    console.log("Registro insertado ha sido actualizado.");
  }))
  ;
