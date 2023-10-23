import { Grid } from '@mui/material';
import { IArticle } from '../interfaces';

import { Article } from '.';
import { localStorageOperation } from '../localStorage';

interface Props {
  articles: IArticle[] | null;
  loading: boolean;
  storage: IArticle[] | null;
  handleStorage: (type: string, id: number, link?: string) => void;
}

const Articles = ({ articles, loading, storage, handleStorage }: Props) => {
  // console.log('state storage:', storage);

  return (
    <>
      {Array.isArray(articles) && articles && articles.length > 0 && (
        // !loading &&
        <Grid container sx={{ gap: 2, justifyContent: 'center', mt: 4 }}>
          {articles.map((item: IArticle, index) => {
            if (!item) return;
            const { image, title, link } = item;

            let isSaved = false;
            if (storage) {
              for (const element of storage) {
                if (element.title === title) {
                  isSaved = true;
                  break;
                }
              }
            }

            return (
              <Grid item key={index}>
                <Article
                  key={index}
                  index={index}
                  image={image}
                  title={title}
                  link={link}
                  handleStorage={handleStorage}
                  type={localStorageOperation.ADD}
                  isSaved={isSaved}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Articles;
