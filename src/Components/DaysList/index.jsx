import { TextField, Button, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { DataContext } from "../../Providers";

export const DaysList = () => {
  const { days, addDay } = useContext(DataContext);

  const schema = yup.object().shape({
    day: yup.number().min(1, "valor minimo em dias é 1"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          id="mdr"
          label="Informe o dia"
          variant="outlined"
          type="number"
          error={!!errors.day}
          helperText={errors?.day?.message}
          {...register("day")}
          sx={{ width: "200px" }}
        />
        <Button size="small" variant="outlined" onClick={handleSubmit(addDay)}>
          Add
        </Button>
      </div>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          alignItems: "center",
          background: "#F2f2",
          width: "100%",
          padding: "0px 0px 0px 6px",
          height: "30px",
          marginBottom: "0px",
          boxSizing: "border-box",
          gap: "6px",
        }}
      >
        dias:{" "}
        <TransitionGroup style={{display:"flex",width:"100%", gap: "6px"}}>
          {days?.map((e, i) => (
            <Collapse key={e}>
              <li>
                {e}
                {i === days.length - 1 ? "" : ","}
              </li>
            </Collapse>
          ))}
        </TransitionGroup>
      </ul>
    </div>
  );
};
