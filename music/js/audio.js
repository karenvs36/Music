//songs list<3

var songs = [
    { path: '../resources/audios/Alt Bloom - October Eyes (Audio Only).mp3', name: 'Alt Bloom - October Eyes' },
    { path: '../resources/audios/Dosed.mp3', name: 'Red Hot Chili Peppers - Dosed' },
    { path: '../resources/audios/Radiohead - Creep.mp3', name: 'Radiohead - Creep' },
    { path: '../resources/audios/Yolanda.mp3', name: 'Pablo Milanes - Yolanda' },
    { path: '../resources/audios/Alma De Robot (Epicenter) - Milla 22  Juan Moya Y Los Del Valle.mp3', name: 'Milla 22 - Alma de Robot'},
    { path: '../resources/audios/Charles Bradley _Strictly Reserved for You_.mp3', name: 'Charles Bradley - Strictly Reserved for You'},
    { path: '../resources/audios/Gipsy Kings - Quiero Saber (Audio).mp3', name: 'Gypsy Kings - Quiero Saber' },
    { path: '../resources/audios/I Found You.mp3', name: 'Alabama Shakes - I Found You'},
    { path: '../resources/audios/John Legend - All of Me (Official Video).mp3', name: 'John Legend -  All of me'},
    { path: '../resources/audios/Moenia - No Dices Más.mp3', name: 'Moenia - No Dices Más'},
    { path: '../resources/audios/Radiohead - House of Cards.mp3', name: 'Radiohead - House of Cards'},
    { path: '../resources/audios/The White Stripes - Hotel Yorba (Official Music Video).mp3', name: 'The White Stripes - Hotel Yorba'},
    { path: '../resources/audios/Viento - Caifanes.mp3', name: 'Caifanes - Viento'}
];

//variables obviouslyyyyyyyyyyy

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');
var nextButton = document.getElementById('next');
var backButton = document.getElementById('back');
var songNameElement = document.getElementById('songName');
var audio = new Audio();
var currentSongIndex = 0;
var isPlaying = false;
var isFirstPlay = true;


//functionssssssssssss



function playSong() {
    if (isFirstPlay) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
        isFirstPlay = false;
    }

    audio.src = songs[currentSongIndex].path;
    audio.play();
    songNameElement.textContent = songs[currentSongIndex].name;
    songNameElement.style.display = 'block'; // Show the song name
    isPlaying = true;

    // Adjust font size after playing a song
    adjustFontSize();
    addGradientBackground();
}

// Call adjustFontSize when the window is resized
window.addEventListener('resize', adjustFontSize);


//gradient
function addGradientBackground() {
    // Set background gradient
    document.body.style.backgroundImage = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
    // Set background size
    document.body.style.backgroundSize = "400% 400%";
    // Set animation
    document.body.style.animation = "moveGradient 15s ease infinite";
}
function removeGradientBackground() {
    document.body.style.backgroundImage = "none";
}

function hideSongName() {
    songNameElement.style.display = 'none'; // Hide the song name
}

// In your event listeners, modify the playButton click event to hide the song name

function pauseSong() {
    audio.pause();
    isPlaying = false;
    removeGradientBackground(); // Remove gradient background when paused
}


function nextSong() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playSong();
    addGradientBackground(); // Add gradient background for the new song
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
    addGradientBackground(); // Add gradient background for the new song
}


//calling !

playButton.addEventListener('click', function() {
    if(!isPlaying) {
        playSong();
    }
});



pauseButton.addEventListener('click', function() {
    if (isPlaying) {
        pauseSong();
    }
});

nextButton.addEventListener('click', nextSong);
backButton.addEventListener('click', prevSong);

//trackliiiiiiiiiisst heck yeah...
function tracklist() {
    var tracklistElement = document.getElementById('tracklist');
    songs.forEach(function(song, index) {
        var listItem = document.createElement('li');
        listItem.textContent = song.name; 
        tracklistElement.appendChild(listItem);

        // Add event listener to each list item
        listItem.addEventListener('click', function() {
            currentSongIndex = index; // Set the current song index to the clicked item index
            hideSongName(); // Hide the song name before sliding up
            playSong(); // Play the selected song and show the song name with slide-up animation
        });
    });
}

tracklist();

var listItems = document.querySelectorAll('#tracklist li');
listItems.forEach(function(listItem) {
    listItem.addEventListener('mouseenter', function(event) {
        var tracklistElement = document.getElementById('tracklist');
        var scrollPosition = tracklistElement.scrollTop;
        var itemOffsetTop = this.offsetTop - tracklistElement.offsetTop;
        if (itemOffsetTop < scrollPosition || itemOffsetTop > scrollPosition + tracklistElement.clientHeight) {
            tracklistElement.scrollTop = itemOffsetTop;
        }
    });
});

//adjust song name if its wider than 300px
function adjustFontSize() {
    var containerWidth = document.querySelector('.mp3').offsetWidth;
    var containerHeight = document.querySelector('.mp3').offsetHeight;
    var maxWidth = 300; // Maximum width of the container
    var minFontSize = 150; // Minimum font size percentage
    var maxSongNameLength = 15; // Maximum length of the song name before font size reduction

    // Get the initial font size
    var fontSize = 100; // Initial font size percentage

    // Check if the length of the song name exceeds the threshold
    if (songs[currentSongIndex].name.length > maxSongNameLength) {
        // Reduce font size if the song name is too long
        fontSize = Math.floor(containerWidth / (songs[currentSongIndex].name.length * 10)) * 10;
        // Ensure font size doesn't go below the minimum font size
        fontSize = Math.max(fontSize, minFontSize);
    }

    // Set the song name element's font size
    songNameElement.style.fontSize = fontSize + '%';
}

