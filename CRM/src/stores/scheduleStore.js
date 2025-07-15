import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

export const useScheduleStore = defineStore("scheduleStore", () => {
  // Сотрудники
  const employees = ref([
    {
      id: 0,
      name: "Кручинин Никита",
      speciality: ["Нейропсихолог"],
      rate: 50,
      salary: 15000,
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
      rate: 50,
      salary: 10000,
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
      rate: 15,
      salary: 7000,
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
      rate: 20,
      salary: 5000,
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
      rate: 40,
      salary: 7000,
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
      rate: 30,
      salary: 8000,
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

  const customers = ref([
    {
      id: 1,
      parentName: "Ольга",
      name: "Клиент 1",
      subscription: [
        {
          typeOfSubs: "Нейропсихолог",
          timeSub: 45,
          howMuchSubLeft: 8,
          totalBoughtSubQuantity: 8,
        },
        {
          typeOfSubs: "Логопед-дефектолог",
          timeSub: 60,
          howMuchSubLeft: 4,
          totalBoughtSubQuantity: 4,
        },
        // {
        //   typeOfSubs: "Психолог",
        //   timeSub: 60,
        //   howMuchSubLeft: 3,
        //   totalBoughtSubQuantity: 8,
        // },
        // {
        //   typeOfSubs: "Дефектолог",
        //   timeSub: 60,
        //   howMuchSubLeft: 5,
        //   totalBoughtSubQuantity: 8,
        // },
      ],
      description: "Some description",
      specialistsId: [0, 5],
      queueToEmployee: [1, 4, 3],
      phoneNumber: "89099399999",
      schedule: [
        {
          day: "Вторник",
          time: "09:00",
          employeeId: 0,
          description: "Что-то в дополнение 1",
        },
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
      subscription: [
        {
          typeOfSubs: "Нейропсихолог",
          timeSub: 45,
          howMuchSubLeft: 4,
          totalBoughtSubQuantity: 4,
        },
        {
          typeOfSubs: "Логопед-дефектолог",
          timeSub: 30,
          howMuchSubLeft: 4,
          totalBoughtSubQuantity: 4,
        },
      ],
      description: "Some description",
      specialistsId: [0, 1, 2, 3, 4],
      queueToEmployee: [1, 5],
      phoneNumber: "89099399999",

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
          time: "10:00",
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
      subscription: [
        // {
        //   typeOfSubs: "Нейропсихолог",
        //   timeSub: 45,
        //   howMuchSubLeft: 8,
        //   totalBoughtSubQuantity: 4,
        // },
      ],
      description: "Some description",
      specialistsId: [],
      queueToEmployee: [0],
      phoneNumber: "89099399999",

      schedule: [
        {
          day: "Вторник",
          time: "09:15",
          employeeId: 0,
          description: "Что-то в дополнение 2",
        },
      ],
    },
    {
      id: 4,
      parentName: "питрпрол",
      name: "Четвертый тест",
      subscription: [
        // {
        //   typeOfSubs: "Нейропсихолог",
        //   timeSub: "45 минут",
        //   howMuchSubLeft: 12,
        // },
      ],
      description: "Some description",
      specialistsId: [],
      queueToEmployee: [0, 5],
      phoneNumber: "89099399999",

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
    phoneNumber: "",
  });

  // function resetInputs() {
  //   customerInputs.value = {
  //     childNameInput: "",
  //     parentName: "",
  //     description: "",
  //   };
  // }

  const toggleAddCustomer = ref(2);

  function toggleNew(number) {
    toggleAddCustomer.value = number;
    selectedCustomer.value = null;
  }

  function resetAddCustomersInputs() {
    customerInputs.value = {
      childNameInput: "",
      parentName: "",
      description: "",
      phoneNumber: "",
    };
  }

  // ! Сделал общую функцию с клиентами, если что-то ебанет, то это из-за нее

  const isAddModelVisible = ref(false);

  function openAddModelWindow() {
    isAddModelVisible.value = true;
  }

  function closeAddModalWindow() {
    isAddModelVisible.value = false;
    resetAddCustomersInputs();
  }

  function newCustomer(employeeId, day, time) {
    const newCustomer = {
      id: customers.value.length + 1,
      name: customerInputs.value.childNameInput,
      description: customerInputs.value.description,
      parentName: customerInputs.value.parentName,
      phoneNumber: customerInputs.value.phoneNumber,
      subscription: [],
      specialistsId: employeeId !== undefined ? [employeeId] : [],
      schedule:
        day && time !== undefined
          ? [{ day: day, time: time, employeeId: employeeId }]
          : [],
      queueToEmployee: [],
    };
    return newCustomer;
  }

  // ! Главное добавление клиентов
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // ! Необходимо придумать, как объединить все функции добавления клиентов

  // function addMainCustomers() {
  //   if (
  //     !customerInputs.value.childNameInput &&
  //     !customerInputs.value.parentName
  //   ) {
  //     alert("Введите данные");
  //   } else {
  //     customers.value.push(newCustomer());

  //     resetAddCustomersInputs();

  //     console.log(customers.value);
  //     closeAddCustomers();
  //   }
  // }

  // !!1111111111111111111111111111111111111111111111111111111111111111111111111111

  function addCustomers(employeeId, day, time, forMainMode) {
    if (toggleAddCustomer.value === 1 || forMainMode) {
      // ! Режим новый
      if (
        !customerInputs.value.childNameInput &&
        !customerInputs.value.parentName
      ) {
        alert("Введите данные");
      } else {
        // const newCustomer = {
        //   id: customers.value.length + 1,
        //   name: customerInputs.value.childNameInput,
        //   description: customerInputs.value.description,
        //   parentName: customerInputs.value.parentName,
        //   phoneNumber: customerInputs.value.phoneNumber,
        //   subscription: [],
        //   specialistsId: [employeeId],
        //   schedule: [{ day: day, time: time, employeeId: employeeId }],
        //   queueToEmployee: [],
        // };

        customers.value.push(newCustomer(employeeId, day, time));

        resetAddCustomersInputs();

        console.log(customers.value);

        if (forMainMode) {
          closeAddModalWindow();
        } else {
          closeAddCustomers();
        }
      }
    } else if (toggleAddCustomer.value === 2) {
      //! Режим "Существующий"
      if (!selectedCustomer.value) {
        alert("Выберите клиента из списка");
        return;
      }

      const idx = selectedCustomer.value.queueToEmployee?.findIndex((val) => {
        return val === employeeId;
      });

      if (selectedCustomer.value.queueToEmployee?.includes(idx)) {
        selectedCustomer.value.queueToEmployee.splice(idx, 1);
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
    resetAddCustomersInputs();
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
    customers.value[index].phoneNumber = edittingCustomer.value.phoneNumber;

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

  const selectedeInQueueCustomer = ref(null);

  const customerToQueueInputs = ref({
    childNameInput: "",
    parentName: "",
    description: "",
  });

  const toggleQueueAddToQueue = ref(1);

  function toggleQueue(number) {
    toggleQueueAddToQueue.value = number;
    selectedCustomer.value = null;
  }

  const isAddToQueueModalVisible = ref(false);

  function openAddToQueueModalWindow() {
    isAddToQueueModalVisible.value = true;
  }

  function closeAddToQueueModalWindow() {
    isAddToQueueModalVisible.value = false;
    resetAddCustomersInputs();
  }

  function getCustomersQueue(employeeNumber) {
    return customers.value.filter((cus) =>
      cus.queueToEmployee?.includes(employeeNumber)
    );
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // ! Функция фильтрации селекта в очереди по наличию в расписании

  function chooseCustomersInSelect(employeeId) {
    const customersInSelect = customers.value.filter((cus) => {
      return (
        !cus.specialistsId?.includes(employeeId) ||
        cus.specialistsId.length === 0
      );
    });

    console.log(customersInSelect);

    return customersInSelect;
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  function addCustomersToQueue(employeeId) {
    if (toggleQueueAddToQueue.value === 1) {
      // ! Режим новый

      if (
        !customerToQueueInputs.value.childNameInput &&
        !customerToQueueInputs.value.parentName
      ) {
        alert("Введите данные");
      } else {
        const newCustomer = {
          id: customers.value.length + 1,
          name: customerToQueueInputs.value.childNameInput,
          description: customerToQueueInputs.value.description,
          parentName: customerToQueueInputs.value.parentName,
          specialistsId: [employeeId],
          schedule: [],
          queueToEmployee: [employeeId],
          subscription: [],
        };
        customers.value.push(newCustomer);
        customerToQueueInputs.value = {
          childNameInput: "",
          parentName: "",
          description: "",
        };
        console.log(customers.value);
        closeAddToQueueModalWindow();
      }
    } else if (toggleQueueAddToQueue.value === 2) {
      //! Режим "Существующий"

      const customerIdx = customers.value.findIndex((val) => {
        return val.id === selectedeInQueueCustomer.value.id;
      });

      if (customers.value[customerIdx].queueToEmployee?.includes(employeeId)) {
        return;
      } else {
        customers.value[customerIdx].queueToEmployee.push(employeeId);
        console.log(customers.value[customerIdx]);
      }

      console.log(selectedeInQueueCustomer.value);

      console.log("Обновлённый список клиентов в очереди:", customers.value);
      selectedeInQueueCustomer.value = null; // Сбрасываем выбор
      closeAddToQueueModalWindow();
    }
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
    employees.value[index].rate = edittingEmployee.value.rate;

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
    rate: "",
    salary: "",
  });

  function openAddEmployee() {
    isAddEmployeeModalVisible.value = true;
    mode.value = "add";
  }

  function resetTemporaryDataForEmployee() {
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
      rate: "",
      salary: "",
    };
  }

  function closeAddEmployee() {
    isAddEmployeeModalVisible.value = false;
    resetTemporaryDataForEmployee();
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
      rate: temporaryData.value.rate,
      salary: 0,
    };

    console.log(newEmployee);
    console.log(temporaryData.value.speciality);

    employees.value.push(newEmployee);

    resetTemporaryDataForEmployee();
    mode.value = null;
  }

  function removeEmployeeSpecialityForAdd(specialityIndex) {
    temporaryData.value.speciality.splice(specialityIndex, 1);
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

  // ! Боковая панель с направлениями

  // ! Добавление специализации в боковую панель

  function transliterate(text) {
    // Маппинг кириллицы на латиницу
    const cyrillicToLatinMap = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      " ": "_", // Пробелы заменяем на подчёркивание
      "-": "_", // Дефисы заменяем на подчёркивание
    };

    // Приводим к нижнему регистру и заменяем символы
    return text
      .toLowerCase()
      .split("")
      .map((char) => cyrillicToLatinMap[char] || char) // Если символа нет в маппинге, оставляем его как есть
      .join("")
      .replace(/[^a-z0-9_]/g, ""); // Удаляем всё, кроме букв, цифр и подчёркиваний
  }

  const specialization = ref([
    { id: 0, forRouterPath: "neuro", name: "Нейропсихолог" },
    { id: 1, forRouterPath: "logo", name: "Логопед-дефектолог" },
    { id: 2, forRouterPath: "defectologist", name: "Дефектолог" },
    { id: 3, forRouterPath: "psychologist", name: "Психолог" },
    { id: 4, forRouterPath: "neurologist", name: "Невролог" },
    { id: 5, forRouterPath: "psychiatrist", name: "Психиатр" },
    { id: 6, forRouterPath: "epileptologist", name: "Эпилептолог" },
    { id: 7, forRouterPath: "osteopath", name: "Остеопат" },
  ]);

  const isAddButtonShown = ref(false);

  function showAddInput() {
    isAddButtonShown.value = !isAddButtonShown.value;
  }

  const addSpecialistInput = ref("");

  function addSpecialist() {
    isAddButtonShown.value = false;
    console.log(addSpecialistInput.value);
    specialization.value.push({
      id: specialization.value.length + 1,
      forRouterPath: transliterate(addSpecialistInput.value),
      name: addSpecialistInput.value,
    });

    console.log(specialization.value);
    addSpecialistInput.value = "";
  }

  // ! Удаление направления

  const isDeleteButtonShown = ref(false);

  function showDeleteButton() {
    isDeleteButtonShown.value = !isDeleteButtonShown.value;
  }

  function removeSpec(specId) {
    console.log(specId);
    const idx = specialization.value.findIndex((val) => {
      return val.id === specId;
    });
    console.log(idx);

    specialization.value.splice(idx, 1);
    isDeleteButtonShown.value = false;
  }

  // ! Добавление занятие в абонемент

  function addLessonForSub(customerId, subscriptionIdx) {
    const customer = customers.value.find((val) => {
      return val.id === customerId;
    });

    const subIdx = subscriptionIdx;

    console.log(subIdx);

    const limit = 30;

    if (customer.subscription[subIdx].howMuchSubLeft === limit) {
      alert("Видит");
      return;
    } else {
      customer.subscription[subIdx].howMuchSubLeft =
        customer.subscription[subIdx].howMuchSubLeft + 1;
    }
  }

  // ! Убирание занятия из абонемента

  function findCustomer(customerId) {
    const customer = customers.value.find((val) => {
      return val.id === customerId;
    });
    return customer || null;
  }

  function findEmployee(employeeId) {
    const employee = employees.value.find((val) => {
      return val.id === employeeId;
    });
    return employee || null;
  }

  function findPriceByCategory(category) {
    const price = priceList.value.find((val) => {
      return val.category === category;
    });
    return price || null;
  }

  // ! Добавление зарплаты сотруднику и снятие абонемента с главной страницы

  // - Сделать оплату разовую основываясь на функции ниже , остальное в модалке посмотри

  function calculateSubLessonForEmployeeSalary(customer, subIdx, employeeId) {
    const findedPrice = findPriceByCategory(
      customer.subscription[subIdx].typeOfSubs
    );

    const findedTimeOptionsOfPrice = findedPrice.timeOptions.find(
      (val) =>
        val.timeOfSub === customer.subscription[subIdx].timeSub &&
        val.subCountOfLessons ===
          customer.subscription[subIdx].totalBoughtSubQuantity
    );

    const findedEmployee = findEmployee(employeeId);

    const calculateSalaryForEmployeeByOneSubLesson =
      findedTimeOptionsOfPrice.subSingleLessonCost * `0.${findedEmployee.rate}`;

    findedEmployee.salary =
      +findedEmployee.salary + +calculateSalaryForEmployeeByOneSubLesson;

    // - Над вот этим надо подумать куда и как выводить что сотрудник заработал за занятие

    console.log(calculateSalaryForEmployeeByOneSubLesson);

    // accounting.value.loss.push({
    //   id: accounting.value.loss.length + 1,
    //   name: `Сотрудник ${findedEmployee.name} провел занятие по абонементу с ${customer.name} `,
    //   sum: +calculateSalaryForEmployeeByOneSubLesson,
    //   date: "18:01:2025",
    //   paymentType: "",
    // });

    const nameForLossToAccounting = `Сотрудник ${findedEmployee.name} провел занятие по абонементу с ${customer.name} `;

    addLossToAccounting(
      nameForLossToAccounting,
      +calculateSalaryForEmployeeByOneSubLesson
    );
  }

  function removeLessonForSub(customerId, subscriptionIdx, employeeId) {
    const customer = findCustomer(customerId);

    const subIdx = subscriptionIdx;

    const limit = 1;

    if (customer.subscription[subIdx].howMuchSubLeft <= limit) {
      customer.subscription.splice(subIdx, 1);
      return;
    } else if (employeeId !== null && employeeId !== undefined) {
      customer.subscription[subIdx].howMuchSubLeft =
        customer.subscription[subIdx].howMuchSubLeft - 1;

      calculateSubLessonForEmployeeSalary(customer, subIdx, employeeId);

      console.log("Добавляем бабки сюда", findEmployee(employeeId));
    } else if (!employeeId) {
      console.log("Передал", employeeId);
      customer.subscription[subIdx].howMuchSubLeft =
        customer.subscription[subIdx].howMuchSubLeft - 1;
    }
  }

  // ! Добавление занятия сотруднику без абонемента

  function calculateLessonWithoutSubForEmployeeSalary(employeeId) {
    const findedEmployee = findEmployee(employeeId);

    const findedPrice = findPriceByCategory("Нейропсихолог");

    // const optionForPrice

    // const calculateSalaryForEmployeeByOneSubLesson =
    //   findedTimeOptionsOfPrice.subSingleLessonCost * `0.${findedEmployee.rate}`;

    // findedEmployee.salary =
    //   +findedEmployee.salary + +calculateSalaryForEmployeeByOneSubLesson;

    // const nameForLossToAccounting = `Сотрудник ${findedEmployee.name} провел занятие без абонемента с ${customer.name} `;

    // addLossToAccounting(
    //   nameForLossToAccounting,
    //   +calculateSalaryForEmployeeByOneSubLesson
    // );

    console.log(findedEmployee);

    console.log(findedPrice);
  }

  // ! Создание абонемента

  const subsSelects = ref({
    subDirectionSelect: "",
    subTimeSelect: "",
    subQuantity: 0,
    totalBoughtSubQuantity: 0,
  });

  function resetSubsSelects() {
    subsSelects.value = {
      subDirectionSelect: "",
      subTimeSelect: "",
      subQuantity: 0,
      totalBoughtSubQuantity: 0,
    };
  }

  const newSubIsOpen = ref(false);

  function openSubModal() {
    newSubIsOpen.value = true;
  }

  function closeSubModal() {
    newSubIsOpen.value = false;
    paymentTypeInput.value = "";
    resetSubsSelects();
  }

  function saveAddNewSubToCustomer(customerId) {
    const customer = findCustomer(customerId);

    // if(!subsSelects.value.subDirectionSelect){
    //   return
    // }else if(!subsSelects.value.subTimeSelect){
    // return
    // }else if(!subsSelects.value.subQuantity){
    //   return
    // }

    if (
      !subsSelects.value.subDirectionSelect ||
      !subsSelects.value.subTimeSelect ||
      subsSelects.value.subQuantity === 0
    ) {
      return;
    }

    const newSub = {
      typeOfSubs: subsSelects.value.subDirectionSelect,
      timeSub: +subsSelects.value.subTimeSelect,
      howMuchSubLeft: +subsSelects.value.subQuantity,
      totalBoughtSubQuantity: +subsSelects.value.subQuantity,
    };

    customer.subscription.push(newSub);

    console.log("Добавлялка", customer);

    // ! Данные accounting снизу, внимание!

    // accounting.value.profit.push({
    //   id: accounting.value.profit.length + 1,
    //   name: `Клиент ${customer.parentName} приобрел абонемент: ${newSub.typeOfSubs}, ${newSub.timeSub} мин., ${newSub.howMuchSubLeft} з. `,
    //   sum: calculatedPrice.value,
    //   date: "18:01:2025",
    //   paymentType: paymentTypeInput.value,
    // });

    const nameForAccounting = `Клиент ${customer.parentName} приобрел абонемент: ${newSub.typeOfSubs}, ${newSub.timeSub} мин., ${newSub.howMuchSubLeft} з. `;

    addProfitToAccounting(
      nameForAccounting,
      +calculatedPrice.value,
      "18:01:2025",
      paymentTypeInput.value
    );

    console.log(accounting.value);

    resetSubsSelects();

    closeSubModal();
  }

  // ! Цены

  const priceList = ref([
    {
      id: 0,
      category: "Нейропсихолог",
      timeOptions: [
        {
          name: "",
          timeOfSub: 30,
          singleCost: 1500,
          subSingleLessonCost: 1300,
          subCost: 7600,
          subCountOfLessons: 4,
          withoutSub: false,
        },
        {
          name: "",
          timeOfSub: 45,
          singleCost: 1700,
          subSingleLessonCost: 1500,
          subCost: 6700,
          subCountOfLessons: 8,
          withoutSub: false,
        },
        {
          name: "",
          timeOfSub: 45,
          singleCost: 1500,
          subSingleLessonCost: 1300,
          subCost: 12300,
          subCountOfLessons: 4,
          withoutSub: false,
        },
      ],
    },
    {
      id: 1,
      category: "Логопед-дефектолог",
      timeOptions: [
        {
          name: "",
          timeOfSub: 30,
          singleCost: 1500,
          subSingleLessonCost: 1300,
          subCost: 7600,
          subCountOfLessons: 4,
          withoutSub: false,
        },
        {
          name: "",
          timeOfSub: 45,
          singleCost: 1700,
          subSingleLessonCost: 1500,
          subCost: 6700,
          subCountOfLessons: 4,
          withoutSub: false,
        },
        {
          name: "",
          timeOfSub: 60,
          singleCost: 1700,
          subSingleLessonCost: 1500,
          subCost: 6700,
          subCountOfLessons: 4,
          withoutSub: false,
        },
      ],
    },
  ]);

  // ! Без абонемента

  const withoutSub = ref(false);

  // ! Редактирование цены

  const isEdittingPrice = ref(false);

  const idxAndIdofPrice = ref({
    idx: 0,
    id: 0,
  });

  const temporaryEdittingTimeOption = ref({
    timeOfSub: 0,
    singleCost: 0,
    subSingleLessonCost: 0,
    subCost: 0,
    subCountOfLessons: 0,
    withoutSub: false,
    name: "",
  });

  function resetTemporaryEdittingTimeOption() {
    temporaryEdittingTimeOption.value = {
      timeOfSub: 0,
      singleCost: 0,
      subSingleLessonCost: 0,
      subCost: 0,
      subCountOfLessons: 0,
      withoutSub: false,
      name: "",
    };

    idxAndIdofPrice.value = {
      idx: 0,
      id: 0,
    };
  }

  // ! Разобраться с отображением цены без абика

  function findPriceItem(priceId) {
    const findedPriceItem = priceList.value.find((val) => {
      return val.id === priceId;
    });

    return findedPriceItem;
  }

  // ! Открытие модалки редактирования цены

  function openEditPrice(editOptionIdx, priceId) {
    isEdittingPrice.value = true;

    idxAndIdofPrice.value = {
      idx: editOptionIdx,
      id: priceId,
    };

    console.log(idxAndIdofPrice.value);

    withoutSub.value = false;

    temporaryEdittingTimeOption.value = {
      ...findPriceItem(priceId).timeOptions[editOptionIdx],
    };
    console.log(temporaryEdittingTimeOption.value);
  }

  // ! Закрытие модалки редактирования цены

  function closeEditPrice() {
    isEdittingPrice.value = false;
    resetTemporaryEdittingTimeOption();
  }

  // ! Сохранение редактирования

  function saveEdittingPrice(editOptionIdx, priceId, addTimeInPriceOptionMode) {
    const newPriceData = { ...temporaryEdittingTimeOption.value };

    console.log("ВРЕМЯНКА", temporaryEdittingTimeOption.value);

    const calculateHowWillCostSub = Math.trunc(
      temporaryEdittingTimeOption.value.subSingleLessonCost *
        temporaryEdittingTimeOption.value.subCountOfLessons
    );

    console.log(calculateHowWillCostSub);

    if (addTimeInPriceOptionMode && !withoutSub.value) {
      console.log(withoutSub.value, "Срабатывает 2");

      console.log(findPriceItem(priceId));

      findPriceItem(priceId).timeOptions.push({
        ...newPriceData,
        subCost: calculateHowWillCostSub,
        withoutSub: false,
      });

      closeAddTimeInPriceOption();

      console.log("Все абики 2", priceList.value);

      return;
    } else if (addTimeInPriceOptionMode && withoutSub.value) {
      console.log(withoutSub.value, "Срабатывает 1");

      findPriceItem(priceId).timeOptions.push({
        ...newPriceData,
        subCost: calculateHowWillCostSub,
        withoutSub: true,
      });

      closeAddTimeInPriceOption();

      console.log("Все абики 1", priceList.value);

      return;
    } else {
      findPriceItem(priceId).timeOptions[editOptionIdx] = {
        ...newPriceData,
        subCost: calculateHowWillCostSub,
      };
      withoutSub.value = false;
    }

    console.log("Работает", priceList.value);

    closeEditPrice();
  }

  // ! Добавить услугу в категорию

  const isAddTimeInPriceOption = ref(false);

  function openAddTimeInPriceOption(itemId) {
    isAddTimeInPriceOption.value = true;
    idxAndIdofPrice.value.id = itemId;
    withoutSub.value = false;
  }

  function closeAddTimeInPriceOption() {
    isAddTimeInPriceOption.value = false;

    withoutSub.value = false;
    resetTemporaryEdittingTimeOption();
  }

  // ! Удалить услугу из категории

  function removeTimeFromPriceOption(editOptionIdx, priceId) {
    console.log("Работает удаление");

    findPriceItem(priceId).timeOptions.splice(editOptionIdx, 1);

    console.log("Удалил абик из", priceList.value);

    closeEditPrice();
  }

  // ! Удаление категории

  function deleteCategory(priceIdx) {
    priceList.value.splice(priceIdx, 1);
    console.log(`Удалена категория ${priceIdx}`);
  }

  // ! Добавление категории

  const isAddingPriceCategory = ref(false);

  const priceCategoryInput = ref("");

  function resetAddCategoryPrice() {
    priceCategoryInput.value = "";
    isAddingPriceCategory.value = false;
  }

  function openAddPriceCategory() {
    isAddingPriceCategory.value = true;
  }

  function closeAddPriceCategory() {
    resetAddCategoryPrice();
  }

  function saveAddPriceCategory() {
    const newCategory = {
      id: priceList.value.length + 1,
      category: priceCategoryInput.value,
      timeOptions: [],
    };

    priceList.value.push(newCategory);

    resetAddCategoryPrice();

    console.log("Добавлена категория", priceList.value);
  }

  // ! Поднятие и опускание цены на категорию

  const raiseOrLowerPriceCategory = ref(0);
  const inputForRaiseOrLowerPriceCategory = ref(0);

  function resetRaiseOrLowerPriceCategory() {
    raiseOrLowerPriceCategory.value = 0;
    inputForRaiseOrLowerPriceCategory.value = 0;
  }

  function openRaiseOrLowerPriceCategory(serviceNumber, priceId) {
    raiseOrLowerPriceCategory.value = Number(serviceNumber);
    idxAndIdofPrice.value.id = priceId;
  }

  function closeRaiseOrLowerPriceCategory() {
    resetRaiseOrLowerPriceCategory();
  }

  function saveResetRaiseOrLowerPriceCategory(editOptionIdx, priceId) {
    if (raiseOrLowerPriceCategory.value === 1) {
      findPriceItem(priceId).timeOptions.forEach((val) => {
        val.singleCost = Math.trunc(
          Number(val.singleCost) +
            Number(inputForRaiseOrLowerPriceCategory.value)
        );

        if (!val.withoutSub) {
          val.subSingleLessonCost = Math.trunc(
            Number(val.subSingleLessonCost) +
              Number(inputForRaiseOrLowerPriceCategory.value)
          );
          val.subCost = Math.trunc(
            Number(val.subSingleLessonCost) * Number(val.subCountOfLessons)
          );
        }

        console.log("Повысил цену", priceList.value);
      });
    } else if (raiseOrLowerPriceCategory.value === 2) {
      findPriceItem(priceId).timeOptions.forEach((val) => {
        val.singleCost = Math.trunc(
          Number(val.singleCost) -
            Number(inputForRaiseOrLowerPriceCategory.value)
        );

        if (!val.withoutSub) {
          val.subSingleLessonCost = Math.trunc(
            Number(val.subSingleLessonCost) -
              Number(inputForRaiseOrLowerPriceCategory.value)
          );
          val.subCost = Math.trunc(
            Number(val.subSingleLessonCost) * Number(val.subCountOfLessons)
          );
        }
        console.log("Снизил цену");
      });
    }

    closeRaiseOrLowerPriceCategory();
  }

  // ! Бухгалтерия

  const now = new Date();
  const date = Intl.DateTimeFormat("ru-RU").format(now);

  const accounting = ref({
    totalProfit: 0,
    totalLoss: 0,
    loss: [
      {
        id: 1,
        name: "На еду всем",
        sum: 500,
        date: date,
        paymentType: "Карта",
      },
      {
        id: 2,
        name: "Какая-то хуита",
        sum: 3434,
        date: "17.03.2022",
        paymentType: "Карта",
      },
    ],
    profit: [
      {
        id: 1,
        name: "Бабки на дороге",
        sum: 62,
        date: date,
        paymentType: "Карта",
      },
      {
        id: 2,
        name: "Какая-то хуита 2",
        sum: 102,
        date: "17.03.2022",
        paymentType: "Карта",
      },
    ],
  });

  const paymentType = ref(["Карта", "СБП", "Наличные", "Перевод"]);

  const paymentTypeInput = ref("");

  // ! Функции добавления расхода/дохода

  function addLossToAccounting(name, sum, date, paymentType) {
    accounting.value.loss.push({
      id: accounting.value.loss.length + 1,
      name: name || "",
      sum: sum || 0,
      date: date,
      paymentType: paymentType || "",
    });
  }

  function addProfitToAccounting(name, sum, date, paymentType) {
    accounting.value.profit.push({
      id: accounting.value.profit.length + 1,
      name: name || "",
      sum: sum || 0,
      date: date,
      paymentType: paymentType || "",
    });
  }

  // ! Подсчет общего дохода и расхода

  const calculateTotalProfit = computed(() => {
    const sum = accounting.value.profit.reduce((acc, val) => {
      return acc + val.sum;
    }, 0);

    return sum;
  });

  const calculateTotalLoss = computed(() => {
    const sum = accounting.value.loss.reduce((acc, val) => {
      return acc + val.sum;
    }, 0);

    return sum;
  });

  watchEffect(() => {
    accounting.value.totalProfit = calculateTotalProfit.value;
    accounting.value.totalLoss = calculateTotalLoss.value;
  });

  // ! Добавление расхода

  const isLossOrProfitModalWindowShwon = ref(false);
  const lossOrProfitInput = ref("");
  const sumLossOrPrifitInput = ref(0);
  const lossOrProfitMode = ref(0);

  function resetLossOrProfitInputs() {
    lossOrProfitInput.value = "";
    sumLossOrPrifitInput.value = 0;
  }

  function openLossOrProfitModalWindow(mode) {
    isLossOrProfitModalWindowShwon.value = true;
    lossOrProfitMode.value = mode;
    console.log(mode);
  }

  function closeLossOrProfitModalWindow() {
    isLossOrProfitModalWindowShwon.value = false;
    lossOrProfitMode.value = 0;
    paymentTypeInput.value = "";
    resetLossOrProfitInputs();
  }

  // ! Сделать уникальный id для всех, но это скорее всего делается уже в БД
  // ! Подумать что делать, если на замене будет

  function addLossOrProfit() {
    if (lossOrProfitMode.value === 1) {
      // const newLossValue = {
      //   id: accounting.value.loss.length + 1,
      //   name: lossOrProfitInput.value,
      //   sum: +sumLossOrPrifitInput.value,
      //   date: date,
      //   paymentType: paymentTypeInput.value,
      // };

      // accounting.value.loss.push(newLossValue);

      addLossToAccounting(
        lossOrProfitInput.value,
        +sumLossOrPrifitInput.value,
        date,
        paymentTypeInput.value
      );

      accounting.value.totalLoss =
        accounting.value.totalLoss + +sumLossOrPrifitInput.value;
    } else if (lossOrProfitMode.value === 2) {
      // const newProfitValue = {
      //   id: accounting.value.profit.length + 1,
      //   name: lossOrProfitInput.value,
      //   sum: +sumLossOrPrifitInput.value,
      //   date: date,
      //   paymentType: paymentTypeInput.value,
      // };

      // accounting.value.profit.push(newProfitValue);

      addProfitToAccounting(
        lossOrProfitInput.value,
        +sumLossOrPrifitInput.value,
        date,
        paymentTypeInput.value
      );

      accounting.value.totalProfit =
        accounting.value.totalProfit + +sumLossOrPrifitInput.value;
    } else {
      console.log("Ошибка");
    }

    console.log(lossOrProfitMode.value);

    closeLossOrProfitModalWindow();
  }

  // ! Поиск цены за услугу для добавления в доходы

  const calculatedPrice = computed(() => {
    const category = priceList.value.find((val) => {
      return val.category === subsSelects.value.subDirectionSelect;
    });

    if (
      !category ||
      !subsSelects.value.subTimeSelect ||
      !subsSelects.value.subQuantity
    ) {
      return null;
    }

    const timeOption = category.timeOptions.find((opt) => {
      return (
        opt.timeOfSub.toString() === subsSelects.value.subTimeSelect &&
        opt.subCountOfLessons === +subsSelects.value.subQuantity
      );
    });

    console.log(timeOption);

    return timeOption ? timeOption.subCost : null;
  });

  // ! Добавление ставки сотрудникам

  // const employeRateInput = ref("");

  // ! Главная страница

  const isModalWindowForScheduleTemplateVisible = ref(false);

  const choosenCustomer = ref(null);

  const selectedIdAndTimeForMain = ref({
    id: 0,
    time: "",
  });

  function resetAllDataForMain() {
    choosenCustomer.value = null;
    selectedIdAndTimeForMain.value = {
      id: 0,
      time: "",
    };
  }

  function openModalWindowForScheduleTemplate(employeeId, time) {
    isModalWindowForScheduleTemplateVisible.value = true;
    choosenCustomer.value = getCustomerForMainPage(employeeId, time);
    selectedIdAndTimeForMain.value = {
      id: employeeId,
      time: time,
    };
  }

  function closeModalWindowForScheduleTemplate() {
    isModalWindowForScheduleTemplateVisible.value = false;
    resetAllDataForMain();
  }

  function getCustomerForMainPage(employeeId, time) {
    const currentCustomer = customers.value.filter((val) => {
      return val.schedule.some((cur) => {
        return (
          cur.employeeId === employeeId &&
          cur.day.toLowerCase() === "вторник" &&
          cur.time === time
        );
      });
    });

    //! Не забудь поменять день недели на динамический

    return currentCustomer || false;
  }

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
    removeEmployeeSpecialityForAdd,

    // currentSpeciality,
    // specialityMap,
    // getEmployeesBySpeciality,
    // getSpecialityName,

    // childNameInput,
    // parentName,
    // description,

    toggleAddCustomer,
    toggleNew,
    addCustomers,
    customerInputs,
    resetAddCustomersInputs,

    // ! Очередь

    customerToQueueInputs,
    toggleQueueAddToQueue,
    getCustomersQueue,
    toggleQueue,
    removeFromEmployeeQueue,
    isAddToQueueModalVisible,
    openAddToQueueModalWindow,
    closeAddToQueueModalWindow,
    addCustomersToQueue,
    selectedeInQueueCustomer,
    chooseCustomersInSelect,

    // ! Боковая панель со специалистами

    specialization,
    addSpecialistInput,
    addSpecialist,
    isAddButtonShown,
    showAddInput,
    removeSpec,
    isDeleteButtonShown,
    showDeleteButton,

    // ! Модальное окно UI

    isAddModelVisible,
    openAddModelWindow,
    closeAddModalWindow,

    // ! Абонементы

    addLessonForSub,
    removeLessonForSub,
    // subTime,
    subsSelects,
    newSubIsOpen,
    openSubModal,
    closeSubModal,
    saveAddNewSubToCustomer,

    // ! Цены

    priceList,
    isEdittingPrice,
    openEditPrice,
    closeEditPrice,
    calculatedPrice,
    temporaryEdittingTimeOption,
    saveEdittingPrice,
    idxAndIdofPrice,
    isAddTimeInPriceOption,
    openAddTimeInPriceOption,
    closeAddTimeInPriceOption,
    withoutSub,
    removeTimeFromPriceOption,
    deleteCategory,
    isAddingPriceCategory,
    openAddPriceCategory,
    priceCategoryInput,
    saveAddPriceCategory,
    closeAddPriceCategory,
    raiseOrLowerPriceCategory,
    inputForRaiseOrLowerPriceCategory,
    openRaiseOrLowerPriceCategory,
    closeRaiseOrLowerPriceCategory,
    saveResetRaiseOrLowerPriceCategory,

    // ! Бухгалтерия

    accounting,
    paymentType,
    isLossOrProfitModalWindowShwon,
    openLossOrProfitModalWindow,
    closeLossOrProfitModalWindow,
    lossOrProfitInput,
    sumLossOrPrifitInput,
    addLossOrProfit,
    lossOrProfitMode,
    paymentTypeInput,

    // ! Добавление ставки сотрудникам

    // employeRateInput,

    // ! Главная страница

    isModalWindowForScheduleTemplateVisible,
    openModalWindowForScheduleTemplate,
    closeModalWindowForScheduleTemplate,
    getCustomerForMainPage,
    choosenCustomer,
    selectedIdAndTimeForMain,
    calculateLessonWithoutSubForEmployeeSalary,
  };
});

// ! Обыграть ошибку при отсутсвии данных вообще
