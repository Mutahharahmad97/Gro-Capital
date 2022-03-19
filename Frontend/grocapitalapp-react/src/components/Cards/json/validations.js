export const validations = [
  {
    name: "FName",
    validationRule: /^[A-Za-z]+$/,
    message: "First Name can only contain alphabets without spaces",
  },
  {
    name: "LName",
    validationRule: /^[A-Za-z]+$/,
    message: "Last Name can only contain alphabets without spaces",
  },
  {
    name: "Email",
    validationRule: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/,
    message: "Email format invalid",
  },
  {
    name: "SocialSecurityNumber",
    validationRule: /^\d{3}-?\d{2}-?\d{4}$/,
    message: "Social Security Number format invalid",
  },
  {
    name: "DrivingLicense",
    validationRule: /^\d{10}$/,
    message: "Diriving License Number format invalid",
  },
  {
    name: "Birthday",
    validationRule: /^(\d{2})\/(\d{2})\/(\d{4})$/,
    message: "Date format (MM/DD/YYYY)",
  },

  {
    name: "CorporateName",
    validationRule: /^[A-Za-z + ?]+$/,
    message: "Company Name can only contain alphabets",
  },
  { name: "EIN", validationRule: /^\d{9}$/, message: "Must contain 9 numbers" },
  {
    name: "DUNS",
    validationRule: /^\d{0,9}$/,
    message: "Must contain 9 numbers",
  },
  {
    name: "Experian",
    validationRule: /^(\d{3})\/(\d{3})$/,
    message: "Format: ***/***",
  },
  {
    name: "BusinessPhysicalAddress",
    validationRule: /^\s*\S+(?:\s+\S+){2}$/,
    message: "Physical Address format not valid",
  },
  {
    name: "City",
    validationRule: /^[A-Za-z + ?]+$/,
    message: "City can only contain alphabets",
  },
  {
    name: "State",
    validationRule: /^[A-Za-z + ?]+$/,
    message: "State can only contain alphabets",
  },
  { name: "Zip", 
    validationRule: /^\d{5}$/, 
    message: "Must contain 5 numbers" 
  },
  {
    name: "Monetary Value",
    validationRule: /^\d*$/,
    message: "Type a realistic amount in digits",
  },
];
