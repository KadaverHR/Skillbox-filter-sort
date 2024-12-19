// коды ошибок
const validateCode = {
  codeFullNameError1: { message: 'Некорректное имя' },
  codeFullNameError2: { message: 'Вы ввели неполное имя' },
  codeDateError1: { message: 'Введите дату' },
  codeDateError2: { message: 'Дата не может быть больше текущей' },
  codeDateError3: { message: 'Дата не может быть меньше 01.01.1900' },
  codeYearError1: { message: 'Введите год' },
  codeYearError2: { message: 'Год начала обучения не может быть меньше 2000' },
  codeYearError3: { message: 'Год начала обучения не может быть больше текущей' },
  codeFucultyError1: { message: 'Введите факультет' }

}
//начальный массив студентов
const studentsList = [
  { surname: 'Иванов', name: 'Иван', middleName: 'Иванович', birthdate: '2000-12-23T00:00:00.000Z', startYear: 2021, faculty: 'Физмат' },
  { surname: 'Семенов', name: 'Павел', middleName: 'Иванович', birthdate: '2000-01-01T00:00:00.000Z', startYear: 2021, faculty: 'Физмат' },
  { surname: 'Иванов', name: 'Аристарх', middleName: 'Иванович', birthdate: '2000-01-01T00:00:00.000Z', startYear: 2021, faculty: 'Физмат' },
  { surname: 'Авоська', name: 'Иван', middleName: 'Иванович', birthdate: '1967-07-01T00:00:00.000Z', startYear: 1999, faculty: 'Физмат' },
]



export { studentsList, validateCode }