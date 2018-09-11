webpackJsonp([3],{"8epw":function(t,e){},GYYd:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("//Fk"),s=i.n(a),n={name:"DetailsMain",props:["data","before"],data:function(){return{registering:!1,deleting:!1}},computed:{regVDis:function(){return this.registering||!this.before||this.data.member===this.data.current_member&&!this.data.registered},regADis:function(){return this.registering||this.before||this.data.award===this.data.current_member&&!this.data.registered}},mounted:function(){var t=this;setTimeout(function(){t.$emit("con-fade-in")},100)},methods:{register:function(){var t=this;0===t.data.type&&!t.before||1===t.data.type&&t.before||(t.registering=!0,t.data.registered?t.$parent.simplePost(t.$global.urls.unregister(t.data.id),function(){t.$parent.getDetails(function(){t.registering=!1})}):t.$parent.simplePost(t.$global.urls.register(t.data.id),function(){t.$parent.getDetails(function(){t.registering=!1})}))},delActivity:function(){if(confirm("确定删除这个活动？")){var t=this;t.deleting=!0,t.$parent.simplePost(t.$global.urls.delete(t.data.id),function(){t.$root.$router.replace("/activity")})}},editActivity:function(){this.before&&this.$root.$router.push("/activity/"+this.data.id+"/edit")}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"details-main"}},[i("div",{staticClass:"image"},[i("img",{attrs:{src:t.$global.urls.imageSrc(t.data.image)},on:{load:function(t){t.target.nextSibling.style.opacity="1"}}}),i("div",{style:{backgroundImage:"url("+t.$global.urls.imageSrc(t.data.image)+")"}})]),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"title"},[t._v(t._s(t.data.title))]),t._v(" "),0===t.data.type?i("div",{staticClass:"options"},[i("div",[t._v("类型：志愿者活动")]),t._v(" "),i("div",[t._v("详情："+t._s(t.data.details))]),t._v(" "),i("div",[t._v("志愿开始时间："+t._s(t.data.action_time))]),t._v(" "),i("div",[t._v("已报名人数："+t._s(t.data.current_member)+"/"+t._s(t.data.member))]),t._v(" "),i("div",[t._v("状态："),t.data.registered?i("span",[t._v("已报名")]):t.before?t.data.member===t.data.current_member?i("span",[t._v("报名人数已满")]):i("span",[t._v("可报名")]):i("span",[t._v("活动已开始，不予报名")])])]):1===t.data.type?i("div",{staticClass:"options"},[i("div",[t._v("类型：福利活动")]),t._v(" "),i("div",[t._v("详情："+t._s(t.data.details))]),t._v(" "),i("div",[t._v("领取时间："+t._s(t.data.book_time))]),t._v(" "),i("div",[t._v("已领取人数："+t._s(t.data.current_member)+"/"+t._s(t.data.award))]),t._v(" "),i("div",[t._v("状态："),t.data.registered?i("span",[t._v("已领取")]):t.before?i("span",[t._v("领取时间未到")]):t.data.award===t.data.current_member?i("span",[t._v("奖品已被领完")]):t.data.is_department_full?i("span",[t._v("所在部门领取人数已满")]):i("span",[t._v("可领取")])])]):t._e(),t._v(" "),i("div",{staticClass:"buttons"},[0===t.data.type?i("div",{staticClass:"button",class:{dis:t.regVDis},on:{click:function(e){t.regVDis||t.register()}}},[t.data.registered?i("div",{staticClass:"text del sml"},[t._v("取消报名")]):i("div",{staticClass:"text reg"},[t._v("报名")])]):1===t.data.type?i("div",{staticClass:"button",class:{dis:t.regADis},on:{click:function(e){t.regADis||t.register()}}},[t.data.registered?i("div",{staticClass:"text del sml"},[t._v("放弃")]):i("div",{staticClass:"text reg"},[t._v("领取")])]):t._e()]),t._v(" "),t.data.is_publisher?i("div",{staticClass:"buttons"},[i("div",{staticClass:"button",class:{dis:!t.before},on:{click:function(e){!t.before||t.editActivity()}}},[i("div",{staticClass:"text edit"},[t._v("编辑")])]),t._v(" "),i("div",{staticClass:"button",class:{dis:t.deleting},on:{click:function(e){t.deleting||t.delActivity()}}},[i("div",{staticClass:"text del"},[t._v("删除")])])]):t._e()])])},staticRenderFns:[]};var d=i("VU/8")(n,r,!1,function(t){i("jF/P")},"data-v-5f6f9d00",null).exports,o={name:"DetailsDep",props:["data"],components:{loading:i("NxGh").a},data:function(){return{usedData:this.data,loading:!0,openedList:[],loadingList:[],userList:[]}},created:function(){var t=this;this.$global.departmentList.forEach(function(){t.openedList.push(!1),t.userList.push([]),t.loadingList.push(!1)})},mounted:function(){var t=this;setTimeout(function(){t.$emit("con-fade-in")},100)},methods:{foldSwitch:function(t){var e=this;this.openedList[t]?this.$set(this.openedList,t,!1):(this.$set(this.loadingList,t,!0),this.$set(this.openedList,t,!0),setTimeout(function(){e.getUserInfo(t)},100))},getUserInfo:function(t){var e=this;e.$http.post(e.$global.urls.queryU(e.data.id),{department:t}).then(function(i){return(i=i.body)instanceof Object?i.err_code?s.a.reject(i.err_msg):(e.$set(e.userList,t,i.data.users),void e.$set(e.loadingList,t,!1)):s.a.reject("服务器发生错误")}).catch(function(i){i instanceof String?alert(i):alert("404！该服务暂时不可用"),e.$set(e.openedList,t,!1),e.$set(e.loadingList,t,!1)})},download:function(){null!==navigator.userAgent.match(/MicroMessenger/i)?alert("微信自带浏览器不支持该文件下载，请点击右上方按钮切换到其他浏览器进行操作"):location.href=this.$global.urls.download(this.data.id)}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"content"},[a("div",{staticClass:"button-export",on:{click:t.download}},[a("div",[t._v("导出参与用户信息")])]),t._v(" "),t._l(t.data.current_member_list,function(e,s){return a("div",{key:"dep"+s,staticClass:"dep-part"},[a("div",{staticClass:"dep"},[0===t.data.type?a("div",{staticClass:"text"},[t._v(t._s(t.$global.departmentList[s])+"："+t._s(e))]):1===t.data.type?a("div",{staticClass:"text"},[t._v(t._s(t.$global.departmentList[s])+"："+t._s(e)+"/"+t._s(t.data.member_list[s]))]):t._e(),0!==e?a("div",{staticClass:"dep-button",on:{click:function(e){t.foldSwitch(s)}}},[a("img",{class:{opened:t.openedList[s]},attrs:{src:i("qNF3")}})]):t._e()]),t._v(" "),t.openedList[s]?a("div",[t.loadingList[s]?a("div",[a("div",{staticClass:"info loading"},[a("div",{staticClass:"loading-box"},[a("loading",{attrs:{number:"3"}})],1)])]):a("div",t._l(t.userList[s],function(e,i){return a("div",{key:s+"user"+i,staticClass:"info"},[a("div",{staticClass:"text"},[t._v("姓名："+t._s(e.name))]),t._v(" "),a("div",{staticClass:"text"},[t._v("学号："+t._s(e.student_id))]),t._v(" "),a("div",{staticClass:"text"},[t._v("手机："+t._s(e.tele))])])}))]):t._e()])})],2)])},staticRenderFns:[]};var u={name:"ActivityDetails",components:{"details-main":d,"details-dep":i("VU/8")(o,c,!1,function(t){i("8epw")},"data-v-470c229a",null).exports},props:["meta"],data:function(){return{usedMeta:this.meta,currentQueryType:0,isActivityExist:!0,timeBefore:!1,data:{},depData:{},inited:!1}},watch:{"$route.params.id":function(){this.$emit("con-fade-out"),this.getDetails()}},beforeRouteLeave:function(t,e,i){"Login"===t.name?i(!1):(this.$emit("con-fade-out"),setTimeout(function(){i()},100))},created:function(){var t=this;this.$route.meta.logined&&(this.getDetails(),setTimeout(function(){t.usedMeta.queryTypes=["活动详情"],t.usedMeta.value=0,t.usedMeta.back=t.back,t.usedMeta.flush=t.query,t.$route.meta.isManager&&t.usedMeta.queryTypes.push("各部门情况")},100),setTimeout(function(){t.$emit("nav-fade-in")},200))},methods:{back:function(){this.$root.$router.push("/activity")},query:function(t){var e=this;this.currentQueryType=t,this.ActivityExist||setTimeout(function(){e.$emit("con-fade-in")},100)},getDetails:function(t){var e=this;e.$http.post(e.$global.urls.queryA(),{type:0,start_id:e.$route.params.id,number:1}).then(function(t){if(!((t=t.body)instanceof Object))return s.a.reject("服务器发生错误");if(t.err_code)return s.a.reject(t.err_msg);if(t=t.data,e.isActivityExist=t.activities instanceof Array&&1===t.activities.length&&t.activities[0].id===Number(e.$route.params.id),e.isActivityExist){if(e.data=t.activities[0],0===e.data.type?e.timeBefore=e.$global.compareDatetime(e.data.action_time)>0:1===e.data.type&&(e.timeBefore=e.$global.compareDatetime(e.data.book_time)>0),e.$route.meta.isManager)return e.$http.post(e.$global.urls.queryD(e.$route.params.id))}else e.data={};return s.a.reject(0)}).then(function(t){return(t=t.body)instanceof Object?t.err_code?s.a.reject(t.err_msg):(e.depData=t.data,e.$set(e.depData,"type",e.data.type),e.$set(e.depData,"id",e.data.id),s.a.reject(0)):s.a.reject("服务器发生错误")}).catch(function(i){void 0!==t&&t(),0===i?(setTimeout(function(){e.$emit("con-fade-in")},100),e.inited=!0):i instanceof String?alert(i):alert("404！该服务暂时不可用")})},simplePost:function(t,e){this.$http.post(t).then(function(t){(t=t.body)instanceof Object?t.err_code&&alert(t.err_msg):alert("服务器发生错误"),void 0!==e&&e()}).catch(function(t){alert("404！该服务暂时不可用"),void 0!==e&&e()})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.isActivityExist?0===t.currentQueryType&&t.inited?i("details-main",{attrs:{data:t.data,before:t.timeBefore},on:{"con-fade-in":function(e){t.$emit("con-fade-in")},"con-fade-out":function(e){t.$emit("con-fade-out")}}}):1===t.currentQueryType&&t.inited?i("details-dep",{attrs:{data:t.depData},on:{"con-fade-in":function(e){t.$emit("con-fade-in")},"con-fade-out":function(e){t.$emit("con-fade-out")}}}):t._e():i("div",{staticClass:"center-tips"},[i("div",[t._v("这个活动逃离了地球")])])],1)},staticRenderFns:[]};var v=i("VU/8")(u,l,!1,function(t){i("OwRG")},"data-v-0ddc353f",null);e.default=v.exports},OwRG:function(t,e){},"jF/P":function(t,e){},qNF3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAbCAYAAADszNYXAAAEtUlEQVRYhcWX3YtW1xWHn9/a+5z3Q1GxKbWN0NI/IBe5y3UIBEqJH6BF1E6Qkl72MonvODrO2PQvMLEFUbQqOBhICyEgvQzkIkJuvAplQB2ntUnMTOa8zjlnr1y8b2w7+n7MOCG/q8PZa+397LU/1l56b/FddpZNco8H/tW9vy+3/DmZfQqc9eT/TKrpVgV7dh9mV2s3H/MZ95mjoknxxY/Z+eBrVrZnpIZRdZ1Q5shXqZJT5U3iapdowpVTZ6vEprBHifbDki+e20Zr57+JdNnFfl7iBe4Xd3j/ziWaoYXJQPwSt9+7pxdLX33wk8ZPb6xSXnvIV8TkNSvl8rvLdfVGIzRxHHd/GfgDYi/O3/nBpF/h3ADPJNFQk/88enAwhPBqCvXr9nz60a+7VfGGzHD8fz0z4G/Aaz8MOK/1x8++++E4MlFUKxO7ws/2Wnd1+Vi0iNCgTt4H9rTDlscdfB/6rt/+OHv64z4hIaJlFNXKby0ouvtgIMmovLpxp5jfBxCImz4BxwlEAO4U8/sqr25INtjeHcPcsjw7m6gHwyPacSs3Fz+Yu7c0v38bOxCDO96IhLGNHdxbmt9/c/GDuXbcOmwnkKjJ8/ysLaSFj9pxy+ywYOaW0wwtPrw7d/320q0DO9iONin6wtnBdm4v3Trw4d25683QIrd8sINDO26ZXUgLH1luDSpPnSTeGWSfPNEKbTyDxbufX6uWqoMiMiQ445IjItVSdXDx7ufXPINWaJM8DXRJ4p3KUye3Rm+jqffzLXdc8NagCWQhJ7qzeC+7+ugXudp5urpRfgFZnvjq0dbfFPdWr7SjoRCGgjv80cXb1vvun5J+C/K3Bcldxwd5WxS1MtICV2IszTP+uhF4zyB+WR5KlS7XMcOCM+TeQPJZhw6uxyu+5uQJyTuSnxk4qIOC06gTReGXv5EdiesMfxR8IztSFH65USc0GvyM5J21+/Sp14bkx4HZgb15z9MjrNTxYlnaUdl4B1jmlKUdXanjRY99guGus32eJ/R0+F4u6yS3maEggBl0C79QdtNRC8PBLUDZTUe7hV8wG33ek9uMo86gm23ohe2uSXedHmYjQAbVsi6kQhMMmkCAVGiiWtYFjQHurtPumhxmMzLbuHTC0fRQI4Eh6jKdTykd0xoyCVJKx+oynTc0ktzRtEsnRrHFUQYAbpoiIeGDIyGQRFVWfxHJFOzPADJRV+l3FdU52eiT7eh0f7yRGi/Pe38FpFOjTAVUrnMJTRhOQhOV69w4F5JLp1w6MW7yHivyj2WcdMeVODnUTsJrP08qX3H3Q6zdR0+RGycRp8aJ+H9x1ivTKeRTY0UnpUMjbXrJcQobvapPoKzXoffO9GmjnhptOjriRj0lfHojD6UNvm17ExBpaqNvSwdE2jA4bBi+V0CYmA5mk+udgAPBbNLE9LMUNs9UVfQhZsxsclwIxzGzyWA286wVwTOXRO5OlM0ErDMKxoGAdaJsZljpOa42pZ5znCDNBuc4LrSGSw64CM7xIM1uVg28acVor4jWGYX0ZrL/ayAZKKQ3AzqzmcX7+pLUCFktVrdWf0quT1pL2eHa0s/Nbb7bKi8F+T/yhw3qMZ/O4+hbyuAWosD/gOcAAAAASUVORK5CYII="}});
//# sourceMappingURL=3.4174ae138236d901096e.js.map