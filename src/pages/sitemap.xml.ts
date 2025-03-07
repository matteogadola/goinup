import { dt } from '@/lib/date';
import { getEvents } from '@/lib/events';
import { Event } from '@/types/events';

function generateSiteMap(events: Event[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.goinupvertical.it/media</loc>
        <lastmod>2023-10-20</lastmod>
      </url>
      <url>
        <loc>https://www.goinupvertical.it/results</loc>
        <lastmod>2023-10-20</lastmod>
      </url>
      <url>
        <loc>https://www.goinupvertical.it/contact</loc>
        <lastmod>2023-10-20</lastmod>
      </url>
      ${events
      .map(({ id }) => {
        return `
            <url>
              <loc>${`https://www.goinupvertical.it/events/${id}`}</loc>
            </url>
          `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const events = await getEvents({ fromDate: dt().format(), orderBy: 'date', limit: 3, promoterId: 'goinup', status: 'scheduled' });

  const sitemap = generateSiteMap(events);
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
