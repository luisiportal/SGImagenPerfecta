import test from 'ava';
import { crearVenta } from '../controllers/ventas.controllers.js';


test('crearVenta existe', t => {
  t.truthy(crearVenta);
});