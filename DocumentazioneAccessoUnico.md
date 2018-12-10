# Documentazione Accesso Unico

## Parametri di configurazione

Per configurare il sito sono disponibili i seguenti parametri che si trovano nel file "*_config.yml*":

- *header_red_theme*: (true, false)

  configura lo stile dell'header da utilizzare ( rosso o bianco ). Default FALSE

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
  > tipo: <*tipologia scheda*>
  > subtitle: < *sottotitolo scheda* >
  > accordion_open: [ true, false ]
  > meta_description: < *descrizione per SEO* > (al momento non è stato utilizzato)
  > status: <*stato della scheda*>
  > statusLink: <*link che arriva alla pagina statica relativa allo status*>

  Esempio:
  > layout: scheda
  > object: scia
  > utenza: imprese
  > tema: edilizia
  > tipo: pratica
  > title: Cambio destinazione d'uso
  > subtitle: SCIA
  > accordion_open: true
  > meta_description:
  > status: BETA
  > statusLink:/onboard


  il tema deve essere scelto tra quelli definiti alla chiave "*metadata*" nel file "*_data/themes.yml*", ossia questi:
  - agricoltura
  - ambiente
  - turismo
  - industria
  - commercio
  - artigianato
  - lavoro
  - infrastrutture
  - salute
  - edilizia
  - semplificazione

  l' utenza deve essere scelta tra quelli definiti alla chiave "*metadata*" nel file "*_data/profiles.yml*", ossia questi:
  - cittadini
  - imprese
  - imprenditori
  - pa

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

4. creare una cartella dentro `"_includes/schede"`, con lo stesso nome della cartella creata al punto 1 ( `"_includes/schede/scia"` ) e all'interno di questa creo tre cartelle, "accordion", "sidebarbox" e "description"
"_includes/schede/scia/accordion"
"_includes/schede/scia/sidebarbox"
"_includes/schede/scia/description"


  - all'interno della cartella `"accordion"` creo i files contenenti i contenuti degli accordion, come li ho definiti al punto 3.1


     _includes/schede/scia/accordion/classificazione.md
     _includes/schede/scia/accordion/sicurezza.md
     _includes/schede/scia/accordion/requisiti.md
     _includes/schede/scia/accordion/guida.md
     _includes/schede/scia/accordion/controlli.md
     _includes/schede/scia/accordion/normativa.md


  - all'interno della cartella `"sidebarbox"` creo i file contenenti i contenuti dei box della sidebar, come li ho definiti al punto 3.2


    _includes/schede/scia/sidebarbox/chi.md
    _includes/schede/scia/sidebarbox/prg.md
    _includes/schede/scia/sidebarbox/normativa.md

  - all’interno della cartella “description” creo tanti file quanti sono i profili di utenza (cittadini, imprese, intermediari, pa). Questi file md conterranno la descrizione della pratica a secondo del profilo.
    	_includes/schede/scia/description/cittadini.md
    	_includes/schede/scia/description/imprese.md
    	_includes/schede/scia/description/intermediari.md
    	_includes/schede/scia/description/pa.md



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

1. creo un file MD ( con un nome rappresentativo della pagina che sto creando ) nella cartella ``"_pages"`` ( `"_pages/cosaesuape.md"` ).

  Il nome del file creato deve essere inserito nel FrontMatter con la key "metatitle".

2. in questo file inserisco un `Front Matter`:

  > layout: page
  > title: < *titolo pagina* >
  > metatitle: < *nome file (senza estensione)* >
  > subtitle: < *sottotitolo page* >
  > background: < *absolute path to image* > (non utilizzato)
  > img: (non utilizzato)

  Esempio:
  > layout: page
  > title: SUAPE
  > metatitle: cosaesuape
  > subtitle: cosa è, ente competente, .....



  La pgina sara' visibile al link: *URL_BASE*/*nome file (senza estensione)* : es. https://beta.accessounico.regione.umbria.it/cosaesuape

3. creo una cartella dentro `"_data/pages"`, con lo stesso nome del file creata al punto 1 ( `"_data/pages/cosaesuape"` ) e all'interno di questa creo:
  3.1. un file `"sidebarboxes.yml"`
   Questo conterra' una lista di accordion che devono apparire nella sidebar, specificando:
     - "title": il titolo del box
     - "file": il nome del file all'interno del quale scriveremo il relativo contenuto
Esempio:
     - title: "A chi mi devo rivolgere"
  	 - file: "chi.md"
  3.2 un file `"content.yml"`
  Questo file conterrà una lista di files, specificando:
     - "file": suape.md


4. creare una cartella dentro `"_includes/pages"`, con lo stesso nome del file creato al punto 1 ( `"_includes/pages/cosaesuape"` ) e all'interno di questa creo due cartelle, `"content"` e `"sidebarbox"` ( `"_includes/pages/cosaesuape/content"`, `"_includes/pages/cosaesuape/sidebarbox"` )

  - all'interno della cartella `"content"` creo:
  i files .md contenuti in content.yml
_includes/pages/cosaesuape/content/suape.md

  - all'interno della cartella `"sidebarbox"` creo:
     - i file contenenti i contenuti dei box della sidebar, come li ho definiti al punto 3.1
In questi files inserisco il contenuto con la sintassi MD.
    ~~~
    _includes/pages/cosaesuape/sidebarbox/chi.md

## Sono state create pagine statiche relative a:
    •	**Modulistica unificata**
    •	**Dati comunali – SUAPE** (solo per alcuni Comuni dell’Umbria)
In questi due casi, ai fini di una migliore visualizzazione e uso delle tabelle, è stato creato un layout ad hoc:
    •	Per la modulistica                   layout: modulistica
    •	Per i dati comunali – SUAPE          layout: info_suape.
In questi casi è stato necessario creare in _pages/ i seguenti files:

•	modulistica-unificata.md nel quale è presente il seguente Front Matter:

    layout: modulistica
    title: (titolo della pagina) Modulistica Unificata
    metatitle: (nome del file senza estensione) modulistica-unificata
    subtitle: (sottotitolo della pagina) Informazioni e link
    tipologia: Edilizia

        nome:
        denominazione:
        release:
        link:

    tipologia: Attività commerciali e assimilate

        nome:
        denominazione:
        release:
        link:

•	tanti files quanti sono i Comuni dell’Umbria in oggetto amelia.md, foligno.md, gubbio.md ecc con il seguente Front Matter:

        layout: info_suape
        title: (titolo della pagina) Comune di Gubbio
        metatitle: (nome del file senza estensione) gubbio
        subtitle: (sottotitolo della pagina) Sportello Comunale SUAPE – riferimenti informazioni

        info:
           sede:
           responsabile:
           contatti:

        sportelli:
           nome: (nome dello Sportello, avrà tanti blocchi di questo tipo per quanti sono gli sportelli; es.  edilizia ed Attività produttive)
           sede:
           responsabile:
           contatti:
           orari:
Da notare che i relativi files di layout sono presenti nella cartella _layouts e sono: modulistica.html e info_suape.html.
In questi due casi nella cartella _includes/pages/ non è stato creata la cartella content ma solo quella sidebarboxe.

## Altre pagine statiche………
Relativamente, invece, alle seguenti pagine:

•	nodata
•	onboard
•	menu_popup

sono state create in _pages le relative pagine md, ovvero:
•	nodata.md
•	onboard.md
•	menu_popup.md

ciascuna con i relativi layout, presenti nella cartella _layouts, ovvero:
•	layout: nodata             nodata.html
•	layout: onboard            onboard.html
•	layout: default            default.html


## Creare pagina mappa GIS

Per creare una nuova pagina:

1. creo un file MD ( con un nome rappresentativo della pagina che sto creando ) nella cartella ``"_pages/map"`` ( `"_pages/map/piani_regolatori.md"` ).


2. in questo file inserisco un `Front Matter`:

  > layout: prg-page
  > title: < *titolo pagina* >
  > metatitle:
  > map_width:
  > subtitle: < *sottotitolo page* >
  > map_title: < *titolo mappa* >
  > map_url: < *url mappa ( o applicazione) Esri* >
  > content_files:
    - < *nome file* >
    - < *nome file* >
    - < *nome file* >

  Esempio:
  > layout: prg-page
  > title: "Piani regolatori Comunali"
  > metatitle: map-regolatori
  > subtitle: Prova pagina GIS
  > map_title: "Piani regolatori Comunali e Regolamenti Edilizi"
  > map_url: "//www.arcgis.com/apps/Embed/index.html?webmap=88c87422d51f4352837f6c38b1be87be&extent=11.451,42.5318,13.4794,43.433&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light"
  > content_files:
    - content1.md
    - content2.md


  Dopo il FrontMatter posso aggiungere il content:
  {% include comuniprg_select.html %} il cui file html si trova in _includes/.

  La pagina sara' visibile al link: *URL_BASE/map/nome file (senza estensione)* : es.https://beta.accessounico.regione.umbria.it/map/piani_regolatori/

3. creare una cartella dentro `"_includes/pages/`, con lo stesso nome del metatitle di cui al punto 1 ( `"_includes/pages/map-regolatori"` ) e all'interno di questa creare la cartella `"content"` ( `"_includes/pages/map-regolatori/content"` )

  - all'interno della cartella `"content"` posso creare i file opzionali che ho inserito nella lista `"content_files"` del FrontMatter:
     - un file `content1.md` dove scrivo il contenuto che deve essere visualizzato sopra la mappa
     - un file `content2.md` dove scrivo il contenuto che deve essere visualizzato sotto la mappa


     ~~~
     il primo si trova in: _includes/pages/map-regolatori/content/content1.md
     il secondo si trova in: _includes/pages/map-regolatori/content/content2.md
          ~~~
Naturalmente il file di layout si trova nella cartella _layouts e si chiama pgr-page.html.

## Documenti

Nella home – page del sito è presente, tra gli altri, anche il menù “Documenti” attraverso il quale si accede ad una pagina di ricerca il cui popolamento avviene inserendo i documenti nel file docs.yml presente nella cartella _data/.

Il questo file è inserito il seguente Front Matter:
category:
  - name: Normativa
    metaname: normativa
  - name: Regolamenti
    metaname: regolamenti
  - name: Pareri, Circolari e Accordi
    metaname: circolari

La parte sottostante viene replicata per ciascun documento inserito.

docs:
  - title: D.P.R. 6 giugno 2001, n. 380
    metaname: doc1
    oggetto: Testo unico delle disposizioni legislative e regolamentari in materia edilizia
    categoria: normativa
    tema: edilizia
    url: "http://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380"
    anno: 2001
    ente:
    numero: 380
    tags:
      - SUAPE
      - cambio_destinazione_uso
      - SCIA

## Menù – Profili - Argomenti

Se si vuole modificare il menù di navigazione, i profili d’utenza o gli argomenti è possibile farlo modificando rispettivamente i seguenti files: menu.yml, profiles.yml, themes.yml presenti nella cartella _data/.


## Creazione di combo box

Per inserire tale elemento in una pagina statica, in una pagina del tipo mappa Gis oppure in un sidebarbox è necessario inserire, nel relativo file .md, un include del file html in cui gestisco le varie entrate.

Es. Nella scheda “Acconciatore” è presente una sidebarbox relativa alla modulistica.
In questo caso nel file modulistica.md presente in _includes/schede/acconciatore/sidebarbox/ sarà presente il seguente contenuto:
scarica i modelli che ti interessano:
      {% include modulistica_select.html %}
Il file modulistica_select.html si trova nella cartella _includes/.
