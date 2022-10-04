import { useState } from "react";

import styles from "../styles/Home.module.scss";

const Home = () => {
  const [allPRs, setAllPRs] = useState([]);

  const getAllPRs = async () => {
    const response = await fetch("/api/github/get-all-prs", {
      method: "POST",
      body: JSON.stringify({
        author: "kcdcox",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAllPRs(data);
    console.log(data);
  };

  return (
    <div className={styles.home}>
      <div onClick={() => getAllPRs()} className={styles.home__content}>
        <div className={styles.home__github}>
          <h1>GitHub</h1>
        </div>
      </div>
      <div className={styles.home__background}>{JSON.stringify(allPRs)}</div>
    </div>
  );
};

// This is called whenever the app is builkt or every 1 second when the page is called
// export async function getStaticProps() {
//   // Fetch data from external API

//   return {
//     props: {
//       dummyData: "dummyData",
//     },
//     revalidate: 1,
//   };
// }

// This is called whenever this page is called
// export async function getServerSideProps(context: any) {
//   const req = context.req;
//   const res = context.res;
//   // Fetch data from external API

//   return {
//     props: {
//       dummyData: "dummyData",
//     },
//   };
// }

export default Home;
