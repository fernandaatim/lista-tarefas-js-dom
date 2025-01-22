const btn = document.querySelector('.btn-add-tarefa')
const input = document.querySelector('.input-nova-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi(){
    const li = document.createElement('li')
    return li;
}

function criaBtnApagar(li){
    li.innerText += '';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // botaoApagar.classList = 'btn-apagar-tarefa'
    botaoApagar.setAttribute('class', 'btn-apagar-tarefa');
    li.appendChild(botaoApagar);
}

input.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        if(!input.value) return;
        criaTarefa(input.value)
    }
});

function criaTarefa(textInput){
    const li = criaLi();
    li.innerText = textInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBtnApagar(li);
    salvarTarefas();
}

btn.addEventListener('click', function(){
    if(!input.value) return;
    criaTarefa(input.value)
})

document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('btn-apagar-tarefa')){
        el.parentElement.remove();
        salvarTarefas();
    }
})

function limpaInput(){
    input.value = ''
    input.focus()
}

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON);
}

function adicionarTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}