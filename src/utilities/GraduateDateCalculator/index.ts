const calculateGraduateDate = (birthday: Date) => {
  if (!(birthday instanceof Date)) {
    return new Date();
  }
  let graduateYear = birthday.getFullYear();
  const secondApr = new Date(graduateYear, 3, 2);
  const thirtyFirstDec = new Date(graduateYear, 11, 31);
  if (birthday >= secondApr && birthday <= thirtyFirstDec) {
    graduateYear += 7;
  } else {
    graduateYear += 6;
  }
  return new Date(graduateYear, 3, 1);
};

export { calculateGraduateDate };
