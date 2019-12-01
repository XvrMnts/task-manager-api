const { calculateTip, farenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculte total with tip',() => {
    const total = calculateTip(10,.3)

/*     if (total !== 13) {
        throw new Error('Total tip should be 13. Got '+total)
    }
 */

    expect(total).toBe(13)

})


test('Calcultae total with default tip',() => {
    const total = calculateTip(10,)
    
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C',() =>{
    const temp = farenheitToCelsius(32)
    expect(temp).toBe(0)
})


test('Should convert 0 C to 32 F',() =>{
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

// test async code
test('Async test', (done) => {
    setTimeout(()=> {
        expect(1).toBe(1)
        done()
        },2000)
    })


test('Should add two numbers', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })

})

test('should add two numbers asynv/await', async () => {
    const sum = await add(11,22)
    expect(sum).toBe(33)
})