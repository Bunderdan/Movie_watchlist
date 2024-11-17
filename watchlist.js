const mainPage = document.getElementById("main-page")

let moviesArray = []

if(localStorage){
    for (let i = 0; i < localStorage.length; i++) {
        moviesArray.push(localStorage.key(i))
        renderWatchlist()
}}

function renderWatchlist(){
    if(moviesArray.length > 0){
        let wholePageHTML = ''
            for (let i = 0; i < moviesArray.length; i++) {
                const data = JSON.parse(localStorage.getItem(moviesArray[i]))
                wholePageHTML +=
                        `
                        <div class="full-main">
                            <img src="${data.poster}">
                            <div class="data">
                                <div class="info-1">
                                    <h2 class="title">${data.title}</h2>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <h4>${data.rating}</h4>
                                </div>
                                <div class="info-2">
                                    <h4>${data.year}</h4>
                                    <h4>${data.genre}</h4>
                                    <button class="info-3" id="${moviesArray[i]}">
                                        <i class="fa-solid fa-circle-minus"></i><h4>Remove</h4>
                                    </button>
                                </div>
                                <p>${data.plot}</p>
                            </div>
                        </div> `
            }
            mainPage.innerHTML = wholePageHTML
    } else {
        mainPage.innerHTML = 
            ` <div id="empty-main">
                <h2>Your watchlist is looking a little empty...</h2>
                <a href="/home.html" id="watchlist">
                <i class="fa-solid fa-circle-plus"></i>Let's add some movies!
                </a>
            </div>    
            `
    }
}

document.addEventListener("click", function(e){
     if(e.target.parentElement){
        const newMoviesArray = moviesArray.filter(function(id){
            return id !== e.target.parentElement.id
        })
        localStorage.removeItem(e.target.parentElement.id)
        moviesArray = newMoviesArray
        renderWatchlist()
}})

