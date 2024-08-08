export const email_valid={
    required:"Email is Required",
            pattern:{
              value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"Email is not matched"
            }
}
export const password_valid={
        required:"password is required",
        pattern: {
          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          message: "it must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter."
        }
}
