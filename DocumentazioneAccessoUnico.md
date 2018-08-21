# Documentazione schede Accesso Unico

## Aggiungere una nuova scheda

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

3. creo una cartella dentro `"_data"`, con lo stesso nome della cartella creata al punto 1 ( `"_data/scia"` ) e all'interno di questa creo:
  - 3.1. un file `"accordion.yml"`  
   Questo conterra' una lista di accordion che devono apparire nella scheda, specificando:
     - "title": il titolo dell'accordion
     - "description": il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso
     - "utenza": una lista di profili che devono vedere quell'accordion (non utilizzando la chiave "utenza", l'accordion sara' visibile da tutti i profili)

      Esempio:
      ~~~
      - title: "Classificazione"
        description: "classificazione.md"

      - title: "Sicurezza"
        description: "sicurezza.md"

      - title: "Requisiti"
        description: "requisiti.md"

      - title: "Guida"
        description: "guida.md"

      - title: "Controlli"
        description: "controlli.md"

      - title: "Normativa"
        description: "normativa.md"
        utenza:
          - imprese
          - intermediari
      ~~~
  - 3.2. un file `"sidebarboxes.yml"`  
  Questo conterra' una lista di box che devono apparire nella slidebar, specificando:
    - "title": il titolo dell'accordion
    - "description": il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso
    - "utenza": una lista di profili che devono vedere quell'accordion (non utilizzando la chiave "utenza", l'accordion sara' visibile da tutti i profili)

      Esempio:
       ~~~
       - title: "A chi mi devo rivolgere"
         description: "chi.md"

       - title: "PRG"
         description: "prg.md"
         utenza:
           - intermediari
           - pa

       - title: "Normativa"
         description: "normativa.md"

       - title: "Guida"
         description: "guida.md"

       - title: "Controlli"
         description: "controlli.md"
       ~~~

4. creare una cartella dentro `"_includes"`, con lo stesso nome della cartella creata al punto 1 ( `"_includes/scia"` ) e all'interno di questa creo due cartelle, `"accordion"` e `"sidebarbox"` ( `"_includes/scia/accordion"`, `"_includes/scia/sidebarbox"` )

  - all'interno della cartella `"accordion"` creo:
     - un file `description.md` dove scrivo la descrizione della scheda, ossia le scritte tra il sottotitolo e le accordion
     -  i file contenenti i contenuti degli accordion, come li ho definiti al punto 3.1

     ~~~
     _includes/scia/accordion/classificazione.md
     _includes/scia/accordion/sicurezza.md
     _includes/scia/accordion/requisiti.md
     _includes/scia/accordion/guida.md
     _includes/scia/accordion/controlli.md
     _includes/scia/accordion/normativa.md
     ~~~

  - all'interno della cartella `"sidebarbox"` creo:
     - i file contenenti i contenuti dei box della sidebar, come li ho definiti al punto 3.2

    ~~~
    _includes/scia/sidebarbox/chi.md
    _includes/scia/sidebarbox/prg.md
    _includes/scia/sidebarbox/normativa.md
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
