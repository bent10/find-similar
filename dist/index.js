import leven from "leven";
function findSimilar(word, candidates, options = {}) {
  let { maxScore = 3 } = options;
  const { criteria = 0.5, prefix = "" } = options;
  const matches = [];
  for (const candidate of candidates) {
    const length = Math.max(word.length, candidate.length);
    const score = leven(word, candidate);
    const similarity = (length - score) / length;
    if (similarity >= criteria && score <= maxScore) {
      if (score < maxScore) {
        maxScore = score;
        matches.length = 0;
      }
      matches.push(prefix + candidate);
    }
  }
  return matches;
}
function didYouMean(word, candidates, options = {}) {
  const matches = findSimilar(word, candidates, options);
  let message = "Did you mean ";
  if (matches.length > 0) {
    matches.length > 1 && (message += "one of ");
    message += `"${matches.join(", ")}"?`;
    return message;
  }
  return "";
}
export {
  didYouMean,
  findSimilar
};
