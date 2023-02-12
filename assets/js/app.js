/**
 * 1/ Render Song 
 * 2/ scroll top 
 * 3/ play/pause/seek
 * 4/ CD route
 * 5/ next/prev 
 * 6/ random
 * 7/ next/repeat when ended
 * 8/ active song
 * 9/ scroll active song intro view
 * 10/ play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $('.playlist');
const player = $('.player');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;
const cdThumb = $('.cd-thumb');
const heading = $('header h2');
const audio = $('#audio');
const progress = $('#progress');
const btnPlaySong =$('.btn-toggle-play');
const btnNextSong = $('.btn-next');
const btnPrevSong = $('.btn-prev');
const btnRandSong = $('.btn-random');
const btnRepeatSong = $('.btn-repeat');
const app = {
    currentIndex: 0,
    isRandom : false,
    isRepeat: false,
    songs:[{
        name: 'Street Workout Freestyle',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Coming for You',
        singer: 'SwitchOTR',
        path:'./assets/music/comingfor.mp3',
        image: './assets/images/coming.jpg' 
    },{
        name: 'Street Workout 1',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 2',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 3',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 4',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 5',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 6',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 7',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    },{
        name: 'Street Workout 8',
        singer: 'WORLD CHAMPIONSHIP 2017, ',
        path:'./assets/music/sw2017.mp3',
        image: './assets/images/sw2017.jpg' 
    }], 
    renderSong:function(){
        const html = this.songs.map((song)=>{
            return `<div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`;
        })
        playlist.innerHTML = html.join('');
    },
     defineProperties:function(){
        Object.defineProperty(this,'currentSong',
            { get: function(){
                return this.songs[this.currentIndex];
            }}
        )
    },
    handlerEvent:function(){
        const _this = this;
        // xử lý sự kiện scroll img 
        window.onscroll = function(){
            const wscroll = window.scrollY | window.scrollTo; 
            const newScroll = cdWidth - wscroll ; 
                cd.style.width = newScroll > 0 ? newScroll + 'px' : 0;
                cd.style.opacity = newScroll / cdWidth           
        }
       const cdRoute =  cd.animate([
            { transform: 'rotate(180deg)'}],
            {duration: 10000,
                iterations: Infinity   }
            );
        cdRoute.pause(); 
        //  xử lý sự kiện play / pause / seek
        btnPlaySong.onclick = function(){  
           if($('.player.playing')){   
            audio.pause();
           }else{  
            audio.play();  
           } 
        }
        audio.onplay = function()
        { 
            player.classList.add('playing');   
            cdRoute.play();
        }
        audio.onpause = function(){ 
            player.classList.remove('playing');
            cdRoute.pause();
        }      
         audio.ontimeupdate  = function(){ 
            const crTime = Math.floor( audio.currentTime / audio.duration * 100)
            progress.value = crTime;      
        } 
        progress.oninput = function(){
            const pct =Math.floor(audio.duration / 100 * progress.value);
            audio.currentTime = pct;
        } 
        btnNextSong.onclick = function(){
            _this.nextSong();
            audio.play();
            if(_this.isRandom){
                _this.randomSong();
            } 
        }
        btnPrevSong.onclick=function(){
            _this.prevSong();
            audio.play();
        }
        btnRandSong.onclick = function(){
            _this.isRandom = !_this.isRandom;
            btnRandSong.classList.toggle("active",_this.isRandom)
        }
        btnRepeatSong.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            btnRepeatSong.classList.toggle("active",_this.isRepeat)
        }
        audio.ended = function(){
            this.currentIndex++;
            audio.play();   
        }
        
    },
    loadFirstSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = 'url(' + this.currentSong.image + ')';
        audio.src = this.currentSong.path; 
    },
    randomSong:function(){  
        this.currentIndex
        do{
            Math.floor(Math.random() *  this.songs.length);
        }while(this.currentIndex === this.songs.length)
        this.loadFirstSong();    
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadFirstSong(); 
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1;
        }
        this.loadFirstSong();
    },
    start:function(){
        this.defineProperties();
        this.loadFirstSong();
        this.handlerEvent(); 
        this.renderSong();

    }
}
app.start();