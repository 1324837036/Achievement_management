import Vue from 'vue'
import Router from 'vue-router'   // 引入路由

import test from '../views/test'
import Member_add from '../views/admin/Member_add'
import Member_management from '../views/admin/Member_management'
import Achievement from '../views/admin/Achievement'
import Result_report_detail from '../views/admin/Result_report_detail'
import Achievement_analysis from '../views/admin/Achievement_analysis'
import Member_import from '../views/admin/Member_import'
import Import_information_confirm from '../views/admin/Import_information_confirm'
import Achievement_list from '../views/admin/Achievement_list'
import Results_search from '../views/teachers/Results_search'
import Achievement_acknowlege from '../views/teachers/Achievement_acknowlege'
import teacher_Achievement_analysis from '../views/teachers/teacher_Achievement_analysis'
import project_management from '../views/teachers/project_management'
import project from '../views/teachers/project'
import Sign from '../views/teachers/Sign'
import Import_information_confirm_checked from '../views/admin/Import_information_confirm_checked'
import Invitation from '../views/teachers/Invitation'
import Achievement_claim from '../views/teachers/Achievement_claim'
import error from '@/views/admin/error'

Vue.use(Router); // 使用路由 必须
//配置路由 规则
export default new Router({
    // history用于去除#号
    mode: 'history',
    routes: [
        //测试路由
        {
            path: "/test",
            name: 'test',
            component: test
        },
        //导入成员路由
        {
            path: '/Member_import',
            name: 'Member_import',
            component: Member_import
        },
        //添加成员路由
        {
            path: '/Member_add',
            name: 'Member_add',
            component: Member_add
        },
        //成员管理路由
        {
            path: '/Member_management',
            name: 'Member_management',
            component: Member_management
        },
        // 成果列表路由
        {
            path: '/Achievement',
            name: 'Achievement',
            component: Achievement
        },
        // 成果详情路由
        {
            path: '/Result_report_detail',
            name: 'Result_report_detail',
            component: Result_report_detail
        },
        // 成果分析路由
        {
            path: '/Achievement_analysis',
            name: 'Achievement_analysis',
            component: Achievement_analysis
        },
        // 确认导入信息
        {
            path: '/Import_information_confirm',
            name: 'Import_information_confirm',
            component: Import_information_confirm
        },
        //
        {
            path: '/Import_information_confirm_checked',
            name: 'Import_information_confirm_checked',
            component: Import_information_confirm_checked
        },
        // 成果列表
        {
            path: '/Achievement_list',
            name: 'Achievement_list',
            component: Achievement_list
        },
        // 教师端-成果搜索
        {
            path: '/Results_search',
            name: 'Results_search',
            component: Results_search
        },
        // 教师端成果确认
        {
            path: '/Achievement_acknowlege',
            name: 'Achievement_acknowlege',
            component: Achievement_acknowlege
        },
        // 教师端成果分析
        {
            path: '/teacher_Achievement_analysis',
            name: 'teacher_Achievement_analysis',
            component: teacher_Achievement_analysis
        },
        // 教师端我的成果
        {
            path: '/project_management',
            name: 'project_management',
            component: project_management
        },
        // 教师端项目
        {
            path: '/project',
            name: 'project',
            component: project
        },
        // 教师端登录
        {
            path: '/Sign',
            name: 'Sign',
            component: Sign
        },
        // 教师端邀请注册
        {
            path: '/Invitation',
            name: 'Invitation',
            component: Invitation
        },
        // 教师端成果认领
        {
            path: '/Achievement_claim',
            name: 'Achievement_claim',
            component: Achievement_claim
        },
        // 教师端成果认领
        {
            path: '/error',
            name: 'error',
            component: error
        }

    ]
})
