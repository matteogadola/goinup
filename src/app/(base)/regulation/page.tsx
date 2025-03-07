import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function RegulationPage() {
  return (
    <div className="mt-4 mx-6">
      <h1 className="title">Regolamento generale</h1>

      <section className="grid grid-flow-row gap-4 mt-12">
        <article>
          <h3 className="overtitle">Art. 1</h3>
          <p className="mt-2">Insieme per Sacco, Consorzio Traona - Prati di Bioggio, Pro Loco Bema, Albaredo Promotion, Tiro alla Fune, Pro Loco Gerola, Sport Race Valtellina, Team Valtellina, K2 Valtellina, Pro loco la Caurga, La voce di Daniele organizzano il 6° GOinUP, circuito di Vertical a finalità benefica.</p>
        </article>

        <article>
          <h3 className="overtitle">Art. 2</h3>
          <p className="mt-2">GOinUP ha finalità benefica, con una quota degli introiti dalle iscrizioni e dalle donazioni volontarie, si pone come obbiettivo quello di donare delle attrezzature e/o servizi all&apos;associazioni benefiche del mandamento di Morbegno.</p>
        </article>

        <article>
          <h3 className="overtitle">Art. 3</h3>
          <div className="mt-2">
            Le manifestazioni del Circuito per l&apos;edizione 2024 saranno:
            <ul>
              <li>- 17 Aprile 2024 - 3^ Cech-Up (Traona - Bioggio)</li>
              <li>- 08 Maggio 2024 - 2^ Risc-Up (Villapinta - Buglio in Monte)</li>
              <li>- 22 Maggio 2024 - 6^ Larg-Up  (Cosio Valtellino/Regoledo - Sacco)</li>
              <li>- 05 Giugno 2024 - 5^ LAVE&apos;nsù  (Gerola Alta - Laveggiolo)</li>
              <li>- 19 Giugno 2024  - 1° Vertical Madonnina  (Valle - Madonna delle Grazie)</li>
              <li>- 03 Luglio 2024 - 5° Vertical Lino (Ponte Bitto - Bema)</li>
              <li>- 17 Luglio 2024 - 5° Kurt-Up  (Mellarolo - Rif. La Corte)</li>
              <li>- 31 Luglio 2024 - 2^ Sostila Vertical (Sirta - Sostila)</li>
              <li>- 11 Settembre 2024 - 10^ Colmen Vertical (Morbegno/Desco - Cima Colmen)</li>
              <li>- 25 Settembre 2024 - 2^ San Giorgio Vertical (Talamona - San Giorgio)</li>
              <li>- 09 Ottobre 2024 - 8^ Arz-Up (Morbegno - Arzo)</li>
            </ul>
            In caso di maltempo rinvio alla sera successiva e svolgimento della prova anche con il cattivo tempo.
          </div>
        </article>

        <article>
          <h3 className="overtitle">Art. 4</h3>
          <p className="mt-2">La premiazione del circuito avrà luogo venerdì 18 Ottobre 2024 a Rasura presso il polfunzionale.</p>
        </article>

        <article>
          <h3 className="overtitle">Art. 5</h3>
          <p className="mt-2">Le iscrizioni ad ogni prova andranno effettuate con tempi e modalità indicate da ogni organizzazione. La quota di iscrizione per ogni singola prova sarà di € 10,00 (di cui € 4,00 versati in beneficienza) e andrà obbligatoriamente versata all&apos;atto dell&apos;iscrizione, come specificato dai regolamenti di ogni prova. Sarà comunque possibile iscriversi anche al ritiro pettorale alla quota di € 15,00 (di cui € 9,00 versati in beneficienza).
            In caso di impossibilità a partecipare alla gara l&apos;intera quota versata in pre-iscrizione andrà in beneficienza.
            In caso di rinvio, atleta iscritto e pagante che non può partecipare, la sua quota va in beneficienza.</p>
        </article>

        <article>
          <h3 className="overtitle">Art. 6</h3>
          <p className="mt-2">Per la partecipazione al circuito è consigliata la visita medica sportiva sotto sforzo, ma non è obbligatoria. Anno di partecipazione minimo è il 2009.
            Per entrare a far parte della classifica finale gli atleti dovranno aver partecipato ad almeno 7 prove su 11, verranno considerati un massimo di 7 migliori risultati, mentre verranno scartati gli altri eventuali peggiori risultati. Saranno stilate classifiche uniche individuali per le categorie Femminile e Maschile, il punteggio assegnato sarà di 200 punti al 1° classificato di ogni prova, 199 punti al 2°, 198 al 3° e così via fino all&apos;ultimo classificato. Vincerà il circuito chi avrà totalizzato il punteggio più alto. In caso di “ex aequo” verrà considerato il miglior risultato e successivamente verrà considerata la sommatoria dei tempi della gare considerate nella classifica finale.</p>
        </article>

        <article>
          <h3 className="overtitle">Art. 7</h3>
          <div className="mt-2">
            Sulla base della classifica finale verranno premiati nella prova conclusiva:
            <ul>
              <li>- Primi 5 Femminili Assoluti con Premi in natura;</li>
              <li>- Primi 5 Maschile Assoluti con Premi in natura;</li>
              <li>- Primi 3 Master 40 (1984/1975) Maschile e Femminile con Premi in natura;</li>
              <li>- Primi 3 Master 50 (1974 e precedenti) Maschile e Femminile con Premi in natura;</li>
              <li>- Primi 3 Categoria Under18 (2009/2008/2007) Maschile e Femminile con Premi in natura;</li>
              <li>- Premi ad estrazione</li>
              <li>- Gadget fedeltà a chi avrà concluso tutte le 11 prove</li>
            </ul>
            NB: I premi di categoria con la classifica assoluta non sono cumulativi.
          </div>
        </article>

        <article>
          <h3 className="overtitle">Art. 8</h3>
          <p className="mt-2">Oltre al presente regolamento, ogni prova ne avrà uno proprio.</p>
        </article>
      </section>
    </div>
  )
}
