const inventors = [
    { first: 'Albert', last: 'Einstein', born: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', born: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', born: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', born: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', born: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', born: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', born: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', born: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', born: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', born: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', born: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', born: 1829, passed: 1909 }
]

const people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
]
// filters the list of inventors to find those born in the 1500's
const fifteen = inventors.filter(inventor => inventor.born >= 1500 && inventor.born < 1600)
console.table(fifteen)

// gives an array of the inventors first and last names
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
console.log(fullNames)

//sort's the inventors by birthdate, oldest to youngest
const ordered = inventors.sort((a, b) => a.born > b.born ? 1 : -1)
console.table(ordered)

// using .reduce to find out how many years the inventors lived
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.born)
}, 0)
console.log(totalYears)

// sorts the inventors by years lived
const oldest = inventors.sort(function (a, b) {
    const lastDude = a.passed - a.born
    const nextDude = b.passed - b.born
    return lastDude > nextDude ? -1 : 1
})
console.table(oldest)

// creates a list of all Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// const category = document.querySelector('.mw-category')
// const links = [...category.querySelectorAll('a')]
// const de = links
//     .map(link => link.textContent)
//     .filter(streetName => streetName.includes('de'))

// sorts people alphabetically by last name
const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ')
    const [bLast, bFirst] = nextOne.split(', ')
    return aLast > bLast ? 1 : -1
})
console.log(alpha)

//

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ]