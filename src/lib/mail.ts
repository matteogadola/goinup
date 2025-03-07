//import 'server-only';

import { Order } from '@/types/orders';
import { dt } from 'src/lib/date';
import { updateOrder } from '@/lib/orders';

interface Mail {
  to: string;
  subject: string;
  body: string;
  sender?: string;
}

// https://developers.sendinblue.com/reference/sendtransacemail
export const sendMail = async (mail: Mail) => {
  return fetch('https://api.sendinblue.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.SENDINBLUE_API_KEY!,
    },
    body: JSON.stringify({
      sender: { email: 'noreply@goinupvertical.it', name: mail.sender },
      replyTo: { email: 'noreply@goinupvertical.it', name: mail.sender },
      to: [{ email: mail.to }],
      subject: mail.subject,
      htmlContent: mail.body,
    }),
  });
};

export const sendConfirmationMail = async (order: Order) => {
  const sender = order.promoter_id === 'team-valtellina' ? 'TeamValtellina' : 'GOinUP';

  const details = order.items.map(
    (item) => `
    <tr>
      <td style="padding: 0.5rem 0;">${item.name}</td>
      <td style="padding: 0.5rem 0;">${item.description ?? ''}</td>
      <td style="padding: 0.5rem 0;">${item.quantity}</td>
      <td style="padding: 0.5rem 0;">${item.price / 100}€</td>
    </tr>`
  );

  const totalPrice = order.items.reduce((a, v) => a + v.price / 100, 0);

  let paymentDetail = order.payment_method === 'cash'
    ? `Per confermare la prenotazione è necessario completare il pagamento presso:<br /><br />
        <b>3Passi Patagonia</b> Morbegno, Piazza 3 Novembre, 15`
    : order.payment_method === 'sepa'
      ? `Per confermare la prenotazione è necessario effettuare un bonifico alle seguenti coordinate:
          <table>
            <tr><td style="width: 6rem; padding: 0.1rem 0;">Intestazione</td><td>Team Valtellina ASD</td></tr>
            <tr><td style="width: 6rem; padding: 0.1rem 0;">IBAN</td><td>IT45A0569652231000009183X60</td></tr>
            <tr><td style="width: 6rem; padding: 0.1rem 0;">Importo</td><td>${totalPrice}€</td></tr>
            <tr><td style="width: 6rem; padding: 0.1rem 0;">Causale</td><td>Carnet goinup ordine ${order.id}</td></tr>
          </table>`
      : order.payment_method === 'on-site'
        ? ''
        : '';

  // da eliminare a metà agosto
  if (order.payment_method === 'cash' && order.promoter_id === 'team-valtellina' && order.items[0].name === 'Iscrizione 4^ Bivacco Rovedatti Vertical') {
    paymentDetail += '<br /><b>Bianchini Calzature</b> Morbegno, Piazza S.Antonio'
  }
  
  if (order.promoter_id === 'team-valtellina' && order.items[0].name === 'Iscrizione 1^ Vertical Frasnedo') {
    paymentDetail += '<br /><br /><span>Si prega di inviare copia del certificato medico, prima della gara, via mail a iscrizioni@teamvaltellina.com oppure consegnarlo presso il negozio 3Passi Patagonia</span>'
  }

  if (order.payment_method === 'cash' && order.items.length > 1) {
    paymentDetail += `<br /><br /><span>N.B. l'ordine dovrà essere saldato nella sua totalità; non saranno accettati pagamenti parziali</span>`
  }

  const response = await sendMail({
    sender,
    to: order.user_email,
    subject: `Conferma ordine`,
    body: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html>
        <head>
          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
          <title>Conferma ordine</title>
          <link href="https://fonts.googleapis.com/css2?family=Unbounded" rel="stylesheet" />
        </head>
        <body>

          <div style="font-family: 'Unbounded', Verdana; font-weight: 700; text-transform: uppercase;">
            <h2 style="color: #6FB06A;">Conferma</h1>
            <h1>Ordine n. ${order.id}</h1>
          </div>
          <p>Grazie per aver completato l'ordine</p>

          <table style="border-width: 1px; border-color: #94A3B8;">
            <thead>
              <tr style="background-color: #E2E8F0;">
                <td style="width: 15rem; border-bottom-width: 1px; padding: 0.5rem 0;">Riferimento</td>
                <td style="width: 10rem; border-bottom-width: 1px; padding: 0.5rem 0;">Descrizione</td>
                <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Quantità</td>
                <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Prezzo</td>
              </tr>
            </thead>
            <tbody>
              ${details.join('')}
            </tbody>
          </table>

          <div style="margin-top: 1rem;">
            ${paymentDetail}
          </div>

          <div style="margin-top: 2rem;">
            <p>${sender}</p>
          </div>
        </body>
      </html>
      `,
  });

  const body = await response?.json();

  if (response.status !== 201) {
    console.error('Errore invio mail', body);
  }

  await updateOrder(order.id, {
    notification_date: dt().utc().format(),
    notification_status: response.status === 201 ? 'success' : 'error',
  });

  return body?.success;
};
