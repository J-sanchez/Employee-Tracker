const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const Department = require('./lib/Department');
const connection = require('./db/database');

const employeeData = [];