const val1 = 'test1@example.com'
const val2 = '@oauth2-google@test2@example.com'

const occurances = (val2.match(new RegExp('@', 'g')) || []).length

console.log(occurances)
