import * as Yup from "yup";

const validationSchema = Yup.object({
  plate: Yup.string()
    .min(7)
    .max(7, "Must be 7 characters")
    .required(),
  day: Yup.string().required(),
  time: Yup.string().required()
});

export default validationSchema;
