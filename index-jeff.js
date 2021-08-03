const url = "http://localhost:3000/albums"
const divContainer = document.getElementById('albums-container')

fetch(url)
.then(resp => resp.json())
.then(handleAlbums) 

function handleAlbums(albums){
    albums.forEach(appendElements)
}

function appendElements(album){
    const albumDiv = document.createElement('div')
    const trackDiv = document.createElement('div')

    const imgTag = document.createElement('img')
    const nameHeader = document.createElement('h2')
    const artistHeader = document.createElement('h3')
    const genrePg = document.createElement('p')
    const yearPg = document.createElement('p')
    const tracksHeader = document.createElement('h4')

    imgTag.className = 'album-cover'

    const tracks = album.tracks

    albumDiv.id = album.id
    imgTag.src = album.artwork
    nameHeader.textContent = album.name 
    artistHeader.textContent = album.artist 
    genrePg.innerText = `Genre: ${album.genre}`
    yearPg.innerText = `Year: ${album.year}`
    tracksHeader.innerText = "Tracklist"

    divContainer.append(albumDiv)
    albumDiv.append(imgTag, nameHeader, artistHeader, genrePg, yearPg, trackDiv)
    trackDiv.append(tracksHeader)

    tracks.forEach((tracks) => {
        const trackLi = document.createElement('li')
        trackLi.innerText = tracks
        trackDiv.append(trackLi)
    })
}

