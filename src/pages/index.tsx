import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { db } from '../lib/firestore';
import { useNewResults, useResults } from '../hooks/result';

const Home = ({ results }) => {
  //console.log(results);
  const [result, setResult] = useResults();
  const newResult = useNewResults('巨人', '丸 佳浩', '2020-10-25');
  if (newResult) {
    setResult(newResult);
    console.log(result);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export async function getStaticProps() {
  const results = [];
  const ref = await db.collection('result').get();
  ref.docs.map((doc) => {
    const data = { id: doc.id, content: doc.data().content };
    results.push(data);
  });
  return {
    props: {
      results,
    },
  };
}

export default Home;
