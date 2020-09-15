exports.pairUp = (allMembers) => {
  const pairs = [];
  let pair = [];
  const allMembersCopy = [...allMembers];
  if (allMembersCopy.length === 1){return [allMembersCopy]}
  while (allMembersCopy.length > 0) {
    const index = Math.floor(Math.random() * allMembersCopy.length)
    pair.push(allMembersCopy.splice(index,1)[0])
    if (pair.length === 2) {
      pairs.push(pair)
      pair = []
    }
  }
  if (pair.length === 1){
    const pairIndex = Math.floor(Math.random() * pairs.length)
    pairs[pairIndex].push(pair[0])
  }  
  return pairs;
};
