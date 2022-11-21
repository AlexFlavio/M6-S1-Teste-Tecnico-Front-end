import { Box, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../Providers";

export const Lista = () => {
  const { returnedData } = useContext(DataContext);

  return (
    <Paper elevation={3}>
      <Box sx={{ boxSizing: "border-box", width: "320px", paddingTop: "10px" }}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: "1px solid #cecececa",
            textAlign: "left",
            paddingLeft: "20px",
            color: "#0703be",
            fontWeight: "bold",
          }}
        >
          Você Receberá:
        </Typography>
        <ul
          style={{
            listStyleType: "none",
            boxSizing: "border-box",
            padding: "0px 20px",
            width: "100%",
            margin: "20px 0",
            gap: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {returnedData.length === 0 ? (
            <>
              <li>
                <Typography variant="h6">
                  Ao enviar o formulario a Simulação sera mostrada aqui
                </Typography>
              </li>
              <li>
                <Typography variant="h6" sx={{ color: "#df0000" }}>
                  Não é obrigatório informar os dias!
                </Typography>
              </li>
            </>
          ) : (
            <>
              {returnedData?.map((e, i) => (
                <li key={i}>
                  <Typography variant="h6" sx={{ color: "#1c18ff" }}>
                    {i === 0 ? "Amanhã" : "em "}
                    {i === 0 ? "" : e.day} {i === 0 ? "" : "dias"}:{" "}
                    {e.value.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </li>
              ))}
            </>
          )}
        </ul>
      </Box>
    </Paper>
  );
};
