let eventCalendar = (function(calendarContainerId){
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
    that.eventsData = [];

    function eventCalendar(){}
    
    eventCalendar.prototype.setContainer = function(calendarContainerId){
        if(!document.getElementById(calendarContainerId)){
            throw new Error('Not found calendar container with id ' + calendarContainerId + '. Please pass valid id of container');
            return;
        }
        
        that.container = document.getElementById(calendarContainerId);
    }

    eventCalendar.prototype.setData = function(data){
        //TO FINISH THIS LATER. HERE SET DATA FROM OUTER WORLD ABOUT EVENTS DATA
    }

    eventCalendar.prototype.setCurrentMonthNum = function(){
        return new Date().getMonth();
    }

    eventCalendar.prototype.setCurrentMonthName = function(monthNum){
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNum];
    }

    eventCalendar.prototype.setCurrentYear = function(){
        return new Date().getFullYear();
    }

    eventCalendar.prototype.setFirstDayOfMonth = function(){
        return new Date(that.currentYear, that.currentMonthNum, 1).toString().split(' ')[0];
    }

    eventCalendar.prototype.setindexToStartDays = function(dayName){
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
    }

    eventCalendar.prototype.setCurrentMontCountOfDays = function(){
        return new Date(that.currentYear, that.currentMonthNum + 1, 0).getDate();
    }

    eventCalendar.prototype.initializeCalendar = function(){
        that.currentMonthNum = this.setCurrentMonthNum();
        that.currentMontName = this.setCurrentMonthName(that.currentMonthNum);
        that.currentYear = this.setCurrentYear();
        that.firstDayOfMonth = this.setFirstDayOfMonth();
        that.indexToStartDays = this.setindexToStartDays(that.firstDayOfMonth);
        that.currentMontCountOfDays = this.setCurrentMontCountOfDays();
        

        return `<table class="striped" id="evCalendar">
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
    }

    eventCalendar.prototype.drawCalendarBody = function(){
        that.calendarBody.innerHTML = '<tr></tr>';
        // let firstRow = document.createElement('tr');
        let cellsCount = that.currentMontCountOfDays;
        let tableRowsCount = Math.ceil(cellsCount / 7);
        console.log(cellsCount);
        console.log(tableRowsCount);
    
        let dayNum = 1;
        let counter = 0;

        // that.calendarBody.appendChild(firstRow);
        // console.log(that.calendarBody.innerHTML);
        // return;

        for(let row = 0; row <= tableRowsCount; row++){
            let tr = document.createElement('tr');

            // if(cellsCount > 0){
                for(let day = 0; day < 7 ; day++){
                    let td = document.createElement('td');
                    if(day + counter < that.indexToStartDays || dayNum > that.currentMontCountOfDays){
                        tr.append(td);
                    }else {
                        td.innerText = dayNum;
                        tr.append(td);
                        dayNum++;
                    }
        
                    // td.innerText = (dayNum - that.indexToStartDays);
                    
                }
                counter += 7;
                cellsCount -= 7;
            // }
            
            // dayNum++;
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

      

    }

    

    eventCalendar.prototype.createCalendar = function(){
        if(!that.container){
            throw new Error('Problem with container. Invalid container - ' + that.container);
            return;
        }

        that.calendar = this.initializeCalendar();
        that.container.innerHTML = that.calendar;
        that.calendarTable = document.getElementById('evCalendar');
        that.calendarBody =  document.getElementById('evCalendarBody');
       
        this.drawCalendarBody();
        // document.getElementById('evCalendarBody').innerHTML += this.drawCalendarBody();
        // document.getElementById('evCalendarBody').innerHTML = '';
        
    }



    return eventCalendar;
    
})('simpleCalendarContainer');