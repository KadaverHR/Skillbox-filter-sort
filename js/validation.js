import { validateCode } from "./helper.js";

export const currentDate = new Date()

export function validateFormName(fullName) {
  fullName = fullName.trim(); // удаляем пробелы в начале и конце строки

  if ((fullName.length < 3) || (fullName.length > 50) || (!fullName.includes(' '))) {
    return {
      result: false, message: validateCode.codeFullNameError1.message
    }
  }

  const [surname, name, middleName] = fullName
    .split(' ') // разбиваем строку по пробелу и убираем лишее 
    .filter(text => text.length > 0); // убираем пустые элементы

  if (!surname || !name || !middleName) {
    return { result: false, message: validateCode.codeFullNameError2.message }
  }
  return {
    surname, name, middleName
  }
}

export function validateFormDate(date) {
  date = date.trim(); // удаляем пробелы в начале и конце строки (хз зачем в дате пробелы удалять, но пусть будет) 

  if (!date) {
    return { result: false, message: validateCode.codeDateError1.message }
  }

  const dateFormat = new Date(date) // преобразуем в дату 
  const dateLast = new Date('1900-01-01') // крайняя дата

  if (dateFormat >= currentDate) {
    return { result: false, message: validateCode.codeDateError2.message }
  }

  if (dateFormat < dateLast) {
    return { result: false, message: validateCode.codeDateError3.message }
  }
  return dateFormat.toISOString()
}


export function validateFormarYear(year) {
  year = year.trim(); // удаляем пробелы в начале и конце строки

  if (!year) {
    return { result: false, message: validateCode.codeYearError1.message }
  }
  if (year < 2000) {
    return { result: false, message: validateCode.codeYearError2.message }
  }
  if (year > currentDate.getFullYear()) {
    return { result: false, message: validateCode.codeYearError3.message }
  }
  return year
}


export function validateFormatFaculty(faculty) {
  faculty = faculty.trim(); // удаляем пробелы в начале и конце строки

  if (!faculty) {
    return { result: false, message: validateCode.codeFucultyError1.message }
  }
  return faculty
}