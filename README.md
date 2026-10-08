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

A identificação numérica dos pedidos é local ao navegador; não representa uma sequência centralizada entre clientes ou dispositivos. Cada pedido possui UUID interno e snapshot versionado para recuperação ao recarregar a mesma aba e preparação de futura migração.

## Estrutura

- `index.html`: interface, estilos e lógica do portal.
- `REGRAS_DO_REPOSITORIO.md`: regras e condições do projeto.
- `docs/HISTORICO_DE_EVOLUCAO.md`: linha do tempo, decisões e registros de publicação.
- `config/estabelecimento.json`: identidade pública da loja, logo, cor e WhatsApp.
- `docs/CONFIGURACAO_E_INTEGRACAO.md`: configuração e contrato para evolução SaaS.
- `.nojekyll`: publicação dos arquivos estáticos sem processamento pelo Jekyll.

## Dados e configuração

O repositório não inclui cadastros reais de clientes, credenciais, chaves de acesso, dados bancários ou registros de pedidos. Nome, telefone e endereço são preenchidos durante o uso e inseridos na mensagem encaminhada ao WhatsApp; esta versão salva snapshots locais no navegador para recuperação, sem banco de dados central. Esses registros podem conter dados pessoais e não são backup: limpar o navegador ou trocar de dispositivo pode impedir sua recuperação. A sequência numérica também é local.

A identidade é carregada de um JSON público separado do HTML. A versão de demonstração utiliza nome provisório e não contém número de destino fixo. O destinatário é escolhido no WhatsApp. A seleção e o envio final dependem do aplicativo e do dispositivo.

Código e configurações publicados em uma página estática são acessíveis aos visitantes. Informações sigilosas não devem ser inseridas nesses arquivos.

## Executar

Acesse o [portal publicado](https://eubruno-coder.github.io/menu_lanchonete/) ou sirva a pasta por HTTP para teste local. A configuração JSON exige HTTP; abrir apenas o HTML por `file://` pode impedir seu carregamento. A transferência para o WhatsApp exige conexão com a internet.

## Configuração e integração

Consulte [Configuração e integração futura](docs/CONFIGURACAO_E_INTEGRACAO.md) para alterar a identidade da loja e entender a recuperação local, o formato dos registros e o fluxo operacional planejado.

## Histórico de evolução

Consulte a [evolução do projeto](docs/HISTORICO_DE_EVOLUCAO.md), com datas, decisões, limitações e referências aos commits e à primeira publicação.

## Regras do repositório

Consulte o documento separado: [Regras do repositório](REGRAS_DO_REPOSITORIO.md).
