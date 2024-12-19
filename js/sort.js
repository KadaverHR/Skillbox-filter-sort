export function sortStudents(students) {
  students.sort((a, b) => a.surname.localeCompare(b.surname))
  return students
}

export function sotrFuculty(students) {
  students.sort((a, b) => a.faculty.localeCompare(b.faculty))
  return students
}

export function sortBirth(students) {
  students.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate))
  console.log(students)
  return students
}

export function sortStartYear(students) {
  students.sort((a, b) => a.startYear - b.startYear)
  return students
}