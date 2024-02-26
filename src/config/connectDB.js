const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('reactjsdb', 'root', 'dangdat0807', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 //default 3306
  });

const connection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

 export default connection;