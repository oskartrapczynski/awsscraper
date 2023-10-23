import { Alert, AlertColor } from '@mui/material';

interface Props {
  severity: AlertColor;
  text: string;
  width?: string;
}

const StyledAlert = ({ text, severity, width }: Props) => {
  return (
    <Alert severity={severity} sx={{ width: width ? width : '100%', mt: 4 }}>
      {text}
    </Alert>
  );
};

export default StyledAlert;
