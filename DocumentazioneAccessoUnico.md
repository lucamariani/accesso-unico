# Documentazione schede Accesso Unico

Definiamo una collezione di nome "Schede" creando la cartella ``"_schede"``

Per creare una nuova scheda devo:

1. creare una cartella (con un nome rappresentativo della scheda che sto creando ) nella cartella ``"_schede"`` ( `"_schede/scia"` )

2. all'interno di questa devo creare una sottocartella per ogni utenza ( `"_schede/scia/cittadini", "_schede/scia/imprese", "_schede/scia/intermediari", "_schede/scia/pa"`)

3. in queste sottocartelle creo un file `index.md` all'interno del quale inserisco solo un `Front Matter`:

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

4. creare una cartella dentro `"_data"`, con lo stesso nome della cartella creata al punto 1 ( `"_data/scia"` )

5. all'interno di questa creo:
  - 5.1. un file `"accordion.yml"`  
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
  - 5.2. un file `"sidebarboxes.yml"`  
  Questo conterra' una lista di box che devono apparire nella slidebar, specificando:
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

6. creare una cartella dentro `"_includes"`, con lo stesso nome della cartella creata al punto 1 ( `"_includes/scia"` )

7. all'interno di questa cartella creo:
 - un file `description.md` dove scrivo la descrizione della scheda, ossia le scritte tra il sottotitolo e le accordion
 -  i file contenenti i contenuti degli accordion, come li ho definiti al punto 5

  Esempio:
  ~~~
  _includes/scia/classificazione.md
  _includes/scia/sicurezza.md
  _includes/scia/requisiti.md
  _includes/scia/guida.md
  _includes/scia/controlli.md
  _includes/scia/normativa.md
  ~~~
