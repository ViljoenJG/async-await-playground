const users = [{
  id: 1,
  name: 'Sarel',
  schoolId: '702'
}, {
  id: 2,
  name: 'Katools',
  schoolId: '679'
}];

const grades = [{
  id: 1,
  schoolId: '702',
  grade: 89
}, {
  id: 2,
  schoolId: '679',
  grade: 74
}, {
  id: 3,
  schoolId: '702',
  grade: 76
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    user ? resolve(user)
         : reject(`No user with id ${id}.`);
  })
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  })
};

const getStatus = (userId) => {
  return getUser(userId).then((user) => {
    return getGrades(user.schoolId).then((grades) => {
      const ave = grades.reduce((total, grade) => total + grade.grade, 0) / grades.length
      return `${user.name} has an average of ${ave}%.`;
    });
  })
}

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  const ave = grades.reduce((tot, grade) => tot + grade.grade, 0) / grades.length;
  return `${user.name} has an average of ${ave}%.`;
}

// getUser(2)
//   .then(user => console.log(user))
//   .catch(e => console.error(e));

// getGrades('702')
//   .then(grade => console.log(grade))
//   .catch(e => console.error(e));

// getStatus(7)
//   .then(status => console.log(status))
//   .catch(e => console.error(e));

getStatusAlt(1)
  .then(status => console.log(status))
  .catch(e => console.error('error: ', e));

getStatusAlt(7)
  .then(status => console.log(status))
  .catch(e => console.error('error: ', e));
