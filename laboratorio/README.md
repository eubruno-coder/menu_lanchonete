# Laboratório de pedidos entre dispositivos
Esta pasta é uma **prova de conceito isolada**, disponível somente na branch `feature/pedidos-realtime-poc`. A versão V0.3 da `main` permanece com checkout via WhatsApp.
## Como testar
1. Publique esta branch em um ambiente de homologação HTTPS (GitHub Pages da `main` **não** publica automaticamente esta branch). Alternativamente, execute um servidor HTTP local e abra em dois dispositivos com acesso ao endereço.
2. No laboratório, crie uma conta de teste com e-mail e senha. Confirme o e-mail se solicitado.
3. Na primeira abertura, informe a **chave publishable** do projeto Supabase (Dashboard → Settings → API Keys). Ela fica salva somente no navegador do dispositivo. Nunca use a chave secret/service_role.\n4. Faça login com **a mesma conta de teste** no celular e no computador.
5. No computador, abra **Painel**. No celular, abra **Enviar pedido** e envie um pedido fictício.
6. A tabela `orders` emite evento Realtime e o painel consulta novamente os dados. Há também atualização a cada 10 segundos.
## Segurança e limitações
- Projeto Supabase separado; chave **publishable** no navegador (nunca usar `service_role` no frontend).
- Edge Function `delivery-demo` exige JWT de usuário e restringe origens ao GitHub Pages do projeto e localhost. Origem não é autenticação: cada operação é validada pelo JWT e pela associação do usuário à loja.
- Criação de pedido transacional, idempotência por `client_request_id`, preço calculado no banco, RLS para leitura e isolamento por estabelecimento.
- O laboratório exige login até para simular o cliente. **Não é checkout público** nem está pronto para receber pedidos reais.
- O cadastro e a confirmação de e-mail dependem da configuração de Auth do projeto.
- O status ainda é apenas `received`; edição de status, pagamento, antifraude, limites de requisição e catálogo público ficam para as próximas etapas.
- Antes de qualquer uso em produção: backup/restauração testados, controles de abuso, auditoria e testes de autorização.
## Portabilidade
A lógica SQL está em PostgreSQL. A Edge Function e o canal Realtime são adaptadores substituíveis; em uma migração futura, preservar os IDs, as relações, o histórico, as imagens e a autenticação requer um plano de migração próprio.
