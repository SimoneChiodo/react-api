# Esercizio Full Stack: Integrazione React + Express

## Descrizione

Partendo dalla base del progetto precedente, questo esercizio consiste nell'integrare un backend sviluppato con ExpressJS all'interno di un'app React.

Al caricamento dell'applicazione, tramite l'hook `useEffect`, viene effettuata una chiamata al backend per recuperare la lista dei post, che viene successivamente mostrata in una tabella.

Viene inoltre implementata la funzionalità di cancellazione di un post.

## Bonus

Durante l'invio del form, i dati inseriti vengono trasformati in formato JSON ed inviati al backend per essere salvati correttamente. Questo richiede la serializzazione degli oggetti con `JSON.stringify` prima dell’invio nel body della richiesta.
