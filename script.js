// All basic VARIABLES
var today = new Date(); // today's date (Fri Feb 15 2019 09:18 GMT+0100) // new Date(year, month, day, hours, ...)
console.log("Today is: " + today);
    // console.log(today.getDay()); // today's day (0 = Sunday, 1 = Monday, ...)
    // console.log(today.getDate()); // today's day in a month (15 for, e.g., 15th Feb)
var currentMonth = today.getMonth(); // today's month (0 = January, 1 = February, ...)
var currentYear = today.getFullYear(); // today's year (2019)

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // array of all the months in a year
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // array of all the days in a week

// Selecting HTML element for selecting specific years and months
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
console.log(selectMonth.value + ", " + selectYear.value);

// Selecting HTML element for today's month and year
var monthAndYear = document.getElementById("monthAndYear");

// Calling function that shows today's month and year
showCalendar(currentMonth, currentYear);


// FUNCTIONS
// Function for showing a calendar (MAIN!)
function showCalendar(month, year) { // we need to show month and year -- that's why we set these two parameters

    // 1. Getting the first day of a month
    var firstDay = new Date(year, month).getDay(); // new Date(year, month)

    // 2. Getting the number of days in specific month (= final day in a month)
    var daysInMonth = 32 - new Date(year, month, 32).getDate(); // new Date(year, month, day)
        // EXPL.: 
        // e.g., we start with Feb 2019
        // 32nd day in Feb is: 4th of Mar
        // 32 - 4th of Mar = 28th Feb      = final day in Feb = number of days in Feb = 28

    // 3. Selecting HTML element (<tbody id="calendar-body">) & clearing all previous squares
    var table = document.getElementById("calendar-body");
    table.innerHTML = ""; // !we start with an empty table & clear it every time we change months or years!

    // 4. Filing data about month and year in the page -- via DOM (HTML: card header)
    monthAndYear.innerHTML = months[month] + " " + year; // "[month]" and "year" are parameters, set in the beginning of a function
    selectYear.value = year;
    selectMonth.value = month;

    // 5. Creating all squares (squares = kvadratki v tabeli)
    var date = 1; // We start with 1
    for (var i = 0; i < 6; i++) { // 6 because we need to create up to 6 rows
        // 5.1. Creating a table row
        var row = document.createElement("tr");

        // 5.2. Creating individual squares & filing them with data
        for (var j = 0; j < 7; j++) { // 7 because we need to create up to 7 columns (7 days are in one week)
            
            // A) If we're at first row & we have not yet reached the 1st day of a month, leave the square blank
            if (i == 0 && j < firstDay) {
                var square = document.createElement("td");
                var squareText = document.createTextNode(" "); // Filling the squares with " " = leaving the square blank
                square.appendChild(squareText); // Appending squareText to square
                row.appendChild(square); // Appending square to a row element
            }
            // B) If a number (var date) is higher than the last day of a month (e.g., 29 in Feb), we break the loop
            else if (date > daysInMonth) {
                break;
            }
            // C) If everything is okay (if there is date in selected month & if date is NOT higher than the last day of a month)
            else {
                var square = document.createElement("td");
                var squareText = document.createTextNode(date); // Filling the squares with dates (numbers)
                
                // 5.2.1. Coloring today's date
                if (date == today.getDate() && year == today.getFullYear() && month == today.getMonth()) {
                    square.classList.add("bg-info");
                }

                // Some holidays
                var christmass = new Date(2019, 11, 25); // 25.12.2019
                var christmassDate = christmass.getDate(); // 25
                var christmassMonth = christmass.getMonth(); // 11 (December)

                var newYearsDay = new Date(2019, 0, 1); // 1.1.2019
                var newYearsDayDate = newYearsDay.getDate(); // 1
                var newYearsDayMonth = newYearsDay.getMonth(); // 0 (January)

                var preserenDay = new Date(2019, 1, 8) // 8.2.2019
                var preserenDayDate = preserenDay.getDate(); // 8
                var preserenDayMonth = preserenDay.getMonth(); // 1 (February)

                // 5.2.2. Coloring some holidays
                if (date == christmassDate && month == christmassMonth) { // christmass
                    square.classList.add("bg-danger");
                }

                if (date == newYearsDayDate && month == newYearsDayMonth) { // newYearsDay
                    square.classList.add("bg-danger");
                }
                
                if (date == preserenDayDate && month == preserenDayMonth) { // preserenDay
                    square.classList.add("bg-danger");
                }
                

                square.appendChild(squareText); // Appending squareText to square
                row.appendChild(square); // Appending square to a row element
                date++; // Do that for each date (1, 2, 3, ... 28 [in Feb, e.g.])
            }

        }

        // 5.3 Appending each row into table (HTML: "calendar-body")
        table.appendChild(row);
    }

}


// Function for selecting next month (and year)
function next() {
    currentYear = (currentMonth == 11) ? currentYear + 1 : currentYear; // EXPL.: x = IF December, THEN 2019 + 1 (= next year), ELSE 2019
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

// Function for selecting previous month (and year)
function previous() {
    currentYear = (currentMonth == 0) ? currentYear - 1 : currentYear; // EXPL.: x = IF January, THEN 2019 - 1 (= previous year), ELSE 2019
    currentMonth = (currentMonth == 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

// Function for jumping to specific month and year
function jumpTo() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}