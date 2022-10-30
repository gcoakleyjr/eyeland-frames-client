import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Stack, Box } from "@mui/system";

const Container = styled(Stack)`
  height: 100%;
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #252525;
  padding: 0 20px;
`;

const Announcement = () => {
  const [close, setClose] = useState(false)

  return (
    <Container direction="row">
      {!close &&
        <>
          <CloseIcon sx={{ visibility: "hidden", pointerEvents: "none" }} />
          <Box id='announcement'>New customers get 15% off!</Box>
          <CloseIcon onClick={() => setClose(true)} sx={{ cursor: 'pointer' }} />
        </>
      }

    </Container>
  );
};

export default Announcement;
