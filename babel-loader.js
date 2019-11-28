require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})

console.log('Running=>', process.argv[2])
require(process.argv[2])
