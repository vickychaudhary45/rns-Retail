import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const TEST_PATH = "whizlabs.com";
export default class BaseDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <Script async src={`https://www.googletagmanager.com/gtag/js?id=GTM-PV9429C`} />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-PV9429C}', {
              page_path: window.location.pathname,
            });`,
            }}
          /> */}
          <Script src="/js/check-browser.js" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/aahhh.svg?v=3" />
          <link rel="icon" type="image/svg" sizes="32x32" href="/images/favicons/aahhh.svg?v=3" />

          <link rel="manifest" href="/images/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#006b98" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#006b98" />

          <link href="/css/style.css" rel="stylesheet" />
          <link href="/css/responsive.css" rel="stylesheet" />
          <link href="/fonts/generated-fonts/stylesheet.css" rel="stylesheet" />
          <link href="/fonts/styles.css" rel="stylesheet" />
          {/* <link href="/css/slick.css" rel="stylesheet" />
          <link href="/css/slick-theme.css" rel="stylesheet" /> */}
          <link href="/css/chosen.css" rel="stylesheet" />
          <link href="/css/tokenfield.css" rel="stylesheet" />
          <link href="/custom/custom.css" rel="stylesheet" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            rel="stylesheet"
          />
          {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" rel="stylesheet" />; */}
          <link
            href="https://fonts.googleapis.com/css?family=Bebas+Neue:400|Montserrat:400,500,600"
            rel="stylesheet"
          />
          {/* <script src="https://stats.easyleadz.com/easyengage/io.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.fpsetting = {app_id: 1011705058645}`,
            }}
          /> */}
          {/* <script src='https://www.dwin1.com/76012.js' type='text/javascript'></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 8761536;
              (function () {
                var lc = document.createElement("script");
                lc.type = "text/javascript";
                lc.async = true;
                lc.src = ("https:" == document.location.protocol ? "https://" : "http://") + "cdn.livechatinc.com/tracking.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(lc, s);
              })();
            `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              if(document) {
            document.querySelectorAll("link[rel='preload'][as='style']").forEach(link => link.rel = "stylesheet")}
            `,
            }}
          />

          <script
            id="whiz_googleScript"
            dangerouslySetInnerHTML={{
              __html: process.env.NEXT_PUBLIC_BASE_PATH.includes(TEST_PATH)
                ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PV9429C');`
                : ``,
            }}
          />

          <noscript>
            <iframe
              src={
                process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")
                  ? "https://www.googletagmanager.com/ns.html?id=GTM-PV9429C"
                  : ""
              }
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="CUSTOM_SCRIPTS">
            <Script
              defer
              type="text/javascript"
              src="https://code.jquery.com/jquery-3.6.1.min.js"
            ></Script>
            {/* <Script defer type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.js"></Script> */}
            {/* <Script
              defer
              type="text/javascript"
              src="https://code.jquery.com/jquery-migrate-3.4.0.js"
            ></Script>
            <Script defer type="text/javascript" src="/js/jquery-ui.js" async />
            <Script defer type="text/javascript" src="/js/chosen.jquery.js" async />
            <Script defer type="text/javascript" src="/js/tokenfield.js" async /> */}
            {/* <Script defer type="text/javascript" src="/js/slick.js" async/> */}
            {/* <Script defer type="text/javascript" src="/js/stickySidebar.js" async />
            <Script defer type="text/javascript" src="/js/easyResponsiveTabs.js" async />
            <Script defer type="text/javascript" src="/custom/header.js" async /> */}
            <script defer type="text/javascript" src="/custom/custom.js" async />
            {/* <Script defer src="https://www.google.com/recaptcha/api.js"></Script> */}
            <Script
              defer
              src="https://cdn.mouseflow.com/projects/e7d46f41-b290-4fa4-9a60-1ca5f62e8330.js"
            ></Script>
          </div>
        </body>
      </Html>
    );
  }
}
