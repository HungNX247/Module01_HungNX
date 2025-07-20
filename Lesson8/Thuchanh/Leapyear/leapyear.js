let year = parseInt(prompt("Enter a year"));
let isLeapYear;

if ((isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) {
  alert(year + " is Leap Year");
} else {
  alert(year + " is NOT Leeap Year");
}
