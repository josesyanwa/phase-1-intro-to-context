// Your code here
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
    findEmployeeByFirstName,
  };
  
