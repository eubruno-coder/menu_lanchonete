# Direção visual V0.3 — Experiência acolhedora

**Status:** especificação para implementação futura; não altera a página atual.

## Objetivo
Evoluir o protótipo de cardápio para uma experiência mobile-first inspirada na demonstração fictícia “Sabor da Vila”, com identidade configurável por estabelecimento. Não copiar o nome nem os dados fictícios para produção.

## Princípios
1. **Acolhimento:** tipografia amigável, tons suaves, espaço em branco, mensagens curtas e claras.
2. **Comida em destaque:** fotos reais dos produtos quando cadastradas; fallback visual elegante quando ausentes.
3. **Compra sem fricção:** categorias em chips horizontais, cards legíveis, botões de ação inequívocos, carrinho acessível.
4. **Confiança:** preços explícitos, totais atualizados, opções de pagamento e entrega claras, estados de erro compreensíveis.
5. **SaaS:** nenhuma informação do estabelecimento hardcoded no HTML.

## Estrutura proposta
- **Cabeçalho:** logo circular, nome da loja, descrição curta e informação de atendimento quando disponível.
- **Boas-vindas:** faixa de destaque com frase convidativa, visual leve e CTA para explorar cardápio.
- **Categorias:** navegação horizontal persistente na seção do menu, indicação clara da categoria selecionada.
- **Produtos:** foto opcional, nome, descrição breve, preço e ação “Adicionar” ou “Montar”.
- **Personalização:** painel/modal mobile com seleção de recheios, acompanhamentos, observações, limites e subtotal.
- **Carrinho:** barra flutuante discreta com quantidade e total; resumo com editar/remover itens.
- **Complementos:** sugestões contextuais de bebidas/adicionais, dispensáveis, sem adicionar itens automaticamente.
- **Checkout:** sequência clara de pagamento, entrega/retirada, revisão e confirmação; preservar comanda WhatsApp existente.

## Tokens de interface (valores iniciais)
- Fundo: `#FAF8F4`; superfície: `#FFFFFF`; texto: `#292C29`.
- Destaque acolhedor: `#F8EAD7`; borda: `#E9E4DC`.
- Ação principal: usar `theme.primary` da configuração, com contraste acessível.
- Raios: 12–20 px; sombras sutis; espaçamento base: 8 px.
- Tipografia: sistema com hierarquia clara, botões com alvo de toque confortável.

## Configuração evolutiva (não aplicada ainda)
Ampliar `config/estabelecimento.json` para admitir `cover.url`, `tagline`, `hours`, `serviceModes` e catálogo externo contendo `image.url`, `category`, `price`, `available` e `modifiers`. Validar entradas, definir fallbacks e migrar sem quebrar o schema atual.

## Etapas de entrega
1. **Protótipo visual isolado:** HTML/CSS demonstrativo em branch própria, com visual próximo ao Sabor da Vila e dados fictícios.
2. **Design system:** separar CSS em tokens, componentes, responsividade e estados.
3. **Integração:** conectar componentes ao catálogo, carrinho e configuração reais, sem reescrever regras de negócio.
4. **Validação mobile:** testar 360, 390 e 430 px; fluxo de personalização, bebida sugerida, carrinho, pagamento, entrega e comanda.
5. **Homologação e publicação:** ambiente de teste separado; aprovar antes de mesclar na main.

## Critérios de aceite
- Nome, logo e cores carregados da configuração externa.
- Nenhuma regressão no carrinho, nos preços, nas personalizações e na comanda.
- Uso confortável em celular, inclusive com teclado virtual e diálogos.
- Sem descontos fictícios, preços ocultos ou itens adicionados sem consentimento.
- Modo claro consistente e estados vazios/erro definidos.

## Fora do escopo desta fase
Painel administrativo, gestão de pedidos em tempo real, autenticação de lojistas, banco multi-tenant e cobrança SaaS: dependem de arquitetura própria.
