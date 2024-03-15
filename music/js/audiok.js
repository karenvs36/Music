//songs list<3

var songs = [
    { path: '../resources/audios/Taylor Swift - Enchanted.mp3', name: 'Enchanted - Taylor Swift' },
    { path: '../resources/audios/I can see u.mp3', name: 'I Can See You - Taylor Swift' },
    { path: '../resources/audios/Faye Webster - Kingston.mp3', name: 'Kingston - Faye Webster' },
    { path: '../resources/audios/Ber - Feel So Easy.mp3', name: 'Feel So Easy - Ber' },
    { path: '../resources/audios/Paloma Mami - Religiosa (Album Visualizer).mp3', name: 'Religiosa - Paloma Mami'},
    { path: '../resources/audios/Zoé - Love (Lyrics).mp3', name: 'Love - Zoé'},
    { path: '../resources/audios/Sabrina Carpenter - Nonsense (Official Audio).mp3', name: 'Nonsense - Sabrina Carpenter' },
    { path: '../resources/audios/Taylor Swift - Afterglow (Official Audio).mp3', name: 'Afterglow - Taylor Swift'},
    { path: '../resources/audios/Taylor Swift - Daylight (Official Audio).mp3', name: 'Daylight - Taylor Swift'}
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

var tracklistElement = document.getElementById('tracklist');
var listItems = tracklistElement.querySelectorAll('li');
var cursorOverListItem = false; // Flag to track if the cursor is over a list item

// Add hover effect to list items
listItems.forEach(function(listItem) {
    listItem.addEventListener('mouseenter', function(event) {
        this.style.backgroundColor = '#b3b4b8cc'; // Change background color when hovering
        cursorOverListItem = true; // Set flag to true when the cursor is over a list item
        document.body.style.cursor = 'pointer'; // Set cursor to pointer
    });
    
    listItem.addEventListener('mouseleave', function(event) {
        this.style.backgroundColor = ''; // Reset background color when not hovering
        cursorOverListItem = false; // Set flag to false when the cursor leaves a list item
        resetCursor(); // Reset cursor if the cursor is not over any list item
    });
});

// Add click functionality to each list item
listItems.forEach(function(listItem, index) {
    listItem.addEventListener('click', function(event) {
        currentSongIndex = index; // Set the current song index to the clicked item index
        hideSongName(); // Hide the song name before sliding up
        playSong(); // Play the selected song and show the song name with slide-up animation
    });
});

// Reset cursor if the cursor is not over any list item
function resetCursor() {
    if (!cursorOverListItem) {
        document.body.style.cursor = 'default'; // Change cursor back to default
    }
}


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

