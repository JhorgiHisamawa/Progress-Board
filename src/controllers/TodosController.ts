import pool from '../dbconfig/dbconnector';

class TodosController {

    //get all data from table
    public async get(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM todos;";
            const { rows } = await client.query(sql);
            const result = rows;

            client.release();

            return res.status(200).json({
                message: "Success !",
                body: result
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    //get selected data from table
    public async getOne(req, res) {
        try {
            const client = await pool.connect();
            const id = parseInt(req.params.id);
            const { rows } = await client.query({
                text: "SELECT * FROM todos WHERE id = $1;",
                values: [id]
            });
            const result = rows;

            client.release();

            return res.status(200).json({
                message: "Success !",
                body: result
            });

        } catch (error) {
            return res.status(400).send(error);
        }
    }

    //add data from table then returning all data with the same status
    public async add(req, res) {
        try {
            const client = await pool.connect();
            const { name, description, status } = req.body;

            await client.query({
                text: "INSERT INTO todos(name, description, status) VALUES($1,$2,$3);",
                values: [name, description, status]
            });

            const result = await client.query({
                text: "SELECT * from todos WHERE status = $1;",
                values: [status]
            });

            client.release();

            return res.status(200).json({
                message: `Success !  ${name} has been added`,
                body: result.rows
            });

        } catch (error) {
            return res.status(400).send(error);
        }
    }

    //edit data from table then returning all data with the same status
    public async edit(req, res) {
        try {
            const client = await pool.connect();
            const id = parseInt(req.params.id);
            const { name, description, status } = req.body;

            await client.query({
                text: "UPDATE todos SET name = ($2), description = ($3), status = ($4), updatedat = (SELECT current_timestamp) WHERE id = ($1);",
                values: [id, name, description, status]
            });

            const result = await client.query({
                text: "SELECT * from todos WHERE status = $1;",
                values: [status]
            });

            client.release();

            return res.status(200).json({
                message: `Succesfully changed todo with id: ${id}`,
                body: result.rows
            });

        } catch (error) {
            return res.status(400).send(error);
        }
    }

    //remove data from table
    public async delete(req, res) {
        try {
            const client = await pool.connect();
            const id = parseInt(req.params.id);

            const { rows } = await client.query({
                text: "DELETE FROM todos WHERE id = $1;",
                values: [id]
            });

            client.release();

            return res.status(200).json({
                message: `Succesfully deleted todo with id: ${id}`
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default TodosController;
