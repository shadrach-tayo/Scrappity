import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);

// set default data into db
db.defaults({ twitter: [], instagram: [] }).write();

export default db;
