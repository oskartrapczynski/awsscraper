import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Link,
  Button,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { localStorageOperation } from '../localStorage';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  image: string;
  title: string;
  link: string;
  handleStorage: (type: string, id: number, link?: string) => void;
  index: number;
  type: string;
  isSaved?: boolean;
}

const Article = ({
  image,
  title,
  link,
  handleStorage,
  index,
  type,
  isSaved,
}: Props) => {
  const [resolvedImage, setResolvedImage] = useState('/empty_image.jpg');

  const handleSavedClick = () => {
    if (isSaved)
      return handleStorage(localStorageOperation.REMOVE, index, link);
    handleStorage(localStorageOperation.ADD, index);
  };

  const fetchImage = async (url: string) => {
    try {
      const { headers } = await axios.head(url);
      if (
        !headers['Content-Type'] &&
        !headers['content-type'] &&
        !headers['Content-type'] &&
        !headers['content-Type']
      )
        throw new Error();
      setResolvedImage(image);
    } catch {}
  };

  useEffect(() => {
    fetchImage(image);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={link}>
        <CardMedia sx={{ height: 140 }} image={resolvedImage} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={link}>
          <Button variant="contained" color="success" size="small">
            Przejdź do strony
          </Button>
        </Link>
        {type === localStorageOperation.ADD && (
          <IconButton onClick={handleSavedClick}>
            {isSaved ? (
              <FavoriteIcon sx={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        )}
        {type === localStorageOperation.REMOVE && (
          <IconButton onClick={() => handleStorage(type, index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Article;
