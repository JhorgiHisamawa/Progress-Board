import pool from '../dbconfig/dbconnector';
import fs from 'fs';
import path from 'path';


class Migration {

    //migrate table
    public async addTable(req, res) {
        try {

            const client = await pool.connect();

            const sql = fs.readFileSync(path.join(__dirname, 'tableinit.sql')).toString()
            const { rows } = await client.query(sql);
            const result = rows;

            client.release();

            return res.status(200).json({
                message: "Success ! table has been added "
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    //drop table
    public async dropTable(req, res) {
        try {
            const client = await pool.connect();

            const sql = fs.readFileSync(path.join(__dirname, 'tabledrop.sql')).toString();
            const { rows } = await client.query(sql);
            const result = rows;

            client.release();

            return res.status(200).json({
                message: "Success ! table has been deleted "
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

}

export default Migration;