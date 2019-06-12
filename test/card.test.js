import { cleanup } from '@testing-library/vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import card from '~/components/card'

afterEach(cleanup)

const EventBus = new Vue()

const GlobalPlugins = {
  install(v) {
    // Event bus
    v.prototype.$bus = EventBus
  }
}

// create a local instance of the global bus
const localVue = createLocalVue()
localVue.use(GlobalPlugins)

describe('card', () => {
  it('emits an event', () => {
    const wrapper = shallowMount({ sync: false })
    wrapper.vm.$emit('favChange')
    wrapper.setData(card, {
      propsData: {
        fav: false,
        video: {
          id: {
            videoId: 'sdfh24563sfgd'
          },
          fav: true,
          snippet: {
            title: 'Sample',
            description: 'Some text about the video'
          }
        }
      }
    })

    expect(wrapper.emitted('favChange')).toBeTruthy() // pass
  })

  // it('changes the active data property on mouseover', () => {
  //   const wrapper = shallowMount({ sync: false })
  //   wrapper.setData(card, {
  //     propsData: {
  //       active: false
  //     }
  //   })
  // })
})
