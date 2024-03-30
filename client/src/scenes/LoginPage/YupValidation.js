import * as Yup from 'yup'

export const  validateSchemaRegister = Yup.object().shape({
    firstname: Yup.string().required("This field is required"),
    lastname: Yup.string().notRequired(),
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
    //   .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    //   .matches(/\d/, "Password should contain at least one number")
    //   .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
    ,
    confirmpassword: Yup.string().when("password", (password, field) => {
      if (password) {
        return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
      }
    }),
  });

  export const validateSchemaLogin=Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      
  })