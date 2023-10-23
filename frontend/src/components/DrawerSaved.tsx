import {
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { Article, StyledAlert } from '.';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { localStorageOperation } from '../localStorage';
import { IArticle } from '../interfaces';

interface Props {
  storage: IArticle[] | null;
  handleStorage: (type: string, index: number) => void;
}

const DrawerSaved = ({ storage, handleStorage }: Props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => setOpen(false), [storage]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        {open ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleOpen}>
        {storage && storage.length > 0 ? (
          <Stack gap={2}>
            <Typography
              variant={mobile ? 'h5' : 'h4'}
              sx={{ mt: 2, ml: 2, letterSpacing: 3 }}
            >
              Zapisane
            </Typography>
            <IconButton
              onClick={handleOpen}
              sx={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
            >
              <CloseIcon />
            </IconButton>
            {storage.map(({ title, link, image }, index) => {
              return (
                <Article
                  key={index}
                  title={title}
                  link={link}
                  image={image}
                  handleStorage={handleStorage}
                  type={localStorageOperation.REMOVE}
                  index={index}
                />
              );
            })}
          </Stack>
        ) : (
          <>
            <IconButton
              onClick={handleOpen}
              sx={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
            >
              <CloseIcon />
            </IconButton>
            <StyledAlert
              severity="warning"
              text="Brak zapisanych artykułów"
              width={mobile ? '100vw' : '350px'}
            />
          </>
        )}
      </Drawer>
    </>
  );
};

export default DrawerSaved;
