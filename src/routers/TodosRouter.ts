import express, { Router } from 'express';
import TodosController from '../controllers/TodosController';
import Migration from '../migrations/Migration';
import Seeder from '../seeders/Seeder';

const router = Router();

//instance all class
const controller = new TodosController();
const table = new Migration();
const value = new Seeder();


//create table and delete table
router.post('/todos', table.addTable);
router.delete('/drop', table.dropTable);

//add value 
router.get('/seed', value.addOne);
router.post('/', controller.add);

//value manipulation
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

//get value
router.get('/', controller.get);
router.get('/:id', controller.getOne);

export default router;