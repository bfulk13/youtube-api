import { render, cleanup, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import card from '~/components/card'
import { store } from '~/store'

afterEach(cleanup)

describe('card', () => {
  const wrapper = mount(card)
  wrapper.vm.$emit('favChange')
  expect(wrapper.emitted().favChange()).toBeTruthy()
})

test('renders card', () => {
  const video = {
    id: {
      videoId = 'sdfh24563sfgd'
    },
    fav: true,
    snippet: {
      title: 'Sample',
      description: 'Some text about the video'
    }
  }
  const { getByText} = render(card, {
    props: { video }
  })

  getByText(video)
})

test('click event is emitted when button is clicked', () => {
  const video = {
    id: {
      videoId = 'sdfh24563sfgd'
    },
    fav: true,
    snippet: {
      title: 'Sample',
      description: 'Some text about the video'
    }
  }
  const { getByText, emitted } = render(card, {
    props: { videoId }
  })
  fireEvent.click(getByText(video))
  expect(emitted().click).toHaveLength(1)
})