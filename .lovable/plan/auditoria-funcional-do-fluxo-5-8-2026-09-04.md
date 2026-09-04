# Auditoria funcional do fluxo 5–8

Sem mudanças visuais: nenhuma tela é redesenhada, reorganizada ou alterada em cor, texto ou layout, exceto onde um dado errado precisa ser corrigido.

## O que já está correto (verificado no código)

- Idade escolhida na primeira tela é guardada e reaparece no cadastro (campo somente leitura) e no registro enviado.
- WhatsApp só existe na tela final, que só é alcançada depois do cadastro concluído; não há atalho antes disso.
- Consentimento de participação e consentimento de marketing são dois campos separados, gravados separadamente.
- O cadastro é enviado ao endereço da planilha já usado pela campanha, com tempo limite, e a criança segue mesmo se a planilha estiver fora do ar.
- A mensagem do WhatsApp é montada com explorador, experiência e escola.

## Problemas encontrados (a corrigir, só funcional)

1. **Escola vinda do QR não aparece no formulário.** Quando o link traz a escola, o responsável precisa digitá-la de novo. Correção: preencher o campo escola automaticamente com o valor do link (continua editável).
2. **Marcação de QR imprecisa.** Hoje qualquer parâmetro no link marca "veio de QR" como sim. Correção: marcar sim apenas quando o link indicar QR ou origem de campanha.
3. **Registro do WhatsApp pode ser enviado várias vezes.** Tocar em "Abrir WhatsApp" repetidamente grava linhas repetidas. Correção: gravar apenas na primeira vez.
4. **Mensagem do WhatsApp sem idade e sem o nome do responsável.** Correção: incluir a idade do explorador e o nome do responsável no texto já pronto, mantendo o mesmo tom.

## Verificação final

- Percorrer o caminho inteiro em tela de celular (idade, missão, desafio, descoberta, desenho, cadastro, registro, WhatsApp), conferindo que os dados chegam sem perda.
- Testar com um link contendo escola, origem e QR para confirmar que os três são preservados.
- Enviar um registro de teste para a planilha e confirmar que o endereço responde com sucesso.
- Conferir que o texto do WhatsApp abre preenchido corretamente.

## Detalhes técnicos

Arquivos tocados: `src/lib/knn-config.ts` (leitura de origem/QR, mensagem do WhatsApp, guarda contra envio duplicado) e `src/components/knowa/scene-cadastro.tsx` (valor inicial do campo escola a partir da origem). Nenhuma classe de estilo, layout ou asset é alterado.
