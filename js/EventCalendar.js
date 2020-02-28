let eventCalendar = (function(calendarContainerId) {
	let that = this;
	that.container = null;
	that.calendar = null;
	that.calendarBody = null;
	that.calendarTable = null;
	that.currentMonthNum = null;
	that.currentMontName = null;
	that.currentMontCountOfDays = null;
	that.currentYear = null;
	that.indexToStartDays = null;
	that.firstDayOfMonth = null;
	that.todayNum = null;
	that.eventsData = [];

	function eventCalendar() {}

	eventCalendar.prototype.setContainer = function(calendarContainerId) {
		if (!document.getElementById(calendarContainerId)) {
			throw new Error(
				'Not found calendar container with id ' + calendarContainerId + '. Please pass valid id of container'
			);
			return;
		}

		that.container = document.getElementById(calendarContainerId);
	};

	eventCalendar.prototype.setData = function(data) {
		//TO FINISH THIS LATER. HERE SET DATA FROM OUTER WORLD ABOUT EVENTS DATA
	};

	eventCalendar.prototype.setCurrentMonthNum = function() {
		return new Date().getMonth();
	};

	eventCalendar.prototype.setCurrentMonthName = function(monthNum) {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		return months[monthNum];
	};

	eventCalendar.prototype.setCurrentYear = function() {
		return new Date().getFullYear();
	};

	eventCalendar.prototype.setFirstDayOfMonth = function() {
		return new Date(that.currentYear, that.currentMonthNum, 1).toString().split(' ')[0];
	};

	eventCalendar.prototype.setindexToStartDays = function(dayName) {
		switch (dayName) {
			case 'Mon':
				return 0;
				break;
			case 'Tue':
				return 1;
				break;
			case 'Wed':
				return 2;
				break;
			case 'Thu':
				return 3;
				break;
			case 'Fri':
				return 4;
				break;
			case 'Sat':
				return 5;
				break;
			case 'Sun':
				return 6;
				break;
			default:
				throw error('No valid dayName');
		}
	};

	eventCalendar.prototype.setCurrentMontCountOfDays = function() {
		return new Date(that.currentYear, that.currentMonthNum + 1, 0).getDate();
	};

	eventCalendar.prototype.setTodayNum = function() {
		return new Date().getDate();
	};

	eventCalendar.prototype.initializeCalendar = function() {
		that.currentMonthNum = this.setCurrentMonthNum();
		that.currentMontName = this.setCurrentMonthName(that.currentMonthNum);
		that.currentYear = this.setCurrentYear();
		that.firstDayOfMonth = this.setFirstDayOfMonth();
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays();
		that.todayNum = this.setTodayNum();

		return `<table class="highlight centered striped" id="evCalendar">
                    <tr>
                        <th colspan="7" class="center-align">${that.currentMontName}</th>
                    </tr>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                    <tbody id="evCalendarBody">
                    </tbody>
                </table>`;
	};

	eventCalendar.prototype.getMonthRows = function(cellsCount) {
		let rows = Math.ceil(cellsCount / 7);
		let date = new Date(that.currentYear, that.currentMonthNum + 1, 0).toString();
		let latestMonthDayName = date.split(' ')[0];

		switch (latestMonthDayName) {
			case 'Sun':
				return rows - 1;
				break;
			case 'Mon':
				return rows;
				break;
			case 'Tue':
				return rows;
				break;
			case 'Wed':
				return rows;
				break;
			case 'Thu':
				return rows;
                break;
            case 'Fri':
                return rows;
                break;    
			case 'Sat':
				return rows - 1;
				break;
			default:
				return rows;
				break;
		}
	};

	eventCalendar.prototype.drawCalendarBody = function() {
		that.calendarBody.innerHTML = '<tr></tr>';
		let cellsCount = that.currentMontCountOfDays;
		// let tableRowsCount = Math.ceil(cellsCount / 7);
		let tableRowsCount = this.getMonthRows(cellsCount);
		let dayNum = 1;
		let counter = 0;

		for (let row = 0; row <= tableRowsCount; row++) {
			let tr = document.createElement('tr');
			for (let day = 0; day < 7; day++) {
				let td = document.createElement('td');

				//check if the index is in indexToStartDays. If it is then the cell must be empty
				if (day + counter < that.indexToStartDays || dayNum > that.currentMontCountOfDays) {
					if ((day == 5 || day == 6) && td.innerText != "") {
						td.setAttribute('class', '#1e88e5 blue light-1');
					}
					tr.append(td);
				} else {
					//if it is NOT in indexToStartDays then write day number in cell.
                    td.innerText = dayNum;
					if (dayNum == that.todayNum) {
						td.setAttribute('class', '#1e88e5 blue light-1');
					}

					if ((day == 5 || day == 6) && td.innerText != "") {
						td.setAttribute('class', '#1e88e5 blue light-1');
					}
					tr.append(td);
					dayNum++;
				}
			}
			counter += 7;
			that.calendarBody.append(tr);
		}

		// for(let i = 0; i < cellsCount; i++){
		//     let td = document.createElement('td');

		//     //drawing empty cells
		//     if(i < that.indexToStartDays){

		//         firstRow.appendChild(td);

		//         // let td = document.createElement('td');
		//         // that.calendarBody.appendChild(td);
		//     } else {
		//         if(i % 7 == 0){ //check for the end of the line and if is then put new row
		//             newTr = document.createElement('tr');
		//             that.calendarBody.appendChild(newTr);
		//             // that.calendarBody.insertRow();
		//             // let tr = document.createElement('tr');
		//             // that.calendarBody.appendChild(tr);
		//         }

		//         if(newTr){}
		//         td.setAttribute('class', `center-align`);
		//         td.innerText = dayNum;
		//         firstRow.appendChild(td);

		//         // td.setAttribute('class', `center-align`);
		//         // td.innerText = dayNum;
		//         // that.calendarBody.appendChild(td);

		//         // html += `<td class="center-align">${dayNum}</td>`;
		//         // td = document.createElement('td');
		//         dayNum++;
		//     }

		// }
	};

	eventCalendar.prototype.createCalendar = function() {
		if (!that.container) {
			throw new Error('Problem with container. Invalid container - ' + that.container);
			return;
		}

		that.calendar = this.initializeCalendar();
		that.container.innerHTML = that.calendar;
		that.calendarTable = document.getElementById('evCalendar');
		that.calendarBody = document.getElementById('evCalendarBody');

		this.drawCalendarBody();
		// document.getElementById('evCalendarBody').innerHTML += this.drawCalendarBody();
		// document.getElementById('evCalendarBody').innerHTML = '';
	};

	return eventCalendar;
})('simpleCalendarContainer');
