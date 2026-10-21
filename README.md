# Brasil Sem Lixo

Projeto acadêmico de conscientização ambiental que mostra como a tecnologia pode facilitar o acesso da população a informações sobre a gestão de resíduos nas cidades brasileiras.

**Demo online:** https://sousaian.github.io/BrasilSemLixo/

## Sobre o projeto

O **Brasil Sem Lixo** é um site estático com cara de portal informativo. O módulo principal é um **Monitor de Coleta**, um protótipo que mostra como o governo ou as prefeituras poderiam informar ao cidadão os dias e horários da coleta de lixo na sua rua.

> Este é um **protótipo educativo**. Bairros, ruas e horários são **fictícios**, ficam fixos no próprio código (mock) e não vêm de nenhuma API.

## Módulos

| Módulo | Status | Descrição |
|--------|--------|-----------|
| 🚛 Monitor de Coleta | Funcional (protótipo) | Consulta dos dias e horários de coleta por bairro e rua |
| ♻️ Guia de Reciclagem | Em breve | Como separar resíduos e fazer compostagem doméstica |
| 📍 Ecopontos | Em breve | Locais para descartar pilhas, eletrônicos, óleo etc. |

### Monitor de Coleta: funcionalidades

- Seleção em cascata: primeiro o **bairro**, depois a **rua**
- Filtro por **tipo de coleta**: lixo comum, recicláveis e resíduos especiais
- **Cards** com cor e ícone por tipo de coleta, mostrando dias e horário
- Mensagens de estado: nenhuma seleção, rua sem dados ou nenhum filtro ativo
- Layout **responsivo**: os cards ocupam 100% da largura em telas pequenas

## Estrutura

```
BrasilSemLixo/
├── index.html            # Página inicial (hero + módulos do projeto)
├── monitor.html          # Monitor de Coleta
└── assets/
    ├── css/
    │   ├── index.css     # Estilos da página inicial
    │   └── monitor.css   # Estilos do monitor
    └── js/
        └── monitor.js    # Dados mockados + lógica de filtros e renderização
```

## Tecnologias

- HTML5 semântico
- CSS3 (custom properties, Flexbox, Grid e media queries)
- JavaScript puro (sem frameworks e sem dependências)

## Como executar

Não tem build nem dependências. Dá para abrir o `index.html` direto no navegador ou subir um servidor local:

```bash
git clone git@github.com:Sousaian/BrasilSemLixo.git
cd BrasilSemLixo
python3 -m http.server 8000
# acesse http://localhost:8000
```

O site é publicado automaticamente pelo **GitHub Pages** a partir da branch `main`.

## Adicionando novas rotas de coleta

Os dados ficam no array `rotas`, em `assets/js/monitor.js`:

```js
{
  bairro: "Centro",
  rua: "Avenida Central",
  coletas: [
    { tipo: "Lixo comum", dias: ["Segunda", "Quarta", "Sexta"], horario: "07h–09h" },
    { tipo: "Recicláveis", dias: ["Quinta"], horario: "15h–17h" }
  ]
}
```

O campo `tipo` precisa ser um destes: `"Lixo comum"`, `"Recicláveis"` ou `"Resíduos especiais"`. As cores e os ícones de cada tipo ficam em `configTipos`.

## Equipe

Ian Alves, Christopher, Mateus Almeida, Luiz, Kaiky e Raffael.
