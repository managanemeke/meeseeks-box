export const replaceAll = (
  string: string,
  search: string,
  replacement: string,
): string => {
  if (search === '') {
    return string;
  }

  let result = '';
  let lastIndex = 0;
  let currentIndex = string.indexOf(search);

  while (currentIndex !== -1) {
    result += string.substring(lastIndex, currentIndex) + replacement;
    lastIndex = currentIndex + search.length;
    currentIndex = string.indexOf(search, lastIndex);
  }

  return result + string.substring(lastIndex);
};
