import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
  try {
    // el 'force: false' es para que cada vez que guarde no se me vuelvan a recrear las tablas y no haga un drop
    await sequelize.sync({ alter: true });

    app.listen(3000);

    console.log('Server is listening on port', 3000);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
main();
