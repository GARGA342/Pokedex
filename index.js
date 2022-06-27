//functions to get data
function getData(){
    axios('https://pokeapi.co/api/v2/pokemon')
    .then(response => {
        let data = Array()
        response.data.results.forEach(element => {
            const obj = {id: "", name: element.name, url: element.url, img: "", gif: "", types: [], abilities: [], evolution: [], habitat: ""}
            data.push(obj)
        })
        localStorage.setItem('pokemon', JSON.stringify(data))
    })
    getAttributes()
    getHabitat()
    getEvolution()
}

function getAttributes(){
    const pokemon = JSON.parse(localStorage.getItem('pokemon'))
    let i = 0
    pokemon.forEach(e => {
        axios(e.url).then(response => {
            e.id = response.data.id
            e.abilities = response.data.abilities
            e.types = response.data.types
            e.img = response.data.sprites?.front_default
            e.gif = response.data.sprites.versions["generation-v"]["black-white"].animated?.front_default
            i++
            if(pokemon.length == i){
                localStorage.setItem('pokemon', JSON.stringify(pokemon))
            }
        })
    })
}

function getHabitat(){
    const pokemon = JSON.parse(localStorage.getItem('pokemon'))
    let i=0
    pokemon.forEach(e => {
        axios("https://pokeapi.co/api/v2/pokemon-species/"+e.id).then(response => {
            e.habitat = response.data.habitat.name
            i++
            if(pokemon.length == i){
                localStorage.setItem('pokemon', JSON.stringify(pokemon))
            }
        })
    })
}

function getEvolution(){
    const pokemon = JSON.parse(localStorage.getItem('pokemon'))
    let i=0
    pokemon.forEach(e => {
        axios("https://pokeapi.co/api/v2/evolution-chain/"+e.id).then(response => {
            e.evolution = response.data.chain.evolves_to[0]
            i++
            if(pokemon.length == i){
                localStorage.setItem('pokemon', JSON.stringify(pokemon))
            }
        })
    })
}

//functions to populate
function populateCard(data){
    clear()
    data.forEach(e => {
        const parent_tag = document.getElementById('cards') //parent tag
        let div = document.createElement('div') //div created
        div.setAttribute('name', 'card') //name inserted
        div.setAttribute('onclick', 'showModal('+ e.id +')') //name inserted

        parent_tag.appendChild(div) //append div in section

        let p = document.createElement('p') //p created
        p.setAttribute("name", "pokemon_name") //name attribute inserted in p
        p.innerHTML = capitalize(e.name) //content inserted in p

        div.appendChild(p) //append p in div

        let img = document.createElement('img') //img created
        img.setAttribute('src', e.img) //set src attribute in img
        img.setAttribute('alt', e.name) //set alt attribute in img

        div.appendChild(img) //apend img in div
        
        e.types.forEach(e => {
            const type = e.type.name
            const span = document.createElement('span') // span created
            span.innerHTML = type //set type content in span

            if(type == 'normal'){
                span.classList.add('normal')
            }else if(type == 'fighting'){
                span.classList.add('fighting')
            }else if(type == 'flying'){
                span.classList.add('flying')
            }else if(type == 'poison'){
                span.classList.add('poison')
            }else if(type == 'ground'){
                span.classList.add('ground')
            }else if(type == 'rock'){
                span.classList.add('rock')
            }else if(type == 'bug'){
                span.classList.add('bug')
            }else if(type == 'ghost'){
                span.classList.add('ghost')
            }else if(type == 'steel'){
                span.classList.add('steel')
            }else if(type == 'fire'){
                span.classList.add('fire')
            }else if(type == 'water'){
                span.classList.add('water')
            }else if(type == 'grass'){
                span.classList.add('grass')
            }else if(type == 'electric'){
                span.classList.add('electric')
            }else if(type == 'psychic'){
                span.classList.add('psychic')
            }else if(type == 'ice'){
                span.classList.add('ice')
            }else if(type == 'dragon'){
                span.classList.add('dragon')
            }else if(type == 'dark'){
                span.classList.add('dark')
            }else{
                span.classList.add('fairy')
            }
            span.classList.add('element')
            div.appendChild(span) //append span in div
        })
    })
}

function populateSelect(){
    axios('https://pokeapi.co/api/v2/type/')
    .then(response =>{
        const data = JSON.parse(response.request.response).results
        const parent_tag = document.getElementById("poke_types")
        data.forEach(e => {
            let opt = document.createElement("option")
            opt.setAttribute('value', e.name)
            opt.innerHTML = e.name
            parent_tag.appendChild(opt)
        })
    })
}

//auxiliar functions
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
} 
    
function clear(){
    document.getElementById("cards").remove()
    const section = document.createElement("section")
    section.setAttribute("id", "cards")
    document.getElementById("content").appendChild(section)
}

//order functions
function order_id(){
    //populateCard(JSON.parse(localStorage.getItem('pokemon')))
    setButton(document.getElementById("id"))
    const data = JSON.parse(localStorage.getItem('pokemon'))
    let arr = Array()
    let pokes = Array()
    data.forEach(e => {
        arr.push(e.id)
    })
    arr = arr.sort(function(a, b){return a-b})
    arr.forEach(el => {
        data.forEach(e => {
            if(e.id == el){
                let obj = {id: e.id, name: e.name, url: e.url, img: e.img, gif: e.gif, types: e.types, abilities: e.abilities, evolution: e.evolution, habitat: e.habitat}
                pokes.push(obj)
            }
        })
    })
    localStorage.setItem('pokemon', JSON.stringify(pokes))
    populateCard(pokes)

}

function order_az(){
    setButton(document.getElementById("az"))
    const data = JSON.parse(localStorage.getItem('pokemon'))
    let arr = Array()
    let pokes = Array()
    data.forEach(e => {
        arr.push(e.name)
    })
    arr = arr.sort()
    arr.forEach(el => {
        data.forEach(e => {
            if(e.name == el){
                let obj = {id: e.id, name: e.name, url: e.url, img: e.img, gif: e.gif, types: e.types, abilities: e.abilities, evolution: e.evolution, habitat: e.habitat}
                pokes.push(obj)
            }
        })
    })
    localStorage.setItem('pokemon', JSON.stringify(pokes))
    populateCard(pokes)
}

function order_za(){
    setButton(document.getElementById("za"))
    const data = JSON.parse(localStorage.getItem('pokemon'))
    let arr = Array()
    let pokes = Array()
    data.forEach(e => {
        arr.push(e.name)
    })
    
    arr = arr.sort()
    arr = arr.reverse()
    arr.forEach(el => {
        data.forEach(e => {
            if(e.name == el){
                let obj = {id: e.id, name: e.name, url: e.url, img: e.img, gif: e.gif, types: e.types, abilities: e.abilities, evolution: e.evolution, habitat: e.habitat}
                pokes.push(obj)
            }
        })
    })
    localStorage.setItem('pokemon', JSON.stringify(pokes))
    populateCard(pokes)
}

function order_select(){
    const data = JSON.parse(localStorage.getItem('pokemon'))
    const select = document.getElementById("poke_types")
    const value = select.options[select.selectedIndex].value
    unsetButton(select)
    let pokes = Array()
    data.forEach(e => {
        e.types.forEach(el => {
            let obj = {id: e.id, name: e.name, url: e.url, img: e.img, gif: e.gif, types: e.types, abilities: e.abilities, evolution: e.evolution, habitat: e.habitat}
            if(el.type.name == value){
                pokes.push(obj)
            }
        })
    })
    populateCard(pokes)
}

//buttons functions
function setButton(btn){
    btn.style.backgroundColor = '#63aa47'
    btn.style.cursor = 'unset'

    const select = document.getElementById("poke_types")
    const value = select.options[select.selectedIndex].value
    if(value !== "null"){
        document.getElementById("poke_types").selectedIndex = 0;
    }
    unsetButton(btn)
}

function unsetButton(btn){
    const az = document.getElementById("az")
    const za = document.getElementById("za")
    const id = document.getElementById("id")

    switch (btn){
        case az:
            za.removeAttribute('style')
            id.removeAttribute('style')
            break;

        case za:
            az.removeAttribute('style')
            id.removeAttribute('style')
            break;    
        
        case id:
            za.removeAttribute('style')
            az.removeAttribute('style')
            break;

        default:
            za.removeAttribute('style')
            az.removeAttribute('style')
            id.removeAttribute('style')
            break;
    }
}

//functions for filter input
function filter(){
    checkClick()
    const data = JSON.parse(localStorage.getItem('pokemon'))
    const search = document.getElementById("pokemon_name_filter").value.toLowerCase()
    if(document.getElementById("autocomplete")){
        document.getElementById("autocomplete").remove()
    }

    if(!search){
        populateCard(data)
        return
    }

    let autocomplete = Array()
    data.forEach(e => {
        if(e.name.startsWith(search)){
            autocomplete.push(e.name)
        }
    })

    if(autocomplete != ""){
        let i = 0
        document.getElementById("poke_types").selectedIndex = 0;

        const parent_tag = document.getElementById("text_input")
        const ul = document.createElement("ul")
        ul.setAttribute("id", "autocomplete")
        parent_tag.appendChild(ul)

        autocomplete.forEach(e => {
            if(i == 10){
                return
            }
            const li = document.createElement("li")
            li.setAttribute('name',e)
            li.classList.add('pokemon_list')
            li.setAttribute('onclick','setValue(event)')
            li.innerHTML = e
            ul.appendChild(li)
            i++
        })
    }
    
}

function checkClick(){
    document.addEventListener("click", function(e){
        if(document.getElementById("autocomplete")){
            document.getElementById("autocomplete").remove()
        }
    })
}

function setValue(event){
    let poke_name
    if(!event){
        poke_name = document.getElementById("pokemon_name_filter").value.toLowerCase()
        getPokemon(poke_name)
    }else{

        if(document.getElementById("autocomplete")){
            document.getElementById("autocomplete").remove()
        }

        poke_name = event.target.attributes.name.value
        document.getElementById("pokemon_name_filter").value = poke_name
        getPokemon(poke_name)
    }
    unsetButton()
}

function getPokemon(name){
    clear()
    const data = JSON.parse(localStorage.getItem('pokemon'))
    let found = false
    data.forEach(e => {
        if(name == e.name){
            let arr = Array()
            arr.push(e)
            populateCard(arr)
            found = true
        }
    })
    if(!found){
        const parent_tag = document.getElementById("cards")
        const p = document.createElement("p")
        p.classList.add("no_pokemon")
        p.innerHTML = "No pokemon found!"
        parent_tag.appendChild(p)
    }
}

getData()
populateCard(JSON.parse(localStorage.getItem('pokemon')))
populateSelect()