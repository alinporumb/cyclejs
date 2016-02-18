import Rx from 'rx'

const emptyStream = Rx.Observable.empty()

function getEventsStreamForSelector(mockedEventTypes) {
  return function getEventsStream(eventType) {
    for (const key in mockedEventTypes) {
      if (mockedEventTypes.hasOwnProperty(key) && key === eventType) {
        return mockedEventTypes[key]
      }
    }
    return emptyStream
  }
}

function mockDOMSource(mockedSelectors = {}) {
  return {
    select(selector) {
      for (const key in mockedSelectors) {
        if (mockedSelectors.hasOwnProperty(key) && key === selector) {
          let observable = emptyStream
          if (mockedSelectors[key].hasOwnProperty(`observable`)) {
            observable = mockedSelectors[key].observable
          }
          return {
            observable,
            events: getEventsStreamForSelector(mockedSelectors[key]),
          }
        }
      }
      return {
        observable: emptyStream,
        events: () => emptyStream,
      }
    },
  }
}

export default mockDOMSource
