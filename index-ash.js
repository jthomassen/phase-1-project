const url = "http://localhost:3000/albums"

fetch(url)
.then(resp => resp.json())
.then(data => console.log(data)) 