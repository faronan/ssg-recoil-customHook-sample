import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { db } from '../lib/firestore';
import { useNewResults, useResults } from '../hooks/result';
import { useForm } from '../hooks/form';

const Home = ({ currentResults }: Props) => {
  const [results, setResults] = useResults();
  const [team, setTeam, date, setDate, person, setPerson] = useForm();

  //hookをトップレベル以外で呼び出すとエラーになるので、別ページに切り出すかuseEffectに切り出す形に修正するのがベター
  const onSubmit = () => {
    const newResult = useNewResults(team, person, date);
    if (newResult) {
      setResults(currentResults.concat(newResult));
    }
  };

  const onPersonClick = (texts: string[]) => {
    setResults(Object.values(texts));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
      <input value={team} onChange={(e) => setTeam(e.target.value)}></input>
      <input value={date} onChange={(e) => setDate(e.target.value)}></input>
      <input value={person} onChange={(e) => setPerson(e.target.value)}></input>
      <button onClick={onSubmit}>データ取得</button>
      {results && (
        <ul>
          {results.map((result) => (
            <li>{result}</li>
          ))}
        </ul>
      )}
      <table>
        <thead>
          <tr>
            <th>球団</th>
            <th>日付</th>
            <th>選手名</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result) => (
            <tr>
              <td>{result.team}</td>
              <td>{result.date}</td>
              <td onClick={(e) => onPersonClick(result.content.record.texts)}>
                {result.content.record.person}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className={styles.footer}></footer>
    </div>
  );
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const currentResults = [];
  const ref = await db.collection('result').get();
  ref.docs.map((doc) => {
    const data = {
      content: doc.data().content,
      date: doc.data().date,
      team: doc.data().team,
    };
    currentResults.push(data);
  });
  return {
    props: {
      currentResults,
    },
  };
};

export default Home;
