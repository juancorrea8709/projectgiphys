const tema = document.querySelector('#temaDark');

tema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

const searchForm = document.getElementById("search-form")
const barra_Busqueda = document.getElementById("barraBusqueda")
const resulEle = document.getElementById("resultados")

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const q = barra_Busqueda.value
        guardado(q)
        search(q)
        })
     
    function guardado(q){
        if(localStorage.getItem("texto")) {
            const arregloDeNombresIngresados = JSON.parse(localStorage.getItem("texto"));
            arregloDeNombresIngresados.push(q);
            localStorage.setItem("texto", JSON.stringify(arregloDeNombresIngresados));
        } else {
            localStorage.setItem("texto", JSON.stringify([q]));
        }
    }
        function search(q) {    
        const apiKey = 'EzcuwNpbcLgDaUGzTOsaowBennPSHunD'
        const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`

        fetch(path).then(function(res) {
            return res.json()
            }).then(function(json) {
            
            console.log(json.data[0].images.fixed_width.url)
            
            let resultadosHTML = ''
            json.data.forEach(function(obj){
                console.log(obj)

                const url = obj.images.fixed_width.url
                const width = obj.images.fixed_width.width
                const height = obj.images.fixed_width.height
                const title =  obj.images.fixed_width.title  

                resultadosHTML += `<img class="gifs" src="${url}" width="${width}" height="${height}" title="${title}">`

              
            })

            resulEle.innerHTML = resultadosHTML
    })

}

navigator.mediaDevices.getUserMedia({ 
    audio: true, video: true}).then((stream)=>{
        console.log(stream)
    }).catch((err)=> console.log(err))        