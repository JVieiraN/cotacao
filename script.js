fetch('./cc.json')
    .then((response) => response.json())
    .then((data) => {
        const dados = data;
        
        
        let selecao1 = document.querySelector('#moeda1');
        let selecao2 = document.querySelector('#moeda2');
        
        dados.forEach(listasPais => {
            selecao1.innerHTML += `<option value = ${listasPais.currency_code}>${listasPais.currency_code}</option>`

            selecao2.innerHTML += `<option value = ${listasPais.currency_code}>${listasPais.currency_code}</option>`
        });

        selecao1.addEventListener('change', (select) => {
            const moeda1 = select.target.value
            const moeda2 = selecao2.value
            chamarApi(moeda1, moeda2)
        })

        selecao2.addEventListener('change', (select) => {
            const moeda2 = select.target.value
            const moeda1 = selecao1.value
            chamarApi(moeda1, moeda2)           
        })
})
    .catch((error) => {
        console.log('Erro ao carregar informações do JSON', error)
    });




async function chamarApi(moeda1, moeda2){
    const URL = `https://economia.awesomeapi.com.br/json/last/${moeda1}-${moeda2}`;
    const resp = await fetch(URL);
    let key = `${moeda1}${moeda2}`
    if (resp.status === 200){
        let resultado = document.querySelector('.resultado');
        const obj = await resp.json();
        let cotacao = obj[key].high;

        resultado.textContent = `A cotação atual entre ${moeda1} e ${moeda2} é ${cotacao}`
    }
}