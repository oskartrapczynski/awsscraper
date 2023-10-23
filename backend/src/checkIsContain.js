const checkIsContain = (title, splitedPhrase) => {
  const splitedTitle = title.split(' ');
  return splitedTitle.filter((item) => splitedPhrase.includes(item)).length
    ? true
    : false;
};

export default checkIsContain;
