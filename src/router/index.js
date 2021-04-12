import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/user/Login";
import Main from "../components/Main";
import * as path from "path";
import AddCourse from "../views/student/AddCourse";
import MyCourse from "../views/student/MyCourse";
import CreateCourse from "../views/teacher/TeachCourse";
import CourseDetail from "../views/course/CourseDetail";
import PartList from "../views/course/part/PartList";
import HomeWork from "../views/course/homework/HomeWork";
import Question from "../views/course/question/Question";
import Exam from "../views/course/exam/Exam";
import Register from "../views/user/Register";
import Main2 from "../components/Main2";
import MyTeachCourse from "../views/teacher/MyTeachCourse";
import TeacherCourseDetail from "../views/teacher/TeacherCourseDetail";
import PartList_T from "../views/teacher/part/PartList_T";
import HomeWork_T from "../views/teacher/homework/HomeWork_T";
import Exam_T from "../views/teacher/exam/Exam_T";
import StuMenu from "../views/teacher/stu/StuMenu";
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/main',
    component: Main,
    redirect: '/course'
  },
    //学生模块
  {
    path: '/course',
    name: '课程管理',
    component: Main,
    meta: {title: '课程管理'},
    children: [
      {
        path: '/course/myCourse',
        name: '我的选课',
        component: MyCourse,
        meta:{title: '我的选课'},
      },
      {
        path: '/course/teachCourse',
        name: '我教的课',
        component: CreateCourse,
        meta:{title: '我教的课'}
      },
      {
        path:'/course/addCourse',
        name: '选课',
        component: AddCourse,
        meta:{title: '选课'}
      }
    ]
  },
    //课程详情模块
  {
    path: '/courseDetail',
    component: CourseDetail,
    meta: {
      title: '课程详情'
    },
    children:[
      {
        path: 'partList',
        name: '章节列表',
        meta: {
          title: '章节列表'
        },
        component: PartList
      },
      {
        path: 'homework',
        name: '作业',
        meta: {
          title: '作业'
        },
        component: HomeWork
      },
      {
        path: 'question',
        name: '提问',
        meta: {
          title: '提问'
        },
        component: Question
      },
      {
        path: 'exam',
        name: '考试',
        meta: {
          title: '考试'
        },
        component: Exam
      }
    ]
  },

  {
    path: '/main2',
    component: Main2,
    redirect: '/teacher'
  },
    //教师模块
  {
    path: '/teacher',
    name: '教学管理',
    meta: {title: '教学管理'},
    component: Main2,
    children: [
      {
        path: '/teacher/myTeach',
        name: '我上的课',
        meta: {
          title: '我上的课'
        },
        component: MyTeachCourse

      },
      {
        path: '/teacher/newTeach',
        name: '发布新课程',
        meta: {
          title: '发布新课程'
        }
      },
      {
        path: '/teacher/answer',
        name: '答疑管理',
        meta: {
          title: '答疑管理'
        }
      }
    ]
  },
  {
    path: '/courseDetail_T',
    component: TeacherCourseDetail,
    meta: {
      title: '教师后台课程管理'
    },
    children: [
      {
        path: 'partList_T',
        name: '教师章节列表',
        meta: {
          title: '教师章节列表'
        },
        component: PartList_T
      },
      {
        path: 'newPart_T',
        name: '添加新的章节',
        meta: {
          title: '添加新的章节'
        }
      },
      {
        path: 'homework_T',
        name: '发布作业',
        meta: {
          title: '发布作业'
        },
        component: HomeWork_T
      },
      {
        path: 'exam_T',
        name: '发布考试',
        meta: {
          title: '发布考试'
        },
        component: Exam_T
      },
      {
        path: 'stuMenu',
        name: '学生列表',
        meta: {
          title: '学生名单'
        }
        ,
        component: StuMenu//加载学生信息
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
