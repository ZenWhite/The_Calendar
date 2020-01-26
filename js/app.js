Date.prototype.daysInMonth = function() {
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

class Calendar {
	constructor(element) {
		this.element = document.querySelector(element);
		this.myDate = new Date();
		this.daysInMonth = this.myDate.daysInMonth();
		this.daysBlock = this.element.querySelector('.app__days');
		this.render();
		this.setEventListeners();
	}
	render() {
		let month = this.getMonthName(),
		    days = this.getDayName();
		for(let i=1; i <= this.daysInMonth; i++) {
			if( this.myDate.getDate() == i) {
				this.daysBlock.innerHTML += `<div class="app__day current-day">
					<span>${i}</span>
					<div class="app__day-name current-day">${days[i-1]}</div>
				</div>`;
			} else {
				this.daysBlock.innerHTML += `<div class="app__day">
					<span>${i}</span>
					<div class="app__day-name">${days[i-1]}</div>
				</div>`;
			}
		}
		this.element.querySelector('.app__month').textContent = month;
		this.element.querySelector('.app__year').textContent = this.myDate.getFullYear();
	}
	getMonthName() {
		const monthArr = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь' ,'Декабрь'];
		let currentMonth = this.myDate.getMonth(),
			monthName;

		monthName = monthArr[currentMonth];

		return monthName;
	}
	getDayName() {
		const daysName = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
		let daysArr = [];
		for(let i=0; i < this.daysInMonth; i++) {
			let currentDay = new Date(this.myDate.getFullYear(), this.myDate.getMonth(), i);
			if( currentDay == 0) currentDay = 'ВС'; 
			else currentDay = daysName[ currentDay.getDay() ];
			daysArr.push(currentDay);
		}
		return daysArr;
	}
	setEventListeners() {
		const days = this.element.querySelectorAll('.app__day');

		days.forEach(item => {
			item.addEventListener('click', function() {
				if(item.classList.contains('active')) {
					item.querySelector('.app__day-name').style.opacity = '0';
					item.classList.remove('active');
				} else {
					item.querySelector('.app__day-name').style.opacity = '1';
					item.classList.add('active');
				}
			});
		});
	}
}

const calendar = new Calendar('.app');