import React, { useState } from "react";
import Dayjs from "dayjs";
import { useStore } from "../../hooks/useStore";
import styles from "./articleitem.module.scss";

export const ArticleItem = React.memo((props: any) => {
  const { article, onSelect, highlight } = props;
  const store = useStore();
  const [readStatus, setReadStatus] = useState(article.unread === 0);

  const handleClick = (e: any) => {
    if (onSelect) {
      onSelect(article);
    }

    setReadStatus(true);
    store.updateChannelCount(article, 'sub', 1)
    store.setArticle(article)
  };

  return (
    <li
      className={`${styles.item} ${readStatus ? styles.read : ''} ${highlight ? styles.current : ''}`}
      onClick={handleClick}
      aria-hidden="true"
    >
      {!readStatus && <div className={styles.dot}/>}
      <div className={styles.title}>
        <div className={styles.titleText}>{highlight} {article.title}</div>
      </div>
      <div className={styles.description}>{(article.description || "").replace(/<[^<>]+>/g, "")}</div>
      <div className={styles.meta}>
        <div>{article.author}</div>
        <div className={styles.date}>{Dayjs(article.pubDate).format("YYYY-MM-DD HH:mm")}</div>
      </div>
    </li>
  );
});
