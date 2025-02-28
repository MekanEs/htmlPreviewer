export const addDataAttribute = (text: string) => {
  const reg = /<\w[^>]*>/g;
  return text.replace(reg, function (complete_match, ...matched_letter) {
    return complete_match.replace(
      '>',
      ` data-start-index="${matched_letter[0]}" data-end-index="${
        matched_letter[0] + complete_match.length
      }">`,
    );
  });
};
