import hero from '@/components/hero.vue'
import { mount } from '@vue/test-utils'

let wrapper, store
describe('hero', () => {
  test('is a Vue instance', () => {
    wrapper = mount(hero)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

// test('Route / exits and render HTML', async t => {
//   let context = {}
//   const { html } = await index('/', context)
//   t.true(html.includes('<h1 v-if="!valid">Please login to see content</h1>'))
// })

// async function renderComponent(index) {
//   const route = {
//    path: '/'
//   }
//   store.state.route = route

//   wrapper = mount(index, { store,
//     mocks: {
//       $route: route,
//     },
//     stubs: ['nuxt-link']
//   })

//   wrapper.vm.$options.asyncData({ store, route })
//   await resolvePromises()

//   return wrapper
// }
