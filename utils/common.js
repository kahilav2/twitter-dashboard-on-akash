export function getNestedProperty(targetJson, path) {
  return path.split('.').reduce((subJson, prop) => subJson[prop], targetJson);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// snippet from https://www.codegrepper.com/code-examples/javascript/convert+number+to+k+m+b+javascript
export function nFormatter(num, { significantFigures } = { significantFigures: 2 }) {
  const absoluteValue = Math.abs(num);
  const isNegative = (num < 0);

  if (absoluteValue >= 1000000000) {
    return (isNegative ? '-' : '') + parseFloat((absoluteValue / 1000000000).toPrecision(significantFigures)) + 'G';
  }
  if (absoluteValue >= 1000000) {
    return (isNegative ? '-' : '') + parseFloat((absoluteValue / 1000000).toPrecision(significantFigures)) + 'M';
  }
  if (absoluteValue >= 1000) {
    return (isNegative ? '-' : '') + parseFloat((absoluteValue / 1000).toPrecision(significantFigures)) + 'k';
  }
  return parseFloat((num/1.0).toPrecision(significantFigures));
}

export function structurizeData(ctx, rawData) {
  return ctx.$_.pairs(
      ctx.$_.groupBy(rawData, 'twitter_id')
    )
    .map((pairs, index) => {
      const twitterID = pairs[0];
      const dataPoints = pairs[1].map((b) => (
        { 
          followersCount: b.followers_count, 
          date: b.date 
        }));
      const timePeriod = Math.min(7, dataPoints.length);
      const percentageRaw = (dataPoints[dataPoints.length - 1].followersCount - dataPoints[dataPoints.length - timePeriod].followersCount) / 
          dataPoints[dataPoints.length - timePeriod].followersCount * 100;

      const absoluteGrowth = dataPoints[dataPoints.length - 1].followersCount - 
          dataPoints[dataPoints.length - timePeriod].followersCount;
      const percentage = percentageRaw.toFixed(2);
      const percentageSign = (percentage >= 0) ? '+' : '';

      return { 
        index,
        twitterID, 
        latestFollowersCount: Math.max.apply(Math, pairs[1].map((row) => row.followers_count)),
        dataPoints,
        growth: {
          timePeriod,
          percentage,
          percentageSign,
          percentageRaw,
          absoluteGrowth,
        },
      };
    })
    .sort((a, b) => b.latestFollowersCount - a.latestFollowersCount )
    // .filter((subset)=> subset.dataPoints.length >= 2);
};
