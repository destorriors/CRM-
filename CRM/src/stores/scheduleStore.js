import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useScheduleStore = defineStore("scheduleStore", () => {
  // Сотрудники
  const employees = ref([
    {
      id: 0,
      name: "Кручинин Никита",
      speciality: ["Нейропсихолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild3231-3431-4638-b330-646339373730/_WhatsApp_2022-12-17.jpg",
    },
    {
      id: 1,
      name: "Желонкин Никита",
      speciality: ["Нейропсихолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild6231-3033-4764-a539-333861643664/WhatsApp_Image_2024-.jpeg",
    },
    {
      id: 2,
      name: "Бындина Елизавета",
      speciality: ["Нейропсихолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild6135-3862-4931-b866-623631623630/photo.jpg",
    },
    {
      id: 3,
      name: "Тришина Ирина",
      speciality: ["Нейропсихолог", "Логопед-дефектолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      timeOfWork: ["08:00", "21:00"],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild3161-3561-4238-a137-656539303362/WhatsApp_Image_2025-.jpeg",
    },
    {
      id: 4,
      name: "Милова Людмила",
      speciality: ["Логопед-дефектолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild3632-3038-4832-a435-303536373636/WhatsApp_Image_2024-.jpeg",
    },
    {
      id: 5,
      name: "Ещенко Валентина",
      speciality: ["Нейропсихолог", "Психолог"],
      workSchedule: [
        { day: "Понедельник", hours: ["09:00", "14:00"] },
        { day: "Вторник", hours: ["10:00", "18:00"] },
        { day: "Среда", hours: ["11:00", "21:00"] },
        { day: "Четверг", hours: ["12:00", "21:00"] },
        { day: "Пятница", hours: ["13:00", "21:00"] },
        { day: "Суббота", hours: ["14:00", "15:00"] },
        { day: "Воскресенье", hours: ["15:00", "18:00"] },
      ],
      education: "Высшая залупа",
      experience: "3 года",
      img: "https://static.tildacdn.com/tild3366-3637-4362-b465-336135333966/photo.jpg",
    },
  ]);

  // ! Инфа для роутера

  // const currentSpeciality = ref("neuro");

  // // Маппинг между URL-параметром и названием специальности
  // const specialityMap = {
  //   neuro: "Нейропсихолог",
  //   logo: "Логопед-дефектолог",
  //   psychologist: "Психолог",
  // };

  // // Функция для фильтрации сотрудников по специальности
  // const getEmployeesBySpeciality = computed(() => (specialityKey) => {
  //   const specialityName = specialityMap[specialityKey];
  //   if (!specialityName) return [];
  //   return employees.value.filter((employee) =>
  //     employee.speciality.includes(specialityName)
  //   );
  // });

  // // Получение названия специальности по её ключу
  // const getSpecialityName = (specialityKey) => {
  //   return specialityMap[specialityKey] || "Неизвестная специальность";
  // };

  const calculateEmployees = computed(() => {
    return employees.value.length;
  });

  // ! Так же необходимо добавить создание новых специалистов и нормально оформить страницу employeeSchedule

  const customers = ref([
    {
      id: 1,
      parentName: "Ольга",
      name: "Клиент 1",
      subscription: "Нейрик",
      description: "Some description",
      specialistsId: [0, 5],
      queueToEmployee: [0, 1, 5],
      schedule: [
        {
          day: "Понедельник",
          time: "10:15",
          employeeId: 0,
          description: "Первый",
        },
        {
          day: "Понедельник",
          time: "10:15",
          employeeId: 5,
          description: "Заметка вторая",
        },
        {
          day: "Среда",
          time: "13:00",
          employeeId: 0,
          description: "Что-то в дополнение 3",
        },
        {
          day: "Среда",
          time: "13:00",
          employeeId: 5,
          description: "Что-то в дополнение 4",
        },
        {
          day: "Четверг",
          time: "13:15",
          employeeId: 0,
          description: "Что-то в дополнение 5",
        },
        {
          day: "Четверг",
          time: "13:15",
          employeeId: 5,
          description: "Что-то в дополнение 6",
        },
      ],
    },
    {
      id: 2,
      parentName: "Марина",
      name: "Клиент 2",
      subscription: "Лого",
      description: "Some description",
      specialistsId: [1, 2, 3, 4],
      queueToEmployee: [0, 1, 5],
      schedule: [
        {
          day: "Вторник",
          time: "10:15",
          employeeId: 0,
          description: "Что-то в дополнение 1",
        },
        {
          day: "Вторник",
          time: "10:15",
          employeeId: 2,
          description: "Что-то в дополнение 2",
        },
        {
          day: "Вторник",
          time: "10:15",
          employeeId: 3,
          description: "Что-то в дополнение 3",
        },
        {
          day: "Вторник",
          time: "10:15",
          employeeId: 4,
          description: "Что-то в дополнение 4",
        },
        {
          day: "Среда",
          time: "15:15",
          employeeId: 1,
          description: "Что-то в дополнение 5",
        },
        {
          day: "Среда",
          time: "15:15",
          employeeId: 2,
          description: "Что-то в дополнение 6",
        },
        {
          day: "Среда",
          time: "15:15",
          employeeId: 3,
          description: "Что-то в дополнение 7",
        },
        {
          day: "Среда",
          time: "15:15",
          employeeId: 4,
          description: "Что-то в дополнение 8",
        },
        {
          day: "Вторник",
          time: "08:15",
          employeeId: 1,
          description: "Что-то в дополнение 9",
        },
        {
          day: "Вторник",
          time: "08:15",
          employeeId: 2,
          description: "Что-то в дополнение 10",
        },
        {
          day: "Вторник",
          time: "08:15",
          employeeId: 3,
          description: "Что-то в дополнение 11",
        },
        {
          day: "Вторник",
          time: "08:15",
          employeeId: 4,
          description: "Что-то в дополнение 12",
        },
      ],
    },
    {
      id: 3,
      parentName: "Хи",
      name: "Третий тест",
      subscription: "Лого",
      description: "Some description",
      specialistsId: [],
      queueToEmployee: [0, 1, 5],
      schedule: [],
    },
  ]);

  // ! Остановился на декомпозиции addCustomModalWindow

  // ! Вывод в таблицу клиентов с сортировкой по дню и времени

  // function getCustomers(day, time, employeeId) {
  //   return customers.value
  //     .map((customer) => {
  //       const scheduleEntry = customer.schedule.find(
  //         (s) => s.day === day && s.time === time && s.employeeId === employeeId
  //       );
  //       return scheduleEntry
  //         ? { ...customer, schedule: [scheduleEntry] }
  //         : null;
  //     })
  //     .filter((customer) => customer !== null);
  // }

  function getCustomers(day, time, employeeId) {
    return customers.value.filter((customer) => {
      return customer.schedule.some(
        (s) => s.day === day && s.time === time && s.employeeId === employeeId
      );
    });
  }

  // Состояния для управления видимостью
  const hoveredCell = ref(null); // Хранит ячейку с наведением
  const isModalVisible = ref(false); // Управление видимостью модального окна
  // ! Изменил {} на null, если что эта хуйня взлетит
  const selectedCustomer = ref(null); // Выбранный клиент для модального окна
  const activeCell = ref(null); // Хранит ячейку с активным инпутом

  // ! Модальное окно  -->

  const selectedDay = ref("");
  const selectedTime = ref("");

  // Открытие модального окна
  function openModal(customer, day, time) {
    selectedDay.value = day;
    selectedTime.value = time;
    selectedCustomer.value = customer;
    isModalVisible.value = true;
    console.log(day, time);
    console.log(customer);
    console.log(selectedCustomer.value);
  }

  // Закрытие модального окна
  function closeModal() {
    isModalVisible.value = false;
    selectedCustomer.value = null;
    selectedDay.value = ""; // Очищаем день
    selectedTime.value = ""; // Очищаем время
    cancelEditting();
  }

  // ! Добавление клиента и наведение на ячейку -->

  // Показать плюсик при наведении
  function showAddIcon(day, time) {
    hoveredCell.value = `${day}-${time}`;
    console.log(`На ячейке ${day}-${time}`);
  }

  // Проверка видимости плюсика
  function isAddIconVisible(day, time) {
    return hoveredCell.value === `${day}-${time}`;
  }

  // Скрыть плюсик при уходе курсора
  function hideAddIcon() {
    if (!activeCell.value) {
      hoveredCell.value = null;
    }
  }

  // Показать инпут
  function showInput(day, time) {
    activeCell.value = `${day}-${time}`;
  }

  // Проверка видимости инпута
  function isInputVisible(day, time) {
    return activeCell.value === `${day}-${time}`;
  }

  // ! Вывод клиентов в таблице -->

  // ! Проверка на выбранную ячейку -->

  const selectedSells = ref(null);
  function selectedSell(day, time) {
    selectedSells.value = { day: day, time: time };
    console.log(
      `Выбрано ${selectedSells.value.day} и ${selectedSells.value.time}`
    );
  }

  // ! Добавления клиента в ячейку

  const customerInputs = ref({
    childNameInput: "",
    parentName: "",
    description: "",
  });

  // const childNameInput = ref("");
  // const parentName = ref("");
  // const description = ref("");

  const toggleAddCustomer = ref(1);

  function toggleNew() {
    toggleAddCustomer.value = 1;
    selectedCustomer.value = null;
  }

  function toggleExist() {
    toggleAddCustomer.value = 2;
    selectedCustomer.value = null;
  }

  function toggleQueue() {
    toggleAddCustomer.value = 3;
    selectedCustomer.value = null;
  }

  function addCustomers(employeeId, day, time) {
    if (toggleAddCustomer.value === 1) {
      // ! Режим новый
      if (
        !customerInputs.value.childNameInput &&
        !customerInputs.value.parentName
      ) {
        alert("Введите данные");
      } else {
        const newCustomer = {
          id: customers.value.length + 1,
          name: customerInputs.value.childNameInput,
          description: customerInputs.value.description,
          parentName: customerInputs.value.parentName,
          specialistsId: [employeeId],
          schedule: [{ day: day, time: time, employeeId: employeeId }],
        };
        customers.value.push(newCustomer);
        customerInputs.value = {
          childNameInput: "",
          parentName: "",
          description: "",
        };

        console.log(customers.value);
        closeAddCustomers();
      }
    } else if (toggleAddCustomer.value === 2) {
      //! Режим "Существующий"
      if (!selectedCustomer.value) {
        alert("Выберите клиента из списка");
        return;
      }

      // Добавляем новую пару день-время
      selectedCustomer.value.schedule.push({
        day: day,
        time: time,
        employeeId: employeeId,
      });

      if (!selectedCustomer.value.specialistsId.includes(employeeId)) {
        selectedCustomer.value.specialistsId.push(employeeId);
      }
      console.log("Обновлённый список клиентов:", customers.value);
      selectedCustomer.value = null; // Сбрасываем выбор
      closeAddCustomers();
    } else if (toggleAddCustomer.value === 3) {
      //! Режим в очереди
      if (!selectedCustomer.value) {
        alert("Выберите клиента из списка");
        return;
      }

      const idx = selectedCustomer.value.queueToEmployee.findIndex((val) => {
        return val === employeeId;
      });

      console.log(idx);
      selectedCustomer.value.queueToEmployee.splice(idx, 1);

      // Добавляем новую пару день-время
      selectedCustomer.value.schedule.push({
        day: day,
        time: time,
        employeeId: employeeId,
      });

      if (!selectedCustomer.value.specialistsId.includes(employeeId)) {
        selectedCustomer.value.specialistsId.push(employeeId);
      }
      console.log("Обновлённый список клиентов:", customers.value);
      selectedCustomer.value = null; // Сбрасываем выбор
      closeAddCustomers();
    }
  }

  function closeAddCustomers() {
    activeCell.value = null; // Закрываем модальное окно
  }

  // ! Удаление клиента из таблицы

  function removeCustomer(customer, day, time, employeeId) {
    const customerIndex = customers.value.findIndex(
      (c) => c.id === customer.id
    );
    if (customerIndex === -1) return;

    const scheduleIndex = customers.value[customerIndex].schedule.findIndex(
      (s) => s.day === day && s.time === time && s.employeeId === employeeId
    );
    if (scheduleIndex !== -1) {
      customers.value[customerIndex].schedule.splice(scheduleIndex, 1);

      if (
        !customers.value[customerIndex].schedule.some(
          (s) => s.employeeId === employeeId
        )
      ) {
        customers.value[customerIndex].specialistsId = customers.value[
          customerIndex
        ].specialistsId.filter((id) => id !== employeeId);
      }

      if (customers.value[customerIndex].schedule.length === 0) {
        customers.value.splice(customerIndex, 1);
      }
    }

    closeModal();
  }

  // ! Редактирование клиентов

  const isEditting = ref(false);
  const edittingCustomer = ref({});

  function editCustomer() {
    isEditting.value = true;
    edittingCustomer.value = { ...selectedCustomer.value };
    console.log(edittingCustomer.value);
  }

  function cancelEditting() {
    isEditting.value = false;
    edittingCustomer.value = null;
  }

  function saveEditting() {
    const id = edittingCustomer.value.id;
    const index = customers.value.findIndex((val) => val.id === id);

    customers.value[index].parentName = edittingCustomer.value.parentName;
    customers.value[index].name = edittingCustomer.value.name;
    customers.value[index].description = edittingCustomer.value.description;
    customers.value[index].subscription = edittingCustomer.value.subscription;

    const scheduleEntry = edittingCustomer.value.schedule[0];
    if (scheduleEntry) {
      const scheduleIndex = customers.value[index].schedule.findIndex(
        (s) =>
          s.day === scheduleEntry.day &&
          s.time === scheduleEntry.time &&
          s.employeeId === scheduleEntry.employeeId
      );
      if (scheduleIndex !== -1) {
        customers.value[index].schedule[scheduleIndex].description =
          scheduleEntry.description;
      }
    }

    edittingCustomer.value = null;
    isEditting.value = false;
  }

  // ! Добавление клиента в очередь к сотруднику

  function getCustomersQueue(employeeNumber) {
    return customers.value.filter((cus) =>
      cus.queueToEmployee?.includes(employeeNumber)
    );
  }

  // ! Удаление клиента из очереди сотрудника

  function removeFromEmployeeQueue(employeeId) {
    const idx = selectedCustomer.value.queueToEmployee.findIndex((val) => {
      return val === employeeId;
    });
    selectedCustomer.value.queueToEmployee.splice(idx, 1);
    console.log(customers.value);
    closeModal();
  }

  // ! Редактирование данных сотрудника

  // const edittingEmployee = ref({});
  // const isEdittingEmployee = ref(false);

  // function editEmployee(employee) {
  //   isEdittingEmployee.value = true;
  //   edittingEmployee.value = { ...employee };
  //   console.log(edittingEmployee.value);
  // }

  // function closeModalEditting() {
  //   isEdittingEmployee.value = false;
  //   edittingEmployee.value = {};
  // }

  // function removeEmployeeTime(workSchedule, employee) {
  //   // Находим индекс сотрудника по его ID
  //   const employeeIndex = employees.value.findIndex(
  //     (emp) => emp.id === employee.id
  //   );
  //   if (employeeIndex === -1) return;

  //   // Находим индекс дня в расписании сотрудника
  //   const scheduleIndex = employees.value[employeeIndex].workSchedule.findIndex(
  //     (item) => item.day === workSchedule.day
  //   );
  //   if (scheduleIndex !== -1) {
  //     // Удаляем день из расписания
  //     employees.value[employeeIndex].workSchedule.splice(scheduleIndex, 1);
  //   }
  //   console.log(employee);
  // }

  const edittingEmployee = ref({});
  const isEdittingEmployee = ref(false);

  // Добавлен мод на редактирование и добавление сотрудников, при рефакторинге необходимо удалить все упоминания mode
  const mode = ref(null);

  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  function editEmployee(employee) {
    isEdittingEmployee.value = true;
    mode.value = "edit";
    // Глубокая копия объекта сотрудника
    const employeeCopy = JSON.parse(JSON.stringify(employee));
    // Синхронизация workSchedule с массивом days
    employeeCopy.workSchedule = days.map((day) => {
      const existingSchedule = employee.workSchedule?.find(
        (item) => item.day === day
      );
      return {
        day,
        hours: existingSchedule ? [...existingSchedule.hours] : ["", ""],
      };
    });
    edittingEmployee.value = employeeCopy;
  }

  function saveEdittingEmployee() {
    const id = edittingEmployee.value.id;
    const index = employees.value.findIndex((val) => val.id === id);

    const updatedWorkSchedule = edittingEmployee.value.workSchedule
      .filter((item) => item.hours[0] && item.hours[1])
      .map((item) => ({
        day: item.day,
        hours: [...item.hours],
      }));

    if (!updatedWorkSchedule.length) {
      alert("Пожалуйста, укажите рабочее время хотя бы для одного дня");
      return;
    }

    employees.value[index].name = edittingEmployee.value.name;
    employees.value[index].education = edittingEmployee.value.education;
    employees.value[index].experience = edittingEmployee.value.experience;
    employees.value[index].workSchedule = updatedWorkSchedule;
    employees.value[index].speciality = edittingEmployee.value.speciality;

    edittingEmployee.value = {};
    isEdittingEmployee.value = false;
    mode.value = null;
  }

  function cancelEdittingEmployee() {
    edittingEmployee.value = {};
    isEdittingEmployee.value = false;
    mode.value = null;
  }

  function closeModalEditting() {
    cancelEdittingEmployee();
  }

  function removeEmployeeTime(workSchedule) {
    const scheduleIndex = edittingEmployee.value.workSchedule.findIndex(
      (item) => item.day === workSchedule.day
    );
    if (scheduleIndex !== -1) {
      edittingEmployee.value.workSchedule.splice(scheduleIndex, 1);
    }
  }

  function removeEmployeeSpeciality(specialityIndex) {
    edittingEmployee.value.speciality.splice(specialityIndex, 1);
  }

  // ! Удаление сотрудника

  function deleteEmployee(id, router) {
    const idx = employees.value.findIndex((val) => val.id === id);
    if (idx === -1) return; // Если сотрудник не найден, выходим
    console.log(`Удален ${employees.value[idx].name}`);
    employees.value.splice(idx, 1);
    router.back();
  }

  // ! Добавление сотрудника

  const isAddEmployeeModalVisible = ref(false);
  const temporaryData = ref({
    name: "",
    speciality: [],
    workSchedule: [
      { day: "Понедельник", hours: ["00:00", "00:00"] },
      { day: "Вторник", hours: ["00:00", "00:00"] },
      { day: "Среда", hours: ["00:00", "00:00"] },
      { day: "Четверг", hours: ["00:00", "00:00"] },
      { day: "Пятница", hours: ["00:00", "00:00"] },
      { day: "Суббота", hours: ["00:00", "00:00"] },
      { day: "Воскресенье", hours: ["00:00", "00:00"] },
    ],
    education: "",
    experience: "",
    img: "",
  });

  function openAddEmployee() {
    isAddEmployeeModalVisible.value = true;
    mode.value = "add";
  }

  function closeAddEmployee() {
    isAddEmployeeModalVisible.value = false;
    temporaryData.value = {
      name: "",
      speciality: [],
      workSchedule: [
        { day: "Понедельник", hours: ["00:00", "00:00"] },
        { day: "Вторник", hours: ["00:00", "00:00"] },
        { day: "Среда", hours: ["00:00", "00:00"] },
        { day: "Четверг", hours: ["00:00", "00:00"] },
        { day: "Пятница", hours: ["00:00", "00:00"] },
        { day: "Суббота", hours: ["00:00", "00:00"] },
        { day: "Воскресенье", hours: ["00:00", "00:00"] },
      ],
      education: "",
      experience: "",
      img: "",
    };
    mode.value = null;
  }

  function saveAddEmployee() {
    isAddEmployeeModalVisible.value = false;

    const updatedWorkSchedule = temporaryData.value.workSchedule
      .filter((item) => item.hours[0] !== "00:00" && item.hours[1] !== "00:00")
      .map((item) => ({
        day: item.day,
        hours: [...item.hours],
      }));

    const newEmployee = {
      id: employees.value.length + 1,
      name: temporaryData.value.name,
      speciality: [...temporaryData.value.speciality],
      workSchedule: updatedWorkSchedule,
      education: temporaryData.value.education,
      experience: temporaryData.value.experience,
      img: temporaryData.value.img,
    };

    console.log(newEmployee);

    employees.value.push(newEmployee);

    temporaryData.value = {
      name: "",
      speciality: [],
      workSchedule: [
        { day: "Понедельник", hours: ["00:00", "00:00"] },
        { day: "Вторник", hours: ["00:00", "00:00"] },
        { day: "Среда", hours: ["00:00", "00:00"] },
        { day: "Четверг", hours: ["00:00", "00:00"] },
        { day: "Пятница", hours: ["00:00", "00:00"] },
        { day: "Суббота", hours: ["00:00", "00:00"] },
        { day: "Воскресенье", hours: ["00:00", "00:00"] },
      ],
      education: "",
      experience: "",
      img: "",
    };
    mode.value = null;
  }

  // ! Функции получения времени для добавления и редактирования сотрудника, а так же для селекта

  const timeOptions = computed(() => {
    const times = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 21 && minute > 0) break;
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  });

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getEndTimeOptions = (startTime) => {
    if (!startTime) return timeOptions.value;
    const startMinutes = timeToMinutes(startTime);
    return timeOptions.value.filter((time) => {
      const endMinutes = timeToMinutes(time);
      return endMinutes >= startMinutes + 15;
    });
  };

  const onStartTimeChange = (dayIndex, mode) => {
    let scheduleItem;
    if (mode === "edit") {
      if (!edittingEmployee.value || !edittingEmployee.value.workSchedule)
        return;
      scheduleItem = edittingEmployee.value.workSchedule[dayIndex];
    } else if (mode === "add") {
      if (!temporaryData.value || !temporaryData.value.workSchedule) return;
      scheduleItem = temporaryData.value.workSchedule[dayIndex];
    } else {
      return;
    }
    const startTime = scheduleItem.hours[0];
    const endTime = scheduleItem.hours[1];

    if (startTime && endTime) {
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      if (endMinutes <= startMinutes) {
        const endTimeOptions = getEndTimeOptions(startTime);
        scheduleItem.hours[1] = endTimeOptions[0] || "";
      }
    }
  };

  return {
    employees,
    customers,
    getCustomers,
    activeCell,
    hoveredCell,
    isModalVisible,
    selectedCustomer,
    openModal,
    closeModal,
    showAddIcon,
    isAddIconVisible,
    hideAddIcon,
    showInput,
    isInputVisible,
    selectedSells,
    selectedSell,
    closeAddCustomers,
    selectedDay,
    selectedTime,
    removeCustomer,
    editCustomer,
    isEditting,
    cancelEditting,
    edittingCustomer,
    saveEditting,
    calculateEmployees,
    editEmployee,
    edittingEmployee,
    isEdittingEmployee,
    closeModalEditting,
    removeEmployeeTime,
    deleteEmployee,
    removeEmployeeSpeciality,
    saveEdittingEmployee,
    cancelEdittingEmployee,
    isAddEmployeeModalVisible,
    openAddEmployee,
    closeAddEmployee,
    saveAddEmployee,
    temporaryData,
    getEndTimeOptions,
    timeOptions,
    onStartTimeChange,
    mode,

    // currentSpeciality,
    // specialityMap,
    // getEmployeesBySpeciality,
    // getSpecialityName,

    // childNameInput,
    // parentName,
    // description,

    toggleAddCustomer,
    toggleNew,
    toggleExist,
    addCustomers,
    customerInputs,

    // ! Очередь

    getCustomersQueue,
    toggleQueue,
    removeFromEmployeeQueue,
  };
});
