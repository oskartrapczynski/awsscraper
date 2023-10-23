import { Box, CircularProgress } from '@mui/material';

interface Props {
  loading: boolean;
}

const Loading = ({ loading }: Props) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Loading;
