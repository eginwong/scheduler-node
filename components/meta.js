import Head from "next/head";

export default () => (
  <div>
    <Head>
      <title>Toastmasters Scheduler</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </Head>
    <style jsx global>{`
      html,
      body {
        height: 100vh;
        font-family: "Roboto", sans-serif;
      }
      #__next {
        height: 100vh;
      }
    `}</style>
  </div>
);
