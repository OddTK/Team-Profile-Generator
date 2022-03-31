const generateManager = function (manager) {
    return `
    <div class="col-3 mt-4">
    <div class="card h-100">
        <div class="card-header bg-primary text-light text-center">
            <h2>${manager.name}</h2>
            <h3>Manager</h3>
        </div>

        <div class="card-body">
            <p class="border-bottom id">ID: ${manager.id}</p>
            <p class="border-bottom email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
            <p class="border-bottom office">Office Number: ${manager.officeNum}</p>
        </div>
    </div>
</div>
    `;
};

const generateEngineer = function (engineer) {
    return `
    <div class="col-3 mt-4">
    <div class="card h-100">
        <div class="card-header bg-primary text-light text-center">
            <h2>${engineer.name}</h2>
            <h3>Engineer</h3>
        </div>

        <div class="card-body">
            <p class="border-bottom id">ID: ${engineer.id}</p>
            <p class="border-bottom email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
            <p class="border-bottom github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
        </div>
    </div>
</div>
    `;
};

const generateIntern = function (intern) {
    return `
    <div class="col-3 mt-4">
    <div class="card h-100">
        <div class="card-header bg-primary text-light text-center">
            <h2>${intern.name}</h2>
            <h3>Intern</h3>
        </div>

        <div class="card-body">
            <p class="border-bottom id">ID: ${intern.id}</p>
            <p class="border-bottom email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
            <p class="border-bottom school">School: ${intern.school}</p>
        </div>
    </div>
</div>
    `;
};

teamHTML = (data) => {
    pageArray = [];

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole();

        if (role === 'Manager') {
            const managerCard = generateManager(employee);

            pageArray.push(managerCard);
        }

        if (role === 'Engineer') {
            const engineerCard = generateEngineer(employee);

            pageArray.push(engineerCard);
        }

        if (role === 'Intern') {
            const internCard = generateIntern(employee);

            pageArray.push(internCard);
        }

    }

    const employeeCards = pageArray.join('')
    const generateTeam = generateTeamPage(employeeCards);
    return generateTeam;
};

const generateTeamPage = function (employeeCards) {
    return`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <nav class="navbar navbar-light bg-danger">
        <span class="navbar-brand fw-bold fs-1 text-light w-100 text-center">My Team</span>
    </nav>
    <main>
        <div class="container">
            <div class="row justify-content-center" id="team-cards">
                ${employeeCards}
            </div>
        </div>
    </main>

</body>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</html>
    `;
};

module.exports = teamHTML;
