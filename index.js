function getData(){
    axios('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1154')
    .then(response => {
        let data = Array()
        response.data.results.forEach(e => {
            data.push(e.url)
        })
        getDetails(data)
    })
}

function getDetails(url){
    let data = Array()
    url.forEach(e => {
        axios(e)
        .then(response => {
            let poke = {id: response.data.id, name: response.data.name, types: response.data.types, 
                img: response.data.sprites.front_default}
            data.push(poke)
            if(url.length == data.length){
                write = data
                read = data
                populateCard(data)
            }
        })
    })
}

function populate_select(){
    axios('https://pokeapi.co/api/v2/type/')
    .then(response =>{
        const result = JSON.parse(response.request.response).results
        const parent_tag = document.getElementById("poke_types")
        result.forEach(e => {
            let opt = document.createElement("option")
            opt.setAttribute('value', e.name)
            opt.innerHTML = e.name
            parent_tag.appendChild(opt)
        })
    })
}

// clear cards function
function clear(){
    document.getElementById("cards").remove()
    const section = document.createElement("section")
    section.setAttribute("id", "cards")
    document.getElementById("content").appendChild(section)
}

function populateCard(data){
    clear()
    data.forEach(e => {
        const tag_parent = document.getElementById("cards") //parent tag

        let div = document.createElement('div') //div created
        div.setAttribute("name", "card") //name inserted

        tag_parent.appendChild(div) //append div in section

        let p = document.createElement('p') //p created
        p.setAttribute("name", "pokemon_name") //name attribute inserted in p
        p.innerHTML = e.name //content inserted in p

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

            div.appendChild(span) //append span in div
        })
    })
}

// Order functions
function order_id(){
    populateCard(read)
    setButton(document.getElementById("id"))
}

function order_az(){
    setButton(document.getElementById("az"))
    let arr = Array()
    let pokes = Array()
    read.forEach(e => {
        arr.push(e.name)
    })
    arr = arr.sort()
    arr.forEach(el => {
        read.forEach(e => {
            if(e.name == el){
                let obj = {id: e.id, name: e.name, types: e.types, img: e.img}
                pokes.push(obj)
            }
        })
    })
    write = pokes
    populateCard(write)
}

function order_za(){
    setButton(document.getElementById("za"))
    let arr = Array()
    let pokes = Array()
    read.forEach(e => {
        arr.push(e.name)
    })
    
    arr = arr.sort()
    arr = arr.reverse()
    arr.forEach(el => {
        read.forEach(e => {
            if(e.name == el){
                let obj = {id: e.id, name: e.name, types: e.types, img: e.img}
                pokes.push(obj)
            }
        })
    })
    write = pokes
    populateCard(write)
}

function order_select(){
    const select = document.getElementById("poke_types")
    const value = select.options[select.selectedIndex].value
    unsetButton(select)
    let pokes = Array()
    read.forEach(e => {
        e.types.forEach(el => {
            let obj = {id: e.id, name: e.name, types: e.types, img: e.img}
            if(el.type.name == value){
                pokes.push(obj)
            }
        })
    })
    write = pokes
    populateCard(write)
}

function filter(){
    checkClick()
    const search = document.getElementById("pokemon_name_filter").value
    if(document.getElementById("autocomplete")){
        document.getElementById("autocomplete").remove()
    }

    if(!search){
        populateCard(read)
        return
    }

    let autocomplete = Array()
    read.forEach(e => {
        if(e.name.startsWith(search)){
            autocomplete.push(e.name)
        }
    })

    if(autocomplete){
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

function setValue(event){
    let poke_name
    if(!event){
        poke_name = document.getElementById("pokemon_name_filter").value
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
    let found = false
    read.forEach(e => {
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

// Buttons functions
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

function checkClick(){
    document.addEventListener("click", function(event){
        if(event.target.classList[0] != "pokemon_list"){
            document.getElementById("autocomplete").remove()
        }
    });
}

var write, read
getData() //get data of API and populate cards
populate_select() //get data of API and populate select