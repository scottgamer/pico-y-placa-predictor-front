import * as Yup from "yup";

const validationSchema = Yup.object({
  plate: Yup.string()
    .min(7)
    .max(7, "Must be 7 characters")
    .required("Required"),
  day: Yup.string().required("Required"),
  time: Yup.string().required("Required")
});

export default validationSchema;
