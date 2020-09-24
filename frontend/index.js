const BASE_URL = 'http://localhost:3000'

document.addEventListener("load", () => {
    getItems()
})

function getItems(){
    
    let items = document.querySelector(".items")
    items.innerHTML = ""
    fetch(BASE_URL+"/items")
    .then(res => res.json())
    .then(items => {
        items.innerHTML += items.map(item => {
            `<li>
            <a href="#" data-id="${item.id}">${item.name}</a>    
            </li>`
        })
    })
}