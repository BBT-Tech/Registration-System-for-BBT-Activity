webpackJsonp([8],{0:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("//Fk"),a=n.n(i),r=n("7+uW"),o=n("/ocq");r.a.use(o.a);var u={logined:!1,studengId:"",name:"",isManager:!1},d=new o.a({routes:[{path:"/login",name:"Login",component:function(){return n.e(6).then(n.bind(null,"xJsL"))},meta:u},{path:"/activity",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"pGKz"))},children:[{path:"",name:"ActivityHome",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"cqKU"))},meta:u},{path:"publish",name:"ActivityCreator",component:function(){return n.e(2).then(n.bind(null,"R+vx"))},meta:u},{path:":id/edit",name:"ActivityEditor",component:function(){return n.e(1).then(n.bind(null,"1UK+"))},meta:u},{path:":id",name:"ActivityDetails",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"GYYd"))},meta:u}]},{path:"*",redirect:"/login"}]}),c=n("8+8L"),s={departmentList:["编辑部","综合管理部","综合新闻部","外联部","策划推广部","节目部","人力资源部","技术部","视频部","视觉设计部"],urls:{front:"back/public",add:function(e){return this.front+e},init:function(){return this.add("/api/init")},login:function(){return this.add("/api/login")},signout:function(){return this.add("/api/signout")},publishV:function(){return this.add("/api/manager/publish/volunteer")},publishA:function(){return this.add("/api/manager/publish/award")},image:function(e){return this.add("/api/publisher/modify/image/"+e)},queryA:function(){return this.add("/api/user/query/activity")},queryD:function(e){return this.add("/api/manager/query/"+e+"/department")},queryU:function(e){return this.add("/api/manager/query/"+e+"/userinfo")},download:function(e){return this.add("/api/manager/download/"+e)},register:function(e){return this.add("/api/user/register/"+e)},unregister:function(e){return this.add("/api/user/unregister/"+e)},editV:function(e){return this.add("/api/publisher/modify/volunteer/"+e)},editA:function(e){return this.add("/api/publisher/modify/award/"+e)},delete:function(e){return this.add("/api/publisher/delete/"+e)},imageSrc:function(e){return this.add(e)}},getCookie:function(e){var t=new RegExp("(?:(?:^|.*;\\s*)"+e+"\\s*=\\s*([^;]*).*$)|^.*$");return document.cookie.replace(t,"$1")},removeCookie:function(e){var t=new Date;t.setTime(t.getTime()-1),document.cookie=e+"=;expires="+t.toUTCString()},compareDatetime:function(e){for(var t=new Date,n=[[e.slice(0,4),t.getFullYear()],[e.slice(5,7),t.getMonth()+1],[e.slice(8,10),t.getDate()],[e.slice(11,13),t.getHours()],[e.slice(14,16),t.getMinutes()],[e.slice(17,19),t.getSeconds()]],i=0;i<6;i++)if(n[i][0]=Number(n[i][0]),n[i][0]!==n[i][1])return n[i][0]-n[i][1];return 0},datetimeToInput:function(e){return e.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}$/,"$1T$2")},inputToDatetime:function(e){return e.slice(0,10)+" "+e.slice(11)+":00"}},l={name:"App",data:function(){return{appWidth:void 0,loading:!0}},created:function(){this.flushSize(),window.addEventListener("resize",this.flushSize)},methods:{flushSize:function(){var e=document.body.clientWidth;e<300?e=300:e>450&&(e=450),this.appWidth=e/1080*100}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"global-bg"}}),e._v(" "),n("router-view",{staticClass:"main",class:{show:!e.loading},style:{fontSize:e.appWidth+"px"},on:{"main-fade-in":function(t){e.loading=!1},"main-fade-out":function(t){e.loading=!0}}})],1)},staticRenderFns:[]};var f,m=n("VU/8")(l,p,!1,function(e){n("RxKd"),n("qRj7")},"data-v-66af222b",null).exports;r.a.use(c.a),r.a.config.productionTip=!1,r.a.prototype.$global=s,d.beforeEach((f=!1,function(e,t,n){f?n():(f=!0,r.a.http.post(s.urls.init()).then(function(t){if(!((t=t.body)instanceof Object))return a.a.reject("服务器发生错误");if(t.err_code)return a.a.reject(t.err_msg);if((t=t.data).logined&&(e.meta.logined=!0,e.meta.studentId=t.student_id,e.meta.name=t.name,e.meta.isManager=t.is_manager),"/login"===e.fullPath)e.meta.logined&&n({path:"/activity",replace:!0});else if(e.meta.logined){if(-1!==e.fullPath.search(/^\/activity\/\d+\/edit$/))return r.a.http.post(s.urls.queryA(),{type:0,start_id:e.params.id,number:1})}else n({path:"/login",replace:!0});return a.a.reject(0)}).then(function(t){if(!((t=t.body)instanceof Object))return a.a.reject("服务器发生错误");if(t.err_code)return a.a.reject(t.err_msg);if(!((t=t.data).activities instanceof Array&&1===t.activities.length&&t.activities[0].id===Number(e.params.id)))return a.a.reject("活动不存在");var n=t.activities[0],i=!1;return 0===n.type?i=s.compareDatetime(n.action_time)>0:1===n.type&&(i=s.compareDatetime(n.book_time)>0),i&&n.is_publisher?void 0:a.a.reject("你没有修改权限")}).catch(function(t){0===t||("string"==typeof t?alert(t):(alert("服务器发生错误"),n({path:"/activity/"+e.params.id,replace:!0}))),n()}))})),new r.a({el:"#app",router:d,components:{App:m},template:"<App/>"})},RxKd:function(e,t){},qRj7:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.84528fe94bbac7ea876f.js.map