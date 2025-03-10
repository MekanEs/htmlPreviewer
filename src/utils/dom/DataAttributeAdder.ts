export const addDataAttribute = (text: string) => {
  const reg = /<\w[^>]*>/g;
  return text.replace(reg, function (complete_match, ...matched_letter) {
    if (complete_match.endsWith('/>')) {
      return complete_match.replace(
        '/>',
        ` data-start-index="${matched_letter[0]}" data-end-index="${
          matched_letter[0] + complete_match.length
        }"/>`
      );
    }
    return complete_match.replace(
      '>',
      ` data-start-index="${matched_letter[0]}" data-end-index="${
        matched_letter[0] + complete_match.length
      }">`
    );
  });
};
