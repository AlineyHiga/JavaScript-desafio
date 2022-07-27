//DESAFIO 2
//Aline Yumi Higa
const aceitarVirgula=(expressao)=>{//função para aceitar número com vírgula
    let numero=expressao.replace(/,/g , '.')//muda a virgula para ponto
    return Number(numero)// retorna um número ou "NaN"
}
const perfilDoInvestidor=()=>{//função para definir o perfil do investidor
    const media=(percentual)=>percentual/2;//função da media das duas perguntas
    const perfilMaiorMedia=(vetor)=>{//função para pegar a maior media dentres os tipos de perfil
        let maior=vetor[0].media
        let tipoInvestidor=vetor[0].tipo;
        for (let index = 1; index < vetor.length; index++) {
            let elemento = vetor[index].media;//no vetorMedia na posição index pega o valor da media
            if(elemento>maior){
                elemento=maior
                tipoInvestidor=vetor[index].tipo//tipo de perfil que tem a maior media 
            }
        }
        return tipoInvestidor
    }
    let ultraconservador=0;
    let conservador=0;
    let dinamico=0;
    let arrojado=0;
    let  pergunta1;
    let pergunta2;
    //pergunta 1 , sendo que atribuimos os números para a respostas
    do{
         //pergunta 1 , sendo que atribuimos os números para a respostas
        pergunta1=Number(prompt("Você tem formação na área financeira?(digite o número da respostas abaixo)\n 1. Sim, sem experiência\n 2. Sim, com experiência \n 3. Não, mas tenho experiência \n 4. Não, com pouca experiência \n 5. Não, e não tenho experiência"),10)
    }while(pergunta1!=1 &&pergunta1!=2 && pergunta1!=3 && pergunta1!=4 && pergunta1!=5 );
    //checar o valor da pergunta e atribuir o valor dos percentuais  nas variaveis dos tipos
    if (pergunta1==1) {
        conservador+=0.1
        dinamico+=0.9
    } 
    else if(pergunta1==2){
        dinamico+=0.35
        arrojado+=0.65
    }
    else if(pergunta1==3){
        dinamico+=0.77
        arrojado+=0.23
    }
    else if(pergunta1==4){
        conservador+=0.64
        dinamico+=0.36
    }
    else {
        ultraconservador+=0.75
        conservador+=0.25
    }

    do{
        //pergunta 2, sendo que atribuimos os números para a respostas
        pergunta2=Number(prompt("Qual produto você conhece?(digite o número da respostas abaixo)\n 1. Poupança, depósito a prazo \n 2. Tesouro Direto, renda variável \n 3. Produtos 1 e 2 \n4. Nunca investiu, mas conheço alguns produtos \n5. Nunca investi e não conheço nenhum "),10)
    }while(pergunta2!=1 &&pergunta2!=2 && pergunta2!=3 && pergunta2!=4 && pergunta2!=5);

    //checar o valor da pergunta e atribuir o valor dos percentuais  nas variaveis dos tipos
    if (pergunta2==1) {
        ultraconservador+=0.6
        conservador+=0.4
    } 
    else if(pergunta2==2){
        dinamico+=0.40
        arrojado+=0.60
    }
    else if(pergunta2==3){
        dinamico+=0.22
        arrojado+=0.78
    }
    else if(pergunta2==4){
        conservador+=0.73
        dinamico+=0.27
    }
    else {
        ultraconservador+=0.60
        conservador+=0.40
    }

    let VetorMedia=[{media:media(ultraconservador),tipo:"Ultraconservador"},
    {media:media(conservador),tipo:"Conservador"},
    {media:media(dinamico),tipo:"Dinâmico"},
    {media:media(arrojado),tipo:"Arrojado"}
    ]//vetor com as medias e os tipos
    
    return perfilMaiorMedia(VetorMedia)// retorna o tipo de perfil com a maior media
}
const tiposInvestimento=(investidor)=>{//função para decidir a sugestão de investimento
    if(investidor=='Ultraconservador' || investidor=='Conservador'){
        return "Poupança Renda Fixa"
    }
    else{// investidor= dinamico e arrojado
        return "Renda variável, Ações"
    }
}    
const rendimentoReal=(rendimento,tipo)=>{// função do rendimento real com a influencia da inflação
    let inflação=0;
    do{
        inflação=prompt(`Digite, em porcentagem, a inflação ${tipo} atual `)//inflação sendo que o tipo(anual/mensal) vai ser igual ao juros, no caso da poupança e na variavel pode ser os dois
        inflação=aceitarVirgula(inflação)
    }while(Number.isNaN(inflação))//inflação pode ser negativo e zero, mas deve ser um número
    rendimento=rendimento/100//transformar o percentual em decimal
    inflação=inflação/100//transformar o percentual em decimal
    return ((1+rendimento)/(1+inflação))-1// eq do rendimento real (em decimal)
};

const nome=prompt("Digite seu Nome");//nome do usuário 
let sexo='';
let idade='';
let renda=0;
do{
    sexo=prompt("Digite seu sexo(M/F)")// sexo do usuário
}while(sexo!=='M' && sexo!=='F' && sexo!=='m' && sexo!=='f')//aceita só se o usuario digitar M,F,m,f

//vai padronizar as duas respostas
if(sexo=="M" || sexo=='m'){
    sexo="Masculino"
}
else{
    sexo="Feminino"
}

do{
    idade=Number(prompt("Digite sua idade"))//idade do usuario 
}while((idade<=0 || Number.isInteger(idade)==false) || Number.isNaN(idade))//aceita só números maiores que 0  e inteiros

do{
    renda=prompt("Digite sua renda mensal em reais")//renda mensal do usuario
    renda=aceitarVirgula(renda).toFixed(2)//se o usuario digitar o numero com virgula, ele vai aceitar 
}while(renda<0 || isNaN(renda) )//aceita só números e também números positivos 

const perfil=perfilDoInvestidor();//função para determinar o perfil do investidor
const investimento=tiposInvestimento(perfil);//função para determinar a sugestão de investimento vendo pelo perfil do investidor

console.log(`SIMULADOR DE INVESTIMENTO\n
NOME: ${nome}
Idade: ${idade}
Renda Mensal: R$${renda}
Perfil do Investidor: ${perfil}
Sugestão de investimento: ${investimento}.`)//primeira parte das informações do simulador

if(investimento=="Poupança Renda Fixa"){//se o investimento for poupança renda fixa, a simulação vai ser com juros simples e compostos  
    const comparativo=(variavel)=>{
        const vetorComparativo=["ano","anos","mês","mes","anual","ANUAL","Anual","mensal","MENSAL","Mensal"]//vetor com todas as alternativas
        return vetorComparativo.includes(variavel) // se a variavel não conter no vetor, a expressão retorna falsa
    }
    const padronizar=(variavel)=>{//função padronizadora para "meses" e "anos"
        const vetorMes=["mês","mes","mensal","Mensal","MENSAL"]
        let mes=vetorMes.includes(variavel)//vai ver se a variavel contem no vetorMes, se não contem ele ira ser falso
        if(mes){
            return "mensal"//variavel é uma variação do mes
        }
        return "anual"// como nesse caso a variavel vai ser uma variação do mes ou ano ; caso não for mes vai ter que ser ano       
    }
    let capital=0;
    let tipoRendimento="";
    let rendimento=0;
    let tipoTempo="";
    let tempo=0;
    let JSimples=0;
    let JCompostos=0;
    let lucroJSimples=0;
    let lucroJCompostos=0;
    do{
        capital=prompt("Digite o valor do capital investido")//capital que o usuario quer aplicar 
        capital=aceitarVirgula(capital)  
    }while(capital<=0 || Number.isNaN(capital))

    do{
        rendimento=prompt(`Digite a taxa de juros  da poupança ou da SELIC em porcentagem, sem o simbolo %`);// taxa de juros
        rendimento=aceitarVirgula(rendimento)
    }while(rendimento<=0 || Number.isNaN(rendimento))
    
    do{
        tipoRendimento=prompt("Digite se o juros é mensal ou anual(mensal/anual)")//identifica se o juros vai estar relacionado ao mes ou ano
    }while( comparativo(tipoRendimento)==false)//só vai sair do laço se o usuario escrever uma das palavras que está no vetorcomparativo
    tipoRendimento=padronizar(tipoRendimento)//função para deixar padronizado  1 único jeito 

    rendimento=rendimentoReal(rendimento,tipoRendimento)// função do rendimento real considerando a inflação.

    do{
        tempo=prompt(`Digite o tempo  previsto de investimento `)//tempo que o usuario quer aplicar o investimento
        tempo=aceitarVirgula(tempo)
    }while(tempo<=0||Number.isNaN(tempo))
    do{
        tipoTempo=prompt("Digite se o tempo de investimento é anual ou mensal(anual/mensal)")//identificar se o usuario vai digitar o tempo em anos ou meses
    }while(comparativo(tipoTempo)==false)
    tipoTempo=padronizar(tipoTempo)//função para deixar padronizado  1 único jeito 
    
    if (tipoRendimento!=tipoTempo){/*quarantir que os juros e tempo estejam no mesmo tipo de tempo*/
        if(tipoRendimento=="anual"){
            tempo=tempo/12//tempo está em meses e vamos passar para anos
        }
        else{
            tempo=tempo*12//tempo está em anos e vamos converter para meses
        }
    }
    JSimples=(capital*rendimento*tempo)//formula para calcular o lucro do juros simples
    lucroJSimples= (JSimples).toFixed(2)// sendo que arredondamento para 2 casas decimais
    JCompostos=(capital*((1+rendimento)**tempo))//formula para calcular o capital final do juros compostos
    lucroJCompostos=(JCompostos-capital).toFixed(2)//calcular o lucro dos juros compostos, sendo que arredondamos para 2 casas decimais
    console.log(`  -SIMULAÇÃO DE INVESTIMENTO-\n
Com juros simples
Lucro possível:R$ ${lucroJSimples}\n
Com juros compostos
Lucro possível:R$ ${lucroJCompostos}`)
}//segunda parte das informações do simulador

else{//se o investimento for "Renda variável, Ações", a simulação vai ser com  ações
    let compraAcao=0;
    let vendaAcao=0;
    let quantAcao=0;
    let rendimento=0;
    let lucro=0;
    do{
        compraAcao=prompt("Digite o valor da ação que pretende comprar")//valor de compra das ações  
        compraAcao=aceitarVirgula(compraAcao)
    }while(compraAcao<=0|| Number.isNaN(compraAcao))
    do{
        quantAcao=Number(prompt("Digite a quantidade de ação que pretende comprar"))//quantidade de ações compradas, elas devem ser inteiras
    }while((quantAcao<0 || Number.isInteger(quantAcao)==false)|| Number.isNaN(quantAcao))
    do{
        vendaAcao=prompt("Digite o valor da ação que pretende vender")//valor de venda das ações 
        vendaAcao=aceitarVirgula(vendaAcao)
    }while(vendaAcao<0|| Number.isNaN(vendaAcao))
    
    rendimento=(vendaAcao/compraAcao)*100-100//formula para calcular o rendimento das açães
    rendimento=rendimentoReal(rendimento,"(Mensal/Anual)")//formula para calcular o rendimento real 

    lucro=(quantAcao*compraAcao*rendimento).toFixed(2)//formula para calcular o lucro obtido, com aredondamento com 2 casas decimais
    console.log(`-Simulação de investimento-
    Lucro possível: R$${lucro}`)//segunda parte das informações pedidas
    }

