# Paginação

No código fonte do componente de paginação, há um [grande
comentário](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L34-L96)
explicando a lógica por trás do funcionamento do componente. Em primeiro
lugar, o componente recebe 4 propriedades importantes.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L15-L21)

``` typescript
interface PaginationProps {
    max_p: number; // Esta propriedade representa o número máximo de páginas que deve
                   // aparecer na barra de paginação.
    total_p: number; // Esta propriedade representa o total de páginas que existem
    this_p: number; // Esta propriedade representa a página atual
    goto_page: (n:number) => void; // Esta função será explicada à parte
    className: string; // Este atributo serve para o StyledComponents apenas
}
```

A função \'goto~page~\' é chamada quando se clica em um botão de uma
página, ou se seleciona uma página manualmente digitando. Ela recebe
justamente o número da página e é responsável por buscar os dados que
serão exibidos. Sua implementação é deixada para o componente pai do
componente de paginação. Como na seguinte implementação:

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/ShowProducts.tsx#L49-L65)

``` typescript
const goto_page = (x : number) : void => {
    setThisPage(x);

    const first = (x-1) * rows_per_page;
    const last  = first + rows_per_page;

    fetch('/api/products_range', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({'first': first, 'last': last}),
    })
    .then(res => res.json())
    .then((data : Product[]) => setProducts(data))
}
```

setThisPage e setProducts são [State
Hooks](https://react.dev/learn/state-a-components-memory) utilizados
para indicar ao componente a página atual, e as informações dos produtos
que serão exibidos. Dessa forma o componente de paginação só é
responsável por exibir a barra de paginação e chamar esta função com o
parâmetro adequado quando uma página for trocada.

Aproveite e veja também como o componente de paginação é chamado no
componente pai.
<https://github.com/odecam0/desafio-thummi/blob/main/client/src/ShowProducts.tsx#L69-L73>

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L23-L29)

``` typescript
const PaginationWidget : React.FC<PaginationProps>= (props) => {
    const max_p = props.max_p%2===0 ? props.max_p + 1 : props.max_p
    const limit = Math.floor(max_p/2);

    let pages_numbers : Array<number | '...'> = [];
```

O componente inicia definindo algumas variáveis fundamentais para
calcular quais botões serão exibidos na tela.

A constante \'max~p~\' é diretamente a propriedade max~p~ passada para o
componente, porém nela se toma o cuidado de que sempre seja ímpar, pois
quero que ao exibir os botões, quando houverem botões sobrando para a
esquerda e para a direita, a página atual seja exibida extamente no meio
da barra, caso este número fosse par isso não seria possível.

Já a constante \'limit\' é utilizada para definir a partir de que
distância entre a página atual e a primeira página, ou entre a atual e a
ultima página, se deve começar a não exibir determinadas páginas. Isto
será visto no próximo trecho de código.

\'pages~numbers~\' é uma lista com os números das páginas que serão
exibidos atualmente na barra de paginação. Posteriormente adcionei a
string \'...\' para indicar que alguns números de páginas estão sendo
executados, por isso o array pode possuir ou números, ou a string
\'...\'. Mais para frente no código este array é utilizado para gerar os
botões que serão exibidos.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L98-L124)

``` typescript
// Caso hajam mais páginas doque o total que pode ser exibido na
// barra de paginação
if (total_p > max_p) {
// Os próximos 3 casos serão explicados separadamente abaixo

// Primeiro caso
if ( this_p <= limit ) {

    for (let i=1; i<=max_p; i++) {
    pages_numbers.push(i);
    }
    pages_numbers.push('...');

// Segundo caso
} else if ( this_p <= total_p - limit ) {

    pages_numbers.push('...');
    for (let i=this_p-limit; i<= this_p+limit; i++) {
    pages_numbers.push(i);
    }
    pages_numbers.push('...');

// Terceiro caso
} else {

    pages_numbers.push('...');
    for (let i=total_p-(max_p-1); i<=total_p; i++) {
    pages_numbers.push(i);
    }

}

// Caso haja menos páginas doque o total que pode ser exibido na
// barra de paginação, deve-se trivialmente incluir todas as páginas
// na barra.
} else {

for (let i=1; i<=total_p; i++) {
    pages_numbers.push(i);
}

}
```

Neste trecho de código, no caso de haverem mais páginas doque o máximo
de páginas que cabem na barra de paginação, existem 3 casos a serem
tratados, sinalizados acima.

O primeiro caso, é quando a página atual está próxima o suficiente da
primeira página de forma que não seja necessário ocultar nenhuma página
do inicio, apenas as páginas do final. Isto é conferido utilizando a
variável \'limit\', caso o número da página atual seja menor que
\'limit\', então deve-se incluir na barra de paginação todos os número
de 1 até o número máximo que cabe na barra, ou seja, \'max~p~\'. Ao
final incluimos também um botão que não terá efeito algum com o texto
\'...\' para sinalizar que páginas próximas do fim estão sendo
ocultadas.

No segundo caso já sabemos que a página atual está afastada da primeira
página o suficiente para ocultarmos algumas das primeiras páginas, oque
não sabemos, é o quão afastada está. Então testamos se está afastada
também da última página, e este é o segundo caso, sendo necessário
ocultar tanto páginas do início quanto páginas do fim. Este caso que
torna necessário que \'max~p~\' seja ímpar.

O terceiro e último caso, como pode ter ficado claro, ocorre quando a
página atual está próxima o suficiente da última página de forma que não
seja necessário ocultar nenhuma página do fim, apenas do inicio, de
forma análoga ao primeiro caso.

Caso esta explicação não tenha sido clara, você é convidaddo à ler o
[grande
comentário](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L34-L96)
no código fonte que explica com maiores detalhes.

Após este trecho de código ser executado temos um arrai com o número das
páginas que devem ser exibidas na barra, e possívelmente algumas strings
\'...\'. Agora devemos tranformá-la em uma lista de botões prontos para
serem exibidos.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L127-L152)

``` typescript
const buttons_list = pages_numbers.map(
(x, i) => {

    // Primeiro caso
    if (x === props.this_p) {
    return (<StyledButton
            selected
            className='number'
            key={i}
        onClick={() => props.goto_page(x)}>
            {x}
        </StyledButton>);

    // Segundo caso
    } else if (x !== '...'){
    return (<StyledButton
         className='number'
        onClick={() => props.goto_page(x)}
         key={i}>
         {x}
        </StyledButton>);

    // Terceiro caso
    } else {
    return(<StyledButton
        className='number'
        key={i}>
        {x}
           </StyledButton>);
    }
}
)
```

Aqui chamamos função \'map\' no Array \'pages~numbers~\', de forma que
para cada elemento do Array a função com os 3 casos seja executada. Os 3
casos servem para tratar caso o botão seja referente à pagina atual
desta forma ele deve ser exibido com algum destaque, isto é indicado
pelo parâmetro \'selected\' que é passado para o componente do botão,
caso o elemento não seja a string \'...\', neste caso deve-se criar um
botão comum, e caso seja de fato a string \'...\' deve-se criar um botão
sem o parâmetro onClick, que nos outros casos receberam a função
goto~page~ do componente pai, com o número de suas respectivas páginas
como parâmetro, dessa forma, ao clicar nos botões comuns irá exibir as
paginas adequadas, e ao clicar no botão com \'...\' nada ocorrerá.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L155-L160)

``` typescript
const [goto_page, setGotoPage] = useState<string>("");
const gotoPageSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
e.preventDefault();
props.goto_page(parseInt(goto_page));
setGotoPage("");
}
```

Este trecho de código serve para lidar com um pequeno formulário que
existe para acessar uma página diretamente digitando seu número, sem
clicar no botão na barra de paginação. Utilizamos um State Hook para
armazenar o valor incluido no formulário, e um callback function para
ser chamado quando o usuário clicar em \'Go\'. Este callback basicamente
chama a função goto~page~ do componente pai, e reseta o valor do
formulário para que volte à estar vazio.

O componente retorna um div com 2 elementos principais que explicarei
separadamente.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L164-L172)

``` typescript
<div className='pages'>
{props.this_p === 1 ?
 <StyledButton inactive>Previous page</StyledButton> :
    <StyledButton onClick={() => props.goto_page(this_p - 1)}>Previous page</StyledButton>}
{buttons_list}
{props.this_p === props.total_p ?
 <StyledButton inactive>Next page</StyledButton> :
    <StyledButton onClick={() => props.goto_page(this_p + 1)}>Next page</StyledButton>}
</div>
```

Este trecho é responsável por exibir os botões da barra de paginação.
São exbidos também, antes e depois, botões para selecionar próxima
página ou a página anterior, e testes são feitos para que, caso esteja
na primeira página, não seja possível ir para a página anterior, e
semelhante para a última paǵina.

[Trecho do
código:](https://github.com/odecam0/desafio-thummi/blob/main/client/src/PaginationWidget.tsx#L176-L185)

    <form onSubmit={e => gotoPageSubmit(e)}>
    <label>
        Goto page:
        <input
        type='text'
        value={goto_page}
        onChange={e => setGotoPage(e.target.value)}/>
    </label>
    <input type='submit' value='Go'/>
    </form>

Este trecho é responsável por exibir o pequeno formúlario que comentei
acima.
