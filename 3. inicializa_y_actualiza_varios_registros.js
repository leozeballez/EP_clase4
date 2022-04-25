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


/* crea usuarios y actualiza registros*/
sequelize.sync()

.then(() => Usuarios.create({
    firstName: 'Pablo',
    lastName: 'Marcelli'
}))
.then(jane => {
    console.log(jane.toJSON());
})
.then(() => Usuarios.create({
    firstName: 'Leonel',
    lastName: 'Zeballez'
}))
.then(jane =>{
    console.log(jane.toJSON());
})

//Se crearon 2 registros.

.then(() => Usuarios.update({ firstName: "Julieta", lastName: "Casati" }, {
    where: {
        firstName: "Pablo",
        lastName: "Marcelli"
    }
}))
.then(() => {
    console.log("Primer registro actualizado.");
})
.then(() => Usuarios.update({ firstName: "Adriana", lastName: "Cappielli" }, {
    where: {
        firstName: "Leonel",
        lastName: "Zeballez"
    }
}))
.then(() => {
    console.log("Segundo registro actualizado.");
})

//No sabía si quería que actualicemos los registros de manera individual (uno por uno) o una actualizacion general para todos los registros ingresados, asique hice ambas.

.then(() => Usuarios.update({ firstName: "David", lastName: "Salazar" }, {
    where: {
      firstName: "Julieta" & "Adriana",
      lastName: "Casati" & "Cappielli"
    }
}))
.then(() => {
    console.log("Registros insertados han sido actualizados.");
});