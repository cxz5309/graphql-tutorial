
const my = {
  name: 'my',
  age: 10,
  gender: 'male'
};

const you = {
  name: 'you', 
  age: 20,
  gender: 'female'
};


const resolvers = {
  Query: {
    person : (id: any) => my,
    people: () => [my, you]
  }
}

export {resolvers}