import {
  TextField,
  Box,
  Paper,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Providers";
import { toast } from "react-toastify";
import API from "../../services/api";

export const Form = ({ children }) => {
  const [requiredData, SetRequiredData] = useState({});

  const { days, setReturndData } = useContext(DataContext);

  const schema = yup.object().shape({
    amount: yup.number().required("Valor da venda é obrigatório!"),
    installments: yup
      .number()
      .required("Informe a quantidade de parcelas!")
      .min(1, "Minimo de 1 parcela.")
      .max(30, "Maximo de 12 parcelas."),
    mdr: yup.number().required("Informe a porcentagem do MDR"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setTimeout(() => setMostrar(true), 500);
  }, []);

  const require = (data) => {
    SetRequiredData(data);
    const enviteData = { ...data };
    if (days.length >= 1) {
      enviteData.days = [...days];
    }
    toast.promise(
      API.post("", enviteData).then((res) => {
        const array = [];
        for (let chave in res.data) {
          array.push({ day: chave, value: res.data[chave] });
        }
        setReturndData(array);
      }),
      {
        pending: "Fazendo Calculos",
        success: "Calculo finalizado com sucesso",
        error: "Erro ao Calcular!",
      }
    );
  };

  return (
    <Collapse in={mostrar}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(require)}
        sx={{ width: "320px" }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexWarp: "warp",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2e2e2e",
              borderBottom:"1px solid #cecececa",
              width:"100%"
            }}
          >
            Simule a Antecipação
          </Typography>
          <TextField
            id="amount"
            label="informe valor da venda"
            variant="outlined"
            required
            type="number"
            error={!!errors.amount}
            helperText={errors?.amount?.message}
            {...register("amount")}
          />
          <TextField
            id="installments"
            label="Em quantas parcelas"
            variant="outlined"
            required
            type="number"
            error={!!errors.installments}
            helperText={errors?.installments?.message}
            {...register("installments")}
          />
          <TextField
            id="mdr"
            label="informe o percentual de MDR"
            variant="outlined"
            required
            type="number"
            error={!!errors.mdr}
            helperText={errors?.mdr?.message}
            {...register("mdr")}
          />

          {children}

          <Button size="large" variant="outlined" type="submit">
            Enviar
          </Button>
        </Paper>
      </Box>
    </Collapse>
  );
};
