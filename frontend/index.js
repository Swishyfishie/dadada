const BASE_URL = 'http://localhost:3000'

document.addEventListener("load", () => {
    getItems()
})

function getItems(){
    
    let items = document.querySelector(".items")
    items.innerHTML = ""
    fetch(BASE_URL+"/items")
    .then(res => res.json())
    .then(i => {
        console.log("")
        i.map(item => {
            items.innerHTML += `
                <li>${item.name} : ${item.calories}</li>
            `
        })
    })
}