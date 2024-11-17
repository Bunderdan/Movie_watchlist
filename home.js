// 8923b075 API key

const input = document.getElementById("input")
const inputBtn = document.getElementById("search")
const mainPage = document.getElementById("main-page")
let moviesArray = []

if(localStorage){
    for (let i = 0; i < localStorage.length; i++) {
        moviesArray.push(localStorage.key(i))
}}

inputBtn.addEventListener("click",
    async function(){
        const response = await fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=8923b075`)
        const data = await response.json()
        let wholePageHTML = ''
        if(data.Search){
            for(let movie of data.Search){
                        const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8923b075`)
                        const data = await response.json()
                        wholePageHTML += 
                        `
                        <div class="full-main">
                            <img src="${data.Poster}">
                            <div class="data">
                                <div class="info-1">
                                    <h2 class="title">${data.Title}</h2>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="info-2">
                                    <h4>${data.Year}</h4>
                                    <h4>${data.Genre}</h4>
                                    <button class="info-3" id="${data.imdbID}">
                                        <i class="fa-solid fa-circle-plus"></i><h4>Watchlist</h4>
                                    </button>
                                </div>
                                <p>${data.Plot}</p>
                            </div>
                        </div> 
                        `                
        }
        mainPage.innerHTML = wholePageHTML
} else {
    input.value = ""
    input.placeholder = `Searching something with no data`
    mainPage.innerHTML = 
            `
            <div id="empty-main">
                <h2 class="empty">Unable to find what you’re looking for. Please try another search.</h2>
            </div>
            `
}
})


document.addEventListener("click", async function(e){
    
    if(e.target.parentElement && 
    e.target.parentElement.id.includes("tt") && 
    !moviesArray.includes(e.target.parentElement.id))
    {
        const movieId = e.target.parentElement.id
        moviesArray.push(movieId)
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=8923b075`)
        const data = await response.json()
        const movieObject = 
        {
            poster: data.Poster,
            title: data.Title,
            rating: data.imdbRating,
            year: data.Year,
            genre: data.Genre,
            plot: data.Plot
        }
            localStorage.setItem(movieId, JSON.stringify(movieObject)) 
    }
})

