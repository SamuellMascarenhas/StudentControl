
# Student Control System

## Visão Geral

O Student Control System é uma aplicação desenvolvida para ajudar professores a gerenciar as notas e a frequência dos alunos em várias disciplinas. O sistema permite que os professores insiram notas para cinco disciplinas e a frequência de cada aluno, calcule automaticamente as médias das notas e da frequência, e identifique quais alunos estão acima ou abaixo de certos critérios de desempenho.

## Funcionalidades

- **Cadastro de Alunos**: Permite ao usuário cadastrar alunos com suas respectivas notas e frequências.
- **Cálculo Automático**: Calcula automaticamente a média das notas de cada aluno e da turma em cada disciplina, além de calcular a frequência geral de cada aluno.
- **Relatórios de Desempenho**: Gera relatórios que indicam quais alunos têm uma média de notas acima da média da turma e quais têm uma frequência abaixo de 75%.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Node.js com Express
- **Banco de Dados**: SQLite

## Premissas Assumidas

1. Cada aluno possui exatamente cinco notas, uma para cada disciplina.
2. As notas variam de 0 a 10.
3. A frequência é dada como uma porcentagem entre 0% e 100%.
4. O login é necessário para acessar o formulário de cadastro de alunos, utilizando um login predefinido (usuário: 'admin' e senha: '1234').

## Decisões de Projeto

- **Uso do SQLite**: Optamos pelo SQLite como banco de dados devido à sua simplicidade e facilidade de uso em projetos pequenos e médios. Ele é armazenado como um arquivo único, o que facilita o desenvolvimento e a implantação.
- **Backend em Node.js/Express**: Escolhemos Node.js com Express para o backend por sua flexibilidade e a ampla gama de bibliotecas disponíveis. O Node.js é ideal para a construção de APIs rápidas e escaláveis.
- **Frontend em React**: React foi escolhido para o frontend por sua capacidade de criar interfaces de usuário interativas e sua popularidade na comunidade de desenvolvimento, facilitando a colaboração e o suporte.

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (Node Package Manager)

### Passos para Instalação

1. **Clone o repositório**:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd student-control-system
    ```

2. **Instale as dependências do backend**:

    ```bash
    cd backend
    npm install
    ```

3. **Inicie o servidor backend**:

    ```bash
    npm start
    ```

    O servidor será iniciado em `http://localhost:5000`.

4. **Instale as dependências do frontend**:

    ```bash
    cd ../frontend
    npm install
    ```

5. **Inicie o servidor frontend**:

    ```bash
    npm start
    ```

    O servidor frontend será iniciado em `http://localhost:3000`.

## Como Usar

1. **Acessar a aplicação**: Navegue até `http://localhost:3000`.
2. **Login**: Use o login predefinido (usuário: `admin`, senha: `1234`).
3. **Adicionar Aluno**: Preencha o formulário com as informações do aluno e clique em "Adicionar Aluno".
4. **Visualizar Alunos e Relatórios**: Use o dashboard para visualizar as médias, listas de alunos acima da média da turma e aqueles com frequência baixa.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona uma nova feature'`).
4. Faça um push para a branch (`git push origin feature/nome-da-sua-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT.

## Contato

- **LinkedIn**: [Samuel Mascarenhas](https://www.linkedin.com/in/samuellmascarenhas/)
- **Portfólio**: [samuellmascarenhas.github.io/Portfolio](https://samuellmascarenhas.github.io/Portfolio/)
