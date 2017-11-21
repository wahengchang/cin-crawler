const movieModel = require('../../database/movie')

describe('mongoose module', () => {
  const mock = {
    id: 'iamid',
    name: 'peter'
  }

  const expectMockToBe = (mock, result) => {
    Object.keys(mock).forEach((key) => {
        expect(mock[key]).toBe(result[key])
    })
  }

  it('movieModel create()', (done) => {
    movieModel.create(mock).then(
      (res) => {
        createdId = res._id
        expectMockToBe(mock, res)
        done()
      },
      (err) => console.log(err)
    )
  })

})
