var defaultValue = [];

fetch("employee.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    defaultValue = data;

    if (localStorage.getItem("employees") === null) {
      localStorage.setItem("employees", JSON.stringify(defaultValue));
    }

    displayEmployees();
  });

var placeholder = document.getElementById("data_output");

// display employees
function displayEmployees() {
  var data = localStorage.getItem("employees");

  if (data === null) {
    return;
  }

  var employees = JSON.parse(data);

  placeholder.innerHTML = "";

  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];

    placeholder.innerHTML +=
      "<tr>" +
      "<td>" + employee.id + "</td>" +
      "<td>" + employee.employeeCode + "</td>" +
      "<td>" + employee.name + "</td>" +
      "<td>" + employee.address + "</td>" +
      "<td>" + employee.age + "</td>" +
      "<td>" + employee.position + "</td>" +
      "<td><button onclick='deleteEmployee(" + employee.id + ")'>Delete</button></td>" +
      "</tr>";
  }
}

// helper function
function getEmployee() {
  var data = localStorage.getItem("employees");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}

// add employee
var addForm = document.getElementById("add_form");

addForm.onsubmit = function () {
  var code = document.getElementById("e_code").value;
  var name = document.getElementById("e_name").value;
  var address = document.getElementById("e_address").value;
  var age = document.getElementById("e_age").value;
  var position = document.getElementById("e_position").value;

  // validation
  if (
    code === "" ||
    name === "" ||
    address === "" ||
    age === "" ||
    position === ""
  ) {
    alert("Please fill in all fields");
    return false;
  }

  var employees = getEmployee();

  // generate new id
  var newId = 1;

  for (var i = 0; i < employees.length; i++) {
    if (employees[i].id >= newId) {
      newId = employees[i].id + 1;
    }
  }

  // new employee object
  var newEmployee = {
    id: newId,
    employeeCode: code,
    name: name,
    address: address,
    age: parseInt(age),
    position: position,
  };

  employees.push(newEmployee);

  localStorage.setItem("employees", JSON.stringify(employees));

  displayEmployees();

  addForm.reset();

  return false;
};

// delete employee
function deleteEmployee(id) {
  var confirmDelete = confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  var employees = getEmployee();

  var updatedEmployees = employees.filter(function (employee) {
    return employee.id !== id;
  });

  localStorage.setItem("employees", JSON.stringify(updatedEmployees));

  displayEmployees();
}