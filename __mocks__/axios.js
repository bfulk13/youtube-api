let vidObj = {
  kind: 'youtube#videoListResponse',
  etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/MKN25V1EKHctCrWohWxITnuURlE"',
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1
  },
  items: [
    {
      kind: 'youtube#video',
      etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/UOCNs-J0X4cWErSyQkH4X87Lb4s"',
      id: 'Dd7FixvoKBw',
      contentDetails: {
        duration: 'PT3M2S',
        dimension: '2d',
        definition: 'hd',
        caption: 'true',
        licensedContent: true,
        regionRestriction: {
          blocked: ['CA', 'AU']
        },
        projection: 'rectangular'
      }
    }
  ]
}

export default {
  get: async () =>
    await new Promise(resolve => {
      process.nextTick(() => resolve({ data: vidObj }))
    })
}

// jest.mock('../request');

// import * as user from '../user';

// // The assertion for a promise must be returned.
// it('works with promises', () => {
//   expect.assertions(1);
//   return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
// });

// it('works with async/await', async () => {
//   expect.assertions(1);
//   const data = await user.getUserName(4);
//   expect(data).toEqual('Mark');
// });
