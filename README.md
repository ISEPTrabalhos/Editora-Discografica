Editora IDEIMusic
====================
Esta empresa dedica-se à edição de discos em CD e Vinil. Os clientes da editora são as lojas de 
venda de discos. Estas registam-se na editora para posteriormente efectuarem encomendas à 
editora discográfica. Cada loja registada recebe da editora, via serviço, uma API_Key para poder 
efetuar comunicações com a editora via Serviços. 
As lojas de discos têm um contrato com uma empresa ImportMusic, implementada em PHP, 
que é responsável pela importação de discos desta e de outras editoras. Os discos das lojas não 
são fornecidos exclusivamente pela Editora IDEIMusic, mas esta questão não será 
implementada neste protótipo. 
Quer a editora, quer a empresa ImportMusic implementam serviços para poderem ser 
notificadas do conteúdo das vendas nas lojas, de modo a gerirem mais eficazmente os seus 
stocks. 
Funcionalidades a implementar na aplicação: 
• Autenticação dos utilizadores na aplicação Web da editora, com os seguintes perfis: loja 
registada, gestor de produtos e administrador. Após o registo da loja, no site da editora, 
a editora envia-lhe por serviço uma API_Key.
• O gestor de produtos da editora faz a gestão da informação sobre os produtos: inserção, 
atualização e “eliminação” dos discos editados. 
• O administrador da editora pode consultar informação sobre as vendas efectuadas. Essa 
informação pode ser função de parâmetros como volume de vendas ou períodos 
temporais. 
• Autenticação de utilizadores (clientes) na loja de venda de discos. Considere apenas os 
perfis: utilizador registado (cliente) e Administrador da loja. 
• O administrador da loja para fazer uma encomenda à editora não usa a aplicação web 
da editora. Usa um serviço da editora, para pedir o catálogo dos discos, com base no qual elabora uma UI para realizar a encomenda. Essa encomenda é enviada à editora 
através do mesmo serviço. 
• Para ajudar o cliente da loja a efetuar as suas compras, é-lhe apresentada uma lista com 
sugestões de alguns discos relacionados com as últimas vendas: mais vendidos, saldos, 
etc. 
Considerações tecnológicas para a implementação: 
• A editora discográfica - Editora IDEIMusic - deve ser implementada em ASP.NET, 
utilizando um dos padrões empresariais estudados: Table Module + Table Data Gateway; 
Domain Model + Active Record; Model View Controller ASP.NET. 
• As aplicações devem ser instaladas nas máquinas virtuais dos grupos. 
• Deve ser implementada uma aplicação loja em PHP. Nesta loja devem implementar: 
o Registo de utilizadores 
o Apresentação do catálogo da loja aos utilizadores que é o resultado das 
encomendas à editora discográfica (acervo da loja), que se encontra na BD da 
loja.
o As encomendas do administrador à editora devem ser gravadas na BD. 
o Realização da compra de discos por um utilizador registado. Deve ser utilizado o 
conceito de Carrinho de Compras e gravada a venda na BD. 
• Na aplicação da empresa ImportMusic, implementada em PHP, pretende-se apenas 
implementar um Serviço que recebe a informação sobre a venda realizada em cada loja 
e atualizar uma tabela com essa informação. 
• Inserir a primeira parte do trabalho no site da loja implementada em PHP. Reorganizar 
essa 1ª parte do trabalho, estruturando-a como um Widget, para facilitar a sua inclusão 
noutros sites. 
Considerações gerais sobre a implementação 
• Organizar a aplicação segundo os Padrões de Aplicações Empresariais estudados ou 
adaptações desses padrões. 
• Documentar a Arquitetura da aplicação com uma Logical View e uma Deployment View 
• Especificar as interfaces dos componentes e documentar com pré e pós-condições as 
operações de mais alto nível. 
• Validações de dados em todas as camadas, tratamento de erros e excepções, e 
implementação de transações quando se justificarem.
• Configurar as páginas de erros e fazer log dos erros. Valorizações : 
• A editora discográfica envia um email à loja cliente quando a encomenda é registada. 
• Utilização de uma Framework JS, por exemplo AngularJS. 
• Utilização de Ajax.NET 
• O algoritmo de sugestão de discos considera a informação disponibilizada pelo LastFM, 
nomeadamente: 
• Em função das tags dos discos no carrinho de compras, sugere outros discos com 
tags semelhantes e que estejam no top semanal. 
• Mediante um termo (i.e. string) introduzido pelo utilizador da loja, sugere álbuns 
que estejam no top semanal que contenham a string no título e/ou tenham uma 
tag com tal string. 

NOTA: O modelo de domínio e modelo de dados deve ser simplificado, apenas devem 
considerar o necessário para resolver os requisitos funcionais pedidos. 
