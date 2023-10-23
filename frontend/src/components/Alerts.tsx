import { IArticle } from '../interfaces';
import StyledAlert from './Alert';

interface Props {
  articles: IArticle[] | null;
  loading: boolean;
  phrase: string;
}

const Alerts = ({ articles, loading, phrase }: Props) => {
  return (
    <>
      {loading && <StyledAlert severity="info" text="Szukamy dla Ciebie" />}
      {!loading && !articles && (
        <StyledAlert
          severity="info"
          text="W pole tekstowe wpisz co mam dla Ciebie znaleźć"
        />
      )}
      {!loading && articles && articles?.length > 0 && (
        <StyledAlert
          severity="success"
          text={`Znaleziono ${articles.length} artykułów`}
        />
      )}

      {!loading && articles && articles?.length === 0 && (
        <StyledAlert
          severity="warning"
          text={`Niestety, nie znaleziono artykułów dla "${phrase}"`}
        />
      )}
    </>
  );
};

export default Alerts;
