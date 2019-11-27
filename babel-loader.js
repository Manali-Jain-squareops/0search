require('@babel/register')({
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})

console.log('Running=>', process.argv[2])
require(process.argv[2])
