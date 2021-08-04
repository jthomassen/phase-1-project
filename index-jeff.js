document.addEventListener('DOMContentLoaded', () => {

const url = "http://localhost:3000/albums"
const divContainer = document.getElementById('albums-container');
const divGenreFilter = document.getElementsByClassName('filter-genre');
const rockDiv = document.getElementById('rock');

const heartStatus = {
    "♡": "♥", 
    "♥": "♡"
};

const heartColor = {
    "#b90e0a" : "",
    "": "#b90e0a"
};


fetch(url)
.then(resp => resp.json())
.then(handleAlbums) 

//let rockFilter = '';

rockDiv.addEventListener('click', (e) => {
    const rockFilter = e.target.textContent;
    console.log(rockFilter);
    //option to switch this to e.target.id
});


function handleAlbums(albums){
    //if album.genre-filter === genreFilter,
    albums.forEach(appendElements)
}

function appendElements(album){
    
    //if album.genre-filter === genreFilter, then do all this below: 
    const albumDiv = document.createElement('div')
    const trackDiv = document.createElement('div')

    const imgTag = document.createElement('img')
    const nameHeader = document.createElement('h2')
    const artistHeader = document.createElement('h3')
    const genrePg = document.createElement('p')
    const yearPg = document.createElement('p')
    const tracksHeader = document.createElement('h4')
    const wishlistDiv = document.createElement('div')

    imgTag.className = 'album-cover'
    //albumDiv.className = 'album-div'
    albumDiv.className = album.id % 2 === 1 ?  "album-div-odd" : "album-div-even"

    const tracks = album.tracks

    albumDiv.id = album.name.substring(0, 4)
    imgTag.src = album.artwork
    nameHeader.textContent = album.name 
    artistHeader.textContent = album.artist 
    genrePg.innerText = album.genre
    yearPg.innerText = album.year
    tracksHeader.innerText = "Tracklist"
    wishlistDiv.innerHTML = `
        <li class="wishlist">Wishlist 
        <span class="wishlist-heart">&#x2661;</span></li>
        `
    
    divContainer.append(albumDiv)
    albumDiv.append(imgTag, nameHeader, artistHeader, genrePg, yearPg, trackDiv, wishlistDiv)
    trackDiv.append(tracksHeader)

    const wishlist = wishlistDiv.querySelector(".wishlist-heart")
    wishlist.addEventListener('click', e => {
        const heart = e.target;
        heart.innerText = heartStatus[heart.innerText];
        heart.style.color = heartColor[heart.style.color];
    });

    tracks.forEach((tracks) => {
        const trackLi = document.createElement('li')
        trackLi.innerText = tracks
        trackDiv.append(trackLi)
    });
}

})