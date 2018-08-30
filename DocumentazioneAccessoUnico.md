# Documentazione Accesso Unico

## Creare nuova scheda

Definiamo una collezione di nome "Schede" creando la cartella ``"_schede"``

Per creare una nuova scheda:

1. creo una cartella (con un nome rappresentativo della scheda che sto creando ) nella cartella ``"_schede"`` ( `"_schede/scia"` ) e all'interno di questa devo creare una sottocartella per ogni utenza ( `"_schede/scia/cittadini", "_schede/scia/imprese", "_schede/scia/intermediari", "_schede/scia/pa"`)

2. in queste sottocartelle creo un file `index.md` all'interno del quale inserisco solo un `Front Matter`:

  > layout: scheda  
  > object: < *nome cartella scheda* >  
  > utenza: < *nome sotto-cartella scheda* >    
  > tema: < *tema scheda* >  
  > title: < *titolo scheda* >    
  > subtitle: < *sottotitolo scheda* >  

  Esempio:
  > layout: scheda  
  > object: scia  
  > utenza: imprese  
  > tema: edilizia  
  > title: Cambio destinazione d'uso  
  > subtitle: SCIA

3. creo una cartella dentro `"_data/schede"`, con lo stesso nome della cartella creata al punto 1 ( `"_data/schede/scia"` ) e all'interno di questa creo:
  - 3.1. un file `"accordion.yml"`  
   Questo conterra' una lista di accordion che devono apparire nella scheda, specificando:
     - "title": il titolo dell'accordion
     - "file": il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso
     - "utenza": una lista di profili che devono vedere quell'accordion (non utilizzando la chiave "utenza", l'accordion sara' visibile da tutti i profili)

      Esempio:
      ~~~
      - title: "Classificazione"
        file: "classificazione.md"

      - title: "Sicurezza"
        file: "sicurezza.md"

      - title: "Requisiti"
        file: "requisiti.md"

      - title: "Guida"
        file: "guida.md"

      - title: "Controlli"
        file: "controlli.md"

      - title: "Normativa"
        file: "normativa.md"
        utenza:
          - imprese
          - intermediari
      ~~~
  - 3.2. un file `"sidebarboxes.yml"`  
  Questo conterra' una lista di box che devono apparire nella slidebar, specificando:
    - "title": il titolo del box
    - "file": il nome del file all'interno del quale scriveremo il contenuto del box stesso
    - "utenza": una lista di profili che devono vedere quell'accordion (non utilizzando la chiave "utenza", l'accordion sara' visibile da tutti i profili)

      Esempio:
       ~~~
       - title: "A chi mi devo rivolgere"
         file: "chi.md"

       - title: "PRG"
         file: "prg.md"
         utenza:
           - intermediari
           - pa

       - title: "Normativa"
         file: "normativa.md"

       - title: "Guida"
         file: "guida.md"

       - title: "Controlli"
         file: "controlli.md"
       ~~~

4. creare una cartella dentro `"_includes/schede"`, con lo stesso nome della cartella creata al punto 1 ( `"_includes/schede/scia"` ) e all'interno di questa creo due cartelle, `"accordion"` e `"sidebarbox"` ( `"_includes/schede/scia/accordion"`, `"_includes/schede/scia/sidebarbox"` )

  - all'interno della cartella `"accordion"` creo:
     - un file `description.md` dove scrivo la descrizione della scheda, ossia le scritte tra il sottotitolo e le accordion
     -  i file contenenti i contenuti degli accordion, come li ho definiti al punto 3.1

     ~~~
     _includes/schede/scia/accordion/classificazione.md
     _includes/schede/scia/accordion/sicurezza.md
     _includes/schede/scia/accordion/requisiti.md
     _includes/schede/scia/accordion/guida.md
     _includes/schede/scia/accordion/controlli.md
     _includes/schede/scia/accordion/normativa.md
     ~~~

  - all'interno della cartella `"sidebarbox"` creo:
     - i file contenenti i contenuti dei box della sidebar, come li ho definiti al punto 3.2

    ~~~
    _includes/schede/scia/sidebarbox/chi.md
    _includes/schede/scia/sidebarbox/prg.md
    _includes/schede/scia/sidebarbox/normativa.md
    ~~~


## Pagina lista schede per tema

Per ogni tema si deve creare un file Markdown nella cartella `_pages/temi` avente come nome il nome del tema stesso.

~~~
...
_pages/temi/turismo.md
_pages/temi/edilizia.md
...
~~~

Questo file contiene solo il seguente FrontMatter:

~~~
---
layout: theme_listings
description: "descrizione tema"
---
~~~

in `description` possiamo inserire la descrizione del tema.


## Pagina lista schede per profilo

Per ogni tema si deve creare un file Markdown nella cartella `_pages/profili` avente come nome il nome del profilo stesso.

~~~
...
_pages/profili/cittadini.md
_pages/profili/imprese.md
...
~~~

Questo file contiene solo il seguente FrontMatter:

~~~
---
layout: profile_listings
description: "descrizione profilo"
---
~~~

in `description` possiamo inserire la descrizione del tema.

## Creare pagina statica

Definiamo una collezione di nome "Pages" creando la cartella ``"_pages"``

Per creare una nuova pagina:

1. creo un file MD ( con un nome rappresentativo della pagina che sto creando ) nella cartella ``"_pages"`` ( `"_pages/prova.md"` ).

  Il nome del file creato deve essere inserito nel FrontMatter con la key "metatitle".

2. in questo file inserisco un `Front Matter`:

  > layout: page  
  > title: < *titolo pagina* >    
  > metatitle: < *nome file (senza estensione)* >
  > subtitle: < *sottotitolo page* >  
  > background: < *absolute path to image* >

  Esempio:
  > layout: page  
  > title: Prova  
  > metatitle: prova  
  > subtitle: Prova pagina statica  
  > background: '/img/bg-about.jpg'

  poi inserisco il contenuto con la sintassi MD.

  La pgina sara' visibile al link: *URL_BASE*/*nome file (senza estensione)* : es. https://lucamariani.github.io/accesso-unico/prova/

3. creo una cartella dentro `"_data/pages"`, con lo stesso nome del file creata al punto 1 ( `"_data/pages/prova"` ) e all'interno di questa creo:
  <!-- - 3.1. un file `"accordion.yml"`  
   Questo conterra' una lista di accordion che devono apparire nella page, specificando:
     - "title": il titolo dell'accordion
     - "file": il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso
     - "utenza": una lista di profili che devono vedere quell'accordion (non utilizzando la chiave "utenza", l'accordion sara' visibile da tutti i profili)

      Esempio:
      ~~~
      - title: "Classificazione"
        file: "classificazione.md"

      - title: "Sicurezza"
        file: "sicurezza.md"

      - title: "Requisiti"
        file: "requisiti.md"

      - title: "Guida"
        file: "guida.md"

      - title: "Controlli"
        file: "controlli.md"

      - title: "Normativa"
        file: "normativa.md"
        utenza:
          - imprese
          - intermediari
      ~~~
      -->
  - 3.1. un file `"sidebarboxes.yml"`  
  Questo conterra' una lista di box che devono apparire nella slidebar, specificando:
    - "title": il titolo del box
    - "file": il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso

    Esempio:
       ~~~
       - title: "A chi mi devo rivolgere"
         file: "chi.md"

       - title: "Ciao"
         file: "ciao.md"
       ~~~

4. creare una cartella dentro `"_includes/pages"`, con lo stesso nome del file creato al punto 1 ( `"_includes/pages/prova"` ) e all'interno di questa creo due cartelle, `"content"` e `"sidebarbox"` ( `"_includes/pages/prova/content"`, `"_includes/pages/prova/sidebarbox"` )

  - all'interno della cartella `"content"` creo:
     <!--- un file `description.md` dove scrivo la descrizione della page, ossia le scritte tra il sottotitolo e le accordion
     -  i file contenenti i contenuti degli accordion, come li ho definiti al punto 3.1

     ~~~
     _includes/pages/prova/accordion/classificazione.md
     _includes/pages/prova/accordion/sicurezza.md
     _includes/pages/prova/accordion/requisiti.md
     _includes/pages/prova/accordion/guida.md
     _includes/pages/prova/accordion/controlli.md
     _includes/pages/prova/accordion/normativa.md
     ~~~
     -->
  - all'interno della cartella `"sidebarbox"` creo:
     - i file contenenti i contenuti dei box della sidebar, come li ho definiti al punto 3.1

    ~~~
    _includes/pages/prova/sidebarbox/chi.md
    _includes/pages/prova/sidebarbox/ciao.md
    ~~~

# Todos

30/08/2018
### aggiungere tipologia di Schede
servizio, pratica

### Documentazione
- aggiungere tema (gli stessi delle schede)
- categoria: normativa, regolamenti, pareri e circolari
- maschera ricerca iniziale (anno, numero, categoria, tema)
- pagina di arrivo dalla ricerca con filtri per tema e categoria
- sono tutti documenti esterni (quelli interni li mettiamo su UmbriaGeo)

29/08/2018
### creare file temi.yml con nomi, icone, colori, ...

22/08/2018 ( DONE: 24/08/2018)
### modifica a Schede
- aggiungere foto (850x250 px)

### Pagine GIS (mappa) per:
- sportello
- PRG
- regolamenti comunali

#### layout: md1 + mappa + md2 + dropdown + md3
- gli md (1,2,3) sono opzionali

iframe mappa: clicco sul comune -> popup con link a pagina dettagli
sotto la mappa: lista comuni con link alla pagina dettagli

nella pagina dei dettagli degli sportelli c'e' una sezione che mostra la piattaforma informatica utilizzata dal comune in questione (2 piattaforme, PEC). I requisiti della piattaforma sono anche loro schede ma di tipo "strumenti"
