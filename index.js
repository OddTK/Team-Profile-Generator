const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');

const fs = require('fs');
const inquirer = require('inquirer');

const team = [];

const createEmployees = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Choose the employee\'s role',
            choices: ['Engineer', 'Intern'],
        },
    ])
}
