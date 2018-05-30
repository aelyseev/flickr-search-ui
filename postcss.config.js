module.exports = {
    sourceMap: true,
    outputStyle: 'expanded',
    plugins: [
        require('autoprefixer')({
            browsers: ['> 5%', 'IE > 10'],
            cascade: false
        })
    ]
}
