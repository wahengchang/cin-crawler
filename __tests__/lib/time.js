const {timeStringToDate} = require('../../lib/time');

test('timeStringToDate()', () => {
    const _h = 11
    const _m = 0
    const result = timeStringToDate(`${_h}:${_m}`)
    const h = (new Date(result)).getUTCHours()
    const m = (new Date(result)).getUTCMinutes()

    expect(h).toBe(_h)
    expect(m).toBe(_m)
});