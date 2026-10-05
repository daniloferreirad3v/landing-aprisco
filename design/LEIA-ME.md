# /design — Identidade visual do APRISCO

> **Instrução para o Claude Code:** leia TODOS os arquivos desta pasta (inclusive imagens e PDFs) antes de escrever qualquer CSS, componente ou texto de interface. Os valores daqui são a fonte da verdade e vencem qualquer sugestão de outros documentos. Se algo essencial estiver faltando (logo, cores, fontes), **pare e pergunte** ao usuário em vez de inventar.

## O que colocar nesta pasta

```
design/
├── LEIA-ME.md                 (este arquivo)
├── identidade.md              (preencher com o modelo abaixo)
├── logo/
│   ├── aprisco-logo.svg       (principal, fundo escuro)
│   ├── aprisco-logo-claro.svg (versão para fundo claro, se existir)
│   ├── aprisco-simbolo.svg    (só o cordeiro, para favicon)
│   └── manual-de-marca.pdf    (se existir)
├── fontes/                    (arquivos .woff2/.ttf e a licença de uso)
├── fotos/
│   ├── professor/             (alta resolução, com autorização)
│   └── capas-cursos/          (uma por curso, nome = slug do curso)
└── referencias/
    ├── area-de-membros-kiwify.png
    └── (outros prints, inspirações, sites que o cliente admira)
```

Prefira **SVG** para logo e símbolo. Fotos em alta resolução (largura mínima de 1600 px); o Astro gera as versões otimizadas.

## Como o Claude Code deve usar esta pasta

1. Abrir e analisar cada arquivo (logo, fotos, referências, manual).
2. Preencher/validar `identidade.md` com o que encontrar e listar o que está faltando.
3. Gerar `src/styles/tokens.css` a partir de `identidade.md` e do que for observado nos arquivos.
4. Copiar fontes para `public/fonts/` (somente se a licença permitir uso web) e logos/favicons para os destinos corretos.
5. Criar `docs/design-plan.md` (ver `docs/05-DESIGN.md`) antes de codar.
6. Nunca editar nem sobrescrever arquivos desta pasta; ela é somente leitura.

---

## Modelo para `identidade.md` (copie e preencha)

```md
# Identidade — Seminário Teológico APRISCO

## Marca
- Nome: Seminário Teológico APRISCO
- Frase/assinatura (se houver): [PREENCHER]
- Símbolo: cordeiro em círculo
- Uso do logo: área de respiro mínima [PREENCHER], largura mínima [PREENCHER]
- Usos proibidos: [PREENCHER] (ex.: não distorcer, não aplicar sobre fundo claro sem a versão clara)

## Cores (hex oficiais)
| Nome | Hex | Uso |
|---|---|---|
| Fundo | [PREENCHER] | Fundo principal |
| Superfície | [PREENCHER] | Cards, blocos |
| Texto | [PREENCHER] | Texto principal |
| Texto secundário | [PREENCHER] | Legendas, apoio |
| Destaque | [PREENCHER] (coral/salmão aprox. #F28B82) | Botão, linhas, progresso |
| Estado/erro | [PREENCHER] | Mensagens de erro |

## Tipografia
- Títulos: [PREENCHER] (família condensada pesada do wordmark?), pesos: [ ]
- Texto: [PREENCHER], pesos: [ ]
- Licença web: [sim/não/verificar]
- Se não houver licença web: alternativa aprovada: [PREENCHER]

## Imagem e fotografia
- Estilo: fotografia escurecida, dessaturada, cenas de estudo, Bíblia, vida cotidiana
- Tratamento padrão sobre fotos: [PREENCHER] (ex.: overlay escuro em gradiente)
- Proporção das capas de curso: [PREENCHER] (aprox. 2:3 retrato)

## Tom e personalidade
- 3 adjetivos: [PREENCHER] (sugestão: sério, acolhedor, contemplativo)
- O que a marca NÃO é: [PREENCHER] (sugestão: nem "igreja colorida" nem "startup")

## Referências aprovadas e reprovadas
- Gosta: [links/prints]
- Não gosta: [links/prints]
```
