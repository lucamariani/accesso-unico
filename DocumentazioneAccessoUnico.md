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

5. all'interno di questa devo creare una sottocartella per ogni utenza ( `"_data/scia/cittadini", "_data/scia/imprese", "_data/scia/intermediari", "_data/scia/pa"`) che puo' accedere alla scheda

6. in queste sottocartelle creo un file `"accordion.yml"` all'interno del quale scrivo una lista di accordion che devono apparire nella scheda per quella utenza, specificando il titolo dell'accordion e il nome del file all'interno del quale scriveremo il contenuto dell'accordion stesso

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
  ~~~

7. creare una cartella dentro `"_includes"`, con lo stesso nome della cartella creata al punto 1 ( `"_includes/scia"` )

8. all'interno di questa cartella creo un file `description.md` dove scrivo la descrizione della scheda, ossia le scritte tra il sottotitolo e le accordion

9. all'interno di questa cartella creo i file contenenti i contenuti degli accordion, come li ho definiti al punto 6

  Esempio:
  ~~~
  _includes/scia/classificazione.md
  _includes/scia/sicurezza.md
  _includes/scia/requisiti.md
  _includes/scia/guida.md
  _includes/scia/controlli.md
  ~~~
