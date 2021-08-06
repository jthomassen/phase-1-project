document.addEventListener('DOMContentLoaded', () => {
    //variable declarations
    const url = "http://localhost:3000/albums";
    const divContainer = document.getElementById('albums-container');
    const divGenreFilter = document.querySelectorAll('.genre-div');
    let genreFilter = '';
    const heartStatus = {
        "♡": "♥", 
        "♥": "♡"
    };
    const heartColor = {
        "#b90e0a" : "",
        "": "#b90e0a"
    };

    //event listeners for genre favorites
    divGenreFilter.forEach(genre => {
        genre.addEventListener('mouseenter', (e) => {
            genreFilter = e.target.textContent;
            genreDiv = e.target;
            e.target.innerHTML = `<a href=#favorite${genreFilter}>Reco's Favorite ${genreFilter}</a>`
            genreDiv.className = 'genre-div-mouseenter';
        });
        genre.addEventListener('mouseleave', (e) => {
            e.target.innerHTML = `${genreFilter}`;
            genreDiv.className = 'genre-div';
        });
    });
    
    //fetch db file 
    fetch(url)
    .then(resp => resp.json())
    .then(handleAlbums) 
    
    //functions
    function handleAlbums(albums){
        albums.forEach(createAlbumDiv)
    }
    
    function createAlbumDiv(album){
        //create elements for div
        const albumDiv = document.createElement('div')
        const trackDiv = document.createElement('div')
        const imgTag = document.createElement('img')
        const nameHeader = document.createElement('h2')
        const artistHeader = document.createElement('h3')
        const genrePg = document.createElement('p')
        const yearPg = document.createElement('p')
        const tracksHeader = document.createElement('h4')
        const wishlistDiv = document.createElement('div')
        const topLink = document.createElement('a');
        //assign IDs or classes to elements
        imgTag.className = 'album-cover'
        albumDiv.className = album.id % 2 === 1 ?  "album-div-odd" : "album-div-even"
        albumDiv.id = album.genreFavorite;
        //set HTML attributes
        imgTag.src = album.artwork
        nameHeader.textContent = album.name 
        artistHeader.textContent = album.artist 
        genrePg.innerText = album.genre
        yearPg.innerText = album.year
        const tracks = album.tracks
        tracksHeader.innerText = "Tracklist"
        wishlistDiv.innerHTML = `
            <li class="wishlist">Wishlist 
            <span class="wishlist-heart">&#x2661;</span></li>
            `
        topLink.href = "#header"
        topLink.innerText = "Back to Top"
        //append Elements
        divContainer.append(albumDiv)
        albumDiv.append(imgTag, nameHeader, artistHeader, genrePg, yearPg, trackDiv, wishlistDiv, topLink)
        trackDiv.append(tracksHeader)   
        //create track list
        tracks.forEach((track) => {
            const trackLi = document.createElement('li')
            trackLi.innerText = track
            trackDiv.append(trackLi)
        });
        //create Wishlist
        const wishlist = wishlistDiv.querySelector(".wishlist-heart")
        wishlist.addEventListener('click', e => {
            const heart = e.target;
            heart.innerText = heartStatus[heart.innerText];
            heart.style.color = heartColor[heart.style.color];
        });
    }
    
    }) //DOM Content Loaded End