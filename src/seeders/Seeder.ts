import pool from '../dbconfig/dbconnector';
import fs from 'fs';
import path from 'path';


//create seeder for table
class Seeder {
    public async addOne(req, res) {
        try {
            const client = await pool.connect();

            const sql = fs.readFileSync(path.join(__dirname, 'tablevalue.sql')).toString();

            await client.query(sql);

            const query = 'SELECT * from todos;'
            const result = await client.query(query);

            client.release();
            return res.status(200).json({
                message: `Success ! Seeder has been added`,
                body: result.rows
            });

        } catch (error) {
            return res.status(400).send(error);
        }
    }
}
export default Seeder