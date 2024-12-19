import { filterEndYear, filterFaculty, filterName, filterStartYear } from "./filter.js";
import { studentsList } from "./helper.js";
import { sortBirth, sortStartYear, sortStudents, sotrFuculty } from "./sort.js";
import { validateFormName, validateFormDate, validateFormarYear, validateFormatFaculty, currentDate } from "./validation.js";


let newStudentList = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : studentsList;

addStudentArr()
renderStudentsTable(newStudentList)


//очистка всех студентов для добавления нового массива
function clearStudentsTable() {
  let studentTable = document.getElementById('studentList');
  studentTable.innerHTML = "";
}


// Этап 3. Функция отрисовки одного студента
function getStudentItem(studentObj) {
  // Получаем полное имя 
  let fullName = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.middleName;

  // Получаем факультет 
  let faculty = studentObj.faculty;

  // Считаем кол-во полных лет
  let birthdate = new Date(studentObj.birthdate);
  let year = currentDate.getFullYear() - birthdate.getFullYear();

  // Преобразовываем дату в формат день.месяц.год 
  let formatDateBirthDay = birthdate.getDate();
  formatDateBirthDay = formatDateBirthDay < 10 ? '0' + formatDateBirthDay : formatDateBirthDay;
  let formatDateBirthMonth = birthdate.getMonth() + 1;
  formatDateBirthMonth = formatDateBirthMonth < 10 ? '0' + formatDateBirthMonth : formatDateBirthMonth;
  let formatDateBirthYear = birthdate.getFullYear();

  // получаем требуемый формат день.месяц.год (кол-во лет)
  let formatDateBirth = formatDateBirthDay + '.' + formatDateBirthMonth + '.' + formatDateBirthYear + ' (' + year + ')';

  //Вывод года обучения 2019-2023 (2 курс)

  let startYear = studentObj.startYear;
  let endYear = startYear + 4;
  let course = '';
  let difference = currentDate.getFullYear() - startYear + 1

  if (((currentDate.getFullYear() - endYear) >= 0) && ((currentDate.getMonth() + 1) > 9)) {
    course = startYear + '-' + endYear + ' (Закончил)';
  }
  else if ((difference > 0) && ((currentDate.getMonth() + 1) < 9)) {
    course = startYear + '-' + endYear + ' (' + (difference - 1) + ' курс)';
  }
  else {
    course = startYear + '-' + endYear + ' (' + difference + ' курс)';
  }

  // Выводим в таблицу
  let container = document.getElementById('studentList');
  let result = document.createElement('div');
  result.classList.add('student-list__box')
  container.append(result);
  result.innerHTML = ` 
        <div class="student-list__item">${fullName}</div>
        <div class="student-list__item">${faculty}</div>
        <div class="student-list__item">${formatDateBirth}</div>
        <div class="student-list__item">${course}</div>
        `
  return result
}

// Этап 4. Функция отрисовки всех студентов

function renderStudentsTable(studentsArray) {
  clearStudentsTable()
  studentsArray.map((student) => {
    getStudentItem(student);
  })
  studentsArray = []
}


// Этап 5. Добавление нового студента

function addStudentArr() {
  const form = document.getElementById('addStudentForm');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const transformedfullname = validateFormName(event.target.fullname.value);
      const transformedDate = validateFormDate(event.target.birthdate.value);
      const transformedYear = validateFormarYear(event.target.startYear.value);
      const transformedFaculty = validateFormatFaculty(event.target.faculty.value);

      if (transformedfullname.result === false || transformedDate.result === false || transformedYear.result === false || transformedFaculty.result === false) {
        let errorArr = [
          transformedfullname.message, transformedDate.message, transformedYear.message, transformedFaculty.message
        ];
        errorArr = errorArr.filter(function (el) {
          return el !== undefined;
        });
        alert(errorArr);
        return;
      }

      let studentObj = {
        surname: transformedfullname.surname,
        name: transformedfullname.name,
        middleName: transformedfullname.middleName,
        birthdate: transformedDate,
        startYear: Number(transformedYear),
        faculty: transformedFaculty
      }

      addNewStudent(studentObj)
      getStudentItem(studentObj)

    })
  }
}


// Добавление нового студента в массив в локальном хранилище
function addNewStudent(studentObj) {
  newStudentList.push(studentObj);
  localStorage.setItem("items", JSON.stringify(newStudentList));
}



// Этап 5. Сортировка студентов

const studentSortName = document.getElementById('studentSortName');
if (studentSortName) {
  studentSortName.addEventListener('click', function () {
    sortStudents(newStudentList)
    renderStudentsTable(newStudentList)
  })
}

const studentSortFaculty = document.getElementById('studentSortFaculty');
if (studentSortFaculty) {
  studentSortFaculty.addEventListener('click', function () {
    sotrFuculty(newStudentList)
    renderStudentsTable(newStudentList)
  })
}

const studentSortBirth = document.getElementById('studentSortBirth');
if (studentSortBirth) {
  studentSortBirth.addEventListener('click', function () {
    sortBirth(newStudentList)
    renderStudentsTable(newStudentList)
  })
}

const studentSortCourse = document.getElementById('studentSortCourse');
if (studentSortCourse) {
  studentSortCourse.addEventListener('click', function () {
    sortStartYear(newStudentList)
    renderStudentsTable(newStudentList)
  })
}


// Этап 6. Фильтрация студентов

const studentFilterName = document.getElementById('studentFilterName');
const studentFilterFaculty = document.getElementById('studentFilterFaculty');
const studentFilterStartYear = document.getElementById('studentFilterStartYear');
const studentFilterEndYear = document.getElementById('studentFilterEndYear');

const inputs = document.querySelectorAll('.filter__input')
let result = newStudentList
inputs.forEach(input => {
  input.addEventListener('input', function () {
    const studentFilterNameArr = filterName(newStudentList, studentFilterName.value);
    const studentFilterFacultyArr = filterFaculty(newStudentList, studentFilterFaculty.value);
    const studentFilterStartYearArr = filterStartYear(newStudentList, studentFilterStartYear.value);
    const studentFilterEndYearArr = filterEndYear(newStudentList, studentFilterEndYear.value);

    result = studentFilterNameArr
      .filter((student) => studentFilterFacultyArr
        .includes(student))
      .filter((student) => studentFilterStartYearArr
        .includes(student))
      .filter((student) => studentFilterEndYearArr
        .includes(student))

    renderStudentsTable(result)
    return result
  })
})



