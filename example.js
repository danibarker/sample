function solve(stones) {
    return stones.length - stones.replace(/([RGB])\1+/g, '$1').length
}