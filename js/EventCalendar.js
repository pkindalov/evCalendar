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
	that.eventsContainer = null;
	that.eventWindowToggled = false;
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

	eventCalendar.prototype.setEventsContainer = function(eventsContainerId) {
		if (!document.getElementById(eventsContainerId)) {
			throw new Error(
				'Not found event container with id ' + eventsContainerId + '. Please pass valid id of container'
			);
			return;
		}

		that.eventsContainer = document.getElementById(eventsContainerId);
	};

	eventCalendar.prototype.setData = function(data) {
		//TO FINISH THIS LATER. HERE SET DATA FROM OUTER WORLD ABOUT EVENTS DATA
	};

	eventCalendar.prototype.setCurrentMonthNum = function(date) {
		return date.getMonth();
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

	eventCalendar.prototype.setCurrentYear = function(date) {
		return date.getFullYear();
	};

	eventCalendar.prototype.setFirstDayOfMonth = function(year, month) {
		// return new Date(that.currentYear, that.currentMonthNum, 1).toString().split(' ')[0];
		return new Date(year, month, 1).toString().split(' ')[0];
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

	eventCalendar.prototype.setCurrentMontCountOfDays = function(year, month) {
		// return new Date(that.currentYear, that.currentMonthNum + 1, 0).getDate();
		return new Date(year, month, 0).getDate();
	};

	eventCalendar.prototype.setTodayNum = function(date) {
		return date.getDate();
	};

	eventCalendar.prototype.getTodayNum = function() {
		that.todayNum = this.setTodayNum(new Date());
		return that.todayNum;
	};

	eventCalendar.prototype.prevMonth = function() {
		that.currentMonthNum <= 0 ? (that.currentMonthNum = 11) : --that.currentMonthNum;
		document.getElementById('monthLabel').textContent = this.setCurrentMonthName(that.currentMonthNum);
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays(that.currentYear, that.currentMonthNum + 1);
		that.firstDayOfMonth = this.setFirstDayOfMonth(that.currentYear, that.currentMonthNum);
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		this.drawCalendarBody();
	};

	eventCalendar.prototype.nextMonth = function() {
		that.currentMonthNum >= 11 ? (that.currentMonthNum = 0) : ++that.currentMonthNum;
		document.getElementById('monthLabel').textContent = this.setCurrentMonthName(that.currentMonthNum);
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays(that.currentYear, that.currentMonthNum + 1);
		that.firstDayOfMonth = this.setFirstDayOfMonth(that.currentYear, that.currentMonthNum);
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		this.drawCalendarBody();
	};

	eventCalendar.prototype.prevYear = function() {
		that.currentYear--;
		document.getElementById('yearLabel').textContent = that.currentYear;
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays(that.currentYear, that.currentMonthNum + 1);
		that.firstDayOfMonth = this.setFirstDayOfMonth(that.currentYear, that.currentMonthNum);
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		this.drawCalendarBody();
	};

	eventCalendar.prototype.nextYear = function() {
		that.currentYear++;
		document.getElementById('yearLabel').textContent = that.currentYear;
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays(that.currentYear, that.currentMonthNum + 1);
		that.firstDayOfMonth = this.setFirstDayOfMonth(that.currentYear, that.currentMonthNum);
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		this.drawCalendarBody();
	};

	eventCalendar.prototype.getNameOfDay = function(dayNum, monthNum, yearNum) {
		let days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
		let dateStr = yearNum + '-' + (monthNum + 1) + '-' + dayNum;
		let dateNameAbbr = new Date(dateStr).toString().split(' ')[0];
		switch (dateNameAbbr) {
			case 'Mon':
				return days[0];
				break;
			case 'Tue':
				return days[1];
				break;
			case 'Wed':
				return days[2];
				break;
			case 'Thu':
				return days[3];
				break;
			case 'Fri':
				return days[4];
				break;
			case 'Sat':
				return days[5];
				break;
			case 'Sun':
				return days[6];
				break;
		}
	};

	eventCalendar.prototype.initializeCalendar = function() {
		that.currentMonthNum = this.setCurrentMonthNum(new Date());
		that.currentMontName = this.setCurrentMonthName(that.currentMonthNum);
		that.currentYear = this.setCurrentYear(new Date());
		that.firstDayOfMonth = this.setFirstDayOfMonth(that.currentYear, that.currentMonthNum);
		that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
		that.currentMontCountOfDays = this.setCurrentMontCountOfDays(that.currentYear, that.currentMonthNum + 1);
		that.todayNum = this.setTodayNum(new Date());

		return `<table class="highlight centered striped" id="evCalendar">
					<thead>
                    <tr>
                        <th colspan="7" class="center-align">
                         <a href="#" id="prevMont">&lt;</a>
						 <span id="monthLabel">${that.currentMontName}</span>
						 <a href="#" id="nextMont">&gt;</a>
                        </th>
					</tr>
					<tr>
					<th colspan="7" class="center-align">
					 <a href="#" id="prevYear">&lt;</a>
					 <span id="yearLabel">${that.currentYear}</span>
					 <a href="#" id="nextYear">&gt;</a>
					</th>
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
					</thead>
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

	eventCalendar.prototype.addEventForm = function() {
		// alert(document.getElementById('mainDateLabel').innerText);
		let eventsDashboard = document.getElementById('eventsDashboard');
		eventsDashboard.innerHTML = '<div id="addEventCont"></div>';
		let form = `
			<form id="createEventForm" action="#" method="post">
				<label for="hoursBegin">Begin</label>
				  <input type="text" name="hoursBegin" class="timepicker" />
				  <label for="hoursFinish">Finish</label>
				  <input type="text" name="hoursFinish" class="timepicker" />  
				  <label for="eventText">Text</label>
				  <textarea id="eventText" class="materialize-textarea"></textarea>
				  <input type="submit" class="waves-effect waves-light btn" value="Create Event" />
				  <input type="reset" class="waves-effect waves-light btn" value="Clear" />
			</form>
		`;

		eventsDashboard.innerHTML += form;

		let elems = document.querySelectorAll('.timepicker');
		let instances = M.Timepicker.init(elems, { twelveHour: false, showClearBtn: true });
	};

	eventCalendar.prototype.showDate = function(e) {
		let dayNum = parseInt(e.target.innerText) < 10 ? '0' + e.target.innerText : e.target.innerText;
		let nameOfDay = this.getNameOfDay(dayNum, that.currentMonthNum, that.currentYear);

		that.eventWindowToggled = !that.eventWindowToggled;
		if (that.eventWindowToggled) {
			let addEventBtn = document.createElement('a');
			addEventBtn.setAttribute('class', 'waves-effect waves-light btn');
			addEventBtn.innerText = 'Add event';
			addEventBtn.onclick = () => this.addEventForm();
			if(!document.getElementById('addEventCont')){
				let addEventContDiv = document.createElement('div');
				addEventContDiv.setAttribute('id', 'addEventCont');
				document.getElementById(eventsDashboard).appendChild(addEventContDiv);
			} 
			document.getElementById('addEventCont').appendChild(addEventBtn);
			document.getElementById('mainDateLabel').innerText = e.target.innerText;
			document.getElementById('dayName').innerText = nameOfDay;
			document.getElementById('eventsContainer').style.visibility = 'visible';
		} else {
			if (document.getElementById('addEventCont')) {
				document.getElementById('addEventCont').innerHTML = '';
			}

			if(document.getElementById('createEventForm')){
				let form = document.getElementById('createEventForm');
				document.getElementById('eventsDashboard').removeChild(form);
			}
			// if(document.getElementById('eventsDashboard')){
			// 	document.getElementById('eventsDashboard').innerHTML = '';
			// }
			document.getElementById('eventsContainer').style.visibility = 'hidden';
		}
		// console.log(e.target.innerText);
	};

	eventCalendar.prototype.drawCalendarBody = function() {
		// let tbodyRowsForRem = document.getElementsByTagName('tbody');
		if (that.calendarBody != null) {
			that.calendarTable.removeChild(that.calendarBody);
			that.calendarBody = document.createElement('tbody', 'evCalendarBody');
			that.calendarBody.setAttribute('id', 'evCalendarBody');
			that.calendarTable.appendChild(that.calendarBody);
		}

		// console.log(rows);
		// console.log(rows.parentNode);

		that.calendarBody.innerHTML = '<tr></tr>';
		let cellsCount = that.currentMontCountOfDays;
		// console.log(that.currentMontCountOfDays);
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
					if ((day == 5 || day == 6) && td.innerText != '') {
						td.setAttribute('class', '#1e88e5 blue light-1');
						td.setAttribute('id', `day${dayNum}`);
						td.onclick = (e) => this.showDate(e);
					}
					tr.append(td);
				} else {
					//if it is NOT in indexToStartDays then write day number in cell.
					td.innerText = dayNum;
					td.setAttribute('id', `day${dayNum}`);
					td.onclick = (e) => this.showDate(e);
					if (dayNum == that.todayNum) {
						td.setAttribute('class', '#1e88e5 blue light-1');
						td.onclick = (e) => this.showDate(e);
					}

					if ((day == 5 || day == 6) && td.innerText != '') {
						td.setAttribute('class', '#1e88e5 blue light-1');
						td.setAttribute('id', `day${dayNum}`);
						td.onclick = (e) => this.showDate(e);
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

	eventCalendar.prototype.addListenersToCalendar = function() {
		let prevMonthBtn = document.getElementById('prevMont');
		prevMonthBtn.addEventListener('click', () => this.prevMonth());

		let nextMonthBtn = document.getElementById('nextMont');
		nextMonthBtn.addEventListener('click', () => this.nextMonth());

		let prevYearBtn = document.getElementById('prevYear');
		prevYearBtn.addEventListener('click', () => this.prevYear());

		let nextYearBtn = document.getElementById('nextYear');
		nextYearBtn.addEventListener('click', () => this.nextYear());
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
		this.addListenersToCalendar();
		// document.getElementById('evCalendarBody').innerHTML += this.drawCalendarBody();
		// document.getElementById('evCalendarBody').innerHTML = '';
	};

	return eventCalendar;
})('simpleCalendarContainer');
