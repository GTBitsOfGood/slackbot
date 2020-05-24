import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Apollo</title>
        <link href="/favicon.png" rel="icon"/>
        <link href="/index.css" rel="stylesheet"/>
      </Head>

      <main>
        <a href="https://github.com/nichabosh/apollo" target="_blank">
          <img src="https://bit.ly/2TUgcWp" className="logo"/>
        </a>

        <h1 className="title">
          Hey, it's <a>Apollo!</a>
        </h1>

        <p className="description">
          Helping automate cumbersome tasks within Bits of Good.
        </p>

        <div className="grid">
          <a className="card">
            <h3>/command-one &darr;</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum diam eu enim feugiat.</p>
          </a>

          <a className="card">
            <h3>/command-two &darr;</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum diam eu enim feugiat.</p>
          </a>

          <a className="card">
            <h3>/command-three &darr;</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum diam eu enim feugiat.</p>
          </a>

          <a className="card">
            <h3>/command-four &darr;</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum diam eu enim feugiat.</p>
          </a>
        </div>
      </main>
    </div>
  );
};
