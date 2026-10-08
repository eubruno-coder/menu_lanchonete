# Portal de pedidos

Interface web para consultar um cardápio, personalizar produtos e preparar um pedido para envio pelo WhatsApp.

## Funcionalidades

- Cardápio por categorias e carrinho com controle de quantidades.
- Personalização de produtos com limites de seleção e observações.
- Seleção de PIX, cartão de crédito, cartão de débito ou dinheiro com informação de troco.
- Identificação do cliente e escolha entre entrega e retirada.
- Endereço solicitado apenas para entrega.
- Resumo de checkout e geração de comanda para envio pelo WhatsApp.
- Interface adaptada para computadores e celulares.

## Estado atual

O projeto está em desenvolvimento e recebe ajustes progressivos de interface e funcionamento. Esta versão não possui painel de gestão, acompanhamento de pedidos ou processamento de pagamentos. A confirmação do pedido ocorre com a loja pelo WhatsApp.

A identificação numérica dos pedidos é local ao navegador; não representa uma sequência centralizada entre clientes ou dispositivos.

## Estrutura

- `index.html`: interface, estilos e lógica do portal.
- `REGRAS_DO_REPOSITORIO.md`: regras e condições do projeto.
- `docs/HISTORICO_DE_EVOLUCAO.md`: linha do tempo, decisões e registros de publicação.
- `.nojekyll`: publicação dos arquivos estáticos sem processamento pelo Jekyll.

## Dados e configuração

O repositório não inclui cadastros reais de clientes, credenciais, chaves de acesso, dados bancários ou registros de pedidos. Nome, telefone e endereço são preenchidos durante o uso e inseridos na mensagem encaminhada ao WhatsApp; esta versão não os grava em uma base de dados. A sequência numérica de pedidos fica no armazenamento local do navegador.

A versão de demonstração utiliza identificação genérica e não contém número de destino fixo. O destinatário é escolhido no WhatsApp. A seleção e o envio final dependem do aplicativo e do dispositivo.

Código e configurações publicados em uma página estática são acessíveis aos visitantes. Informações sigilosas não devem ser inseridas nesses arquivos.

## Executar

Abra `index.html` em um navegador ou acesse a versão publicada pelo GitHub Pages. A transferência para o WhatsApp exige conexão com a internet.

## Histórico de evolução

Consulte a [evolução do projeto](docs/HISTORICO_DE_EVOLUCAO.md), com datas, decisões, limitações e referências aos commits e à primeira publicação.

## Regras do repositório

Consulte o documento separado: [Regras do repositório](REGRAS_DO_REPOSITORIO.md).
