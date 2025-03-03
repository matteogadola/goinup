Questo progetto nasce come portfolio e per sperimentare blablabla

## Premessa

Quando un'associazione no-profit mi ha chiesto una mano per la creazione di un sito avevo davanti e me due scelte.
Installare wordpress, acquistare un tema, acquistare qualche plugin, configurarli e ciaoegrazie. Oppure sfruttare l'occasione per scoprire e studiare qualcosa di nuovo. Così ho scelto di realizzarlo da zero con next.js. Non solo framework mai utilizzato prima ma anche mio primo progetto react.

In ambito lavorativo, per il frontend, utilizzo perlopiù Angular.

### Pro-bono

Essendo un progetto probono ogni singola scelta è finalizzata al mantenimento di un'infrastruttura -quanto più- gratuita.

Ogni singolo euro risparmiato è un aiuto in più. Per questo l'infrastruttura e singoli servizi sono stati scelti per ...

Per questo alcuni dati, al posto che essere su db, vengono salvati in json locale.

[script](https://github.com/matteogadola/fidal-json)

## Tecnologie (lato sviluppo)

Le tecnologie utilizzate sono nextjs 15, tailwind,
that's it??? 

## Infrastruttura

Ogni componente di questo sito si basa sul piano gratuito di ogni servizio.
Non è tutto merito della fortuna ma di uno studio e analisi dei free-tier che rispecchiassero l'utilizzo
I servizi sono stati scelti con cura SaaS
Il tutto si basa su free-tier dei seguenti servizi

### Vercel

Per la parte hosting è stato utilizzato per due anni [Netify](https://www.netlify.com) ma con l'avvento di Next.js 15 siamo passati a [Vercel](https://vercel.com).
La scelta in questo caso è stata molto semplice in quanto il free-tier di entrambi i servizi è piuttosto generoso e nel caso venga ridotto sensibilmente si può tornare all'hosting di base fornito dal registrar del dominio. Certo si perderebbero innumerevoli comodità lato development experience ma poco nulla lato user experience.

### Supabase

La scelta in questo caso è stata meno scontata.
Per database, backend e autenticazione

#### Alternative

Firebase, blablabla...

### Sanity

L'obiettivo era quello di permettere una gestione di base delle gare e una minima personalizzazione grafica e dei testi.
Esistono ottimi cms. Perlopiù self-hosted. La prima scelta sarebbe stata [Storyblok](https://www.storyblok.com) se non fosse che il piano gratuito prevede un solo utente.
La scelta è quindi ricaduta su [Sanity](https://www.sanity.io).
Sono state implementate alcune personalizzazioni nella parte studio tra cui una poco elegante [funzione](sanity-studio/lib/auth.ts) per permettere una basica gestione dei ruoli (non disponibile nella versione gratuita). 

### Brevo

Per l'invio di mail transazionali (es. conferma d'ordine) sono stati provati diversi servizi per poi ricadere in quello con il free-tier più generoso (300 mail al giorno)
soluzione SaaS
Uno dei free-tier più generosi (300 mail transazionali al giorno)
[Brevo](https://www.brevo.com)
Ad oggi non sono previste mail di marketing.

### Stripe

Gestione pagamenti. scelto per la facilità di gestione e per il costo più contenuto
altre soluzioni...
purtroppo piano no-profit solo per donazioni pure non er vendita di prodotti/servizi a scopo benefico.

### Cookiebot / Iubenda


