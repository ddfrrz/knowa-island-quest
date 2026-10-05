# Cadastro antes da aventura nos dois fluxos

## Fluxo 5–8

- Manter a escolha de idade como primeira tela.
- Exibir o cadastro completo do aluno e responsável logo depois.
- Enviar o cadastro para a planilha nesse momento, antes da missão começar.
- Após o cadastro, iniciar normalmente: convocação, desafio, descoberta e desenho físico.
- Ao terminar o jogo, abrir a tela final já existente com o botão e a mensagem automática do WhatsApp.

## Fluxo 9–15

- Manter a escolha de idade como primeira tela.
- Transformar o cadastro completo no desbloqueio inicial do KNN World Challenge.
- Enviar o cadastro para a mesma planilha antes da escolha de Jacob e das missões.
- Preservar o cadastro durante todas as fases.
- Ao concluir o jogo, mostrar diretamente o estado “UNLOCKED” com o botão e a mensagem automática do WhatsApp.

## Preservação funcional

- Manter idade, escola/origem/QR, aluno, responsável, WhatsApp, e-mail e os dois consentimentos separados.
- Não mostrar nem disponibilizar o WhatsApp antes da conclusão de cada jogo.
- Não criar outro backend e não alterar o visual aprovado além dos textos estritamente necessários à nova ordem.
- Evitar um segundo envio de cadastro no fim; o registro inicial será reutilizado para marcar a abertura do WhatsApp.

## Verificação

- Percorrer os dois fluxos em tela de celular.
- Confirmar que o cadastro chega ao endpoint antes do jogo.
- Confirmar que abandonar após o cadastro mantém o contato registrado.
- Confirmar que o WhatsApp só aparece no final e abre com a mensagem correta de cada faixa etária.
