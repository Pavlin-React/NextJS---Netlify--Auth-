import { useContext, useEffect, useState } from "react";
import AuthContext from "../stores/authContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  let { user, authReady } = useContext(AuthContext);
  let [guides, setGuides] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token
          },
        }
      )
        .then(res => {
          if (!res.ok) {
            throw Error("You must be logIn to see this content");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              itaque reprehenderit non iste debitis dicta? Possimus animi
              obcaecati nihil optio ipsam accusantium dolore nisi recusandae
              placeat ut? Facere, neque in?
            </p>
          </div>
        ))}
    </div>
  );
}
