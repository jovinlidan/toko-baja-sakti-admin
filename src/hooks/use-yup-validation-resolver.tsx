import { yupResolver } from "@hookform/resolvers/yup";

const useYupValidationResolver = (validationSchema) =>
  yupResolver(validationSchema);

export default useYupValidationResolver;
