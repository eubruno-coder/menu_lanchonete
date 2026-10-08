# Configuração e integração futura

## Configuração pública do estabelecimento

O portal carrega `config/estabelecimento.json` por HTTP. O HTML não contém o nome nem o número específico de uma loja. Uma falha na configuração bloqueia o checkout para evitar pedidos com identidade incorreta.

| Campo | Uso |
| --- | --- |
| `schemaVersion` | Versão do formato; atualmente 1. |
| `id` | Identificador estável do estabelecimento. Não alterar ao mudar o nome. |
| `name` | Nome exibido no portal e no cabeçalho da comanda. |
| `description` | Descrição curta no cabeçalho. |
| `whatsapp` | Número em formato internacional, somente dígitos. Vazio permite escolher destinatário no WhatsApp. |
| `logo.url` | Caminho de um arquivo de imagem ou URL HTTPS. Vazio oculta o espaço da logo. |
| `logo.alt` | Texto alternativo da logo. |
| `theme.primary` | Cor principal hexadecimal, por exemplo `#aa3042`. |

A logo aparece ao lado do nome no cabeçalho, com proporções preservadas. Nome, descrição e texto alternativo são inseridos como texto, não como HTML.

Este arquivo é público, mesmo estando separado do HTML. Não inserir senhas, tokens, dados pessoais, dados bancários ou informações internas. O nome e a logo definitivos ainda precisam ser informados pelo responsável. A versão usa “Seu estabelecimento” provisoriamente.

Para testar localmente, servir a pasta por HTTP: a leitura de JSON via `fetch` não é compatível com abertura direta por `file://` em muitos navegadores.

## Identificação e recuperação atual

- O formato visível `PEDIDO-#35` é preservado.
- A chave antiga `delivery-order-sequence` continua sendo usada: não há reinício intencional da numeração no mesmo navegador e origem.
- Cada pedido recebe também um UUID interno estável, usado para integração futura e deduplicação.
- Um snapshot versionado é salvo em `localStorage`, sob `delivery-order-v1:<UUID>`. A aba mantém o UUID ativo em `sessionStorage`.
- Carrinho, código, data, pagamento e dados preenchidos são restaurados ao recarregar a mesma aba.
- “Fazer novo pedido” inicia outro UUID sem apagar o snapshot anterior. A numeração seguinte é atribuída ao revisar o novo pedido.
- A alocação usa Web Locks quando disponíveis, para serializar a sequência local entre abas. Sem Web Locks, não há garantia de coordenação concorrente.
- Se o salvamento obrigatório falhar, o pedido não é encaminhado silenciosamente sem recuperação.
- `whatsapp_opened` significa apenas abertura do WhatsApp. Não representa envio confirmado ou recebimento pela loja.
- Rascunhos antigos de versões anteriores que não tinham snapshot não podem ser recuperados retroativamente.

Os registros são locais ao dispositivo e à origem do site. Limpar os dados do navegador, usar navegação privada, trocar de domínio ou dispositivo pode impedir a recuperação. Não há backup central ou garantia de ausência de perda. A numeração ainda não é global entre clientes.

## Formato do snapshot — versão 1

Campos: `schemaVersion`, `uid`, `storeId`, `displayId`, `createdAt`, `updatedAt`, `channelState`, `items`, `subtotal`, `payment`, `customer` e `fulfillment`.

Valores monetários são números em reais nesta versão. Em uma futura API, o servidor deverá normalizar valores em centavos, recalcular preços e validar os limites a partir do catálogo oficial. Os valores enviados pelo navegador não são fonte confiável para cobrança.

Os itens atuais preservam nome, quantidade, valor e escolhas em `details`. A evolução do catálogo deverá incluir IDs estáveis de produtos e complementos, mantendo o snapshot legível e o formato legado durante a migração.

## Fluxo operacional planejado — não implementado

| Status futuro | Significado | Próximos estados previstos |
| --- | --- | --- |
| `received` | Pedido efetivamente recebido pela plataforma | `preparing` |
| `preparing` | Pedido em preparação | `ready_for_pickup` ou `out_for_delivery`, conforme recebimento |
| `ready_for_pickup` | Pronto para retirada na loja | Conclusão futura |
| `out_for_delivery` | Pronto e saindo para entrega | Conclusão futura |

No painel, os dois últimos estados integrarão a aba “Pronto”, subdividida em “Pronto para retirada” e “Saindo para entrega”. A página atual não informa esses estados ao cliente nem possui painel de gestão.

## Requisitos da futura integração SaaS

1. Cadastro de estabelecimentos e configuração pública lida por loja, substituindo o JSON estático por API compatível.
2. Persistência central de pedidos com isolamento por estabelecimento e controle de acesso do painel.
3. Numeração sequencial por loja atribuída pelo servidor em transação; restrição de unicidade e deduplicação por UUID/idempotência.
4. Preservação do UUID e do código legado na migração. Conflitos de códigos locais entre dispositivos devem ser tratados explicitamente, sem sobrescrever registros.
5. Registro de eventos e alterações de status com datas e responsáveis.
6. Sincronização que confirma o salvamento no servidor antes de considerar o pedido recebido, com fila e reenvio idempotente para falhas de conexão.
7. Migração/importação explícita dos snapshots locais, com validação, confirmação, tratamento de duplicados e política de retenção de dados pessoais.
8. Backups, recuperação e testes de migração antes de prometer preservação de dados.

Esta preparação documenta o contrato e preserva registros locais. Não implementa uma API, banco de dados, sincronização, backup ou painel SaaS.
