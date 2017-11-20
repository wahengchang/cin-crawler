const cinModel = require('../../database/cin')

describe('mongoose module', () => {
  const mock = {
    name: 'peter'
  }

  const expectMockToBe = (mock, result) => {
    Object.keys(mock).forEach((key) => {
        expect(mock[key]).toBe(result[key])
    })
  }

  it('cinModel create()', (done) => {
    cinModel.create(mock).then(
      (res) => {
        createdId = res._id
        expectMockToBe(mock, res)
        done()
      },
      (err) => console.log(err)
    )
  })

  it('cinModel getList()', (done) => {
    const field = {_id: createdId}
    cinModel.getList({}, field).then(
      (res) => {
        const result = res[0]
        expectMockToBe(mock, result)
        done()
      }
    )
  })

  it('cinModel deleteById()', (done) => {
    cinModel.deleteById(createdId).then(
      result => {

        const field = {_id: createdId}
        cinModel.getList({}, field).then(
            (result ) => {
                expect(result.length).toBe(0)
                done()
            }
        )
      }
    )
  })
})
