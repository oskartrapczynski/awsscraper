import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { Alerts, Articles, DrawerSaved, Loading } from './components';
import { IArticle } from './interfaces';
import { localStorageConfig, localStorageOperation } from './localStorage';
import { enqueueSnackbar } from 'notistack';

const App = () => {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [phrase, setPhrase] = useState('');
  const [storage, setStorage] = useState<IArticle[] | null>(
    JSON.parse(localStorage.getItem(localStorageConfig.name) as string)
  );

  useEffect(() => {
    localStorage.setItem(localStorageConfig.name, JSON.stringify(storage));
  }, [storage]);

  const handleStorage = (type: string, id: number, linkRef?: string) => {
    switch (type) {
      case localStorageOperation.ADD:
        {
          if (!storage) return setStorage([articles![id]]);
          const isUnique =
            storage!.filter(({ link }) => link === linkRef).length === 0
              ? true
              : false;
          if (!isUnique) return;
          setStorage([...storage, articles![id]]);
          enqueueSnackbar('Pomyślnie dodano do ulubionych', {
            variant: 'success',
          });
        }
        break;
      case localStorageOperation.REMOVE:
        {
          if (!storage) return;

          const filteredArray = storage!.filter(({ link }, index) => {
            if (linkRef) {
              return link !== linkRef;
            } else {
              return index !== id;
            }
          });
          // console.log(filteredArray);
          setStorage(filteredArray);

          enqueueSnackbar('Pomyślnie usunięto z ulubionych', {
            variant: 'success',
          });
        }
        break;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setPhrase(input);

    const API =
      'https://c8iban3gw0.execute-api.eu-north-1.amazonaws.com/dev/awsscraper';

    try {
      const { data } = await axios.post<IArticle[]>(
        API,
        {
          phrase: encodeURIComponent(input),
        },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
        }
      );
      setArticles(data && data.length > 0 ? data : []);
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (input.toLocaleLowerCase() === phrase.toLowerCase() && articles) return;
    setArticles([]);
    fetchData();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          pt: 5,
        }}
      >
        <TextField
          value={input}
          onChange={handleInput}
          placeholder="Co szukamy?!"
        />
        <Button variant="contained" onClick={handleClick}>
          Szukaj
        </Button>
        <DrawerSaved storage={storage} handleStorage={handleStorage} />
        <Alerts articles={articles} loading={loading} phrase={phrase} />
        <Loading loading={loading} />
        <Articles
          articles={articles}
          loading={loading}
          storage={storage}
          handleStorage={handleStorage}
        />
      </Box>
    </>
  );
};

export default App;
