//Seleciona os grids
const grids = document.querySelectorAll('.grid');
//Seleciona o cabeçalho, os grupos de texto e todos os textos
const headings = document.querySelectorAll('.heading .wrapper .text');

//Telas são os conjuntos de animações da página

//Entra em uma tela
function enterScreen(index){
    //Seleciona os elementos pelo índice
    const grid = grids[index];
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll('.column');
    //Ativa o grid passando o active
    grid.classList.add('active');
    //Percorre as colunas e anima entre ativados e desativados
    gridColumns.forEach(element => {
        element.classList.remove('animate-before', 'animate-after');
    });
    heading.classList.remove('animate-before', 'animate-after');
}

//Sai da tela
function exitScreen(index, exitDelay){
    //Seleciona os elementos pelo índice
    const grid = grids[index];
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll('.column');
      //Percorre as colunas, anima e desativa
    gridColumns.forEach(element => {
      element.classList.add('animate-after');
    });
    heading.classList.add('animate-after');
    setTimeout(() => {
      grid.classList.remove('active');
    }, exitDelay) 
}

//Cria os ciclos das animações
function setupAimationCycle({ timePerScreen, exitDelay }){
    //Passa primeiro ciclo ou primeira tela
    let nextIndex = 0;
    //Função que passa a tela inicial e os novos ciclos
    function nextCycle() {
      const currentIndex = nextIndex;
      //Chama a função que entra nas telas e passa o valor do ciclo
      enterScreen(currentIndex);
      //Depois que acabar o tempo de duração em cada tela ele sai do ciclo chamando a função exitScreen
      setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);
      //Seta o index do ciclo
      nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
    }
    //Chama um novo ciclo
    nextCycle();
    setInterval(nextCycle, cycleTime);
}

//Chama a função
setupAimationCycle({
    //Tempo de duração em cada tela
    timePerScreen: 2000,
    //Tempo de duração de cada animação
    exitDelay: 200 * 7
});