exports.pairUp = (allMembers) => {
  const pairs = [];
  const allMembersCopy = [...allMembers];
  const evenIndices = allMembersCopy.filter((member, index) => {
    return index % 2 === 0;
  });
  const oddIndices = allMembersCopy.filter((member, index) => {
    return index % 2 !== 0;
  });

  for (let i = 0; i < allMembersCopy.length * 0.5; i++) {
    pairs.push([evenIndices[i], oddIndices[i]]);
  }

  return pairs;
};
