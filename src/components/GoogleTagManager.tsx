import { CONSENT_KEY } from "./analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Google Consent Mode v2: everything is denied until the visitor accepts in
// the cookie banner. GA4, Clarity and any ad pixels are configured inside
// the GTM container, not in code.
const consentDefaults = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
`;

export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consentDefaults }} />
      {/* eslint-disable-next-line @next/next/next-script-for-ga -- must run right after the consent defaults above */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}

export function GoogleTagManagerBody() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export const analyticsEnabled = Boolean(GTM_ID);
