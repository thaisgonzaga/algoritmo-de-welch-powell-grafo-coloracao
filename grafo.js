// Função para criar o grafo com 19 disciplinas e os conflitos entre elas
function criarGrafo() {
    const grafo = {
        1: [18, 16, 15, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 19], 
        2: [19, 18, 17, 15, 13, 12, 10, 9, 8, 7, 5, 4, 3], 
        3: [2, 19, 1, 18, 17, 16, 13, 12, 11, 10, 9, 8, 7, 5, 4], 
        4: [2, 19, 1, 16, 15, 14, 13, 12, 10, 9, 8],
        5: [3, 2, 19, 1, 16, 15, 13, 12, 10, 8, 6], 
        6: [5, 1, 18, 13, 12, 8, 7], 
        7: [6, 3, 2, 19, 1, 17, 16, 13, 12, 11, 10, 9, 8], 
        8: [7, 6, 5, 4, 3, 2, 19, 1, 18, 15, 13, 12, 11, 9],
        9: [8, 7, 4, 3, 2, 1, 17, 16, 15, 13, 11, 10], 
        10: [9, 7, 5, 4, 3, 2, 19, 1, 17, 16, 14, 13, 11], 
        11: [10, 9, 8, 7, 3, 1, 17, 16], 
        12: [8, 7, 6, 5, 4, 3, 2, 19, 1, 16, 15],
        13: [10, 9, 8, 7, 6, 5, 4, 3, 2, 19, 1, 18, 17, 15, 14], 
        14: [13, 10, 4, 15], 
        15: [14, 13, 12, 9, 8, 5, 4, 2, 19, 1], 
        16: [14, 12, 11, 10, 9, 7, 5, 4, 3, 19, 1, 17],
        17: [16, 13, 11, 10, 9, 7, 3, 2, 18], 
        18: [17, 16, 13, 8, 6, 3, 2, 19, 1], 
        19: [1, 18, 16, 15, 13, 12, 10, 8, 7, 5, 4, 3, 2]
    };
    return grafo;
}

// Função que aplica o Algoritmo de Welch-Powell para colorir o grafo
function welchPowell(grafo) {
    // Ordena os vértices (disciplinas) pelo grau de forma decrescente
    const vertices = Object.keys(grafo).sort((a, b) => grafo[b].length - grafo[a].length);

    const cores = {}; // Objeto para armazenar as cores atribuídas aos vértices
    const periodos = {}; // Objeto para armazenar a quantidade de exames por período

    // Atribui cores aos vértices
    vertices.forEach((vertice) => {
        const coresVizinhos = new Set(); // Conjunto para armazenar as cores dos vizinhos

        // Coleta as cores dos vizinhos
        grafo[vertice].forEach((vizinho) => {
            if (cores[vizinho] !== undefined) {
                coresVizinhos.add(cores[vizinho]);
            }
        });

        // Encontra a primeira cor disponível que não está sendo usada pelos vizinhos
        let cor = 0;
        while (coresVizinhos.has(cor) || (periodos[cor] >= 2)) {
            cor++;
        }

        cores[vertice] = cor; // Atribui a cor ao vértice
        periodos[cor] = (periodos[cor] || 0) + 1; // Atualiza a contagem de exames no período
    });

    return cores;
}

// Criação do grafo com 19 componentes curriculares
const grafo = criarGrafo();

// Aplica o algoritmo de Welch-Powell para colorir o grafo
const resultado = welchPowell(grafo);

// Exibe o resultado da coloração dos vértices (calendário de exames)
console.log("Cronograma de exames (disciplina: período):");
Object.entries(resultado).forEach(([vertice, cor]) => {
    console.log(`Disciplina ${vertice}: Período ${cor + 1}`);
});
