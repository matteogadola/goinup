import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/*
<script type="text/javascript">
    var $body = $(&apos;body&apos;);

    // Add `all-collapsed` class to body in order to have all the expandable panel collapsed at page load and:
    // 1. avoid the closing animation
    // 2. allow all browsers (Firefox had issue) to scroll to an anchor if provided in the URL (e.g. #manage_cookies)
    // 3. done via JS in order to not have panels collapsed for browsers with disabled JS
    $body.addClass(&apos;all-collapsed&apos;)
      .on(&apos;click&apos;, &apos;.expand .expand-click&apos;, function () {
        if ($body.hasClass(&apos;all-collapsed&apos;)) {
          // Remove `all-collapsed` class from the body and set all panels collapsed so toggleClass behaves as expected
          $(&apos;.expand-content&apos;).hide();
          $(&apos;.expand&apos;).addClass(&apos;collapsed&apos;);
          $body.removeClass(&apos;all-collapsed&apos;);
        }

        var $this = $(this);
        $this.parents(&apos;.expand&apos;).toggleClass(&apos;collapsed&apos;).toggleClass(&apos;expanded&apos;)
          .children(&apos;.expand-content&apos;).slideToggle(&apos;fast&apos;);
        $this.parents(&apos;.expand-item&apos;).toggleClass(&apos;hover&apos;);
        $this.children(&apos;.icon-17&apos;).toggleClass(&apos;icon-expand&apos;).toggleClass(&apos;icon-collapse&apos;);
      });
  </script>




  <script type="text/javascript">
  window.tryFunc = function(fName,args){
    if(typeof window[fName]===&apos;function&apos;){
      window[name](args);
    }else{
      if(args){
        
        if(args.href){
          
          window.open(args.href)
        }
      }
    }
    return false;
  }
</script>
  */

export default function PrivacyPage() {
  const legalName = 'Goinup';

  return (
  <>
    <section className="page">
      <h1 className="text-4xl font-semibold">Privacy Policy di goinupvertical.it</h1>

      <div className="mt-4">
        <h3 className="font-semibold">Questa Applicazione raccoglie alcuni Dati Personali dei propri Utenti.</h3>
        <p>Questo documento può essere stampato utilizzando il comando di stampa presente nelle impostazioni di qualsiasi browser.</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Titolare del Trattamento dei Dati</h2>
        <p className="">Goinup</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Indirizzo email del Titolare</h2>
        <p className="">info@goinupvertical.it</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Tipologie di Dati raccolti</h2>
        <p>
          Fra i Dati Personali raccolti da questa Applicazione,
          in modo autonomo o tramite terze parti, ci sono: email; numero di telefono; codice fiscale;
          nome; cognome; Dati comunicati durante l&apos;utilizzo del servizio.
        </p>
        <p className="mt-2 text-sm">
          Dettagli completi su ciascuna tipologia di dati raccolti sono forniti nelle sezioni dedicate di questa privacy policy
          o mediante specifici testi informativi visualizzati prima della raccolta dei dati stessi.<br />
          I Dati Personali possono essere liberamente forniti dall&apos;Utente o, nel caso di Dati di Utilizzo,
          raccolti automaticamente durante l&apos;uso di questa Applicazione.<br />
          Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori.
          Se l&apos;Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio.
          Nei casi in cui questa Applicazione indichi alcuni Dati come facoltativi, gli Utenti sono liberi di astenersi
          dal comunicare tali Dati, senza che ciò abbia alcuna conseguenza sulla disponibilità del Servizio o sulla sua operatività.<br /> 
          Gli Utenti che dovessero avere dubbi su quali Dati siano obbligatori, sono incoraggiati a contattare il Titolare.<br />
          L&apos;eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione
          o dei titolari dei servizi terzi utilizzati da questa Applicazione, ove non diversamente precisato,
          ha la finalità di fornire il Servizio richiesto dall&apos;Utente, oltre alle ulteriori finalità descritte
          nel presente documento e nella Cookie Policy, se disponibile.
        </p>
        <p className="mt-2 text-sm">
          L&apos;Utente si assume la responsabilità dei Dati Personali di terzi ottenuti,
          pubblicati o condivisi mediante questa Applicazione e garantisce di avere il diritto di comunicarli o diffonderli,
          liberando il Titolare da qualsiasi responsabilità verso terzi.
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Modalità e luogo del trattamento dei Dati raccolti</h2>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Modalit&agrave; di trattamento</h2>
          <p>
            Il Titolare adotta le opportune misure di sicurezza volte ad impedire l&apos;accesso,
            la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.<br />
            Il trattamento viene effettuato mediante strumenti informatici e/o telematici,
            con modalità organizzative e con logiche strettamente correlate alle finalità indicate.
            Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti
            nell&apos;organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing,
            legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi,
            corrieri postali, hosting provider, società informatiche, agenzie di comunicazione)
            nominati anche, se necessario, Responsabili del Trattamento da parte del Titolare.
            L&apos;elenco aggiornato dei Responsabili potrà sempre essere richiesto al Titolare del Trattamento.
          </p>
  

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Base giuridica del trattamento</h2>
            <p>Il Titolare tratta Dati Personali relativi all&apos;Utente in caso sussista una delle seguenti condizioni:</p>
            <ul>
              <li>l&apos;Utente ha prestato il consenso per una o più finalità specifiche; Nota: in alcuni ordinamenti il Titolare può essere autorizzato a trattare Dati Personali senza che debba sussistere il consenso dell&apos;Utente o un&apos;altra delle basi giuridiche specificate di seguito, fino a quando l&apos;Utente non si opponga (“opt-out”) a tale trattamento. Ciò non è tuttavia applicabile qualora il trattamento di Dati Personali sia regolato dalla legislazione europea in materia di protezione dei Dati Personali;</li>
              <li>il trattamento è necessario all&apos;esecuzione di un contratto con l&apos;Utente e/o all&apos;esecuzione di misure precontrattuali;</li>
              <li>il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare;</li>
              <li>il trattamento è necessario per l&apos;esecuzione di un compito di interesse pubblico o per l&apos;esercizio di pubblici poteri di cui è investito il Titolare;</li>
              <li>il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</li>
            </ul>
            <p>È comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun trattamento ed in particolare di specificare se il trattamento sia basato sulla legge, previsto da un contratto o necessario per concludere un contratto.</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Luogo</h2>
            <p>I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contatta il Titolare.<br />
I Dati Personali dell&apos;Utente potrebbero essere trasferiti in un paese diverso da quello in cui l&apos;Utente si trova. Per ottenere ulteriori informazioni sul luogo del trattamento l&apos;Utente può fare riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.</p>
  <p>L&apos;Utente ha diritto a ottenere informazioni in merito alla base giuridica del trasferimento di Dati al di fuori dell&apos;Unione Europea o ad un&apos;organizzazione internazionale di diritto internazionale pubblico o costituita da due o più paesi, come ad esempio l&apos;ONU, nonché in merito alle misure di sicurezza adottate dal Titolare per proteggere i Dati.<br /><br />
L&apos;Utente può verificare se abbia luogo uno dei trasferimenti appena descritti esaminando la sezione di questo documento relativa ai dettagli sul trattamento di Dati Personali o chiedere informazioni al Titolare contattandolo agli estremi riportati in apertura.</p>
  
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Periodo di conservazione</h2>
            <p>I Dati sono trattati e conservati per il tempo richiesto dalle finalità per le quali sono stati raccolti.</p>
  <p>Pertanto:</p>
  <ul>
    <li>I Dati Personali raccolti per scopi collegati all&apos;esecuzione di un contratto tra il Titolare e l&apos;Utente saranno trattenuti sino a quando sia completata l&apos;esecuzione di tale contratto.</li>
    <li>I Dati Personali raccolti per finalità riconducibili all&apos;interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L&apos;Utente può ottenere ulteriori informazioni in merito all&apos;interesse legittimo perseguito dal Titolare nelle relative sezioni di questo documento o contattando il Titolare.</li>
  </ul>
  <p>Quando il trattamento è basato sul consenso dell&apos;Utente, il Titolare può conservare i Dati Personali più a lungo sino a quando detto consenso non venga revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati Personali per un periodo più lungo in ottemperanza ad un obbligo di legge o per ordine di un&apos;autorità.<br /><br />
Al termine del periodo di conservazione i Dati Personali saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso, cancellazione, rettificazione ed il diritto alla portabilità dei Dati non potranno più essere esercitati.</p>

          </div>

        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Finalità del Trattamento dei Dati raccolti</h2>
        <p>
        I Dati dell&apos;Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attività dolose o fraudolente, nonché per le seguenti finalità:
        Hosting ed infrastruttura backend, Gestione contatti e invio di messaggi e Registrazione ed autenticazione.
      </p>
     
    <p>Per ottenere informazioni dettagliate sulle finalità del trattamento e sui Dati Personali trattati per ciascuna finalità, l&apos;Utente può fare riferimento alla sezione “Dettagli sul trattamento dei Dati Personali”.</p>
      </div>



      <div className="mt-4">
        <h2 className="text-xl font-semibold">Dettagli sul trattamento dei Dati Personali</h2>
        <p>I Dati Personali sono raccolti per le seguenti finalit&agrave; ed utilizzando i seguenti servizi:</p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Gestione contatti e invio di messaggi</h2>
          <p>
            Questo tipo di servizi consente di gestire un database di contatti email, contatti telefonici o
            contatti di qualunque altro tipo, utilizzati per comunicare con l&apos;Utente.<br/>
            Questi servizi potrebbero inoltre consentire di raccogliere dati relativi alla data
            e all&apos;ora di visualizzazione dei messaggi da parte dell&apos;Utente,
            così come all&apos;interazione dell&apos;Utente con essi, come le informazioni
            sui click sui collegamenti inseriti nei messaggi.
          </p>
          <h3 className="mt-2 text-lg font-semibold">Mailjet</h3>
          <p>Mailjet è un servizio di gestione indirizzi e invio di messaggi email fornito da SAS Mailjet.</p>
          <div className="mt-2">
            <p><span className="font-semibold">Dati Personali trattati</span>: nome; cognome; email.</p>
            <p><span className="font-semibold">Luogo del trattamento</span>:  Francia &ndash;  <a href="https://www.mailjet.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Hosting ed infrastruttura backend</h2>
          <p>
            Questo tipo di servizi ha la funzione di ospitare Dati e file che permettono a questa Applicazione di funzionare,
            ne consentono la distribuzione e mettono a disposizione un&apos;infrastruttura pronta
            all&apos;uso per erogare specifiche funzionalità di questa Applicazione.
          </p>
          <p>
            Alcuni servizi tra quelli elencati di seguito, se presenti, possono funzionare su server geograficamente distribuiti,
            rendendo difficile determinare l&apos;effettiva ubicazione in cui sono conservati i Dati Personali.
          </p>

          <h3 className="mt-2 text-lg font-semibold">Netlify (Netlify, Inc.)</h3>
          <p>Netlify è un servizio di hosting fornito da Netlify, Inc.</p>
          <div className="mt-2">
            <p><span className="font-semibold">Dati Personali trattati</span>: Dati comunicati durante l&#39;utilizzo del servizio; email; numero di telefono; varie tipologie di Dati secondo quanto specificato dalla privacy policy del servizio.</p>
            <p><span className="font-semibold">Luogo del trattamento</span>: Stati Uniti &ndash;  <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
          </div>
        </div>


        <div className="mt-4">
          <h2 className="text-lg font-semibold">Registrazione ed autenticazione</h2>
          <p>
            Con la registrazione o l&apos;autenticazione l&apos;Utente consente a questa Applicazione di
            identificarlo e di dargli accesso a servizi dedicati.<br/>
            A seconda di quanto indicato di seguito, i servizi di registrazione e di autenticazione potrebbero
            essere forniti con l&apos;ausilio di terze parti. Qualora questo avvenga, questa Applicazione potrà accedere
            ad alcuni Dati conservati dal servizio terzo usato per la registrazione o l&apos;identificazione. <br/>
            Alcuni dei servizi di seguito indicati potrebbero raccogliere Dati Personali
            anche per fini di targeting e profilazione; per saperne di più, si prega di fare riferimento
            alla descrizione di ciascun servizio.
          </p>

          <h3 className="mt-2 text-lg font-semibold">Supabase</h3>
          <p>Firebase Authentication è un servizio di registrazione ed autenticazione fornito da Google Ireland Limited. Per semplificare il processo di registrazione ed autenticazione, Firebase Authentication può utilizzare fornitori di identità di terze parti e salvare le informazioni sulla propria piattaforma.</p>
          <div className="mt-2">
          <p><span className="font-semibold">Dati Personali trattati</span>: Dati comunicati durante l&#39;utilizzo del servizio; email; numero di telefono; varie tipologie di Dati secondo quanto specificato dalla privacy policy del servizio.</p>
            <p><span className="font-semibold">Luogo del trattamento</span>:  Francia &ndash;  <a href="https://www.mailjet.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Diritti dell&apos;Utente</h2>
        <p>Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare.</p>
        <p>In particolare, l&apos;Utente ha il diritto di:</p>

        <ul>
          <li><strong>revocare il consenso in ogni momento.</strong> L&apos;Utente può revocare il consenso al trattamento dei propri Dati Personali precedentemente espresso. </li>
          <li><strong>opporsi al trattamento dei propri Dati.</strong> L&apos;Utente può opporsi al trattamento dei propri Dati quando esso avviene su una base giuridica diversa dal consenso. Ulteriori dettagli sul diritto di opposizione sono indicati nella sezione sottostante.</li>
          <li><strong>accedere ai propri Dati.</strong> L&apos;Utente ha diritto ad ottenere informazioni sui Dati trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una copia dei Dati trattati.</li>
          <li><strong>verificare e chiedere la rettificazione.</strong> L&apos;Utente può verificare la correttezza dei propri Dati e richiederne l&apos;aggiornamento o la correzione. </li>
          <li><strong>ottenere la limitazione del trattamento.</strong> Quando ricorrono determinate condizioni, l&apos;Utente può richiedere la limitazione del trattamento dei propri Dati. In tal caso il Titolare non tratterà i Dati per alcun altro scopo se non la loro conservazione.</li>
          <li><strong>ottenere la cancellazione o rimozione dei propri Dati Personali.</strong> Quando ricorrono determinate condizioni, l&apos;Utente può richiedere la cancellazione dei propri Dati da parte del Titolare.</li>
          <li><strong>ricevere i propri Dati o farli trasferire ad altro titolare.</strong> L&apos;Utente ha diritto di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il trasferimento senza ostacoli ad un altro titolare. Questa disposizione è applicabile quando i Dati sono trattati con strumenti automatizzati ed il trattamento è basato sul consenso dell&apos;Utente, su un contratto di cui l&apos;Utente è parte o su misure contrattuali ad esso connesse.</li>
          <li><strong>proporre reclamo.</strong> L&apos;Utente può proporre un reclamo all&apos;autorità di controllo della protezione dei dati personali competente o agire in sede giudiziale.</li>
        </ul>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Dettagli sul diritto di opposizione</h2>
          <p>
            Quando i Dati Personali sono trattati nell&apos;interesse pubblico, nell&apos;esercizio di pubblici
            poteri di cui è investito il Titolare oppure per perseguire un interesse legittimo del Titolare,
            gli Utenti hanno diritto ad opporsi al trattamento per motivi connessi alla loro situazione particolare.
          </p>
          <p>
            Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalità di marketing diretto,
            possono opporsi al trattamento senza fornire alcuna motivazione. Per scoprire se il Titolare tratti
            dati con finalità di marketing diretto gli Utenti possono fare riferimento alle rispettive sezioni di questo documento.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Come esercitare i diritti</h2>
          <p>
            Per esercitare i diritti dell&apos;Utente, gli Utenti possono indirizzare una richiesta agli estremi di contatto
            del Titolare indicati in questo documento. Le richieste sono depositate a titolo gratuito e evase dal Titolare
            nel più breve tempo possibile, in ogni caso entro un mese.
          </p>
        </div>
      </div>









      <div className="mt-4">
        <h2 className="text-xl font-semibold">Ulteriori informazioni sul trattamento</h2>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Difesa in giudizio</h2>
          <p>
            I Dati Personali dell&apos;Utente possono essere utilizzati da parte del Titolare in giudizio
            o nelle fasi preparatorie alla sua eventuale instaurazione per la difesa da abusi nell&apos;utilizzo
            di questa Applicazione o dei Servizi connessi da parte dell&apos;Utente.<br />
            L&apos;Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato
            a rivelare i Dati per ordine delle autorità pubbliche.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Informative specifiche</h2>
          <p>
            Su richiesta dell&apos;Utente, in aggiunta alle informazioni contenute in questa privacy policy,
            questa Applicazione potrebbe fornire all&apos;Utente delle informative aggiuntive e contestuali
            riguardanti Servizi specifici, o la raccolta ed il trattamento di Dati Personali.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Log di sistema e manutenzione</h2>
          <p>
            Per necessità legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali
            servizi terzi da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano
            le interazioni e che possono contenere anche Dati Personali, quali l&apos;indirizzo IP Utente.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Informazioni non contenute in questa policy</h2>
          <p>
            Ulteriori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste
            in qualsiasi momento al Titolare del Trattamento utilizzando gli estremi di contatto.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Risposta alle richieste “Do Not Track”</h2>
          <p>
            Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy
            in qualunque momento notificandolo agli Utenti su questa pagina e, se possibile,
            su questa Applicazione nonché, qualora tecnicamente e legalmente fattibile,
            inviando una notifica agli Utenti attraverso uno degli estremi di contatto di cui è in possesso.
            Si prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data
            di ultima modifica indicata in fondo.<br /><br />
            Qualora le modifiche interessino trattamenti la cui base giuridica è il consenso,
            il Titolare provvederà a raccogliere nuovamente il consenso dell&apos;Utente, se necessario.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Definizioni e riferimenti legali</h2>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Dati Personali (o Dati)</h2>
          <p>
            Costituisce dato personale qualunque informazione che, direttamente o indirettamente,
            anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale,
            renda identificata o identificabile una persona fisica.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Dati di Utilizzo</h2>
          <p>
            Sono le informazioni raccolte automaticamente attraverso questa Applicazione
            (anche da applicazioni di parti terze integrate in questa Applicazione), tra cui: gli indirizzi IP
            o i nomi a dominio dei computer utilizzati dall&apos;Utente che si connette con questa Applicazione,
            gli indirizzi in notazione URI (Uniform Resource Identifier), l&apos;orario della richiesta, il metodo
            utilizzato nell&apos;inoltrare la richiesta al server, la dimensione del file ottenuto in risposta,
            il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza,
            le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni
            temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi
            all&rsquo;itinerario seguito all&rsquo;interno dell&rsquo;Applicazione, con particolare riferimento
            alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all&rsquo;ambiente
            informatico dell&rsquo;Utente.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Utente</h2>
          <p>
            L&apos;individuo che utilizza questa Applicazione che, salvo ove diversamente specificato,
            coincide con l&apos;Interessato.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Interessato</h2>
          <p>
            La persona fisica cui si riferiscono i Dati Personali.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Responsabile del Trattamento (o Responsabile)</h2>
          <p>
            La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali
            per conto del Titolare, secondo quanto esposto nella presente privacy policy.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Titolare del Trattamento (o Titolare)</h2>
          <p>
            La persona fisica o giuridica, l&apos;autorità pubblica, il servizio o altro organismo che,
            singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e
            gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione
            di questa Applicazione. Il Titolare del Trattamento, salvo quanto diversamente specificato,
            è il titolare di questa Applicazione.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Questa Applicazione</h2>
          <p>
            Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Servizio</h2>
          <p>
            Il Servizio fornito da questa Applicazione così come definito nei relativi termini (se presenti) su questo sito/applicazione.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Unione Europea (o UE)</h2>
          <p>
            Salvo ove diversamente specificato, ogni riferimento all&apos;Unione Europea contenuto in questo documento
            si intende esteso a tutti gli attuali stati membri dell&apos;Unione Europea e dello Spazio Economico Europeo.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Riferimenti legali</h2>
          <p>
            La presente informativa privacy è redatta sulla base di molteplici ordinamenti legislativi,
            inclusi gli artt. 13 e 14 del Regolamento (UE) 2016/679.
          </p>
          <p>
            Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questa Applicazione.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}
