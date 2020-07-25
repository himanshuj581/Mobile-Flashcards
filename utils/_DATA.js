// Fake Database
export const decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'Is React a library for managing user interfaces?',
          answer: 'true'
        },
        {
          question: 'Ajax requests in React not included in componentDidMount lifecycle event?',
          answer: 'false'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'Is closure the combination of a function and the lexical environment within which that function was declared?',
          answer:
            'true'
        }
      ]
    },
    Redux: {
      title: 'Redux',
      questions: [
        {
          question: 'Is redux a predictable state container for JavaScript Apps?',
          answer: 'true'
        },
        {
          question: 'Action creator is not a function that takes an input and returns an object with a type and data property.',
          answer:
            'false'
        },
        {
          question: 'A reducer is a pure function that takes the current state and action and returns the next state.',
          answer:
            'true'
        }
      ]
    }
  };
  