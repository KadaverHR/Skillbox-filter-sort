export function filterName(students, partName) {
  console.log(partName)
  if (!(partName == "")) return students.filter((student) =>
    student.surname.toLowerCase().includes(partName.toLowerCase()) ||
    student.name.toLowerCase().includes(partName.toLowerCase()) ||
    student.middleName.toLowerCase().includes(partName.toLowerCase()))
  else return students
}

export function filterFaculty(students, partFaculty) {
  console.log(partFaculty)
  if (!(partFaculty == "")) return students.filter((student) => student.faculty.toLowerCase().includes(partFaculty.toLowerCase()))
  else return students
}

export function filterStartYear(students, startYear) {
  console.log(startYear)
  if (!(startYear == "")) return students.filter((student) => student.startYear == startYear)
  else return students
}

export function filterEndYear(students, endYear) {
  console.log(endYear)
  if (!(endYear == "")) return students.filter((student) => student.startYear + 4 == endYear)
  else return students
}