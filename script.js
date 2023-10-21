console.log("Welcome to Spotify");
// Initialize the Variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
//let masterPause=document.getElementById('masterPause');
//masterPause.style.display="none";
let masterPlay=document.getElementById('masterPlay');
let gif=document.getElementById('gif');
let myProgressBar=document.getElementById('myProgressBar');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Song1", filepath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "Song2", filepath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "Song3", filepath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "Song4", filepath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Song5", filepath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "Song6", filepath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "Song7", filepath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName: "Song8", filepath:"songs/8.mp3", coverPath:"covers/8.jpg"},
]

    songItems.forEach((element,i) => {
   //     console.log(element,i);
        element.getElementsByTagName("img")[0].src=songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
    //    element.getElementsByClassName("songName").id=filepath;
    })


//audioElement.play();

//Listen to Events

//Handle Play Pause Click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
       // console.log("Played");
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity='1';
   //     masterPause.style.display="inline";
    }else{
    //    console.log("Paused");
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity='0';
        makeAllPlays();

    }
})
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
   // console.log('Time Update ',audioElement.currentTime);
    //Update SeekBar
})

myProgressBar.addEventListener('click',()=>{
    audioElement.currentTime=((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        console.log(e);
        songIndex=parseInt(e.target.id);
    //    console.log("Index ",index);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src=songs[songIndex].filepath;
   //     console.log("Filepath ",audioElement.src);
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('masterSongPlaying').innerHTML=songs[songIndex].songName;
    })
})
document.getElementById("masterPrevious").addEventListener('click',()=>{
    if(songIndex==0){
        audioElement.currentTime=0;
    }else{
        songIndex=songIndex-1;
        audioElement.src=songs[songIndex].filepath;
        console.log("SongIndex",songIndex);
        audioElement.currentTime=0;
        audioElement.play();
        makeAllPlays();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        document.getElementById('masterSongPlaying').innerHTML=songs[songIndex].songName;
    }
})
document.getElementById("masterNext").addEventListener('click',()=>{
    if(songIndex==8){
        audioElement.currentTime=audioElement.duration;
    }else{
        songIndex=songIndex+1;
        audioElement.src=songs[songIndex].filepath;
        console.log("SongIndex",songIndex);
        audioElement.currentTime=0;
        audioElement.play();
        makeAllPlays();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        document.getElementById('masterSongPlaying').innerHTML=songs[songIndex].songName;
   //     console.log("songs[songIndex].songName ", songs[songIndex].songName);
    }
})
