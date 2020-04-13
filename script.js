//---------------- creating a stopwatch constructor function ----------------------------
function stopwatch(element,delay){
	let time=0;		// current time showing(stopwatch) starting from 0
	let interval;	//set and call off the interval 
	let offset;		//keeps track of the moment stopwatch is started

	function update(){		//updates the stopwatch
		if(this.isOn){
			time += delta();
		}
		element.textContent = timeFormatter(time);
	}

	function delta(){		//returns how much time has been passed
		let now = Date.now();		//current time.....it changes repeatedly as we call delta
		let timePassed=now-offset;	//time supposed to be shown by stopwatch 
		offset=now;		//we count again from current time 
		return timePassed;
	}

	function timeFormatter(ms){		//sets the time format of display
		let time = new Date(ms);	//we create new date object with ms miliseconds that is timePassed
		let hour = time.getUTCHours().toString();
		let minute = time.getUTCMinutes().toString();
		let second = time.getUTCSeconds().toString();
		let milliSeconds = time.getUTCMilliseconds().toString();
		//create the time format
		if(hour.length < 2)
		{
			hour ='0' + hour; 
		}
		if(minute.length < 2)
		{
			minute ='0' + minute; 
		}
		if(second.length < 2)
		{
			second ='0' + second; 
		}
		while(milliSeconds.length<3)
		{
			milliSeconds = '0' + milliSeconds;
		}
		return `${hour} : ${minute} : ${second}.${milliSeconds}`;
	}

	this.start=function(){
		if(!this.isOn)
		{
			offset = Date.now();		//start time
			this.isOn = true;
			interval = setInterval(update.bind(this),delay);		//update the interval every delay seconds
		}
	};

	this.stop=function(){
		if(this.isOn)
		{
			clearInterval(interval);
			interval=null;
			this.isOn=false;
		}
	};

	this.reset=function(){
		time=0;
		update();
	};

	this.isOn = false;	//keeps track if the stopwatch is on or off
}
//---------------------------- main controls -----------------------------------
var timer = document.querySelector('.time');
var toggleBtn = document.querySelector('#toggle');
var resetBtn = document.querySelector('#reset');

var watch = new stopwatch(timer);

function start() {
  toggleBtn.className='stop';
  toggleBtn.firstElementChild.className='fas fa-pause';
  watch.start();
}

function stop() {
  toggleBtn.className='start';
  toggleBtn.firstElementChild.className='fas fa-play';
  watch.stop();
}

toggleBtn.addEventListener('click', function() {
  watch.isOn ? stop() : start();
});

resetBtn.addEventListener('click', function() {
	stop();
  	watch.reset();
});