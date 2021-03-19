import dotenv from "dotenv";

dotenv.config();

export default {
  birthday: {
    day: process.env.BIRTHDAY_DAY,
    month: process.env.BIRTHDAY_MONTH,
    year: process.env.BIRTHDAY_YEAR,
  },
  name: {
    first: process.env.FIRST_NAME,
    last: process.env.LAST_NAME,
  },
  email: process.env.EMAIL,
};
