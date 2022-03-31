const teamHTML = require('./src/teamHTML')

const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');

const fs = require('fs');
const inquirer = require('inquirer');

const team = [];

const createEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Choose the employee\'s role',
            choices: ['Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What\'s the employee\'s name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the employee\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee\'s id',
            validate: nameInput => {
                if (!nameInput) {
                    console.log('Enter the employee\'s id');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the employee\'s email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log('Enter the employee\'s email')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the employee\'s github username',
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the employee\'s github username')
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter intern\'s school',
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the intern\'s school')
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmCreateEmployee',
            message: 'Would you like to add another employee to your organization?',
            default: false
        },
    ]).then(employeeData => {
        const { name, id, email, role, github, school, confirmCreateEmployee } = employeeData;
        let employee;
        if (role === 'Engineer'){
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else if (role === 'Intern'){
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }
        team.push(employee);
        if (confirmCreateEmployee) {
            return createEmployee(team);
        } else {
            return team;
        }
    })
};

const createManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the manager\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the manager\'s id',
            validate: nameInput => {
                if (!nameInput) {
                    console.log('Enter the manager\'s id');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the manager\'s email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log('Enter the an email');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNum',
            message: 'Enter the manager\'s office number',
            validate: nameInput => {
                if (!nameInput) {
                    console.log('Enter the the office number');
                    return false;
                } else {
                    return true;
                }
            }
        },
    ]).then(managerInput => {
        const { name, id, email, officeNum } = managerInput;
        const manager = new Manager (name, id, email, officeNum);
        team.push(manager);
        console.log(manager);
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Team profile successfully created')
        }
    })
}

createManager()
.then(createEmployee)
.then(team => {
    return teamHTML(team);
}).then(pageHTML => {
    return writeFile(pageHTML);
}).catch(err => {
    console.error(err);
});
