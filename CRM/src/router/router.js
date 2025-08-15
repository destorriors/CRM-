import { createRouter, createWebHistory } from "vue-router";
import DailySchedule from "@/views/DailySchedule.vue";
import Employees from "@/views/Employees.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import EmployeeSchedule from "@/views/EmployeeSchedule.vue";
import CustomersList from "@/views/CustomersList.vue";
import CustomerPage from "@/views/CustomerPage.vue";
import Price from "@/views/Price.vue";
import AccountingPage from "@/views/AccountingPage.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { ref } from "vue";

const routes = [
  {
    path: "/",
    component: DailySchedule,
  },
  {
    path: "/employees",
    component: Employees,

    // ! Необходимо сделать универсальный переход по специальности
    // ! Вместо статичного "/employees/neuro", что-то другое

    redirect: "/employees/neuro",
    children: [
      {
        path: ":speciality",
        component: EmployeeList,
        props: true,
      },
      {
        path: ":speciality/:employeeId",
        component: EmployeeSchedule,
        props: true,
      },
    ],
  },
  {
    path: "/customers",
    component: CustomersList,
    children: [
      {
        path: ":customerId",
        component: CustomerPage,
        props: true,
      },
    ],
  },
  {
    path: "/price",
    component: Price,
  },
  {
    path: "/accounting",
    component: AccountingPage,
  },
];

// ! Необходимо сделать так, чтобы при переходе на расписание сотрудника, в специальностях подствечивалась соответствующая

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (from.path === "/") {
    const scheduleStore = useScheduleStore();

    scheduleStore.currentDayChange();

    console.log("Пользователь ушел с главной страницы");
  }
});

// router.beforeEach((to, from, next) => {
//   const scheduleStore = useScheduleStore();
//   if (to.path.startsWith("/employees/neuro")) {
//     scheduleStore.currentSpeciality = "neuro";
//     console.log(scheduleStore.currentSpeciality);
//   } else if (to.path.startsWith("/employees/logo")) {
//     scheduleStore.currentSpeciality = "logo";
//   } else if (to.path.startsWith("/employees/psychologist")) {
//     scheduleStore.currentSpeciality = "psychologist";
//   }
//   next();
// });

export default router;
