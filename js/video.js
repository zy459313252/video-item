var playTab = document.getElementsByClassName("playTab")[0];
var play = document.getElementsByClassName("play")[0];
var palyer = document.getElementById("player");
var track = document.getElementsByClassName("play_progress")[0];
var progress = document.getElementsByClassName("progress_full")[0];
var volume = document.getElementsByClassName("volume")[0];
var volumeProgress = document.getElementsByClassName("volume_progress")[0];
var volumeFull = document.getElementsByClassName("volume_full")[0];
var volumePlay = document.getElementsByClassName("volume_play")[0];
var playerIndex = 0;
var videoList = ["video/tara.mp4","video/video-1.mp4","video/video-2.mp4","video/video-3.mp4","video/video-4.mp4","video/video-5.mp4"];
var lis = document.getElementsByTagName("li");
var videoName = document.getElementsByClassName("videoName")[0];
var ps = document.getElementsByTagName("p");
var currentTime = document.getElementsByClassName("play_time")[0];
var playList = document.getElementsByClassName("playList")[0];
var listVideo = document.getElementsByClassName("listVideo")[0];
var remainTime = document.getElementsByClassName("remain_time")[0];

//播放视频
var num = 0;
function dealPlayTab() {
	playTab.style.display = "none";	
	play.src = "img/play.png";
	palyer.play();
}
function dealPlay() {
	num++;
	if(num % 2 ==1){
		playTab.style.display = "none";	
		play.src = "img/play.png";
		palyer.play();
	}else{
		playTab.style.display = "block";	
		play.src = "img/pause.png";
		player.pause();
	}	
}

function changeNum(num) {
	var n =  num < 10 ? "0" + num : num;
	return n;
}

//显示进度
setInterval(function() {
	if(player.duration>0){//计算进度
		var p = player.currentTime / player.duration
		track.style.width = p*100 + "%";
		
		//播放进度显示
		var time = player.currentTime;
		var hour = parseInt(time / 3600);
		var min = parseInt(time  % 3600 / 60);
		var secd = parseInt(time  % 60);
		currentTime.innerHTML = hour + ":" + changeNum(min) + ":" + changeNum(secd);
		
		//总时间
		var time2 =  player.duration;
		var hour1 = parseInt(time2 / 3600);
		var min1 = parseInt(time2  % 3600 / 60);
		var secd1 = parseInt(time2  % 60);
		remainTime.innerHTML = hour1 + ":" + changeNum(min1) + ":" + changeNum(secd1);
	}
},0.1);

//修改播放进度
progress.addEventListener("click",function(event) {
	//根据点击的位置的百分比
	var p = event.offsetX / progress.offsetWidth;
	//获取当前的播放时间
	var currentTime = p * player.duration;
	//设置时间
	player.currentTime = currentTime;

});

//初始音量
player.volume = 0.3;
//显示声音控制
function showVolume(){
	num++;
	if(num%2==1){
		volumeProgress.style.display = "block";
		
		//改变声音大小
		volumeFull.addEventListener("click",function(event){
			var h = volumeFull.offsetHeight;
			var v =event.offsetY / h;
			player.volume = 1- v;
			volumePlay.style.height = v * 100 + "%";
		});
		
	}else{
		volumeProgress.style.display = "none";
	}
	
}

//全屏显示
function dealFull(){
	if(player.requestFullscreen){
		player.requestFullscreen();
	}
	
	if(player.webkitRequestFullscreen){
		player.webkitRequestFullscreen();
	}
	
	if(player.mozRequestFullScreen){
		player.mozRequestFullScreen();
	}
}

//显示播放列表
function dealShow(){
	num++;
	if(num % 2 == 1){
		playList.style.visibility = "visible";
	}else{
		playList.style.visibility = "hidden";
	}
	
}

//上一部
function dealPre(){
	playerIndex--;
	//0 1 2
	if(playerIndex < 0){
		playerIndex = videoList.length-1;
	}
	var isPause = player.paused;
	player.src = videoList[playerIndex]
	if(isPause){
		player.pause();
	} else{
		player.play();
	}
	var text = ps[playerIndex+1].innerHTML;
	videoName.innerHTML = text;
} 

//下一部
function dealNext(){
	playerIndex++;
	//0 1 2
	if(playerIndex >= videoList.length){
		playerIndex = 0;
	}
	var isPause = player.paused;
	player.src = videoList[playerIndex]
	if(isPause){
		player.pause();
	} else{
		player.play();
	}
	var text = ps[playerIndex+1].innerHTML;
	videoName.innerHTML = text;
}

//点击切换视频
var index = 0;
for(var i=0;i<lis.length;i++){
	lis[i].setAttribute("index",i);
	lis[i].onclick = function() {
		var p = this.getElementsByTagName("p")[0];
		var text = p.innerHTML;
		videoName.innerHTML = text;
		index = this.getAttribute("index");
		player.src = videoList[index];
		player.play();
		playTab.style.display = "none";	
		play.src = "img/play.png";
	}
}
