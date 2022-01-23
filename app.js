var everyday = new Date();
var hrs = everyday.getHours();
if(hrs<10){
    hrs=`0${hrs}`;
}
var min = everyday.getMinutes();
if(min<10){
    min=`0${min}`;
}
var time = hrs + " : " + min;
document.getElementById('firsttime').innerHTML = time;

let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let slider = document.querySelector('#duration_slider');
let curr_time = document.querySelector(".current_time");
let total_duration = document.querySelector(".total_duration");
let track_image = document.querySelector('#track_image');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let index_no = 0;
let Playing_song = false;
let track = document.createElement('audio');
let All_song = [
   {
     name: "Believer",
     path: "music/song1.mp3",
     img: "img/Believer.jfif",
     singer: "Jessy"
   },
   {
     name: "Friends",
     path: "music/song2.mp3",
     img: "img/Friends.jpg",
     singer: "Anne Marie"
   },
   {
     name: "Infinity",
     path: "music/song3.mp3",
     img: "img/Infinity.jpg",
     singer: "Jaymes Young"
   },
   {
     name: "MOY",
     path: "music/song4.mp3",
     img: "img/MoY.jpg",
     singer: "Kiboomers"
   },
   {
     name: "Who Says",
     path: "music/song5.mp3",
     img: "img/WhoSays.jpg",
     singer: "Selena Gomez"
   }
];

function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	track.addEventListener("ended",next_song);
}

load_track(index_no);

 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
		curr_time.textContent = "00:00";
		total_duration.textContent = "00:00";
 	    slider.value = 0;
 }

function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}

function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}

function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;

		   let currentMin = Math.floor(track.currentTime / 60);
           let currentSec = Math.floor(track.currentTime - currentMin * 60);
           let durationMin = Math.floor(track.duration / 60);
           let durationSec = Math.floor(track.duration - durationMin * 60);

           if (currentSec < 10) { currentSec = "0" + currentSec; }
           if (durationSec < 10) { durationSec = "0" + durationSec; }
           if (currentMin < 10) { currentMin = "0" + currentMin; }
           if (durationMin < 10) { durationMin = "0" + durationMin; }

		   curr_time.textContent = currentMin + ":" + currentSec;
		   total_duration.textContent = durationMin + ":" + durationSec;
	      }
     }