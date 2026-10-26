export function getProgressText(visitedCount: number, totalCount: number): string {
  if (visitedCount === 0) {
    return 'No markets visited yet 🥺'
  } else if (visitedCount === totalCount) {
    return 'Congrats! You are a Market Rally Champion! 🏆'
  } else if (visitedCount < 3) {
    return "That's a start, but don't let that mulled wine get cold! 🥶"
  } else if (visitedCount < 6) {
    return `Keep at it. Don't let that progress slip like you're at the ice skating rink! ⛸️`
  } else if (visitedCount < 9) {
    return `Nice work! Fuel up on some chestnuts and punch and keep going! 🔥`
  } else if (visitedCount < 12) {
    return 'More than halfway there! Run run Rudolph! 🦌'
  } else if (visitedCount < 14) {
    return `That's how ya do it! Christmas is a mindset - keep going for the gold! 🌟`
  } else if (visitedCount < totalCount) {
    return 'So close! If Santa can do it, you can too! 🎅'
  } else {
    return `You have visited ${visitedCount} out of ${totalCount} markets.`
  }
}
