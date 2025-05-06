import { createRouter, createWebHistory } from "vue-router";
import DailySchedule from "@/views/DailySchedule.vue";
import Employees from "@/views/Employees.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import EmployeeSchedule from "@/views/EmployeeSchedule.vue";

const routes = [
  {
    path: "/",
    component: DailySchedule,
  },
  {
    path: "/employees",
    component: Employees,
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
];

// ! Необходимо сделать так, чтобы при переходе на расписание сотрудника, в специальностях подствечивалась соответствующая

const router = createRouter({
  history: createWebHistory(),
  routes,
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
