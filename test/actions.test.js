describe('setVidLength', () => {
  test('should set video length', async () => {
    const commit = jest.fn()
    const Obj = {
      id: 'sdgf2345',
      totalSecs: '333',
      length: '0:05:33'
    }

    let url = ''
    let body = {
      id: 'sdgf2345',
      totalSecs: '333',
      length: '0:05:33'
    }

    await jest.mock('axios', () => ({
      get: (_url, _body) => {
        return new Promise(resolve => {
          url = _url
          body = _body
          Obj === body ? resolve(true) : resolve(false)
        })
      }
    }))

    // console.log(Obj)
    // console.log(body)
    // expect(Obj.length).toBe(body.length)

    // expect(body).toStrictEqual({ Obj })
    // expect(commit).toHaveBeenCalledWith('SET_VID_LENGTH', Obj)
  })
})
