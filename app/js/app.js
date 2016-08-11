/*!
 * Project main controller
 * version 1.0 2016-3-10
 * author: BGOnline 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }


// 全局
var url = 'http://xiaoshutong.thinktorch.cn/frontend/web'; // API
var rootUrl = 'http://xiaoshutong.thinktorch.cn';
var noF5speed = 5; // 无刷新获取数据的速度 秒
var noF5Timer; // 无刷新计时器下标
var getDataSpeed = 1000 * noF5speed; // 无刷新获取数据的速度
var lockCountInit = 0; // 锁屏计数器初始化
var lockClockInit = (function(lockCountInit){
    return sessionStorage.setItem('lockCount', lockCountInit);
});

if(localStorage.lockTime == undefined || localStorage.lockTime == 'undefined') {
    localStorage.setItem('lockTime', 5); // 默认自动锁屏时间 5分钟
}


// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'tmh.dynamicLocale',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
  // Set reference to access them from any scope
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$storage = $window.localStorage;
  $rootScope.defaultHeader = 'app/img/defaultHeader.png';
  // Uncomment this to disable template cache
  /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (typeof(toState) !== 'undefined'){
        $templateCache.remove(toState.templateUrl);
      }
  });*/
  
  // Scope Globals
  // ----------------------------------- 
  $rootScope.app = {
    name: sessionStorage.branch_name ? sessionStorage.branch_name : '课堂外分校管理系统',
    description: '课堂外分校管理系统',
    year: ((new Date()).getFullYear()),
    layout: {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null
    },
    useFullLayout: false,
    hiddenFooter: false,
    viewAnimation: 'ng-fadeInUp'
  };
  $rootScope.user = {
    name:     'John',
    job:      'ng-developer',
    picture:  'app/img/logo-single.png'
  };

}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/page/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'ui.bootstrap-slider', 'angularFileUpload', 'filestyle', 'ngDialog', 'loaders.css')
    })
    .state('app.courseMngt', {
        url: '/courseMngt',
        title: '课程管理',
        templateUrl: helper.basepath('courseMngt.html'),
        resolve: helper.resolveFor('spinkit')
    })

    .state('app.noticeMngt', {
        url: '/noticeMngt',
        title: '文章管理',
        templateUrl: helper.basepath('noticeMngt.html'),
        resolve: helper.resolveFor('spinkit')
    })

    .state('app.classStudent', {
        url: '/classStudent',
        title: '班级学生',
        templateUrl: helper.basepath('classStudent.html')
    })

    .state('app.ZHCourse', {
        url: '/ZHCourse',
        title: '获取总部课程',
        templateUrl: helper.basepath('ZHCourse.html')
    })
    
    .state('app.ZHCourseDetails', {
        url: '/ZHCourseDetails',
        title: '总部课程详情',
        templateUrl: helper.basepath('ZHCourseDetails.html')
    })
    
    .state('app.teacherMngt', {
        url: '/teacherMngt',
        title: '教师管理',
        templateUrl: helper.basepath('teacherMngt.html')
    })
    .state('app.default', {
        url: '/default',
        title: '首页',
        templateUrl: helper.basepath('default.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })

    .state('app.orderList', {
        url: '/orderList',
        title: '课程订单',
        templateUrl: helper.basepath('orderList.html')
    })

    .state('app.commodityOrder', {
        url: '/commodityOrder',
        title: '商品订单',
        templateUrl: helper.basepath('commodityOrder.html')
    })

    .state('app.editTeacher', {
        url: '/editTeacher',
        title: '维护教师信息',
        templateUrl: helper.basepath('editTeacher.html')
    }) 

    .state('app.editUser', {
        url: '/editUser',
        title: '维护用户信息',
        templateUrl: helper.basepath('editUser.html')
    })
    
    .state('app.courseDetails', {
        url: '/courseDetails',
        title: '课程详情',
        templateUrl: helper.basepath('courseDetails.html')
    })
    
    .state('app.noticeDetails', {
        url: '/noticeDetails',
        title: '文章详情',
        templateUrl: helper.basepath('noticeDetails.html')
    })
    .state('app.schoolSurvey', {
        url: '/schoolSurvey',
        title: '学校概况',
        templateUrl: helper.basepath('schoolSurvey.html')
    })
    
    .state('app.addCustomCourse', {
        url: '/addCustomCourse',
        title: '添加自定义课程',
        templateUrl: helper.basepath('addCustomCourse.html'),
        resolve: helper.resolveFor('angularFileUpload', 'filestyle')      
    })
    .state('app.addNotice', {
        url: '/addNotice',
        title: '添加自定义文章',
        templateUrl: helper.basepath('addNotice.html'),
        resolve: helper.resolveFor('angularFileUpload', 'filestyle')      
    })

    .state('app.addSchoolSurvey', {
        url: '/addSchoolSurvey',
        title: '添加学校概况',
        templateUrl: helper.basepath('addSchoolSurvey.html')
    })

    .state('app.addBanji', {
        url: '/addBanji',
        title: '添加班级',
        templateUrl: helper.basepath('addBanji.html')
    })
    
    .state('app.rechargeClass', {
        url: '/rechargeClass',
        title: '充值课时',
        templateUrl: helper.basepath('rechargeClass.html')
    })
    
    .state('app.usersCenter', {
        url: '/usersCenter',
        title: '用户中心',
        templateUrl: helper.basepath('usersCenter.html')
    })
    
    .state('app.setUp', {
        url: '/setUp',
        title: '设置中心',
        templateUrl: helper.basepath('setUp.html'),
        resolve: helper.resolveFor('angularFileUpload', 'filestyle', 'angular-carousel')
    })

    .state('app.adminInfo', {
        url: '/adminInfo',
        title: '个人设置',
        templateUrl: helper.basepath('adminInfo.html')
    })
    // page
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html',
        resolve: helper.resolveFor('spinkit')
    })
    .state('page.lock', {
        url: '/lock',
        title: "Lock",
        templateUrl: 'app/pages/lock.html'
    })
    .state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    })
    
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {

    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

    // tmhDynamicLocaleProvider.useStorage('$cookieStore');

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
;

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'whirl':              ['vendor/whirl/dist/whirl.css'],
      'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
      'animo':              ['vendor/animo.js/animo.js'],
      'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'animate':            ['vendor/animate.css/animate.min.css'],
      'icons':              ['vendor/skycons/skycons.js',
                             'vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css',
                             'vendor/weather-icons/css/weather-icons.min.css'],
      'sparklines':         ['app/vendor/sparklines/jquery.sparkline.min.js'],
      'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                             'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
      'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
      'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                             'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
      'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                             'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
      'loadGoogleMapsJS':   ['app/vendor/gmap/load-google-maps.js'],
      'flot-chart':         ['vendor/Flot/jquery.flot.js'],
      'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                             'vendor/Flot/jquery.flot.resize.js',
                             'vendor/Flot/jquery.flot.pie.js',
                             'vendor/Flot/jquery.flot.time.js',
                             'vendor/Flot/jquery.flot.categories.js',
                             'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                            // jquery core and widgets
      'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js'],
                             // loads only jquery required modules and touch support
      'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js',
                             'vendor/jquery-ui/ui/mouse.js',
                             'vendor/jquery-ui/ui/draggable.js',
                             'vendor/jquery-ui/ui/droppable.js',
                             'vendor/jquery-ui/ui/sortable.js',
                             'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
      'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
      'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
      'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
      'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                             'vendor/codemirror/lib/codemirror.css'],
      // modes for common web files
      'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                               'vendor/codemirror/mode/xml/xml.js',
                               'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                               'vendor/codemirror/mode/css/css.js'],
      'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                             'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
      'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
      'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                             'vendor/fullcalendar/dist/fullcalendar.css'],
      'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
      'chartjs':            ['vendor/Chart.js/Chart.js'],
      'morris':             ['vendor/raphael/raphael.js',
                             'vendor/morris.js/morris.js',
                             'vendor/morris.js/morris.css'],
      'loaders.css':          ['vendor/loaders.css/loaders.css'],
      'spinkit':              ['vendor/spinkit/css/spinkit.css']
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                 'vendor/angularjs-toaster/toaster.css']},
      {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                 'vendor/chosen_v1.2.0/chosen.min.css',
                                                 'vendor/angular-chosen-localytics/chosen.js']},
      {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                 'vendor/ngDialog/css/ngDialog.min.css',
                                                 'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
      {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
      {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                  'vendor/ng-table/dist/ng-table.min.css']},
      {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
      {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                  'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
      {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                                                  'vendor/html.sortable/dist/html.sortable.angular.js']},
      {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                                                  'vendor/angular-xeditable/dist/css/xeditable.css']},
      {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/angular-file-upload.js']},
      {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                  'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
      {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                  'vendor/angular-ui-select/dist/select.css']},
      {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
      {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                  'vendor/angular-carousel/dist/angular-carousel.js']},
      {name: 'ngGrid',                    files: ['vendor/ng-grid/build/ng-grid.min.js',
                                                  'vendor/ng-grid/ng-grid.css' ]},
      {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
      {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                  'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                  'vendor/angular-bootstrap-slider/slider.js']},
      {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'textAngularSetup',          files: ['vendor/textAngular/src/textAngularSetup.js']},
      {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular-rangy.min.js',
                                                  'vendor/textAngular/src/textAngular.js',
                                                  'vendor/textAngular/src/textAngularSetup.js',
                                                  'vendor/textAngular/src/textAngular.css'], serie: true},
      {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                                                  'vendor/rickshaw/rickshaw.js',
                                                  'vendor/rickshaw/rickshaw.min.css',
                                                  'vendor/angular-rickshaw/rickshaw.js'], serie: true},
      {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                  'vendor/chartist/dist/chartist.js',
                                                  'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
      {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
      {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                                                  'vendor/datatables/media/js/jquery.dataTables.js',
                                                  'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
      {name: 'angular-jqcloud',           files: ['vendor/jqcloud2/dist/jqcloud.css',
                                                  'vendor/jqcloud2/dist/jqcloud.js',
                                                  'vendor/angular-jqcloud/angular-jqcloud.js']},
      {name: 'angularGrid',               files: ['vendor/ag-grid/dist/angular-grid.css',
                                                  'vendor/ag-grid/dist/angular-grid.js',
                                                  'vendor/ag-grid/dist/theme-dark.css',
                                                  'vendor/ag-grid/dist/theme-fresh.css']},
      {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                                                  'vendor/nestable/jquery.nestable.js']},
      {name: 'akoenig.deckgrid',          files: ['vendor/angular-deckgrid/angular-deckgrid.js']}
    ]
  })
;

/**=========================================================
 * login
 * author: BGOnline
 * version 1.0 2016-3-15
 =========================================================*/

App.controller('LoginFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {

  var bgLoading = $('.bg-loading');
  var loginBtn = $('#loginBtn');
  
  $scope.account = {};
  $scope.authMsg = '';
  $scope.account.remember = localStorage.remember;
  $scope.account.username = localStorage.username;
  $scope.account.password = localStorage.password;
  
  $('input').focus(function() {
      $('.bg-alert').addClass('ng-hide')
  })

  $scope.login = function() { // 这个地方需要连续关闭两次 checkbox 才能忘记密码 
    if($scope.account.remember) {
        localStorage.setItem("remember", $scope.account.remember);
        localStorage.setItem("username", $scope.account.username); 
        localStorage.setItem("password", $scope.account.password);
    }else {
        localStorage.removeItem('remember');
        localStorage.removeItem("username"); 
        localStorage.removeItem("password");
    }

    $scope.authMsg = '';
    if($scope.loginForm.$valid) {
      
      bgLoading.css({'display':'block'});
      loginBtn.addClass('disabled');
      
      $http
        .post(''+url+'/public/login', {
            username: $scope.account.username, password: $scope.account.password
        })
        .then(function(response) {
            
            bgLoading.css({'display':'none'});
            loginBtn.removeClass('disabled');
            
            if ( response.data.code != 200 ) { $scope.authMsg = response.data.msg; }
            else{
                $state.go('app.default');
                if(typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("suserid", response.data.data.suserid); 
                    sessionStorage.setItem("token", response.data.data.token);
                    sessionStorage.setItem('tempSuserid', response.data.data.suserid); // 用于锁屏页面
                    sessionStorage.setItem("password", response.data.data.password); // 用于锁屏页面
                    sessionStorage.setItem('branch_name', response.data.data.branch_name);
                    lockClockInit(lockCountInit);// 锁屏计数器初始化
                }
                else { 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>为保障系统安全及功能正常，请考虑更换Firefox或者Chrome...</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    signOut();
                }
            }
        }, function(x) { 
            $scope.authMsg = '啊欧~服务器开小差啦！'; 
            bgLoading.css({'display':'none'});
            loginBtn.removeClass('disabled');
        });
    }
    else {
      $scope.loginForm.account_username.$dirty = true;
      $scope.loginForm.account_password.$dirty = true;
    }
  };

}]);


/**=========================================================
 * signOut
 * author: BGOnline
 * version 1.0 2016-3-15
 =========================================================*/
 
var signOut = (function() {
    // clearInterval(noF5Timer);
    sessionStorage.clear();
    localStorage.clear();
    window.opener = null;
 　 window.open(' ', '_self', ' '); 
 　 window.close();
});



/**=========================================================
 * 请求出错
 * author: BGOnline
 * version 1.0 2016-6-15
 =========================================================*/
 
var requestError = (function(response, $state, ngDialog) { 
    if(response.data.code == 202) {
        alert('账户在另一台电脑登陆，请确保账户安全！');
        $state.go('page.login');
    }else if(response.data.code == 203){
        alert('账户登录异常，请重新登录！');
        $state.go('page.login');
    }else {
        ngDialog.open({
          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
          plain: true,
          className: 'ngdialog-theme-default'
        });
        ngDialog.close();
    }

});



/**=========================================================
 * 无刷新获取数据
 * author: BGOnline
 * version 1.0 2016-3-30
 =========================================================*/
 
var noRefreshGetData = (function(x, speed) { // x 取得数据的函数名 speed 无刷新获取数据的速度
    if(noF5Timer) {
        clearInterval(noF5Timer);
    }
    return noF5Timer = setInterval(function() {
        x();
    }, speed);
});


/**=========================================================
 * 不存在用户名密码时的跳转处理
 * author: BGOnline
 * version 1.0 2016-3-25
 =========================================================*/
 
var errorJump = (function($state) {
    if (!(sessionStorage.suserid && sessionStorage.token)) { 
        $state.go('page.login'); 
        return false;
        // clearInterval(intervalTimer);
    }
});
 
 

/**=========================================================
 * courseClassController
 * author: BGOnline
 * version 1.0 2016-4-13
 =========================================================*/
 
App.controller('courseClassController', ['$scope', 'ngDialog', '$rootScope', '$http', '$filter', '$state',
  function($scope, ngDialog, $rootScope, $http, $filter, $state) {
      
      getCourseClass = function(i) {
          
          $http
            .post(''+url+'/sort/getsort', {
                token: sessionStorage.token, type: 1 
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                else{ 
                    $rootScope.courseClass = response.data.data;
                    judgeClassName();
                    nowClassName(i);
                    if(sessionStorage.sname == "undefined" || sessionStorage.sname == undefined) { 
                        $('.course').eq(0).addClass('coureColor');
                    }else {
                        $('.course').removeClass('coureColor');
                        $scope.activeSname = sessionStorage.sname;
                    }
                }
            }, function(x) { alert('啊噢~，服务器开小差了！'); });
      }

      getCourseClass();
      
      nowClassName = (function(i) { // 当前的 的分类改变颜色 
          if(i) {
            $('.course').removeClass('coureColor');
            $('.course').eq(i).addClass('coureColor');
          }else {
            $('.course').removeClass('coureColor');
            $('.course').eq(0).addClass('coureColor');
          }
      });
      
      //nowClassName();
      
      $scope.showCourse = function(sortid, sname, i) { // 展示 现在所在的 分类
          
          sessionStorage.setItem('sname', sname);
          sessionStorage.setItem('sortid', sortid);
          // $('.class-name').html(sname);
          getCourseData(sortid);
          nowClassName(i+1);
          judgeClassName();
      }
      
      var judgeClassName = function() { // 判断当前 是否在全部课程下
          if(sessionStorage.sname == "undefined" || sessionStorage.sname == undefined) {
              $('.rdClassNameBtn').css({'display':'none'});
          }else {
              $('.rdClassNameBtn').css({'display':'inline-block'});
          }
      };
      
      judgeClassName();
      
      $scope.addCourseClass = function() {
          $('.addCourseClassInput').css({'display':'inline-block'});
          $('.addCourseClassInput').focus();
      }
      
      $('.addCourseClassInput').change(function() { // 添加分类
          if($(this).val()) {
              var newClassName = $(this).val();
              
              $http
                .post(''+url+'/sort/add', {
                    token: sessionStorage.token, sname: newClassName, parent_id: 1, type: 1, row: 0
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        $('.addCourseClassInput').val("");
                        getCourseClass();
                        $('.addCourseClassInput').css({'display':'none'});
                    }
                }, function(x) { 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }
      })
      
      $('.addCourseClassInput').blur(function() {
          $(this).css({'display':'none'});
      })
      
      
}]);


/**=========================================================
 * courseMngtController
 * author: BGOnline
 * version 1.0 2016-3-18
 =========================================================*/
 
App.controller('courseMngtController', ['$scope', '$rootScope', '$http', '$filter', '$state','ngDialog',
  function($scope, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      getCourseData = function(sortid, cp) { // 获取课程
        
          cp ? $scope.currentPage = cp + 1 : $scope.currentPage = 1;
          
          listLoading.css({'display':'block'});
          $scope.sname = sessionStorage.sname;
          $http
            .post(''+url+'/course/index', {
                token: sessionStorage.token, p: cp, sortid: sortid, order: sessionStorage.order_num
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.course = response.data.data.mod_data; 
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getCourseData(sessionStorage.sortid);
      
      $scope.getZHCourse = function() {
          $state.go('app.ZHCourse');
      }
      
      $scope.pageChanged = function() {
          getCourseData(sessionStorage.sortid, $scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页
      
      $scope.showCDetails = function(tcourse_name, tcourseid, sname) {
          sessionStorage.setItem('tcourse_name', tcourse_name);
          sessionStorage.setItem('tcourseid', tcourseid);
          sessionStorage.setItem('sname', sname);
      }
      
      $scope.showCourseAct = (function(i) {
          $('.courseAction').eq(i).css({'visibility':'visible'});
      })
      
      
      $scope.closeCourseAct = (function(i) {
          if(!($('.ccb-bg').eq(i).is(':checked'))) {
            $('.courseAction').eq(i).css({'visibility':'hidden'});
          }
      })
      
      $scope.rClassName = function() {
          $('.class-name').html("<input class='form-control ng-touched rcName' type='text' value='"+sessionStorage.sname+"'>");
          $('.rcName').focus();
      }
      
      if(sessionStorage.radioIndex == '0') {
          $('.packageRadio').eq(0).addClass('label-warning');
      }else if(sessionStorage.radioIndex == '1') {
          $('.packageRadio').eq(1).addClass('label-warning');
      }else {
          $('.packageRadio').eq(0).addClass('label-warning');
      }
      $scope.selectpRadio = function(_index, oNum) { // 按条件排序
        sessionStorage.setItem('radioIndex', _index);
        $('.packageRadio').removeClass('label-warning');
        $('.packageRadio').eq(_index).addClass('label-warning');
        sessionStorage.setItem('order_num', oNum);
        getCourseData(sessionStorage.sortid);
      }

      $(document).on('blur', '.rcName', function() { // 修改分类名称
          var changeSname = $(this).val();
          $http
            .post(''+url+'/sort/edit', {
                token: sessionStorage.token, sortid: sessionStorage.sortid, sname: changeSname
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    $('.class-name').html(changeSname);
                    sessionStorage.setItem('sname', changeSname); 
                    getCourseClass();
                }
                ngDialog.close();
            }, function(x) { 
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
                ngDialog.close();
            });
      })
      
      
      var courseArr = new Array();
      $scope.goStartClass = function(sortid, sname) { // 移动课程
          sessionStorage.setItem('sname', sname);
          courseArr = [];
          var ccbBg =  $('.ccb-bg');
          for(var i = 0; i < $scope.showTotalItems; i++) {
              if(ccbBg.eq(i).is(':checked')) {
                courseArr.push(ccbBg.eq(i).attr('name'));
              }
          }
          
          if(courseArr.length > 0) {
              listLoading.css({'display':'block'});
              $http
                .post(''+url+'/course/move_course', {
                    token: sessionStorage.token, sortid: sortid, courseid: courseArr.join(",")
                })
                .then(function(response) {
                    listLoading.css({'display':'none'});
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        getCourseData(sortid);
                        getCourseClass();
                        $('.class-name').html(sname);
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        ngDialog.close();
                    }
                }, function(x) { 
                    listLoading.css({'display':'none'});
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }else {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>未选择课程！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }
          
      }
      
      $scope.dClassName = function() { // 删除分类
          if($scope.showTotalItems <= 0) {
              if(confirm("确定要删除分类吗？")) {
                  listLoading.css({'display':'block'});
                  $http
                    .post(''+url+'/sort/del', {
                        token: sessionStorage.token, sortid: sessionStorage.sortid
                    })
                    .then(function(response) {
                        listLoading.css({'display':'none'});
                        if ( response.data.code != 200 ) {
                            requestError(response, $state, ngDialog);
                            $('.rdClassNameBtn').removeClass('open');
                        }
                        else{ 
                            sessionStorage.setItem('sortid', 0);
                            sessionStorage.setItem('sname', undefined);
                            $('.class-name').html('全部课程');
                            getCourseData();
                            getCourseClass();
                            $('.rdClassNameBtn').removeClass('open');
                            ngDialog.close();
                        }
                    }, function(x) { 
                        listLoading.css({'display':'none'});
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        $('.rdClassNameBtn').removeClass('open');
                        ngDialog.close();
                    });
              }
          }else {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>分类下存在课程不允许删除！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }
      }
      
      
      $scope.removeCourse = function(i) { // 删除课程
          if(confirm("确定要删除课程吗？")) {
              listLoading.css({'display':'block'});
              var tcourseid = $('.ccb-bg').eq(i).attr('name');
              $http
                .post(''+url+'/course/del', {
                    token: sessionStorage.token, courseid: tcourseid
                })
                .then(function(response) {
                    listLoading.css({'display':'none'});
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        getCourseData(sessionStorage.sortid, $scope.currentPage - 1);
                    }
                }, function(x) { 
                    listLoading.css({'display':'none'});
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }
      }
      
      $scope.addCourseType = function() {
          if($rootScope.courseClass == undefined) {
              alert('无可用分类，请先添加分类！');
          }else {
              sessionStorage.setItem('actionCourseType', 1); 
              $state.go("app.addCustomCourse");
          }
      }
      
      // clearInterval(noF5Timer);
      // timeoutLock($state);
      
}]);

/**=========================================================
 * noticeMngtController
 * author: BGOnline
 * version 1.0 2016-3-18
 =========================================================*/
 
App.controller('noticeMngtController', ['$scope', '$rootScope', '$http', '$filter', '$state','ngDialog',
  function($scope, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      
      getNoticeData = function(sortid, cp) { // 获取文章
        
          cp ? $scope.currentPage = cp + 1 : $scope.currentPage = 1;
          
          listLoading.css({'display':'block'});
          $scope.sname = sessionStorage.sname;
          $http
            .post(''+url+'/faq/index', {
                token: sessionStorage.token, p: cp, sortid: sortid
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.course = response.data.data.mod_data; 
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getNoticeData(sessionStorage.sortid);
      
      $scope.pageChanged = function() {
          getNoticeData(sessionStorage.sortid, $scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页
      
      $scope.showCDetails = function(tcourse_name, tcourseid, sname) {
          sessionStorage.setItem('tcourse_name', tcourse_name);
          sessionStorage.setItem('tcourseid', tcourseid);
          sessionStorage.setItem('sname', sname);
      }
      
      $scope.showCourseAct = (function(i) {
          $('.courseAction').eq(i).css({'visibility':'visible'});
      })
      
      
      $scope.closeCourseAct = (function(i) {
          if(!($('.ccb-bg').eq(i).is(':checked'))) {
            $('.courseAction').eq(i).css({'visibility':'hidden'});
          }
      })
      
      // $scope.rClassName = function() {
      //     $('.class-name').html("<input class='form-control ng-touched rcName' type='text' value='"+sessionStorage.sname+"'>");
      //     $('.rcName').focus();
      // }
      
      // $(document).on('blur', '.rcName', function() { // 修改分类名称
      //     var changeSname = $(this).val();
      //     $http
      //       .post(''+url+'/sort/edit', {
      //           token: sessionStorage.token, sortid: sessionStorage.sortid, sname: changeSname
      //       })
      //       .then(function(response) {
      //           if ( response.data.code != 200 ) {
      //               requestError(response, $state, ngDialog);
      //           }
      //           else{ 
      //               ngDialog.open({
      //                 template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
      //                 plain: true,
      //                 className: 'ngdialog-theme-default'
      //               });
      //               $('.class-name').html(changeSname);
      //               sessionStorage.setItem('sname', changeSname); 
      //               getCourseClass();
      //           }
      //           ngDialog.close();
      //       }, function(x) { 
      //           ngDialog.open({
      //             template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
      //             plain: true,
      //             className: 'ngdialog-theme-default'
      //           });
      //           ngDialog.close();
      //       });
      // })
      
      
      // var courseArr = new Array();
      // $scope.goStartClass = function(sortid, sname) { // 移动课程
      //     sessionStorage.setItem('sname', sname);
      //     courseArr = [];
      //     var ccbBg =  $('.ccb-bg');
      //     for(var i = 0; i < $scope.showTotalItems; i++) {
      //         if(ccbBg.eq(i).is(':checked')) {
      //           courseArr.push(ccbBg.eq(i).attr('name'));
      //         }
      //     }
          
      //     if(courseArr.length > 0) {
      //         listLoading.css({'display':'block'});
      //         $http
      //           .post(''+url+'/course/move_course', {
      //               token: sessionStorage.token, sortid: sortid, courseid: courseArr.join(",")
      //           })
      //           .then(function(response) {
      //               listLoading.css({'display':'none'});
      //               if ( response.data.code != 200 ) {
      //                   requestError(response, $state, ngDialog);
      //               }
      //               else{ 
      //                   getNoticeData(sortid);
      //                   getCourseClass();
      //                   $('.class-name').html(sname);
      //                   ngDialog.open({
      //                     template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
      //                     plain: true,
      //                     className: 'ngdialog-theme-default'
      //                   });
      //                   ngDialog.close();
      //               }
      //           }, function(x) { 
      //               listLoading.css({'display':'none'});
      //               ngDialog.open({
      //                 template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
      //                 plain: true,
      //                 className: 'ngdialog-theme-default'
      //               });
      //               ngDialog.close();
      //           });
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>未选择课程！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //         ngDialog.close();
      //     }
          
      // }
      
      // $scope.dClassName = function() { // 删除分类
      //     if($scope.showTotalItems <= 0) {
      //         if(confirm("确定要删除分类吗？")) {
      //             listLoading.css({'display':'block'});
      //             $http
      //               .post(''+url+'/sort/del', {
      //                   token: sessionStorage.token, sortid: sessionStorage.sortid
      //               })
      //               .then(function(response) {
      //                   listLoading.css({'display':'none'});
      //                   if ( response.data.code != 200 ) {
      //                       requestError(response, $state, ngDialog);
      //                       $('.rdClassNameBtn').removeClass('open');
      //                   }
      //                   else{ 
      //                       sessionStorage.setItem('sortid', 0);
      //                       sessionStorage.setItem('sname', undefined);
      //                       $('.class-name').html('全部课程');
      //                       getCourseData();
      //                       getCourseClass();
      //                       $('.rdClassNameBtn').removeClass('open');
      //                       ngDialog.close();
      //                   }
      //               }, function(x) { 
      //                   listLoading.css({'display':'none'});
      //                   ngDialog.open({
      //                     template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
      //                     plain: true,
      //                     className: 'ngdialog-theme-default'
      //                   });
      //                   $('.rdClassNameBtn').removeClass('open');
      //                   ngDialog.close();
      //               });
      //         }
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>分类下存在课程不允许删除！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //         ngDialog.close();
      //     }
      // }
      
      
      $scope.removeCourse = function(i) { // 删除文章
          if(confirm("确定要删除文章吗？")) {
              listLoading.css({'display':'block'});
              var tcourseid = $('.courseAction').attr('name');
              $http
                .post(''+url+'/faq/del', {
                    token: sessionStorage.token, faq_id: tcourseid
                })
                .then(function(response) {
                    listLoading.css({'display':'none'});
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        getNoticeData(sessionStorage.sortid, $scope.currentPage - 1);
                    }
                }, function(x) { 
                    listLoading.css({'display':'none'});
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }
      }
      
      $scope.addCourseType = function() {
          sessionStorage.setItem('actionCourseType', 1); 
          $state.go("app.addNotice");
      }
      
      // clearInterval(noF5Timer);
      // timeoutLock($state);
}]);



/**=========================================================
 * noticeClassController
 * author: BGOnline
 * version 1.0 2016-7-24
 =========================================================*/
 
App.controller('noticeClassController', ['$scope', 'ngDialog', '$rootScope', '$http', '$filter', '$state',
  function($scope, ngDialog, $rootScope, $http, $filter, $state) {
      
      getNoticeClass = function(i) {
          
          $http
            .post(''+url+'/public/getsort', {
                token: sessionStorage.token, type: 3 
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                else{ 
                    $rootScope.courseClass = response.data.data;
                    judgeClassName();
                    nowClassName(i);
                    if(sessionStorage.sname == "undefined" || sessionStorage.sname == undefined) { 
                        $('.course').eq(0).addClass('coureColor');
                    }else {
                        $('.course').removeClass('coureColor');
                        $scope.activeSname = sessionStorage.sname;
                    }
                }
            }, function(x) { alert('啊噢~，服务器开小差了！'); });
      }

      getNoticeClass();
      
      nowClassName = (function(i) { // 当前的 的分类改变颜色 
          if(i) {
            $('.course').removeClass('coureColor');
            $('.course').eq(i).addClass('coureColor');
          }else {
            $('.course').removeClass('coureColor');
            $('.course').eq(0).addClass('coureColor');
          }
      });
      
      //nowClassName();
      
      $scope.showCourse = function(sortid, sname, i) { // 展示 现在所在的 分类
          
          sessionStorage.setItem('sname', sname);
          sessionStorage.setItem('sortid', sortid);
          // $('.class-name').html(sname);
          getNoticeData(sortid);
          
          nowClassName(i+1)
          
          judgeClassName();
      }
      
      var judgeClassName = function() { // 判断当前 是否在全部课程下
          if(sessionStorage.sname == "undefined" || sessionStorage.sname == undefined) {
              $('.rdClassNameBtn').css({'display':'none'});
          }else {
              $('.rdClassNameBtn').css({'display':'inline-block'});
          }
      };
      
      judgeClassName();
      
      $scope.addCourseClass = function() {
          $('.addCourseClassInput').css({'display':'inline-block'});
          $('.addCourseClassInput').focus();
      }
      
      // $('.addCourseClassInput').change(function() { // 添加分类
      //     if($(this).val()) {
      //         var newClassName = $(this).val();
              
      //         $http
      //           .post(''+url+'/sort/add', {
      //               token: sessionStorage.token, sname: newClassName, parent_id: 1, type: 1, row: 0
      //           })
      //           .then(function(response) {
      //               if ( response.data.code != 200 ) {
      //                   requestError(response, $state, ngDialog);
      //               }
      //               else{ 
      //                   $('.addCourseClassInput').val("");
      //                   getCourseClass();
      //                   $('.addCourseClassInput').css({'display':'none'});
      //               }
      //           }, function(x) { 
      //               ngDialog.open({
      //                 template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
      //                 plain: true,
      //                 className: 'ngdialog-theme-default'
      //               });
      //               ngDialog.close();
      //           });
      //     }
      // })
      
      // $('.addCourseClassInput').blur(function() {
      //     $(this).css({'display':'none'});
      // })
      
      
}]);



/**=========================================================
 * ZHcourseClassController
 * author: BGOnline
 * version 1.0 2016-4-26
 =========================================================*/
 
App.controller('ZHcourseClassController', ['$scope', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $rootScope, $http, $filter, $state, ngDialog) {

      getCourseClass = function(i) {
          
          $http
            .post(''+url+'/public/getsort', {
                token: sessionStorage.token, type: 1
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                else{ 
                    $rootScope.courseClass = response.data.data;
                    nowClassName(i);
                    if(sessionStorage.ZHsname == "undefined" || sessionStorage.ZHsname == undefined) { 
                        $('.course').eq(0).addClass('coureColor');
                    }else {
                        $('.course').removeClass('coureColor');
                        $scope.activeSname = sessionStorage.ZHsname;
                    }
                }
            }, function(x) { alert('啊噢~，服务器开小差了！'); });
      }

      getCourseClass();

      nowClassName = (function(i) { // 当前的 的分类改变颜色 
          if(i) {
            $('.course').removeClass('coureColor');
            $('.course').eq(i).addClass('coureColor');
          }else {
            $('.course').removeClass('coureColor');
            $('.course').eq(0).addClass('coureColor');
          }
      });
      
      
      //nowClassName();
      
      $scope.showCourse = function(sortid, sname, i) { // 展示 现在所在的 分类
          
          sessionStorage.setItem('ZHsname', sname);
          sessionStorage.setItem('ZHsortid', sortid);
          getZHCourseData(sortid);
          
          nowClassName(i+1);
          
          judgeClassName();
      }
      
      var judgeClassName = function() { // 判断当前 是否在全部课程下
          if(sessionStorage.ZHsname == "undefined" || sessionStorage.ZHsname == undefined) {
              $('.rdClassNameBtn').css({'display':'none'});
          }else {
              $('.rdClassNameBtn').css({'display':'inline-block'});
          }
      };
      
      judgeClassName();

      // noRefreshGetData(getCourseClass, getDataSpeed);
}]);


/**=========================================================
 * ZHCourseController
 * author: BGOnline
 * version 1.0 2016-3-18
 =========================================================*/
 
App.controller('ZHCourseController', ['$scope', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);

      getZHCourseData = function(sortid, cp) { // 获取课程
        
          cp ? $scope.currentPage = cp + 1 : $scope.currentPage = 1;

          $scope.ZHsname = sessionStorage.ZHsname;
          $http
            .post(''+url+'/course/gettcourse', {
                token: sessionStorage.token, p: cp, sortid: sortid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.ZHCourse = response.data.data.mod_data; 
                    var page = response.data.data.page_data;
                    $scope.showZHtotalItems = page.totalCount;
                    $scope.ZHtotalItems = page.totalCount - parseInt(page.totalCount/11);
                }
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
            });
      };
      
      getZHCourseData(sessionStorage.ZHsortid);
      //getCourseData(sessionStorage.delClassNameLastSortid);
      
      $scope.pageChanged = function() {
          getZHCourseData(sessionStorage.ZHsortid, $scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页
      
      $scope.showZHCDetails = function(tcourse_name, tcourseid, sname) {
          sessionStorage.setItem('tcourse_name', tcourse_name);
          sessionStorage.setItem('tcourseid', tcourseid);
          sessionStorage.setItem('ZHsname', sname);
      }
      
      $scope.showCourseAct = (function(i) {
          $('.courseAction').eq(i).css({'visibility':'visible'});
      })
      
      
      $scope.closeCourseAct = (function(i) {
          if(!($('.ccb-bg').eq(i).is(':checked'))) {
            $('.courseAction').eq(i).css({'visibility':'hidden'});
          }
      })

      var ZHCourseArr = new Array();
      $scope.addZHCourse = function() { // 添加总部课程
          $('.btn').addClass('disabled');
          ZHCourseArr = [];
          var ccbBg =  $('.ccb-bg');
          for(var i = 0; i < $scope.showZHtotalItems; i++) {
              if(ccbBg.eq(i).is(':checked')) {
                ZHCourseArr.push(ccbBg.eq(i).attr('name'));
              }
          }
          if(ZHCourseArr.length > 0) {
              $http
                .post(''+url+'/course/add_tcourse', {
                    token: sessionStorage.token, tcourseid: ZHCourseArr.join(",")
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }else{ 
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        $state.go('app.courseMngt');
                    }
                    $('.btn').removeClass('disabled');
                }, function(x) { alert('啊噢~，服务器开小差了！'); });
          }else {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>未选择课程！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              $('.btn').removeClass('disabled');
          }
          
      }

      //timeoutLock($state);

      // noRefreshGetData(getZHCourseData, getDataSpeed);
}]);


/**=========================================================
 * ZHCourseDetailsController
 * author: BGOnline
 * version 1.0 2016-4-28
 =========================================================*/
 
App.controller('ZHCourseDetailsController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);

      var listLoading = $('.list-loading');
      $scope.tcourse_name = sessionStorage.tcourse_name;
      $scope.ZHsname = sessionStorage.ZHsname;
      
      var getZHCourseDetailsData = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/course/get_one_tcourse', {
                token: sessionStorage.token, tcourseid: sessionStorage.tcourseid
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.courseDetailsData = response.data.data; 
                    $scope.summary = $scope.courseDetailsData.summary;
                    $scope.content = $sce.trustAsHtml($scope.courseDetailsData.content);
                    $scope.packages = $scope.courseDetailsData.packages;
                    $scope.tcourse_img = rootUrl + $scope.courseDetailsData.tcourse_img;
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
            });
      };
      
      getZHCourseDetailsData();
      // noRefreshGetData(getZHCourseDetailsData, getDataSpeed); 
      //timeoutLock($state);
}]);



/**=========================================================
 * courseDetailsController
 * author: BGOnline
 * version 1.0 2016-3-18
 =========================================================*/
 
App.controller('courseDetailsController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      $scope.tcourse_name = sessionStorage.tcourse_name;
      $scope.sname = sessionStorage.sname;
      
      getCourseDetailsData = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/course/getcourse', {
                token: sessionStorage.token, courseid: sessionStorage.tcourseid
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else { 
                    $scope.courseDetailsData = response.data.data; 
                    $scope.summary = $scope.courseDetailsData.summary;
                    $scope.content = $sce.trustAsHtml($scope.courseDetailsData.content);
                    $scope.tcourse_img = rootUrl + $scope.courseDetailsData.course_img;
                    $rootScope.packages = $scope.courseDetailsData.packages;
                    $scope.WaitAllotStudent = $scope.courseDetailsData.WaitAllotStudent;
                    $scope.graduate = $scope.courseDetailsData.graduate;
                    sessionStorage.setItem('sortid', $scope.courseDetailsData.sortid);
                    $scope.courseDetailsData.class.length > 0 ? $scope.CNullType = 'isNullTypeHidden' : $scope.CNullType = 'isNullTypeShow';
                    $scope.graduate.length > 0 ? $scope.GNullType = 'isNullTypeHidden' : $scope.GNullType = 'isNullTypeShow';
                    $scope.WaitAllotStudent.length > 0 ? $scope.WNullType = 'isNullTypeHidden' : $scope.WNullType = 'isNullTypeShow';
                }
                ngDialog.close();
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
            });
      };

      getCourseDetailsData();
      
      $scope.goEditCourse = function(actionCourseType) {
          $state.go('app.addCustomCourse');  
          sessionStorage.setItem('actionCourseType', actionCourseType);
      }
      
      $scope.goAddBanji = function(editOrAdd, classid) {
          sessionStorage.setItem('editOrAdd', editOrAdd);
          sessionStorage.setItem('classid', classid);
          $state.go('app.addBanji');  
      }
      
      $scope.goClassStudent = function(classid, editOrAdd) {
          sessionStorage.setItem('classid', classid);
          sessionStorage.setItem('editOrAdd', editOrAdd);
          $state.go('app.classStudent');
      }

      $scope.removeBanji = (function(classid) { // 删除班级
          $http
            .post(''+url+'/courseclass/del', {
                token: sessionStorage.token, classid: classid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    getCourseDetailsData();
                }
                ngDialog.close();
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
                ngDialog.close();
            });
      })
      
      
      $scope.placementStudent = function(classid, allotid) { // 分配班级
          $('.btn').addClass('disabled');
          $('.fenbanUl').css({'display':'none'});
          $http
            .post(''+url+'/courseclass/allot', {
                token: sessionStorage.token, classid: classid, allotid: allotid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    getCourseDetailsData();
                }
                ngDialog.close();
                $('.btn').removeClass('disabled');
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
                ngDialog.close();
                $('.btn').removeClass('disabled');
            });
      }

      $scope.isClass = function(classNum) { // 分班时判断是否存在班级
          if(!classNum) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>请先添加班级！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }
      }
      

      $scope.sexs = [
          {value: 0, text: '保密'},
          {value: 1, text: '男'},
          {value: 2, text: '女'}
      ];
      
      $scope.showSex = function(x) {
          if(x.sex) {
              selected = $filter('filter')($scope.sexs, {value: x.sex});
          }
          return selected.length ? selected[0].text : 'Not set';
      };


      $scope.lineOrder = function() {
          ngDialog.open({
                template: "<p style='text-align:center;font-size:16px;color:#555;padding:10px;border-bottom:1px solid #EEE;'>"+
                          "<span style='float:left;margin-left: 10px;'>录入线下订单</span>"+
                          "<span style='color:#ccc;font-size:12px;'>订单一经录入，不可修改或删除，请谨慎添加！</span>"+
                          "</p>"+
                          "<div style='padding:10px 20px;width:100%;' class='clearfix'>"+
                              "<div class='input-group' style='width: 250px;'>"+
                                  "<input type='text' placeholder='请输入完整的家长手机号' class='input-sm form-control userPhone'/>"+
                                  "<span class='input-group-btn'>"+
                                      "<button type='button' class='btn btn-sm btn-info' style='margin-left: 10px;' ng-click='searchUserInfoData()'>搜索</button>"+
                                  "</span>"+
                              "</div>"+
                              "<p style='margin:20px 0;'>"+
                                  "<span>家长：{{userInfoData[0].tname?userInfoData[0].tname:'无'}}</span>"+
                                  "<span style='margin-left:15px;'>电话：{{userInfoData[0].phone?userInfoData[0].phone:'无'}}</span>"+
                              "</p>"+
                              "<div class='selectTeacher' style='border:none;padding:0;margin:15px 0;'>"+
                                  "<div class='teacherList' style='border-color:#eee;border-left:none;border-right:none;border-bottom:none;'>"+
                                      "<ul>"+
                                          "<li ng-repeat='x in userInfoData[0].student' ng-click='sTeacher($index)' name={{x.studentid}}>"+
                                              "<img ng-src='{{x.header}}' alt='Image' class='img-responsive img-circle'>"+
                                              "<span ng-bind='x.tname'></span>"+
                                              "<i class='fa fa-check'></i>"+
                                          "</li>"+
                                      "</ul>"+
                                  "</div>"+
                              "</div>"+
                              "<p style='margin:10px 0;'><span>选择套餐</span></p>"+  
                              "<p style='margin:10px 0;'>"+
                                "<div class='label label-default packageRadio' ng-repeat='p in packages' ng-click='selectpRadio($index, x.packageid)' style='padding:6px;margin-right:5px;cursor:pointer;'>{{p.package_name}}/{{p.package_price}}</div>"+
                              "</p>"+ 
                              "<p style='margin:10px 0;'><span>数量</span></p>"+   
                              "<i class='fa fa-plus-square-o fa-2x' style='color: #DDE6E9;' ng-click='increaseQ()'></i>"+
                              "<input type='text' class='form-control' disabled ng-model='quantityVal' ng-change='setQuantityVal()' style='width: 50px;display: inline-block;padding: 0px 8px;vertical-align: bottom;'>"+
                              "<i class='fa fa-minus-square-o fa-2x' style='color: #DDE6E9;' ng-click='reduceQ()'></i>" +
                              '<button type="button" class="mb-sm btn btn-info" ng-click="addLineOrder(\''+1 +'\')" style="float:right;margin-top:30px;">确认录入</button>'+
                          "</div>",
                plain: true,
                className: 'ngdialog-theme-default',
                controller: 'lineOrderController'
              });
      }
      
}]);


/**=========================================================
 * noticeDetailsController
 * author: BGOnline
 * version 1.0 2016-7-25
 =========================================================*/
 
App.controller('noticeDetailsController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      $scope.tcourse_name = sessionStorage.tcourse_name;
      $scope.sname = sessionStorage.sname;
      
      var getNoticeDetailsData = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/faq/getfaq', {
                token: sessionStorage.token, faq_id: sessionStorage.tcourseid
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.courseDetailsData = response.data.data; 
                    $scope.summary = $scope.courseDetailsData.summary;
                    $scope.content = $sce.trustAsHtml($scope.courseDetailsData.content);
                    $scope.tcourse_img = rootUrl + $scope.courseDetailsData.img;
                    sessionStorage.setItem('sortid', $scope.courseDetailsData.sortid);
                }
                ngDialog.close();
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
            });
      };

      getNoticeDetailsData();
      
      $scope.goEditCourse = function(actionCourseType) {
          $state.go('app.addNotice');  
          sessionStorage.setItem('actionCourseType', actionCourseType);
      }
      
      // $scope.goAddBanji = function(editOrAdd, classid) {
      //     sessionStorage.setItem('editOrAdd', editOrAdd);
      //     sessionStorage.setItem('classid', classid);
      //     $state.go('app.addBanji');  
      // }
      
      // $scope.goClassStudent = function(classid, editOrAdd) {
      //     sessionStorage.setItem('classid', classid);
      //     sessionStorage.setItem('editOrAdd', editOrAdd);
      //     $state.go('app.classStudent');
      // }

      // $scope.removeBanji = (function(classid) { // 删除班级
      //     $http
      //       .post(''+url+'/courseclass/del', {
      //           token: sessionStorage.token, classid: classid
      //       })
      //       .then(function(response) {
      //           if ( response.data.code != 200 ) {
      //               requestError(response, $state, ngDialog);
      //           }
      //           else{ 
      //               ngDialog.open({
      //                 template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
      //                 plain: true,
      //                 className: 'ngdialog-theme-default'
      //               });
      //               getNoticeDetailsData();
      //           }
      //           ngDialog.close();
      //       }, function(x) {
      //           ngDialog.open({
      //             template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
      //             plain: true,
      //             className: 'ngdialog-theme-default'
      //           });
      //           ngDialog.close();
      //       });
      // })
      
      
      // $scope.placementStudent = function(classid, allotid) { // 分配班级
      //     $('.btn').addClass('disabled');
      //     $('.fenbanUl').css({'display':'none'});
      //     $http
      //       .post(''+url+'/courseclass/allot', {
      //           token: sessionStorage.token, classid: classid, allotid: allotid
      //       })
      //       .then(function(response) {
      //           if ( response.data.code != 200 ) {
      //               requestError(response, $state, ngDialog);
      //           }
      //           else{ 
      //               ngDialog.open({
      //                 template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
      //                 plain: true,
      //                 className: 'ngdialog-theme-default'
      //               });
      //               getNoticeDetailsData();
      //           }
      //           ngDialog.close();
      //           $('.btn').removeClass('disabled');
      //       }, function(x) {
      //           ngDialog.open({
      //             template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
      //             plain: true,
      //             className: 'ngdialog-theme-default'
      //           });
      //           ngDialog.close();
      //           $('.btn').removeClass('disabled');
      //       });
      // }

      // $scope.isClass = function(classNum) { // 分班时判断是否存在班级
      //     if(!classNum) {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>请先添加班级！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //         ngDialog.close();
      //     }
      // }
      

      // $scope.sexs = [
      //     {value: 0, text: '保密'},
      //     {value: 1, text: '男'},
      //     {value: 2, text: '女'}
      // ];
      
      // $scope.showSex = function(x) {
      //     if(x.sex) {
      //         selected = $filter('filter')($scope.sexs, {value: x.sex});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };


      // $scope.lineOrder = function() {
      //     ngDialog.open({
      //           template: "<p style='text-align:center;font-size:16px;color:#555;padding:10px;border-bottom:1px solid #EEE;'>"+
      //                     "<span style='float:left;margin-left: 10px;'>录入线下订单</span>"+
      //                     "<span style='color:#ccc;font-size:12px;'>订单一经录入，不可修改或删除，请谨慎添加！</span>"+
      //                     "</p>"+
      //                     "<div style='padding:10px 20px;width:100%;' class='clearfix'>"+
      //                         "<div class='input-group' style='width: 250px;'>"+
      //                             "<input type='text' placeholder='请输入完整的家长手机号' class='input-sm form-control userPhone'/>"+
      //                             "<span class='input-group-btn'>"+
      //                                 "<button type='button' class='btn btn-sm btn-info' style='margin-left: 10px;' ng-click='searchUserInfoData()'>搜索</button>"+
      //                             "</span>"+
      //                         "</div>"+
      //                         "<p style='margin:20px 0;'>"+
      //                             "<span>家长：{{userInfoData[0].tname?userInfoData[0].tname:'无'}}</span>"+
      //                             "<span style='margin-left:15px;'>电话：{{userInfoData[0].phone?userInfoData[0].phone:'无'}}</span>"+
      //                         "</p>"+
      //                         "<div class='selectTeacher' style='border:none;padding:0;margin:15px 0;'>"+
      //                             "<div class='teacherList' style='border-color:#eee;border-left:none;border-right:none;border-bottom:none;'>"+
      //                                 "<ul>"+
      //                                     "<li ng-repeat='x in userInfoData[0].student' ng-click='sTeacher($index)' name={{x.studentid}}>"+
      //                                         "<img ng-src='{{x.header}}' alt='Image' class='img-responsive img-circle'>"+
      //                                         "<span ng-bind='x.tname'></span>"+
      //                                         "<i class='fa fa-check'></i>"+
      //                                     "</li>"+
      //                                 "</ul>"+
      //                             "</div>"+
      //                         "</div>"+
      //                         "<p style='margin:10px 0;'><span>选择套餐</span></p>"+  
      //                         "<p style='margin:10px 0;'>"+
      //                           "<div class='label label-default packageRadio' ng-repeat='p in packages' ng-click='selectpRadio($index, x.packageid)' style='padding:6px;margin-right:5px;cursor:pointer;'>{{p.package_name}}/{{p.package_price}}</div>"+
      //                         "</p>"+ 
      //                         "<p style='margin:10px 0;'><span>数量</span></p>"+   
      //                         "<i class='fa fa-plus-square-o fa-2x' style='color: #DDE6E9;' ng-click='increaseQ()'></i>"+
      //                         "<input type='text' class='form-control' disabled ng-model='quantityVal' ng-change='setQuantityVal()' style='width: 50px;display: inline-block;padding: 0px 8px;vertical-align: bottom;'>"+
      //                         "<i class='fa fa-minus-square-o fa-2x' style='color: #DDE6E9;' ng-click='reduceQ()'></i>" +
      //                         '<button type="button" class="mb-sm btn btn-info" ng-click="addLineOrder(\''+1 +'\')" style="float:right;margin-top:30px;">确认录入</button>'+
      //                     "</div>",
      //           plain: true,
      //           className: 'ngdialog-theme-default',
      //           controller: 'lineOrderController'
      //         });
      // }
      
}]);

/**=========================================================
 * lineOrderController
 * author: BGOnline
 * version 1.0 2016-7-22
 =========================================================*/
 
App.controller('lineOrderController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      // var listLoading = $('.list-loading');
      $scope.quantityVal = 1;
      $scope.packageid = '';
      
      $scope.$watch('quantityVal', function() {
        if($scope.quantityVal < 1) {
            $scope.quantityVal = 1;
        }
      })
      
      $scope.increaseQ = function() {
        $scope.quantityVal++;
      }

      $scope.reduceQ = function() {
        $scope.quantityVal--;
      }
      
      
      $scope.selectpRadio = function(_index, pid) {
        $('.packageRadio').removeClass('label-warning');
        $('.packageRadio').eq(_index).addClass('label-warning');
        $scope.packageid = pid;
      }

      $scope.searchUserInfoData = function() {
          // listLoading.css({'display':'block'});
          var userPhone = $('.userPhone').val();
          $http
            .post(''+url+'/user/index', {
                token: sessionStorage.token, 
                search: userPhone, 
            })
            .then(function(response) {
                // listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.userInfoData = '';
                    response.data.data.mod_data > 0 ? $scope.ONullType = 'isNullTypeHidden' : $scope.ONullType = 'isNullTypeShow';
                    if(response.data.data.mod_data.length > 1) {
                        alert('手机号输入错误！');
                    }else if(response.data.data.mod_data.length < 1){
                        alert('未查询到该用户！');
                    }else {
                        $scope.userInfoData = response.data.data.mod_data; 
                        if($scope.userInfoData[0].student.length < 1) {
                          alert('该家长未添加孩子，请前往用户中心添加后再试！');
                          ngDialog.close();
                        }else {
                          $('.packageRadio').eq(0).addClass('label-warning');
                        }
                    }
                }
            }, function(x) { 
              // listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      }

      $scope.sTeacher = function(i) { // 点击选择孩子
        if($('.teacherList > ul > li').eq(i).hasClass('bgSelected')) {
            $('.teacherList > ul > li').eq(i).removeClass('bgSelected');
        }else {
            $('.teacherList > ul > li').eq(i).addClass('bgSelected');
        }
      }

      $scope.addLineOrder = function() { // 录入线下订单
          var childArr = [];
          $('.bgSelected').each(function() { // 遍历选中的孩子
              childArr.push($(this).attr('name'));
          });
          if(childArr.length < 1) {
              alert('请至少选择1个孩子！');
          }else {
              $http
                .post(''+url+'/list/add_order', {
                    token: sessionStorage.token, 
                    packageid: $scope.packageid == '' ? $rootScope.packages[0].packageid : $scope.packageid,
                    studentid: childArr,
                    quantity: $scope.quantityVal,
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        getCourseOrder();
                        getCourseDetailsData();
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                    }
                    ngDialog.close();
                }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }

      }

      //timeoutLock($state);
}]);


/**=========================================================
 * payLogController
 * author: BGOnline
 * version 1.0 2016-3-18
 =========================================================*/
 
App.controller('payLogController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');

      getCourseOrder = function(s, cp, t) {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/list/course_order', {
                token: sessionStorage.token, 
                courseid: sessionStorage.tcourseid, 
                search: s, 
                p: cp,
                time: t
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.courseOrderData = response.data.data.mod_data; 
                    $scope.payTime = response.data.data.time_data;
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.courseOrderData.length > 0 ? $scope.ONullType = 'isNullTypeHidden' : $scope.ONullType = 'isNullTypeShow';
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      }

      getCourseOrder();
      
      $scope.showPayTime = function(t) {
          getCourseOrder('','',t);
      }
      
      $scope.coursePayTime = function(o) {
          if(o.pay_time) {
              return localData = new Date(parseInt(o.pay_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          }else {
              return '未支付';
          }
      }
      
      $scope.pageChanged = function() {
          getCourseOrder('', $scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页
      
      $scope.searchLog = function() {
          getCourseOrder($scope.sRLValue);
      }
      
      //timeoutLock($state);
}]);




/**=========================================================
 * addCustomCourseController
 * author: BGOnline
 * version 1.0 2016-4-14
 =========================================================*/
 
App.controller('addCustomCourseController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
    
      errorJump($state);
      var listLoading = $('.list-loading');
      parseInt(sessionStorage.sortid) ? $scope.isSortid = false : $scope.isSortid = true;
      
      var uploader = $scope.uploader = new FileUploader({
        url: ''+url+'/gd/upload'
      })

      uploader.onSuccessItem = function(response) {
        sessionStorage.setItem('uploadCourseImgUrl', jQuery.parseJSON(response._xhr.response).url);
        $scope.img = rootUrl + sessionStorage.uploadCourseImgUrl;
      };
      
      $scope.randomDate = (new Date()).getTime();
      var addTableRow = function() { // 添加一行
          var r = document.getElementById('comboTable').insertRow(2);
          r.setAttribute("class", "packageRow");
          var t1 = r.insertCell(0);
          var t2 = r.insertCell(1);
          var t3 = r.insertCell(2);
          var t4 = r.insertCell(3);
          t1.innerHTML="<input class='form-control ng-touched comboInput' type='text' maxlength='20'>";
          t2.innerHTML="<input class='form-control ng-touched comboInput' type='number'>";
          t3.innerHTML="<input class='form-control ng-touched comboInput' type='text' maxlength='60'>";
          t4.innerHTML="<button type='button' class='btn btn-sm btn-danger comboAction deleteRow'><em class='fa fa-trash-o'></em></button>";
      }
      
      $scope.addCombo = (function() { // 执行添加
          addTableRow();
      });
      
      // $(document).on('blur', '.comboInput', function() {
      //     if($(this).val() != "") {
      //         $(this).parent().html($(this).val());
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //     }
      // })

      $(document).on('click', '.deleteRow', function() {
          var length = $('.packageRow').length;
          if(length <= 1) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>至少需要一项套餐！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
          }else {
              $(this).parent().parent().remove()
          }
          
      })
      
      // $(document).on('click', '.editRow', function() {
      //     var comboInput = $('.comboInput');
      //     var oldValArr = new Array();
      //     if(comboInput.val() != "") {
      //         for(var i = 0; i < $(this).parent().siblings().length; i++) {
      //             oldValArr.push($(this).parent().siblings().eq(i).text());
      //             $(this).parent().siblings().eq(i).html("<input class='form-control ng-touched comboInput' type='text' value="+oldValArr[i]+">"); 
      //         }
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //     }

      // })
      
      $scope.addCourseSelectSort = function(selSort) {
          var selSortArr = selSort.split(',');
          sessionStorage.setItem('sortid', selSortArr[0]);
          sessionStorage.setItem('sname', selSortArr[1]);
      }
      
      $scope.sname = sessionStorage.sname;
      $scope.addCourse = {};
      
      switch(sessionStorage.actionCourseType) {
          
          case "1": // 添加
              ifrCon = undefined;
              $scope.addSubmit = function() {
                  var packageRow = $('.packageRow');
                  var comboInput = $('.comboInput');
                  
                  if(packageRow.length > 0) {
                      var comboArr = new Array();
                      var attributeName = ['package_name', 'package_price', 'package_content'];
                      for(var r = 0; r < packageRow.length; r++) {
                          var packages = {};
                          for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                              packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
                          }
                          comboArr.push(packages);
                      }

                      
                      var content = '<html>'+
                                      '<head>'+
                                          '<style>'+
                                              'img {'+
                                                  'width:100% !important;'+
                                              '}'+
                                          '</style>'+
                                      '</head>'+
                                      '<body>'+
                                          document.getElementById('iframepage').contentWindow.html +
                                      '</body>'+
                                    '</html>'
                      

                      listLoading.css({'display':'block'});
                      $http
                        .post(''+url+'/course/add', {
                              token: sessionStorage.token, 
                              course_name: $scope.addCourse.courseName, 
                              sortid: sessionStorage.sortid,
                              summary: $scope.addCourse.abstract,
                              content: content,
                              course_img: sessionStorage.uploadCourseImgUrl,
                              package: JSON.stringify(comboArr)
                        })
                        .then(function(response) {
                            listLoading.css({'display':'none'});
                            if ( response.data.code != 200 ) {
                                requestError(response, $state, ngDialog);
                            }
                            else{ 
                                ngDialog.open({
                                  template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                  plain: true,
                                  className: 'ngdialog-theme-default'
                                });
                                $state.go('app.courseMngt');
                                getCourseClass();
                            }
                            ngDialog.close();
                        }, function(x) { 
                            listLoading.css({'display':'none'});
                            ngDialog.open({
                              template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                              plain: true,
                              className: 'ngdialog-theme-default'
                            }); 
                            ngDialog.close();
                        });
                  }else {
                      ngDialog.open({
                        template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
                        plain: true,
                        className: 'ngdialog-theme-default'
                      });
                      ngDialog.close();
                  }
              };
            break;
          case "2": // 修改
              listLoading.css({'display':'block'});
              $http
                .post(''+url+'/course/getcourse', {
                    token: sessionStorage.token, courseid: sessionStorage.tcourseid
                })
                .then(function(response) {
                    listLoading.css({'display':'none'});
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        $scope.courseDetailsData = response.data.data;
                        $scope.addCourse.courseName = $scope.courseDetailsData.course_name;
                        $scope.addCourse.abstract = $scope.courseDetailsData.summary;
                        ifrCon = $scope.courseDetailsData.content;
                        $scope.addCourse.packages = $scope.courseDetailsData.packages;
                        $scope.img = rootUrl + $scope.courseDetailsData.course_img;
                        sessionStorage.setItem('detailCourseImg', $scope.courseDetailsData.course_img);
                    }
                }, function(x) { 
                    listLoading.css({'display':'none'});
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
              
              $scope.addSubmit = function() {
                  
                  var packageRow = $('.packageRow');
                  var comboInput = $('.comboInput');
                  var comboArr = new Array();
                  var attributeName = ['package_name', 'package_price', 'package_content'];
                  for(var r = 0; r < packageRow.length; r++) {
                      var packages = {};
                      for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                          packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
                          packages['packageid'] = packageRow.eq(r).attr('name');
                      }
                      comboArr.push(packages);
                  }
                  
                  var content = '<html>'+
                                      '<head>'+
                                          '<style>'+
                                              'img {'+
                                                  'width:100% !important;'+
                                              '}'+
                                          '</style>'+
                                      '</head>'+
                                      '<body>'+
                                          document.getElementById('iframepage').contentWindow.html +
                                      '</body>'+
                                    '</html>'


                  listLoading.css({'display':'block'});
                  
                  $http
                    .post(''+url+'/course/edit', {
                        token: sessionStorage.token, 
                        courseid: sessionStorage.tcourseid,
                        course_name: $scope.addCourse.courseName, 
                        sortid: sessionStorage.sortid,
                        summary: $scope.addCourse.abstract,
                        content: content,
                        course_img: sessionStorage.uploadCourseImgUrl ? sessionStorage.uploadCourseImgUrl : sessionStorage.detailCourseImg,
                        package: JSON.stringify(comboArr)
                    })
                    .then(function(response) {
                        listLoading.css({'display':'none'});
                        if ( response.data.code != 200 ) {
                            requestError(response, $state, ngDialog);
                        }
                        else{ 
                            ngDialog.open({
                              template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                              plain: true,
                              className: 'ngdialog-theme-default'
                            });
                            $state.go('app.courseMngt');
                        }
                        ngDialog.close();
                    }, function(x) { 
                        listLoading.css({'display':'none'});
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        ngDialog.close();
                    });
              };
              
            break;
      }
      
      // clearInterval(noF5Timer);
      
      //timeoutLock($state);
}]);


/**=========================================================
 * schoolSurveyController
 * author: BGOnline
 * version 1.0 2016-7-26
 =========================================================*/
 
App.controller('schoolSurveyController', ['$rootScope', '$sce', '$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($rootScope, $sce, $scope, $http, $filter, $state, FileUploader, ngDialog) {

      errorJump($state);
      var listLoading = $('.list-loading');
      
      var getSchoolGK = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/faq/getxxgk', {
                token: sessionStorage.token
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else { 
                    $scope.schoolInfoData = response.data.data;
                    ifrCon = $scope.schoolInfoData.content;
                    $scope.schoolInfoContent = $sce.trustAsHtml($scope.schoolInfoData.content);
                }
                listLoading.css({'display':'none'});
            }, function(x) { 
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
                ngDialog.close();
                listLoading.css({'display':'none'});
            });
      }
      
      getSchoolGK();

      var getTeacherTD = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/faq/getsztd', {
                  token: sessionStorage.token
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else {
                    $scope.teacherInfoData = response.data.data;
                    ifrCon = $scope.teacherInfoData.content;
                    $scope.teacherInfoContent = $sce.trustAsHtml($scope.teacherInfoData.content);
                }
                ngDialog.close();
            }, function(x) { 
                listLoading.css({'display':'none'});
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                }); 
                ngDialog.close();
            });
      }

      getTeacherTD();
      
      
      var getRecipe = function() {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/faq/getrecipe', {
                  token: sessionStorage.token
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else {
                    $scope.recipeInfoData = response.data.data;
                    ifrCon = $scope.recipeInfoData.content;
                    $scope.recipeInfoContent = $sce.trustAsHtml($scope.recipeInfoData.content);
                }
                ngDialog.close();
            }, function(x) { 
                listLoading.css({'display':'none'});
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                }); 
                ngDialog.close();
            });
      }

      getRecipe();

      $scope.createTime = function(create) {
          if(typeof(create) == 'undefined') return;
          return localData = new Date(parseInt(create.add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
      
      $scope.openEdit = function(type) {
          switch(type) { 
              case 1:
                $state.go('app.addSchoolSurvey');
                sessionStorage.setItem('schoolSurveyType', type);
                break;
              case 2:
                $state.go('app.addSchoolSurvey');
                sessionStorage.setItem('schoolSurveyType', type);
                break;
              case 3:
                $state.go('app.addSchoolSurvey');
                sessionStorage.setItem('schoolSurveyType', type);
                break;
          }
      }

      // clearInterval(noF5Timer);
      
      //timeoutLock($state);
}]);

/**=========================================================
 * addSchoolSurveyController
 * author: BGOnline
 * version 1.0 2016-7-26
 =========================================================*/
 
App.controller('addSchoolSurveyController', ['$rootScope', '$sce', '$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($rootScope, $sce, $scope, $http, $filter, $state, FileUploader, ngDialog) {
      errorJump($state);
      $scope.randomDate = (new Date()).getTime();
      var listLoading = $('.list-loading');

      var submitData = function(api) {
          return $scope.addSubmit = function() {
                    var content = '<html>'+
                                    '<head>'+
                                        '<style>'+
                                            'img {'+
                                                'width:100% !important;'+
                                            '}'+
                                        '</style>'+
                                    '</head>'+
                                    '<body>'+
                                        document.getElementById('iframepage').contentWindow.html +
                                    '</body>'+
                                  '</html>'
                    $http
                      .post(''+url+api+'', {
                            token: sessionStorage.token,
                            content: content
                      })
                      .then(function(response) {
                          if ( response.data.code != 200 ) {
                              requestError(response, $state, ngDialog);
                          }
                          else{ 
                              ngDialog.open({
                                template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                plain: true,
                                className: 'ngdialog-theme-default'
                              });
                              $state.go('app.schoolSurvey');
                          }
                          ngDialog.close();
                      }, function(x) { 
                          ngDialog.open({
                            template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                            plain: true,
                            className: 'ngdialog-theme-default'
                          }); 
                          ngDialog.close();
                      });
                    
                }
      }



      switch(sessionStorage.schoolSurveyType) {
          case '1':
            $http
              .post(''+url+'/faq/getxxgk', {
                    token: sessionStorage.token
              })
              .then(function(response) {
                  if ( response.data.code != 200 ) {
                      requestError(response, $state, ngDialog);
                  }else {
                      $scope.schoolInfoData = response.data.data;
                      ifrCon = $scope.schoolInfoData.content;
                      $scope.schoolInfoContent = $sce.trustAsHtml($scope.schoolInfoData.content);
                  }
                  ngDialog.close();
              }, function(x) {
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  }); 
                  ngDialog.close();
              });
            $scope.editPageTitle = '学校简介';
            submitData('/faq/editxxgk');
            break;
          case '2':
            $http
              .post(''+url+'/faq/getsztd', {
                    token: sessionStorage.token
              })
              .then(function(response) {
                  if ( response.data.code != 200 ) {
                      requestError(response, $state, ngDialog);
                  }else {
                      $scope.teacherInfoData = response.data.data;
                      ifrCon = $scope.teacherInfoData.content;
                      $scope.teacherInfoContent = $sce.trustAsHtml($scope.teacherInfoData.content);
                  }
                  ngDialog.close();
              }, function(x) {
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  }); 
                  ngDialog.close();
              });
            $scope.editPageTitle = '师资团队';
            submitData('/faq/editsztd');
            break;
          case '3':
            $http
              .post(''+url+'/faq/getrecipe', {
                    token: sessionStorage.token
              })
              .then(function(response) {
                  if ( response.data.code != 200 ) {
                      requestError(response, $state, ngDialog);
                  }else {
                      $scope.recipeInfoData = response.data.data;
                      ifrCon = $scope.recipeInfoData.content;
                      $scope.recipeInfoContent = $sce.trustAsHtml($scope.recipeInfoData.content);
                  }
                  ngDialog.close();
              }, function(x) {
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  }); 
                  ngDialog.close();
              });
            $scope.editPageTitle = '每周食谱';
            submitData('/faq/editrecipe');
            break;
      }
      
      // clearInterval(noF5Timer);
      
      //timeoutLock($state);
}]);


/**=========================================================
 * addNoticeController
 * author: BGOnline
 * version 1.0 2016-4-14
 =========================================================*/
 
App.controller('addNoticeController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
    
      errorJump($state);
      var listLoading = $('.list-loading');
      parseInt(sessionStorage.sortid) ? $scope.isSortid = false : $scope.isSortid = true;
      
      var uploader = $scope.uploader = new FileUploader({
        url: ''+url+'/gd/upload'
      })

      uploader.onSuccessItem = function(response) {
        sessionStorage.setItem('uploadCourseImgUrl', jQuery.parseJSON(response._xhr.response).url);
        $scope.img = rootUrl + sessionStorage.uploadCourseImgUrl;
      };
      
      $scope.randomDate = (new Date()).getTime();
      // var addTableRow = function() { // 添加一行
      //     var r = document.getElementById('comboTable').insertRow(2);
      //     r.setAttribute("class", "packageRow");
      //     var t1 = r.insertCell(0);
      //     var t2 = r.insertCell(1);
      //     var t3 = r.insertCell(2);
      //     var t4 = r.insertCell(3);
      //     t1.innerHTML="<input class='form-control ng-touched comboInput' type='text' maxlength='20'>";
      //     t2.innerHTML="<input class='form-control ng-touched comboInput' type='number'>";
      //     t3.innerHTML="<input class='form-control ng-touched comboInput' type='text' maxlength='60'>";
      //     t4.innerHTML="<button type='button' class='btn btn-sm btn-danger comboAction deleteRow'><em class='fa fa-trash-o'></em></button>";
      // }
      
      // $scope.addCombo = (function() { // 执行添加
      //     addTableRow();
      // });
      
      // $(document).on('blur', '.comboInput', function() {
      //     if($(this).val() != "") {
      //         $(this).parent().html($(this).val());
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //     }
      // })

      // $(document).on('click', '.deleteRow', function() {
      //     var length = $('.packageRow').length;
      //     if(length <= 1) {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>至少需要一项套餐！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //     }else {
      //         $(this).parent().parent().remove()
      //     }
          
      // })
      
      // $(document).on('click', '.editRow', function() {
      //     var comboInput = $('.comboInput');
      //     var oldValArr = new Array();
      //     if(comboInput.val() != "") {
      //         for(var i = 0; i < $(this).parent().siblings().length; i++) {
      //             oldValArr.push($(this).parent().siblings().eq(i).text());
      //             $(this).parent().siblings().eq(i).html("<input class='form-control ng-touched comboInput' type='text' value="+oldValArr[i]+">"); 
      //         }
      //     }else {
      //         ngDialog.open({
      //           template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
      //           plain: true,
      //           className: 'ngdialog-theme-default'
      //         });
      //     }

      // })
      
      $scope.addCourseSelectSort = function(selSort) {
          var selSortArr = selSort.split(',');
          sessionStorage.setItem('sortid', selSortArr[0]);
          sessionStorage.setItem('sname', selSortArr[1]);
      }
      
      $scope.sname = sessionStorage.sname;
      $scope.addCourse = {};
      
      switch(sessionStorage.actionCourseType) {
          
          case "1": // 添加
              ifrCon = undefined;
              $scope.addSubmit = function() {
                  // var packageRow = $('.packageRow');
                  // var comboInput = $('.comboInput');
                  
                  // if(packageRow.length > 0) {
                  //     var comboArr = new Array();
                  //     var attributeName = ['package_name', 'package_price', 'package_content'];
                  //     for(var r = 0; r < packageRow.length; r++) {
                  //         var packages = {};
                  //         for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                  //             packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
                  //         }
                  //         comboArr.push(packages);
                  //     }

                      
                      var content = '<html>'+
                                      '<head>'+
                                          '<style>'+
                                              'img {'+
                                                  'width:100% !important;'+
                                              '}'+
                                          '</style>'+
                                      '</head>'+
                                      '<body>'+
                                          document.getElementById('iframepage').contentWindow.html +
                                      '</body>'+
                                    '</html>'
                      
                      
                      listLoading.css({'display':'block'});
                      $http
                        .post(''+url+'/faq/add', {
                              token: sessionStorage.token, 
                              title: $scope.addCourse.courseName, 
                              sortid: sessionStorage.sortid,
                              summary: $scope.addCourse.abstract,
                              content: content,
                              img: sessionStorage.uploadCourseImgUrl,
                        })
                        .then(function(response) {
                            listLoading.css({'display':'none'});
                            if ( response.data.code != 200 ) {
                                requestError(response, $state, ngDialog);
                            }
                            else{ 
                                ngDialog.open({
                                  template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                  plain: true,
                                  className: 'ngdialog-theme-default'
                                });
                                $state.go('app.noticeMngt');
                                getCourseClass();
                            }
                            ngDialog.close();
                        }, function(x) { 
                            listLoading.css({'display':'none'});
                            ngDialog.open({
                              template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                              plain: true,
                              className: 'ngdialog-theme-default'
                            }); 
                            ngDialog.close();
                        });
                  // }else {
                  //     ngDialog.open({
                  //       template: "<p style='text-align:center;margin: 0;'>套餐信息不完整！</p>",
                  //       plain: true,
                  //       className: 'ngdialog-theme-default'
                  //     });
                  //     ngDialog.close();
                  // }
              };
            break;
          case "2": // 修改
              listLoading.css({'display':'block'});
              $http
                .post(''+url+'/faq/getfaq', {
                    token: sessionStorage.token, faq_id: sessionStorage.tcourseid
                })
                .then(function(response) {
                    listLoading.css({'display':'none'});
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        $scope.courseDetailsData = response.data.data;
                        $scope.addCourse.courseName = $scope.courseDetailsData.title;
                        $scope.addCourse.abstract = $scope.courseDetailsData.summary;
                        ifrCon = $scope.courseDetailsData.content;
                        $scope.img = rootUrl + $scope.courseDetailsData.img;
                        sessionStorage.setItem('detailCourseImg', $scope.courseDetailsData.img);
                    }
                }, function(x) { 
                    listLoading.css({'display':'none'});
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
              
              $scope.addSubmit = function() {
                  
                  // var packageRow = $('.packageRow');
                  // var comboInput = $('.comboInput');
                  // var comboArr = new Array();
                  // var attributeName = ['package_name', 'package_price', 'package_content'];
                  // for(var r = 0; r < packageRow.length; r++) {
                  //     var packages = {};
                  //     for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                  //         packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
                  //         packages['packageid'] = packageRow.eq(r).attr('name');
                  //     }
                  //     comboArr.push(packages);
                  // }
                  
                  var content = '<html>'+
                                      '<head>'+
                                          '<style>'+
                                              'img {'+
                                                  'width:100% !important;'+
                                              '}'+
                                          '</style>'+
                                      '</head>'+
                                      '<body>'+
                                          document.getElementById('iframepage').contentWindow.html +
                                      '</body>'+
                                    '</html>'


                  listLoading.css({'display':'block'});
                  
                  $http
                    .post(''+url+'/faq/edit', {
                        token: sessionStorage.token, 
                        faq_id: sessionStorage.tcourseid,
                        title: $scope.addCourse.courseName, 
                        sortid: sessionStorage.sortid,
                        summary: $scope.addCourse.abstract,
                        content: content,
                        img: sessionStorage.uploadCourseImgUrl ? sessionStorage.uploadCourseImgUrl : sessionStorage.detailCourseImg,
                    })
                    .then(function(response) {
                        listLoading.css({'display':'none'});
                        if ( response.data.code != 200 ) {
                            requestError(response, $state, ngDialog);
                        }
                        else{ 
                            ngDialog.open({
                              template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                              plain: true,
                              className: 'ngdialog-theme-default'
                            });
                            $state.go('app.noticeMngt');
                        }
                        ngDialog.close();
                    }, function(x) { 
                        listLoading.css({'display':'none'});
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        ngDialog.close();
                    });
              };
              
            break;
      }
      
      // clearInterval(noF5Timer);
      
      //timeoutLock($state);
}]);

/**=========================================================
 * teacherMngtController
 * author: BGOnline
 * version 1.0 2016-4-26
 =========================================================*/
 
App.controller('teacherMngtController', ['$scope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
       
      var getUserData = function(cp) {
        
          $http
            .post(''+url+'/teacher/index', {
                token: sessionStorage.token, p: cp
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.teacher = response.data.data.mod_data; 
                    $scope.branch_name = sessionStorage.branch_name;
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.teacher.length > 0 ? $scope.TNullType = 'isNullTypeHidden' : $scope.TNullType = 'isNullTypeShow';
                }
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
            });
      };
      
      getUserData();
            
      $scope.JumpEditTeacher = function(TUid, editType) { // 跳转到维护教师详情页面
          $state.go('app.editTeacher');
          sessionStorage.setItem('TUid', TUid)
          sessionStorage.setItem('editType', editType);
      }

      // noRefreshGetData(getUserData, getDataSpeed);
      
      // $scope.types = [
      //     {value: 0, text: '普通会员'},
      //     {value: 1, text: '球场管理员'}
      // ];
      
      // $scope.sexs = [
      //     {value: 0, text: '保密'},
      //     {value: 'F', text: '男'},
      //     {value: 'M', text: '女'}
      // ];
  
      // $scope.locks = [
      //     {value: 0, text: 'true'},
      //     {value: 1, text: 'false'}
      // ];
      
      // $scope.showType = function(user) {
      //     if(user.ball_type) {
      //         selected = $filter('filter')($scope.types, {value: user.ball_type});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showSex = function(user) {
      //     if(user.ball_sex) {
      //         selected = $filter('filter')($scope.sexs, {value: user.ball_sex});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showLock = function(user) {
      //     if(user.ball_lock) {
      //         selected = $filter('filter')($scope.locks, {value: user.ball_lock});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      $scope.pageChanged = function() {
          getUserData($scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页

      $scope.logintime = function(user) {
          if(user.logintime) {
              return localData = new Date(parseInt(user.logintime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          }else {
              return '从未登录';
          }
          
      }
      
      // $scope.lockUser = function(ballId) { // 锁定用户
      //     $http.post(''+url+'/index.php/admin/store/closestore', {
      //             ball_user_id: sessionStorage.ball_id, 
      //             ball_token: sessionStorage.ball_token,
      //             ball_store_id: ballId,
      //             type: 'is_open'
      //     }).then(function(response) {
      //         if(response.data.code != 200) { alert("操作球场失败！") }
      //         else { getUserData(); }
      //     }, function(x) {
      //         $scope.authMsg = '朋友，服务器挂掉了！';
      //     }) 
      // }
      
      //timeoutLock($state);
}]);




/**=========================================================
 * editTeacherController
 * author: BGOnline
 * version 1.0 2016-4-26
 =========================================================*/
 
App.controller('editTeacherController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
      
      errorJump($state);

      var uploader = $scope.uploader = new FileUploader({
        url: ''+url+'/gd/upload'
      })

      uploader.onSuccessItem = function(response) {
        sessionStorage.setItem('uploadTeacherImgUrl', jQuery.parseJSON(response._xhr.response).url);
        $scope.img = rootUrl + sessionStorage.uploadTeacherImgUrl;
      };
      
      $scope.teacher = {};
      switch(sessionStorage.editType) {
          case '0': // 添加教师
            $scope.isShowQuxiao = false;
            $scope.isShowShanchu = true;
            localStorage.removeItem('TUid');
            $scope.saveTeacher = function() {
                $http
                .post(''+url+'/teacher/add', {
                    token: sessionStorage.token,
                    tname: $scope.teacher.tname,
                    phone: $scope.teacher.phone,
                    password: $scope.teacher.password,
                    email: $scope.teacher.email,
                    header: sessionStorage.uploadTeacherImgUrl,
                    locked: 0
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        $state.go('app.teacherMngt');
                    }
                }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                });
            }
            break;
          case '1': // 修改教师
              $scope.isShowQuxiao = true;
              $scope.isShowShanchu = false;
              $http
                .post(''+url+'/teacher/getteacher', {
                    token: sessionStorage.token,
                    userid: sessionStorage.TUid
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        $scope.teacher = response.data.data; 
                        $scope.img = rootUrl + $scope.teacher.header;
                        sessionStorage.setItem('detailTeacherImg', $scope.teacher.header);
                    }
                }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                });
              $scope.saveTeacher = function() {
                  $http
                  .post(''+url+'/teacher/edit', {
                      token: sessionStorage.token,
                      userid: sessionStorage.TUid,
                      tname: $scope.teacher.tname,
                      phone: $scope.teacher.phone,
                      password: $scope.teacher.password,
                      email: $scope.teacher.email,
                      header: sessionStorage.uploadTeacherImgUrl ? sessionStorage.uploadTeacherImgUrl : sessionStorage.detailTeacherImg
                  })
                  .then(function(response) {
                      if ( response.data.code != 200 ) {
                          requestError(response, $state, ngDialog);
                      }
                      else{ 
                          ngDialog.open({
                            template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                            plain: true,
                            className: 'ngdialog-theme-default'
                          });
                          $state.go('app.teacherMngt');
                      }
                  }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                  });
              }
              
              $scope.delectTeacher = function() {
                  $http
                  .post(''+url+'/teacher/del', {
                      token: sessionStorage.token,
                      userid: sessionStorage.TUid,
                  })
                  .then(function(response) {
                      if ( response.data.code != 200 ) {
                          requestError(response, $state, ngDialog);
                      }
                      else{ 
                          ngDialog.open({
                            template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                            plain: true,
                            className: 'ngdialog-theme-default'
                          });
                          $state.go('app.teacherMngt');
                      }
                  }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                  });
              }
              break;
      }
      
      //errorJump($state);
      // $scope.teacher = {};
      // $scope.saveTeacher = function() {
      //     if(sessionStorage.editType) { // 修改教师
      //       $http
      //       .post(''+url+'/teacher/edit', {
      //             token: sessionStorage.token,
      //             userid: sessionStorage.TUid,
      //             tname: $scope.teacher.tname,
      //             phone: $scope.teacher.phone,
      //             email: $scope.teacher.email
      //       })
      //       .then(function(response) {
      //           if ( response.data.code != 200 ) {
      //               alert('发生错误');
      //           }
      //           else{ 
      //               $scope.teacher = response.data.data.mod_data; 
      //           }
      //       }, function(x) { alert('啊噢~，服务器开小差了！'); });
      //   }else {
            
      //   }
      // }

      
      // $scope.types = [
      //     {value: 0, text: '普通会员'},
      //     {value: 1, text: '球场管理员'}
      // ];
      
      // $scope.sexs = [
      //     {value: 0, text: '保密'},
      //     {value: 'F', text: '男'},
      //     {value: 'M', text: '女'}
      // ];
  
      // $scope.locks = [
      //     {value: 0, text: 'true'},
      //     {value: 1, text: 'false'}
      // ];
      
      // $scope.showType = function(user) {
      //     if(user.ball_type) {
      //         selected = $filter('filter')($scope.types, {value: user.ball_type});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showSex = function(user) {
      //     if(user.ball_sex) {
      //         selected = $filter('filter')($scope.sexs, {value: user.ball_sex});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showLock = function(user) {
      //     if(user.ball_lock) {
      //         selected = $filter('filter')($scope.locks, {value: user.ball_lock});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showLocalData = function(user) {
      //     return localData = new Date(parseInt(user.ball_login_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      // }
      
      // $scope.lockUser = function(ballId) { // 锁定用户
      //     $http.post(''+url+'/index.php/admin/store/closestore', {
      //             ball_user_id: sessionStorage.ball_id, 
      //             ball_token: sessionStorage.ball_token,
      //             ball_store_id: ballId,
      //             type: 'is_open'
      //     }).then(function(response) {
      //         if(response.data.code != 200) { alert("操作球场失败！") }
      //         else { getUserData(); }
      //     }, function(x) {
      //         $scope.authMsg = '朋友，服务器挂掉了！';
      //     }) 
      // }
      
      //timeoutLock($state);
      // clearInterval(noF5Timer);
}]);


/**=========================================================
 * editUserController
 * author: BGOnline
 * version 1.0 2016-7-24
 =========================================================*/
 
App.controller('editUserController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
      
      errorJump($state);

      var uploader = $scope.uploader = new FileUploader({
        url: ''+url+'/gd/upload'
      })

      uploader.onSuccessItem = function(response) {
        sessionStorage.setItem('uploadTeacherImgUrl', jQuery.parseJSON(response._xhr.response).url);
        $scope.img = rootUrl + sessionStorage.uploadTeacherImgUrl;
      };
      
      $scope.teacher = {};
      switch(sessionStorage.editType) {
          case '0': // 添加教师
            $scope.isShowQuxiao = false;
            $scope.isShowShanchu = true;
            localStorage.removeItem('TUid');
            $scope.saveTeacher = function() {
                $http
                .post(''+url+'/teacher/add', {
                    token: sessionStorage.token,
                    tname: $scope.teacher.tname,
                    phone: $scope.teacher.phone,
                    password: $scope.teacher.password,
                    email: $scope.teacher.email,
                    header: sessionStorage.uploadTeacherImgUrl,
                    locked: 0
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        $state.go('app.teacherMngt');
                    }
                }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                });
            }
            break;
          case '1': // 修改教师
              $scope.isShowQuxiao = true;
              $scope.isShowShanchu = false;
              $http
                .post(''+url+'/teacher/getteacher', {
                    token: sessionStorage.token,
                    userid: sessionStorage.TUid
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{ 
                        $scope.teacher = response.data.data; 
                        $scope.img = rootUrl + $scope.teacher.header;
                        sessionStorage.setItem('detailTeacherImg', $scope.teacher.header);
                    }
                }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                });
              $scope.saveTeacher = function() {
                  $http
                  .post(''+url+'/teacher/edit', {
                      token: sessionStorage.token,
                      userid: sessionStorage.TUid,
                      tname: $scope.teacher.tname,
                      phone: $scope.teacher.phone,
                      password: $scope.teacher.password,
                      email: $scope.teacher.email,
                      header: sessionStorage.uploadTeacherImgUrl ? sessionStorage.uploadTeacherImgUrl : sessionStorage.detailTeacherImg
                  })
                  .then(function(response) {
                      if ( response.data.code != 200 ) {
                          requestError(response, $state, ngDialog);
                      }
                      else{ 
                          ngDialog.open({
                            template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                            plain: true,
                            className: 'ngdialog-theme-default'
                          });
                          $state.go('app.teacherMngt');
                      }
                  }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                  });
              }
              
              $scope.delectTeacher = function() {
                  $http
                  .post(''+url+'/teacher/del', {
                      token: sessionStorage.token,
                      userid: sessionStorage.TUid,
                  })
                  .then(function(response) {
                      if ( response.data.code != 200 ) {
                          requestError(response, $state, ngDialog);
                      }
                      else{ 
                          ngDialog.open({
                            template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                            plain: true,
                            className: 'ngdialog-theme-default'
                          });
                          $state.go('app.teacherMngt');
                      }
                  }, function(x) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                  });
              }
              break;
      }
      
      //errorJump($state);
      // $scope.teacher = {};
      // $scope.saveTeacher = function() {
      //     if(sessionStorage.editType) { // 修改教师
      //       $http
      //       .post(''+url+'/teacher/edit', {
      //             token: sessionStorage.token,
      //             userid: sessionStorage.TUid,
      //             tname: $scope.teacher.tname,
      //             phone: $scope.teacher.phone,
      //             email: $scope.teacher.email
      //       })
      //       .then(function(response) {
      //           if ( response.data.code != 200 ) {
      //               alert('发生错误');
      //           }
      //           else{ 
      //               $scope.teacher = response.data.data.mod_data; 
      //           }
      //       }, function(x) { alert('啊噢~，服务器开小差了！'); });
      //   }else {
            
      //   }
      // }

      
      // $scope.types = [
      //     {value: 0, text: '普通会员'},
      //     {value: 1, text: '球场管理员'}
      // ];
      
      // $scope.sexs = [
      //     {value: 0, text: '保密'},
      //     {value: 'F', text: '男'},
      //     {value: 'M', text: '女'}
      // ];
  
      // $scope.locks = [
      //     {value: 0, text: 'true'},
      //     {value: 1, text: 'false'}
      // ];
      
      // $scope.showType = function(user) {
      //     if(user.ball_type) {
      //         selected = $filter('filter')($scope.types, {value: user.ball_type});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showSex = function(user) {
      //     if(user.ball_sex) {
      //         selected = $filter('filter')($scope.sexs, {value: user.ball_sex});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showLock = function(user) {
      //     if(user.ball_lock) {
      //         selected = $filter('filter')($scope.locks, {value: user.ball_lock});
      //     }
      //     return selected.length ? selected[0].text : 'Not set';
      // };
      
      // $scope.showLocalData = function(user) {
      //     return localData = new Date(parseInt(user.ball_login_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      // }
      
      // $scope.lockUser = function(ballId) { // 锁定用户
      //     $http.post(''+url+'/index.php/admin/store/closestore', {
      //             ball_user_id: sessionStorage.ball_id, 
      //             ball_token: sessionStorage.ball_token,
      //             ball_store_id: ballId,
      //             type: 'is_open'
      //     }).then(function(response) {
      //         if(response.data.code != 200) { alert("操作球场失败！") }
      //         else { getUserData(); }
      //     }, function(x) {
      //         $scope.authMsg = '朋友，服务器挂掉了！';
      //     }) 
      // }
      
      //timeoutLock($state);
      // clearInterval(noF5Timer);
}]);


/**=========================================================
 * atTheCityController
 * author: BGOnline
 * version 1.0 2016-4-24 
 =========================================================*/

App.controller('atTheCityController', ['$scope', '$http', '$state', 'ngDialog',
  function($scope, $http, $state, ngDialog) {
      
      var getPCAS = function(areaid) {
          $http
            .post(''+url+'/public/getarea', {
                provinceid: areaid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                else{ 
                    $scope.PCAS = response.data.data;
                    getAtData(areaid);
                    parseInt(areaid) ? $('#City').css({'display':'inline-block'}) : $('#City').css({'display':'none'});
                }
            }, function(x) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getPCAS();
      
      function theLocation(cityName) { // 用城市名设置地图中心点
          if(cityName != ""){
            map.centerAndZoom(cityName,11); 
          }
      }
      
      
      $scope.selectPCAS = (function(selectValue) { 
          // 0: areaid 1: name
          var sValueArr = selectValue.split(',');
          getPCAS(sValueArr[0]);
          sessionStorage.setItem('areaid', sValueArr[0]);
          $scope.allCityAreaid = sessionStorage.areaid;
          sessionStorage.setItem('cityName', sValueArr[1]);
          theLocation(sessionStorage.cityName);
      });
      
      $scope.selectCity = (function(selectValue) {
          var sValueArr = selectValue.split(','); 
          if(selectValue == '') {
              sValueArr[0] = $scope.allCityAreaid;
              getAtData(sValueArr[0]);
              sessionStorage.setItem('areaid', sValueArr[0]);
              sessionStorage.setItem('cityName', sValueArr[1]);
              theLocation(sessionStorage.cityName); 
          }else {
              getAtData(sValueArr[0]);
              sessionStorage.setItem('areaid', sValueArr[0]);
              sessionStorage.setItem('cityName', sValueArr[1]);
              theLocation(sessionStorage.cityName); 
          }
      });

}]);

/**=========================================================
 * addBanjiController
 * author: BGOnline
 * version 1.0 2016-5-5
 =========================================================*/
 
App.controller('addBanjiController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
      
      errorJump($state);
      //$scope.sname = sessionStorage.sname; // 分类名称
      $scope.addBanji = {};
      patternNum = 1;

      $scope.randomDate = (new Date()).getTime();
      
      $http // 获取教师列表
        .post(''+url+'/teacher/index', {
            token: sessionStorage.token, p: 'all'
        })
        .then(function(response) {
            if ( response.data.code != 200 ) {
                requestError(response, $state, ngDialog);
            }
            else{ 
                $scope.teacher = response.data.data.mod_data; 
                if($scope.teacher.length < 1) {
                    alert("暂无可用教师，请先添加教师！");
                    $state.go('app.teacherMngt');
                }
                
                $scope.sTeacher = function(i) { // 点击选择老师
                  if($('.teacherList > ul > li').eq(i).hasClass('bgSelected')) {
                      $('.teacherList > ul > li').eq(i).removeClass('bgSelected');
                  }else {
                      $('.teacherList > ul > li').eq(i).addClass('bgSelected');
                  }
                }

                switch(sessionStorage.editOrAdd) { // 0添加 1修改
                    case '0':
                        $('.stuList').css({'display': 'none'});
                        $scope.addSubmit = function() {
                            $('.btn').addClass('disabled');
                            var cData = document.getElementById('iframepage').contentWindow.calenderData;
                            var teacherArr = [];
                            $('.bgSelected').each(function() { // 遍历选中的教师
                                teacherArr.push($(this).attr('name'));
                            });
                            if(cData) {
                                $http
                                  .post(''+url+'/courseclass/add', {
                                      token: sessionStorage.token, 
                                      courseid: sessionStorage.tcourseid,
                                      class_name: $scope.addBanji.class_name,
                                      class_quantity: $scope.addBanji.class_quantity, 
                                      class_status: 1,
                                      teacher: teacherArr.join(","),
                                      class_table: cData.join(","),
                                      //$scope.addBanji.class_table
                                  })
                                  .then(function(response) {
                                      if ( response.data.code != 200 ) {
                                          requestError(response, $state, ngDialog);
                                      }
                                      else{ 
                                          // $scope.course = response.data.data.mod_data; 
                                          // var page = response.data.data.page_data;
                                          // $scope.totalItems = parseInt(page.totalCount) * 10;
                                          ngDialog.open({
                                            template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                            plain: true,
                                            className: 'ngdialog-theme-default'
                                          });
                                          $state.go('app.courseDetails');
                                      }
                                      $('.btn').removeClass('disabled');
                                  }, function(x) {
                                      ngDialog.open({
                                        template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                                        plain: true,
                                        className: 'ngdialog-theme-default'
                                      });
                                  });
                            }else {
                                ngDialog.open({
                                  template: "<p style='text-align:center;margin: 0;'>请选择开班日期！</p>",
                                  plain: true,
                                  className: 'ngdialog-theme-default'
                                });
                                $('.btn').removeClass('disabled');
                            }
                            
                        };
                        break;
                    case '1':
                        $('.stuList').css({'display': 'block'});
                        var getClassDetails = function() {
                          $http
                          .post(''+url+'/courseclass/getclass', {
                              token: sessionStorage.token, classid: sessionStorage.classid
                          })
                          .then(function(response) {
                              if ( response.data.code != 200 ) {
                                  requestError(response, $state, ngDialog);
                              }
                              else{ 
                                  $scope.addBanji.class_name = response.data.data.class_name;
                                  $scope.addBanji.class_quantity = response.data.data.class_quantity;
                                  $scope.addBanji.teacher = response.data.data.teacher;
                                  $scope.addBanji.class_table = response.data.data.class_table;
                                  class_tableData = $scope.addBanji.class_table;
                                  
                                  var teacherList = $('.teacherList > ul > li');
                                  var teacherListArr = new Array();
                                  for(var i = 0; i < teacherList.length; i++) {
                                      teacherListArr.push(teacherList.eq(i).attr('name'));
                                  }
                                  
                                  var teacherData = $scope.addBanji.teacher;
                                  var teacherDataArr = new Array();
                                  for(var k = 0; k < teacherData.length; k++) {
                                      teacherDataArr.push(teacherData[k].userid);
                                  }

                                  var arrayIntersection = (function(a, b) { // 找出两个数组的交集,并标记
                                      var result = new Array();
                                      for(var i = 0; i < a.length; i++) {
                                          for(var k = 0; k < b.length; k++) {
                                              if(a[i] == b[k]) {
                                                  result.push(a[i]);
                                                  teacherList.eq(i).addClass('bgSelected');
                                              }
                                          }
                                      }
                                      return result;
                                  });
                                  
                                  console.log(arrayIntersection(teacherListArr, teacherDataArr));
                                  
                              }
                          }, function(x) {
                              ngDialog.open({
                                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                                plain: true,
                                className: 'ngdialog-theme-default'
                              });
                          });
                        }
                        
                          getClassDetails();
                          
                          $scope.addSubmit = function() {
                              $('.btn').addClass('disabled');
                              var cData = document.getElementById('iframepage').contentWindow.calenderData;
                              var teacherArr = [];
                              $('.bgSelected').each(function() {
                                  teacherArr.push($(this).attr('name'));
                              });
                              $http
                                .post(''+url+'/courseclass/edit', {
                                    token: sessionStorage.token, 
                                    classid: sessionStorage.classid,
                                    courseid: sessionStorage.tcourseid,
                                    class_name: $scope.addBanji.class_name,
                                    class_quantity: $scope.addBanji.class_quantity, 
                                    class_status: 1,
                                    teacher: teacherArr.join(','),
                                    class_table: cData.join(",")
                                })
                                .then(function(response) {
                                    if ( response.data.code != 200 ) {
                                        requestError(response, $state, ngDialog);
                                    }else{ 
                                        ngDialog.open({
                                          template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                          plain: true,
                                          className: 'ngdialog-theme-default'
                                        });
                                        $state.go('app.courseDetails');
                                    }
                                    $('.btn').removeClass('disabled');
                                }, function(x) {
                                    ngDialog.open({
                                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                                      plain: true,
                                      className: 'ngdialog-theme-default'
                                    });
                                    $('.btn').removeClass('disabled');
                                });
                          };
                        break;
                }
            }
        }, function(x) {
            ngDialog.open({
              template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
              plain: true,
              className: 'ngdialog-theme-default'
            });
      });

      //timeoutLock($state);
      // clearInterval(noF5Timer);
}]);


/**=========================================================
 * classStudentController
 * author: BGOnline
 * version 1.0 2016-5-5
 =========================================================*/
 
App.controller('classStudentController', ['$scope', '$http', '$filter', '$state', 'FileUploader', 'ngDialog',
  function($scope, $http, $filter, $state, FileUploader, ngDialog) {
      
      errorJump($state);
      $scope.addBanji = {};
      var getStudentData = function() {
          $http
            .post(''+url+'/courseclass/getclassstudent', {
                token: sessionStorage.token, classid: sessionStorage.classid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.addBanji.student = response.data.data;
                }
            }, function(x) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };

      getStudentData();

      $scope.removeStudents = function(studentid) { // 移除学生
          $http
            .post(''+url+'/courseclass/remove_student', {
                token: sessionStorage.token, 
                classid: sessionStorage.classid,
                userid: studentid
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    getStudentData();
                }
            }, function(x) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      }
      
      
      $scope.goRechargeClass = function(studentid,student_pack) { // 充值课时
          if(student_pack.length < 1) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>暂无可用学习卡！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }else {
              $state.go('app.rechargeClass');
              sessionStorage.setItem('studentid', studentid);
              patternNum = 2;
          }
      }

      $scope.sexs = [
          {value: 0, text: '保密'},
          {value: 1, text: '男'},
          {value: 2, text: '女'}
      ];
      
      $scope.showSex = function(x) {
          if(x.sex) {
              selected = $filter('filter')($scope.sexs, {value: x.sex});
          }
          return selected.length ? selected[0].text : 'Not set';
      };
                        
      // clearInterval(noF5Timer);
      //timeoutLock($state);
}]);


/**=========================================================
 * rechargeClass
 * author: BGOnline
 * version 1.0 2016-5-17
 =========================================================*/
 
App.controller('rechargeClassController', ['$scope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      //$scope.sname = sessionStorage.sname; // 分类名称
      patternNum = 2;
      $scope.randomDate = (new Date()).getTime();
      var getStuDetail = function() { // 获取充值学生信息
        $http 
          .post(''+url+'/courseclass/getrechargestudent', {
              token: sessionStorage.token, classid: sessionStorage.classid, studentid: sessionStorage.studentid
          })
          .then(function(response) {
              if ( response.data.code != 200 ) {
                  requestError(response, $state, ngDialog);
              }
              else{ 
                  $scope.tname = response.data.data.tname;
                  $scope.header = response.data.data.header;
                  $scope.student_pack = response.data.data.student_pack;
                  stuData = response.data.data.student_table;
                  class_tableData = response.data.data.class_table;
                  defaultSPackPackageid = $scope.student_pack;
              }
          }, function(x) {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
          });
      }
        
      getStuDetail();

      var qCount = 1;
      $scope.selectpRadio = function(packageid, qMax) { // 获取选中的套餐
          $scope.packageid = packageid;
          $scope.qMax = qMax;
          $('.quantityInput').val('1');
          qCount = 1;
      }
      
      $scope.increaseQ = function() { // 数量增加
          if(!$scope.qMax) {
              $scope.qMax = defaultSPackPackageid[0].package_quantity;
              if(qCount < $scope.qMax) {
                  $('.quantityInput').val(++qCount);
              }
          }else {
              $scope.qMax = $scope.qMax;
              if(qCount < $scope.qMax) {
                  $('.quantityInput').val(++qCount);
              }
          }
          
      }
      
      $scope.reduceQ = function() { // 数量减少
          if(!$scope.qMax) {
              $scope.qMax = defaultSPackPackageid[0].package_quantity;
              if(qCount > 1) {
                  $('.quantityInput').val(--qCount);
              }
          }else {
              $scope.qMax = $scope.qMax;
              if(qCount > 1) {
                  $('.quantityInput').val(--qCount);
              }
          }
      }

      $scope.addSubmit = function() { // 充值
          var sData = document.getElementById('iframepage').contentWindow.calenderData;
          if(sData && defaultSPackPackageid.length > 0) {
              $http
              .post(''+url+'/courseclass/recharge_class', {
                  token: sessionStorage.token, 
                  packageid: $scope.packageid == undefined ? defaultSPackPackageid[0].packageid : $scope.packageid,
                  classid: sessionStorage.classid,
                  studentid: sessionStorage.studentid,
                  quantity: $scope.qMax == undefined ? 1 : qCount,
                  class_table: sData.join(",")
              })
              .then(function(response) {
                  if ( response.data.code != 200 ) {
                      requestError(response, $state, ngDialog);
                  }
                  else{ 
                      getStuDetail();
                      ngDialog.open({
                        template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                        plain: true,
                        className: 'ngdialog-theme-default'
                      });
                      $scope.packageid = defaultSPackPackageid[0].packageid;
                      $scope.qMax = defaultSPackPackageid[0].package_quantity;
                      $('.quantityInput').val('1');
                      qCount = 1;
                      ngDialog.close();
                  }
              }, function(x) {
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  });
                  ngDialog.close();
              });
          }else if(!(defaultSPackPackageid.length > 0)) {
              alert('无可用学习卡！');
          }else if(!sData) {
              alert('未添加课时！');
          }
          
      };
     
      //timeoutLock($state);
}]);



/**=========================================================
 * usersCenterController
 * author: BGOnline
 * version 1.0 2016-6-2
 =========================================================*/
 
App.controller('usersCenterController', ['$scope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      
      getUsersData = function(cp, s) {
          listLoading.css({'display':'block'});
          $http // 用户列表
            .post(''+url+'/user/index', {
                token: sessionStorage.token, p: cp, search: s
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.users = response.data.data.mod_data; 
                    $scope.branch_name = sessionStorage.branch_name;
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.users.length > 0 ? $scope.UNullType = 'isNullTypeHidden' : $scope.UNullType = 'isNullTypeShow';
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getUsersData();  

      $scope.searchUserData = function() {
          getUsersData('', $scope.sUValue);
      }

      $scope.pageChanged = function() {
          getUsersData($scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页
      
      $scope.showRechargeWin = function(uid, name, phone) {
        ngDialog.open({
          template: "<p style='text-align:center;font-size:16px;color:#555;padding:10px;border-bottom:1px solid #EEE;'>学习币充值</p>"+
                    "<div style='padding:10px 50px;width:100%;' class='clearfix'>"+
                        "<p style='margin-bottom:20px;'><span>用户："+name+"</span><span style='float:right;'>电话号码："+phone+"</span></p>"+
                        "<span style='float:left;line-height: 35px;'>充值学习币：</span>"+
                        "<div class='input-group' style='width:200px;float:left;'>"+
                          "<input class='form-control xxb-input' type='number'>"+
                          "<span class='input-group-addon'>个</span>"+
                        "</div>"+
                        '<button type="button" class="mb-sm btn btn-warning" ng-click="rechargeXXB(\''+uid+'\')" style="float:right;margin-top:30px;">充值</button>'+
                    "</div>",
          plain: true,
          className: 'ngdialog-theme-default',
          controller: 'rechargeXXBController'
        });
      }

      $scope.addUserInfo = function(type) {
        switch(type) {
            case 1:
              sessionStorage.setItem('addUserType', type);
              ngDialog.open({
                template: "<p style='text-align:center;font-size:16px;color:#555;padding:10px;border-bottom:1px solid #EEE;'>添加用户</p>"+
                          "<div style='padding:10px 20px;width:100%;' class='clearfix'>"+
                              "<p style='margin-bottom:20px;'><span>家长信息</span></p>"+
                              "<p style='margin-bottom:20px;'>"+
                                  "<span>手机号：<input class='form-control phone-input' style='display: inline-block;width: 120px;' type='text' maxlength='11'></span>"+
                                  "<span style='margin-left:15px;'>密码：<input class='form-control password-input' style='display: inline-block;width: 120px;' type='text'></span>"+
                              "</p>"+
                              "<p style='margin-bottom:20px;'><span>孩子信息</span></p>"+
                              "<div class='table-responsive addCombo'>"+
                                          "<table class='table' id='comboTable'>"+
                                              "<thead>"+
                                                  "<tr>"+
                                                      "<th style='width:30%;'>姓名</th>"+
                                                      "<th style='width:50%;'>就读学校</th>"+
                                                      "<th style='width:20%;'>操作</th>"+
                                                  "</tr>"+
                                              "</thead>"+                                        
                                              "<tbody>"+
                                                  // "<tr class='packageRow'>"+
                                                  //     "<td><input class='form-control ng-touched comboInput name-input' type='text'></td>"+
                                                  //     "<td><input class='form-control ng-touched comboInput school-input' type='text'></td>"+
                                                  //     "<td>"+
                                                  //         "<button type='button' class='btn btn-sm btn-danger comboAction deleteRow'><em class='fa fa-trash-o'></em></button>"+
                                                  //     "</td>"+
                                                  // "</tr>"+
                                                  "<tr>"+
                                                      "<td colspan='3' class='addRow'>"+
                                                          "<button class='btn btn-default addCourseBtn' type='button' ng-click='addCombo()'><i class='fa fa-plus addCourseFa'></i>添加</button>"+
                                                      "</td>"+
                                                  "</tr>"+
                                              "</tbody>"+
                                          "</table>"+
                                      "</div>"+
                              '<button type="button" class="mb-sm btn btn-warning" ng-click="addUInfo(\''+1 +'\')" style="float:right;margin-top:30px;">确认添加</button>'+
                          "</div>",
                plain: true,
                className: 'ngdialog-theme-default',
                controller: 'addUserController'
              });
              break;
            case 2:
              sessionStorage.setItem('addUserType', type);
              ngDialog.open({
                template: "<p style='text-align:center;font-size:16px;color:#555;padding:10px;border-bottom:1px solid #EEE;'>添加用户</p>"+
                          "<div style='padding:10px 20px;width:100%;' class='clearfix'>"+
                              "<p style='margin-bottom:20px;'><span>家长信息</span></p>"+
                              "<p style='margin-bottom:20px;'>"+
                                  "<span>手机号：<input class='form-control phone-input' style='display: inline-block;width: 120px;' type='text' maxlength='11'></span>"+
                                  "<span style='margin-left:15px;'>密码：<input class='form-control password-input' style='display: inline-block;width: 120px;' type='text'></span>"+
                              "</p>"+
                              "<p style='margin-bottom:20px;'><span>孩子信息</span></p>"+
                              "<div class='table-responsive addCombo'>"+
                                          "<table class='table' id='comboTable'>"+
                                              "<thead>"+
                                                  "<tr>"+
                                                      "<th style='width:30%;'>姓名</th>"+
                                                      "<th style='width:50%;'>就读学校</th>"+
                                                      "<th style='width:20%;'>操作</th>"+
                                                  "</tr>"+
                                              "</thead>"+                                        
                                              "<tbody>"+
                                                  "<tr class='packageRow'>"+
                                                      "<td><input class='form-control ng-touched comboInput name-input' type='text'></td>"+
                                                      "<td><input class='form-control ng-touched comboInput school-input' type='text'></td>"+
                                                      "<td>"+
                                                          "<button type='button' class='btn btn-sm btn-danger comboAction deleteRow'><em class='fa fa-trash-o'></em></button>"+
                                                      "</td>"+
                                                  "</tr>"+
                                                  "<tr>"+
                                                      "<td colspan='3' class='addRow'>"+
                                                          "<button class='btn btn-default addCourseBtn' type='button' ng-click='addCombo()'><i class='fa fa-plus addCourseFa'></i>添加</button>"+
                                                      "</td>"+
                                                  "</tr>"+
                                              "</tbody>"+
                                          "</table>"+
                                      "</div>"+
                              '<button type="button" class="mb-sm btn btn-warning" ng-click="addUInfo(\''+1 +'\')" style="float:right;margin-top:30px;">确认添加</button>'+
                          "</div>",
                plain: true,
                className: 'ngdialog-theme-default',
                controller: 'addUserController'
              });
              break;
        }
        
      }

      $scope.logintime = function(user) {
          if(user.logintime) {
              return localData = new Date(parseInt(user.logintime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          }else {
              return '从未登录';
          }
      }
      // noRefreshGetData(getUsersData, getDataSpeed);
      
      //timeoutLock($state);
}]);


/**=========================================================
 * rechargeRecordController
 * author: BGOnline
 * version 1.0 2016-6-2
 =========================================================*/
App.controller('rechargeRecordController', ['$scope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');  
      getRecordData = function(cp, s, t) {
         listLoading.css({'display':'block'});
         $http // 充值记录
            .post(''+url+'/user/rechargelog', {
                token: sessionStorage.token, p: cp, search:s, time: t
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "，刷新浏览器试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                else{ 
                    $scope.rechargeRecord = response.data.data.mod_data; 
                    $scope.rechargeTData = response.data.data.time_data;
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.rechargeRecord.length > 0 ? $scope.RNullType = 'isNullTypeHidden' : $scope.RNullType = 'isNullTypeShow';
                }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              }); 
            });
      }
      
      getRecordData();
      
      $scope.pageChanged = function() {
          getRecordData($scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页

      $scope.showRechargeTime = function(t) {
          getRecordData('','',t);
      }
      
      $scope.searchLog = function() {
          getRecordData('', $scope.sRLValue);
      }

      $scope.rechargeTime = function(r) {
          return localData = new Date(parseInt(r.time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
      
      //timeoutLock($state);
}]);


/**=========================================================
 * rechargeXXBController
 * author: BGOnline
 * version 1.0 2016-6-2
 =========================================================*/
 
App.controller('rechargeXXBController', ['$scope', '$http', '$state', 'ngDialog',
  function($scope, $http, $state, ngDialog) {
      
      errorJump($state);
      
      $scope.rechargeXXB = function(uid) {
          var xxbNum = $('.xxb-input').val();
          if(xxbNum) {
            $http
            .post(''+url+'/user/rechargexxb', {
                token: sessionStorage.token, userid: uid, xxb: xxbNum
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else{ 
                    getUsersData();
                    getRecordData();
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                }
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
                ngDialog.close();
            });
          }else {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>学习币输入有误！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }
          
      }

}]);


/**=========================================================
 * addUserController
 * author: BGOnline
 * version 1.0 2016-6-2
 =========================================================*/
 
App.controller('addUserController', ['$scope', '$http', '$state', 'ngDialog',
  function($scope, $http, $state, ngDialog) {
      
      errorJump($state);
      
      var addTableRow = function() { // 添加一行
          var r = document.getElementById('comboTable').insertRow(1);
          r.setAttribute("class", "packageRow");
          var t1 = r.insertCell(0);
          var t2 = r.insertCell(1);
          var t3 = r.insertCell(2);
          t1.innerHTML="<input class='form-control ng-touched comboInput' style='padding: 2px 6px;' type='text' maxlength='20'>";
          t2.innerHTML="<input class='form-control ng-touched comboInput' style='padding: 2px 6px;' type='text' maxlength='20'>";
          t3.innerHTML="<button type='button' class='btn btn-sm btn-danger comboAction deleteRow'><em class='fa fa-trash-o'></em></button>";
      }
      
      $scope.addCombo = (function() { // 执行添加
          addTableRow();
      });
      
      $(document).on('click', '.deleteRow', function() {
          $(this).parent().parent().remove();
      })

      var addChild = function(uid) {
        
          var nameVal = $('.name-input').val();
          var schoolVal = $('.school-input').val();
          var packageRow = $('.packageRow');
          var comboInput = $('.comboInput');
          var comboArr = new Array();
          var attributeName = ['tname', 'real_school'];
          for(var r = 0; r < packageRow.length; r++) {
              var packages = {};
              for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                  packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
              }
              comboArr.push(packages);
          }

          $http
            .post(''+url+'/user/addstudent', {
                  token: sessionStorage.token, 
                  userid: uid,
                  student: JSON.stringify(comboArr)
            })
            .then(function(response) {
                if( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }else {
                    getUsersData();
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>添加用户信息成功！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                }
                ngDialog.close();
            }, function(x) { 
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                }); 
                ngDialog.close();
            });
      }

      $scope.addUInfo = function() {
          switch(sessionStorage.addUserType) {
              case "1": // 添加
                var phoneVal = $('.phone-input').val();
                var passwordVal = $('.password-input').val();
                $http
                  .post(''+url+'/user/adduser', {
                      token: sessionStorage.token, phone: phoneVal, password: passwordVal
                  })
                  .then(function(response) {
                      if ( response.data.code != 200 ) {
                          requestError(response, $state, ngDialog);
                      }else { 
                          addChild(response.data.data.userid);
                      }
                  }, function(x) {
                      ngDialog.open({
                        template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                        plain: true,
                        className: 'ngdialog-theme-default'
                      });
                      ngDialog.close();
                  });
                      
                break;
              case "2": // 修改
                  listLoading.css({'display':'block'});
                  $http
                    .post(''+url+'/course/getcourse', {
                        token: sessionStorage.token, courseid: sessionStorage.tcourseid
                    })
                    .then(function(response) {
                        listLoading.css({'display':'none'});
                        if ( response.data.code != 200 ) {
                            requestError(response, $state, ngDialog);
                        }
                        else{ 
                            $scope.courseDetailsData = response.data.data;
                            $scope.addCourse.courseName = $scope.courseDetailsData.course_name;
                            $scope.addCourse.abstract = $scope.courseDetailsData.summary;
                            ifrCon = $scope.courseDetailsData.content;
                            $scope.addCourse.packages = $scope.courseDetailsData.packages;
                            $scope.img = rootUrl + $scope.courseDetailsData.course_img;
                            sessionStorage.setItem('detailCourseImg', $scope.courseDetailsData.course_img);
                        }
                    }, function(x) { 
                        listLoading.css({'display':'none'});
                        ngDialog.open({
                          template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                          plain: true,
                          className: 'ngdialog-theme-default'
                        });
                        ngDialog.close();
                    });
                  
                  $scope.addSubmit = function() {
                      
                      var packageRow = $('.packageRow');
                      var comboInput = $('.comboInput');
                      var comboArr = new Array();
                      var attributeName = ['package_name', 'package_price', 'package_content'];
                      for(var r = 0; r < packageRow.length; r++) {
                          var packages = {};
                          for(var c = 0; c < packageRow.eq(r).children().length-1; c++) {
                              packages[attributeName[c]] = packageRow.eq(r).children().eq(c).children().val();
                              packages['packageid'] = packageRow.eq(r).attr('name');
                          }
                          comboArr.push(packages);
                      }

                      listLoading.css({'display':'block'});
                      
                      $http
                        .post(''+url+'/course/edit', {
                            token: sessionStorage.token, 
                            courseid: sessionStorage.tcourseid,
                            course_name: $scope.addCourse.courseName, 
                            sortid: sessionStorage.sortid,
                            summary: $scope.addCourse.abstract,
                            content: content,
                            course_img: sessionStorage.uploadCourseImgUrl ? sessionStorage.uploadCourseImgUrl : sessionStorage.detailCourseImg,
                            package: JSON.stringify(comboArr)
                        })
                        .then(function(response) {
                            listLoading.css({'display':'none'});
                            if ( response.data.code != 200 ) {
                                requestError(response, $state, ngDialog);
                            }
                            else{ 
                                ngDialog.open({
                                  template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                                  plain: true,
                                  className: 'ngdialog-theme-default'
                                });
                                $state.go('app.courseMngt');
                            }
                            ngDialog.close();
                        }, function(x) { 
                            listLoading.css({'display':'none'});
                            ngDialog.open({
                              template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                              plain: true,
                              className: 'ngdialog-theme-default'
                            });
                            ngDialog.close();
                        });
                  };
                  
                break;
          }

      }
      
}]);


/**=========================================================
 * adminInfoController
 * author: BGOnline
 * version 1.0 2016-6-3
 =========================================================*/
 
App.controller('adminInfoController', ['$scope', '$http', '$state', 'ngDialog',
  function($scope, $http, $state, ngDialog) {
      
      errorJump($state);
      
      $scope.vShow = function(v) {
          switch(v) {
              case 0:
                $('.vShow2').css({'visibility':'hidden'});
                break;
              case 1: 
                $('.vShow2').css({'visibility':'visible'});
                break;
          }
      }
      
      $scope.admin = {};
      
      getBranchData = function() {
        
         $http // 获取校区信息
            .post(''+url+'/setting/getbranch', {
                token: sessionStorage.token
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.admin = response.data.data;
                }
            }, function(x) {
                ngDialog.open({
                  template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                  plain: true,
                  className: 'ngdialog-theme-default'
                });
            });
      }
      
      getBranchData();
      
      
      $scope.setBranchInfo = function() { // 设置分校管理员信息
        $http
          .post(''+url+'/setting/setsysuser', {
              token: sessionStorage.token,
              tname: $scope.admin.tname, 
              phone: $scope.admin.phone
          })
          .then(function(response) {
              if ( response.data.code != 200 ) {
                  requestError(response, $state, ngDialog);
              }else{
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  });
                  getBranchData();
              }
          }, function(x) { 
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
          });
      }
      
      
      
      $scope.setAdminInfo = function() { // 设置分校管理员密码
        
          if($scope.setAdminInfoForm.$valid) {
              $http
                .post(''+url+'/setting/setsysuser', {
                    token: sessionStorage.token, 
                    old_password: $scope.admin.old_password, 
                    password: $scope.admin.password
                })
                .then(function(response) {
                    if ( response.data.code != 200 ) {
                        requestError(response, $state, ngDialog);
                    }
                    else{
                        alert('密码修改成功，点击确定重新登录！');
                        signOut();
                    }
                }, function(x) { 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    ngDialog.close();
                });
          }else {
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>请确认密码输入正确</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
              ngDialog.close();
          }
      };
      
}]);



/**=========================================================
 * defaultController
 * author: BGOnline
 * version 1.0 2016-4-13
 =========================================================*/
 
App.controller('defaultController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);

      var getCountData = function() {
          $http
            .post(''+url+'/site/index', {
                token: sessionStorage.token
            })
            .then(function(response) {
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.countData = response.data.data.count;
                }
            }, function(x) { 
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getCountData();

      // noRefreshGetData(getCountData, getDataSpeed);
      
      //timeoutLock($state);
}]);




/**=========================================================
 * orderListController
 * author: BGOnline
 * version 1.0 2016-6-17
 =========================================================*/
 
App.controller('orderListController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      $scope.orderBranchName = sessionStorage.orderBranchName;
      $scope.crumbsBranchid = sessionStorage.orderBranchid;
      var getOrderListData = function(cp, t, st) {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/list/course_order', {
                token: sessionStorage.token, 
                p: cp, 
                search: sessionStorage.sOLValue != undefined && sessionStorage.sOLValue != 'undefined' ? sessionStorage.sOLValue : '', 
                time: t, 
                status: sessionStorage.orderState, 
                branch_name: sessionStorage.orderBranchName
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.orderData = response.data.data.mod_data; 
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.orderData.length > 0 ? $scope.ONullType = 'isNullTypeHidden' : $scope.ONullType = 'isNullTypeShow';
                    if($scope.orderBranchName) {
                        $('.removeBranchid').css({'visibility':'visible'})
                    }else {
                        $('.removeBranchid').css({'visibility':'hidden'})
                    }
              }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getOrderListData();

      $scope.pageChanged = function() {
          getOrderListData($scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页

      $scope.payTime = function(o) {
          return localData = new Date(parseInt(o.add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }

      $scope.sexs = [
          {value: 0, text: '保密'},
          {value: 1, text: '男'},
          {value: 2, text: '女'}
      ];
      
      $scope.showSex = function(x) {
          if(x.sex) {
              selected = $filter('filter')($scope.sexs, {value: x.sex});
          }
          return selected.length ? selected[0].text : 'Not set';
      };

      $scope.types = [
          {value: 0, class: 'label-default', text: '已取消'},
          {value: 1, class: 'label-danger', text: '待支付'},
          {value: 2, class: 'label-success', text: '已完成'}
      ];
      
      $scope.orderStatusClass = function(x) {
          if(x.status) {
              selected = $filter('filter')($scope.types, {value: x.status});
          }
          return selected.length ? selected[0].class : 'Not set';
      };
      
      $scope.orderStatusText = function(x) {
          if(x.status) {
              selected = $filter('filter')($scope.types, {value: x.status});
          }
          return selected.length ? selected[0].text : 'Not set';
      };

      $('.crumbs').click(function() {
        	if($scope.crumbsBranchid) {
              sessionStorage.setItem('atTheBranchid', $scope.crumbsBranchid);
              $state.go('app.atTheDetails');
          }else {
              $state.go('app.atTheMngt');
          }
      })

      $('.removeBranchid').click(function() {
          sessionStorage.removeItem('atTheBranchid');
          sessionStorage.removeItem('orderBranchName');
          getOrderListData();
          $scope.orderBranchName = sessionStorage.orderBranchName;
          $scope.crumbsBranchid = sessionStorage.atTheBranchid;
      })

      $scope.searchResult = sessionStorage.sOLValue;
      $scope.searchListData = function() {
          sessionStorage.setItem('sOLValue', $scope.sOLValue);
          $scope.searchResult = $scope.sOLValue;
          getOrderListData();
      }

      $scope.selectValue = sessionStorage.orderText;
      $scope.downSValue = function(value, text) {
          sessionStorage.setItem('orderState', value);
          sessionStorage.setItem('orderText', text);
          getOrderListData();
          $scope.selectValue = text;
          $('.downList').css({'visibility':'hidden'});
      }

      $scope.showRechargeTime = function(t) {
          getOrderListData('', t, '');
      }

      $('.downListIco').click(function() {
          if($('.downList').css('visibility') == 'visible') {
              $('.downList').css({'visibility':'hidden'});
          }else {
              $('.downList').css({'visibility':'visible'});
          }
      })
      
      // noRefreshGetData(getOrderListData, getDataSpeed);
      
      //timeoutLock($state);
}]);



/**=========================================================
 * commodityOrderController
 * author: BGOnline
 * version 1.0 2016-6-17
 =========================================================*/
 
App.controller('commodityOrderController', ['$scope', '$sce', '$rootScope', '$http', '$filter', '$state', 'ngDialog',
  function($scope, $sce, $rootScope, $http, $filter, $state, ngDialog) {
      
      errorJump($state);
      var listLoading = $('.list-loading');
      getCommodityOrderListData = function(cp, t, st) {
          listLoading.css({'display':'block'});
          $http
            .post(''+url+'/list/goods_order', {
                token: sessionStorage.token, 
                p: cp, 
                search: sessionStorage.CSOLValue != undefined && sessionStorage.CSOLValue != 'undefined' ? sessionStorage.CSOLValue : '', 
                time: t, 
                status: sessionStorage.cOrderState
            })
            .then(function(response) {
                listLoading.css({'display':'none'});
                if ( response.data.code != 200 ) {
                    requestError(response, $state, ngDialog);
                }
                else{ 
                    $scope.commodityOrderData = response.data.data.mod_data; 
                    var page = response.data.data.page_data;
                    $scope.showTotalItems = page.totalCount;
                    $scope.totalItems = page.totalCount - parseInt(page.totalCount/11);
                    $scope.commodityOrderData.length > 0 ? $scope.ONullType = 'isNullTypeHidden' : $scope.ONullType = 'isNullTypeShow';
              }
            }, function(x) { 
              listLoading.css({'display':'none'});
              ngDialog.open({
                template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                plain: true,
                className: 'ngdialog-theme-default'
              });
            });
      };
      
      getCommodityOrderListData();

      $scope.pageChanged = function() {
          getCommodityOrderListData($scope.currentPage - 1);
      };
      $scope.maxSize = 5; // 最多显示5页

      $scope.payTime = function(o) {
          return localData = new Date(parseInt(o.pay_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }

      $scope.sexs = [
          {value: 0, text: '保密'},
          {value: 1, text: '男'},
          {value: 2, text: '女'}
      ];
      
      $scope.showSex = function(x) {
          if(x.sex) {
              selected = $filter('filter')($scope.sexs, {value: x.sex});
          }
          return selected.length ? selected[0].text : 'Not set';
      };

      $scope.types = [
          {value: 0, class: 'label-default', text: '已取消'},
          {value: 2, class: 'label-primary', text: '装包中'},
          {value: 3, class: 'label-warning', text: '配送中'},
          {value: 4, class: 'label-success', text: '已完成'},
      ];
      
      $scope.orderStatusClass = function(x) {
          if(x.status) {
              selected = $filter('filter')($scope.types, {value: x.status});
          }
          return selected.length ? selected[0].class : 'Not set';
      };
      
      $scope.orderStatusText = function(x) {
          if(x.status) {
              selected = $filter('filter')($scope.types, {value: x.status});
          }
          return selected.length ? selected[0].text : 'Not set';
      };


      $scope.searchResult = sessionStorage.sOLValue;
      $scope.searchListData = function() {
          sessionStorage.setItem('CSOLValue', $scope.sOLValue);
          $scope.searchResult = $scope.sOLValue;
          getCommodityOrderListData();
      }

      $scope.selectValue = sessionStorage.cOrderText;
      $scope.downSValue = function(value, text) {
          sessionStorage.setItem('cOrderState', value);
          sessionStorage.setItem('cOrderText', text);
          getCommodityOrderListData();
          $scope.selectValue = text;
          $('.downList').css({'visibility':'hidden'});
      }

      $('.downListIco').click(function() {
          if($('.downList').css('visibility') == 'visible') {
              $('.downList').css({'visibility':'hidden'});
          }else {
              $('.downList').css({'visibility':'visible'});
          }
      })
      
      $scope.showRechargeTime = function(t) {
          getCommodityOrderListData('', t, '');
      }

      $scope.confirmReceipt = function(orderid) { //确认收货
          if(confirm('请确认商品已经送达！')) {
            $http
              .post(''+url+'/list/goods_order_edit', {
                  token: sessionStorage.token, status: 4, order_id: orderid
              })
              .then(function(response) {
                  listLoading.css({'display':'none'});
                  if ( response.data.code != 200 ) {
                      requestError(response, $state, ngDialog);
                  }
                  else{ 
                    ngDialog.open({
                      template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                      plain: true,
                      className: 'ngdialog-theme-default'
                    });
                    getCommodityOrderListData();
                }
              }, function(x) { 
                  listLoading.css({'display':'none'});
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  });
              });
          }
      }
      

      
      //noRefreshGetData(getUserData, getDataSpeed);
      
      //timeoutLock($state);
}]);


/**=========================================================
 * welcomeController
 * author: BGOnline
 * version 1.0 2016-6-21
 =========================================================*/
App.controller('welcomeController', ['$scope', function ($scope) {

    $scope.welcome = sessionStorage.branch_name;

}]);



/**=========================================================
 * Module: article.js
 =========================================================*/

App.controller('ArticleController', ['$scope', function ($scope) {

  $scope.htmlContent = 'Article content...';

  $scope.postDemo = {};
  $scope.postDemo.tags = ['coding', 'less'];
  $scope.availableTags = ['coding', 'less', 'sass', 'angularjs', 'node', 'expressJS'];
  $scope.postDemo.categories = ['JAVASCRIPT','WEB'];
  $scope.availableCategories = ['JAVASCRIPT','WEB', 'BOOTSTRAP', 'SERVER', 'HTML5', 'CSS'];

  $scope.reviewers = [
    { name: 'Adam',      email: 'adam@email.com',      age: 10 },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
    { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
  ];


  $scope.alerts = [
    { type: 'info', msg: 'There is an autosaved version of this article that is more recent than the version below. <a href="#" class="text-white">Restore</a>' }
  ];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});


App.controller('AngularCarouselController', ["$scope", function($scope) {

  $scope.colors = ["#fc0003", "#f70008", "#f2000d", "#ed0012", "#e80017", "#e3001c", "#de0021", "#d90026", "#d4002b", "#cf0030", "#c90036", "#c4003b", "#bf0040", "#ba0045", "#b5004a", "#b0004f", "#ab0054", "#a60059", "#a1005e", "#9c0063", "#960069", "#91006e", "#8c0073", "#870078", "#82007d", "#7d0082", "#780087", "#73008c", "#6e0091", "#690096", "#63009c", "#5e00a1", "#5900a6", "#5400ab", "#4f00b0", "#4a00b5", "#4500ba", "#4000bf", "#3b00c4", "#3600c9", "#3000cf", "#2b00d4", "#2600d9", "#2100de", "#1c00e3", "#1700e8", "#1200ed", "#0d00f2", "#0800f7", "#0300fc"];

  function getSlide(target, style) {
      var i = target.length;
      return {
          id: (i + 1),
          label: 'slide #' + (i + 1),
          img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10) ,
          color: $scope.colors[ (i*10) % $scope.colors.length],
          odd: (i % 2 === 0)
      };
  }

  function addSlide(target, style) {
      target.push(getSlide(target, style));
  }

  $scope.carouselIndex = 3;
  $scope.carouselIndex2 = 0;
  $scope.carouselIndex2 = 1;
  $scope.carouselIndex3 = 5;
  $scope.carouselIndex4 = 5;

  function addSlides(target, style, qty) {
      for (var i=0; i < qty; i++) {
          addSlide(target, style);
      }
  }

  // 1st ngRepeat demo
  $scope.slides = [];
  addSlides($scope.slides, 'sports', 50);

  // 2nd ngRepeat demo
  $scope.slides2 = [];
  addSlides($scope.slides2, 'sports', 10);

  // 3rd ngRepeat demo
  $scope.slides3 = [];
  addSlides($scope.slides3, 'people', 50);

  // 4th ngRepeat demo
  $scope.slides4 = [];
  addSlides($scope.slides4, 'city', 50);


  // 5th ngRepeat demo
  $scope.slides6 = [];
  $scope.carouselIndex6 = 0;
  addSlides($scope.slides6, 'sports', 10);
  $scope.addSlide = function(at) {
      if(at==='head') {
          $scope.slides6.unshift(getSlide($scope.slides6, 'people'));
      } else {
          $scope.slides6.push(getSlide($scope.slides6, 'people'));
      }
  };

}]);

/**=========================================================
 * Module: carousel.js
 * Controller for ChartJs
 =========================================================*/

App.controller('ChartJSController', ["$scope", "colors", function($scope, colors) {

  // random values for demo
  var rFactor = function(){ return Math.round(Math.random()*100); };


// Line chart
// ----------------------------------- 

  $scope.lineData = {
      labels : ['January','February','March','April','May','June','July'],
      datasets : [
        {
          label: 'My First dataset',
          fillColor : 'rgba(114,102,186,0.2)',
          strokeColor : 'rgba(114,102,186,1)',
          pointColor : 'rgba(114,102,186,1)',
          pointStrokeColor : '#fff',
          pointHighlightFill : '#fff',
          pointHighlightStroke : 'rgba(114,102,186,1)',
          data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
        },
        {
          label: 'My Second dataset',
          fillColor : 'rgba(35,183,229,0.2)',
          strokeColor : 'rgba(35,183,229,1)',
          pointColor : 'rgba(35,183,229,1)',
          pointStrokeColor : '#fff',
          pointHighlightFill : '#fff',
          pointHighlightStroke : 'rgba(35,183,229,1)',
          data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
        }
      ]
    };


  $scope.lineOptions = {
    scaleShowGridLines : true,
    scaleGridLineColor : 'rgba(0,0,0,.05)',
    scaleGridLineWidth : 1,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
  };


// Bar chart
// ----------------------------------- 

  $scope.barData = {
      labels : ['January','February','March','April','May','June','July'],
      datasets : [
        {
          fillColor : colors.byName('info'),
          strokeColor : colors.byName('info'),
          highlightFill: colors.byName('info'),
          highlightStroke: colors.byName('info'),
          data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
        },
        {
          fillColor : colors.byName('primary'),
          strokeColor : colors.byName('primary'),
          highlightFill : colors.byName('primary'),
          highlightStroke : colors.byName('primary'),
          data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
        }
      ]
  };
  
  $scope.barOptions = {
    scaleBeginAtZero : true,
    scaleShowGridLines : true,
    scaleGridLineColor : 'rgba(0,0,0,.05)',
    scaleGridLineWidth : 1,
    barShowStroke : true,
    barStrokeWidth : 2,
    barValueSpacing : 5,
    barDatasetSpacing : 1,
  };


//  Doughnut chart
// ----------------------------------- 
  
  $scope.doughnutData = [
        {
          value: 300,
          color: colors.byName('purple'),
          highlight: colors.byName('purple'),
          label: 'Purple'
        },
        {
          value: 50,
          color: colors.byName('info'),
          highlight: colors.byName('info'),
          label: 'Info'
        },
        {
          value: 100,
          color: colors.byName('yellow'),
          highlight: colors.byName('yellow'),
          label: 'Yellow'
        }
      ];

  $scope.doughnutOptions = {
    segmentShowStroke : true,
    segmentStrokeColor : '#fff',
    segmentStrokeWidth : 2,
    percentageInnerCutout : 85,
    animationSteps : 100,
    animationEasing : 'easeOutBounce',
    animateRotate : true,
    animateScale : false
  };

// Pie chart
// ----------------------------------- 

  $scope.pieData =[
        {
          value: 300,
          color: colors.byName('purple'),
          highlight: colors.byName('purple'),
          label: 'Purple'
        },
        {
          value: 40,
          color: colors.byName('yellow'),
          highlight: colors.byName('yellow'),
          label: 'Yellow'
        },
        {
          value: 120,
          color: colors.byName('info'),
          highlight: colors.byName('info'),
          label: 'Info'
        }
      ];

  $scope.pieOptions = {
    segmentShowStroke : true,
    segmentStrokeColor : '#fff',
    segmentStrokeWidth : 2,
    percentageInnerCutout : 0, // Setting this to zero convert a doughnut into a Pie
    animationSteps : 100,
    animationEasing : 'easeOutBounce',
    animateRotate : true,
    animateScale : false
  };

// Polar chart
// ----------------------------------- 
  
  $scope.polarData = [
        {
          value: 300,
          color: colors.byName('pink'),
          highlight: colors.byName('pink'),
          label: 'Red'
        },
        {
          value: 50,
          color: colors.byName('purple'),
          highlight: colors.byName('purple'),
          label: 'Green'
        },
        {
          value: 100,
          color: colors.byName('pink'),
          highlight: colors.byName('pink'),
          label: 'Yellow'
        },
        {
          value: 140,
          color: colors.byName('purple'),
          highlight: colors.byName('purple'),
          label: 'Grey'
        },
      ];

  $scope.polarOptions = {
    scaleShowLabelBackdrop : true,
    scaleBackdropColor : 'rgba(255,255,255,0.75)',
    scaleBeginAtZero : true,
    scaleBackdropPaddingY : 1,
    scaleBackdropPaddingX : 1,
    scaleShowLine : true,
    segmentShowStroke : true,
    segmentStrokeColor : '#fff',
    segmentStrokeWidth : 2,
    animationSteps : 100,
    animationEasing : 'easeOutBounce',
    animateRotate : true,
    animateScale : false
  };


// Radar chart
// ----------------------------------- 

  $scope.radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(114,102,186,0.2)',
        strokeColor: 'rgba(114,102,186,1)',
        pointColor: 'rgba(114,102,186,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(114,102,186,1)',
        data: [65,59,90,81,56,55,40]
      },
      {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28,48,40,19,96,27,100]
      }
    ]
  };

  $scope.radarOptions = {
    scaleShowLine : true,
    angleShowLineOut : true,
    scaleShowLabels : false,
    scaleBeginAtZero : true,
    angleLineColor : 'rgba(0,0,0,.1)',
    angleLineWidth : 1,
    pointLabelFontFamily : "'Arial'",
    pointLabelFontStyle : 'bold',
    pointLabelFontSize : 10,
    pointLabelFontColor : '#565656',
    pointDot : true,
    pointDotRadius : 3,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true
  };



}]);

/**=========================================================
 * Module: chartist.js
 =========================================================*/

App.controller('ChartistController', ['$scope', function ($scope) {
  'use strict';

  // Line chart
  // ----------------------------------- 

  $scope.lineData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  };

  $scope.lineOptions = {
    fullWidth: true,
    height: 220,
    chartPadding: {
      right: 40
    }
  };

  // Bar bipolar
  // ----------------------------------- 

  $scope.barBipolarOptions = {
    high: 10,
    low: -10,
    height: 220,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };
  $scope.barBipolarData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  };


  // Bar horizontal
  // ----------------------------------- 

  $scope.barHorizontalData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [
      [5, 4, 3, 7, 5, 10, 3],
      [3, 2, 9, 5, 4, 6, 4]
    ]
  };

  $scope.barHorizontalOptions = {
    seriesBarDistance: 10,
    reverseData: true,
    horizontalBars: true,
    height: 220,
    axisY: {
      offset: 70
    }
  };

  // Smil Animations
  // ----------------------------------- 

  // Let's put a sequence number aside so we can use it in the event callbacks
  var seq = 0,
    delays = 80,
    durations = 500;

  $scope.smilData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
      [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
      [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
      [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
      [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
    ]
  };

  $scope.smilOptions = {
    low: 0,
    height: 260
  };

  $scope.smilEvents = {
    created: function() {
      seq = 0;
    },
    draw: function(data) {
      seq++;

      if(data.type === 'line') {
        // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
        data.element.animate({
          opacity: {
            // The delay when we like to start the animation
            begin: seq * delays + 1000,
            // Duration of the animation
            dur: durations,
            // The value where the animation should start
            from: 0,
            // The value where it should end
            to: 1
          }
        });
      } else if(data.type === 'label' && data.axis === 'x') {
        data.element.animate({
          y: {
            begin: seq * delays,
            dur: durations,
            from: data.y + 100,
            to: data.y,
            // We can specify an easing function from Chartist.Svg.Easing
            easing: 'easeOutQuart'
          }
        });
      } else if(data.type === 'label' && data.axis === 'y') {
        data.element.animate({
          x: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 100,
            to: data.x,
            easing: 'easeOutQuart'
          }
        });
      } else if(data.type === 'point') {
        data.element.animate({
          x1: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart'
          },
          x2: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart'
          },
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'easeOutQuart'
          }
        });
      } else if(data.type === 'grid') {

        // Using data.axis we get x or y which we can use to construct our animation definition objects
        var pos1Animation = {
          begin: seq * delays,
          dur: durations,
          from: data[data.axis + '1'] - 30,
          to: data[data.axis + '1'],
          easing: 'easeOutQuart'
        };

        var pos2Animation = {
          begin: seq * delays,
          dur: durations,
          from: data[data.axis + '2'] - 100,
          to: data[data.axis + '2'],
          easing: 'easeOutQuart'
        };

        var animations = {};
        animations[data.axis + '1'] = pos1Animation;
        animations[data.axis + '2'] = pos2Animation;
        animations['opacity'] = {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: 'easeOutQuart'
        };

        data.element.animate(animations);
      }
    }
  };


  // SVG PATH animation
  // ----------------------------------- 

  $scope.pathData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    series: [
      [1, 5, 2, 5, 4, 3],
      [2, 3, 4, 8, 1, 2],
      [5, 4, 3, 2, 1, 0.5]
    ]
  };

  $scope.pathOptions = {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true,
    height: 260
  };

  $scope.pathEvents = {
    draw: function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    }
  };

}]);

/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

App.controller('CodeEditorController', ['$scope', '$http', '$ocLazyLoad', function ($scope, $http, $ocLazyLoad) {
  
  $scope.editorThemes = ['3024-day','3024-night','ambiance-mobile','ambiance','base16-dark','base16-light','blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark','mbo','mdn-like','midnight','monokai','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark','rubyblue','solarized','the-matrix','tomorrow-night-eighties','twilight','vibrant-ink','xq-dark','xq-light'];

  $scope.editorOpts = {
    mode: 'javascript',
    lineNumbers: true,
    matchBrackets: true,
    theme: 'mbo',
    viewportMargin: Infinity
  };

  $scope.refreshEditor = 0;

  // Load dinamically the stylesheet for the selected theme
  // You can use ozLazyLoad to load also the mode js based 
  // on the file extension that is loaded (see handle_filetree)
  $scope.loadTheme = function() {
    var BASE = 'vendor/codemirror/theme/';
    $ocLazyLoad.load(BASE + $scope.editorOpts.theme + '.css');
    $scope.refreshEditor = !$scope.refreshEditor;
  };
  // load default theme
  $scope.loadTheme($scope.editorOpts.theme);
  // Add some initial text
  $scope.code = "// Open a file from the left menu \n" +
                "// It will be requested to the server and loaded into the editor\n" +
                "// Also try adding a New File from the toolbar\n";


  // Tree

  var selectedBranch;
  $scope.handle_filetree = function(branch) {
    
    selectedBranch = branch;

    var basePath = 'server/editor/';
    var isFolder = !!branch.children.length;

    console.log("You selected: " + branch.label + ' - isFolder? ' + isFolder);

    if ( ! isFolder ) {

      $http
        .get( basePath + branch.path )
        .success(function(response){
          
          console.log('Loaded.. ' + branch.path);
          // set the new code into the editor
          $scope.code = response;
          
          $scope.editorOpts.mode = detectMode(branch.path);
          console.log( 'Mode is: ' + $scope.editorOpts.mode);

        });
    }
  };

  function detectMode(file) {
    var ext = file.split('.');
    ext = ext ? ext[ext.length - 1] : '';
    switch (ext) {
      case 'html':  return 'htmlmixed';
      case 'css':   return 'css';
      default:      return 'javascript';
    }
  }

  var tree;
  tree = $scope.filetree = {};

  // Adds a new branch to the tree
  $scope.new_filetree = function() {
    var b;
    b = tree.get_selected_branch();

    // if we select a leaf -> select the parent folder
    if ( b && b.children.length === 0 ) {
      b = tree.get_parent_branch(b);
    }
    
    return tree.add_branch(b, {
      "label": "another.html",
      "path": "source/another.html"
    });
  };

}]).service('LoadTreeService', ["$resource", function($resource) {
   return $resource('server/editor/filetree.json');
}]);

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

App.controller('DataTableController', ['$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
  function($scope, $resource, DTOptionsBuilder, DTColumnDefBuilder) {
  'use strict';

  // Ajax

  $resource('server/datatable.json').query().$promise.then(function(persons) {
      $scope.persons = persons;
  });

  // Changing data

  $scope.heroes = [{
      "id": 860,
      "firstName": "Superman",
      "lastName": "Yoda"
    }, {
      "id": 870,
      "firstName": "Ace",
      "lastName": "Ventura"
    }, {
      "id": 590,
      "firstName": "Flash",
      "lastName": "Gordon"
    }, {
      "id": 803,
      "firstName": "Luke",
      "lastName": "Skywalker"
    }
  ];

  $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
  $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3).notSortable()
  ];
  $scope.person2Add = _buildPerson2Add(1);
  $scope.addPerson = addPerson;
  $scope.modifyPerson = modifyPerson;
  $scope.removePerson = removePerson;

  function _buildPerson2Add(id) {
      return {
          id: id,
          firstName: 'Foo' + id,
          lastName: 'Bar' + id
      };
  }
  function addPerson() {
      $scope.heroes.push(angular.copy($scope.person2Add));
      $scope.person2Add = _buildPerson2Add($scope.person2Add.id + 1);
  }
  function modifyPerson(index) {
      $scope.heroes.splice(index, 1, angular.copy($scope.person2Add));
      $scope.person2Add = _buildPerson2Add($scope.person2Add.id + 1);
  }
  function removePerson(index) {
      $scope.heroes.splice(index, 1);
  }

}]);
/**=========================================================
 * Module: demo-alerts.js
 * Provides a simple demo for pagination
 =========================================================*/

App.controller('AlertDemoCtrl', ['$scope', function AlertDemoCtrl($scope) {

  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'warning', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

App.controller('ButtonsCtrl', ['$scope', function ($scope) {

  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    left: false,
    middle: true,
    right: false
  };

}]);
/**=========================================================
 * Module: demo-carousel.js
 * Provides a simple demo for bootstrap ui carousel
 =========================================================*/

App.controller('CarouselDemoCtrl', ['$scope', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 800 + slides.length;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 2] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
    });
  };
  for (var i=0; i<2; i++) {
    $scope.addSlide();
  }
}]);
/**=========================================================
 * Module: demo-datepicker.js
 * Provides a simple demo for bootstrap datepicker
 =========================================================*/

App.controller('DatepickerDemoCtrl', ['$scope', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

}]);

/**=========================================================
 * Module: demo-dialog.js
 * Demo for multiple ngDialog Usage
 * - ngDialogProvider for default values not supported 
 *   using lazy loader. Include plugin in base.js instead.
 =========================================================*/

// Called from the route state. 'tpl' is resolved before
App.controller('DialogIntroCtrl', ['$scope', 'ngDialog', 'tpl', function($scope, ngDialog, tpl) {
  'user strict';
  
  // share with other controllers
  $scope.tpl = tpl;
  // open dialog window
  ngDialog.open({
    template: tpl.path,
    // plain: true,
    className: 'ngdialog-theme-default'
  });

}]);

// Loads from view
App.controller('DialogMainCtrl', ["$scope", "$rootScope", "ngDialog", function ($scope, $rootScope, ngDialog) {
  'user strict';

  $rootScope.jsonData = '{"foo": "bar"}';
  $rootScope.theme = 'ngdialog-theme-default';

  $scope.directivePreCloseCallback = function (value) {
    if(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
      return true;
    }
    return false;
  };

  $scope.preCloseCallbackOnScope = function (value) {
    if(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
      return true;
    }
    return false;
  };

  $scope.open = function () {
    ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
  };

  $scope.openDefault = function () {
    ngDialog.open({
      template: 'firstDialogId',
      controller: 'InsideCtrl',
      className: 'ngdialog-theme-default'
    });
  };

  $scope.openDefaultWithPreCloseCallbackInlined = function () {
    ngDialog.open({
      template: 'firstDialogId',
      controller: 'InsideCtrl',
      className: 'ngdialog-theme-default',
      preCloseCallback: function(value) {
        if (confirm('Close it?  (Value = ' + value + ')')) {
          return true;
        }
        return false;
      }
    });
  };

  $scope.openConfirm = function () {
    ngDialog.openConfirm({
      template: 'modalDialogId',
      className: 'ngdialog-theme-default'
    }).then(function (value) {
      console.log('Modal promise resolved. Value: ', value);
    }, function (reason) {
      console.log('Modal promise rejected. Reason: ', reason);
    });
  };

  $scope.openConfirmWithPreCloseCallbackOnScope = function () {
    ngDialog.openConfirm({
      template: 'modalDialogId',
      className: 'ngdialog-theme-default',
      preCloseCallback: 'preCloseCallbackOnScope',
      scope: $scope
    }).then(function (value) {
      console.log('Modal promise resolved. Value: ', value);
    }, function (reason) {
      console.log('Modal promise rejected. Reason: ', reason);
    });
  };

  $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
    ngDialog.openConfirm({
      template: 'dialogWithNestedConfirmDialogId',
      className: 'ngdialog-theme-default',
      preCloseCallback: function(value) {

        var nestedConfirmDialog = ngDialog.openConfirm({
          template:
              '<p>Are you sure you want to close the parent dialog?</p>' +
              '<div>' +
                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
              '</button></div>',
          plain: true,
          className: 'ngdialog-theme-default'
        });

        return nestedConfirmDialog;
      },
      scope: $scope
    })
    .then(function(value){
      console.log('resolved:' + value);
      // Perform the save here
    }, function(value){
      console.log('rejected:' + value);

    });
  };

  $scope.openInlineController = function () {
    $rootScope.theme = 'ngdialog-theme-default';

    ngDialog.open({
      template: 'withInlineController',
      controller: ['$scope', '$timeout', function ($scope, $timeout) {
        var counter = 0;
        var timeout;
        function count() {
          $scope.exampleExternalData = 'Counter ' + (counter++);
          timeout = $timeout(count, 450);
        }
        count();
        $scope.$on('$destroy', function () {
          $timeout.cancel(timeout);
        });
      }],
      className: 'ngdialog-theme-default'
    });
  };

  $scope.openTemplate = function () {
    $scope.value = true;

    ngDialog.open({
      template: $scope.tpl.path,
      className: 'ngdialog-theme-default',
      scope: $scope
    });
  };

  $scope.openTemplateNoCache = function () {
    $scope.value = true;

    ngDialog.open({
      template: $scope.tpl.path,
      className: 'ngdialog-theme-default',
      scope: $scope,
      cache: false
    });
  };

  $scope.openTimed = function () {
    var dialog = ngDialog.open({
      template: '<p>Just passing through!</p>',
      plain: true,
      closeByDocument: false,
      closeByEscape: false
    });
    setTimeout(function () {
      dialog.close();
    }, 2000);
  };

  $scope.openNotify = function () {
    var dialog = ngDialog.open({
      template:
        '<p>You can do whatever you want when I close, however that happens.</p>' +
        '<div><button type="button" class="btn btn-primary" ng-click="closeThisDialog(1)">Close Me</button></div>',
      plain: true
    });
    dialog.closePromise.then(function (data) {
      console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
    });
  };

  $scope.openWithoutOverlay = function () {
    ngDialog.open({
      template: '<h2>Notice that there is no overlay!</h2>',
      className: 'ngdialog-theme-default',
      plain: true,
      overlay: false
    });
  };

  $rootScope.$on('ngDialog.opened', function (e, $dialog) {
    console.log('ngDialog opened: ' + $dialog.attr('id'));
  });

  $rootScope.$on('ngDialog.closed', function (e, $dialog) {
    console.log('ngDialog closed: ' + $dialog.attr('id'));
  });

  $rootScope.$on('ngDialog.closing', function (e, $dialog) {
    console.log('ngDialog closing: ' + $dialog.attr('id'));
  });
}]);

App.controller('InsideCtrl', ["$scope", "ngDialog", function ($scope, ngDialog) {
  'user strict';
  $scope.dialogModel = {
    message : 'message from passed scope'
  };
  $scope.openSecond = function () {
    ngDialog.open({
      template: '<p class="lead m0"><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
      plain: true,
      closeByEscape: false,
      controller: 'SecondModalCtrl'
    });
  };
}]);

App.controller('SecondModalCtrl', ["$scope", "ngDialog", function ($scope, ngDialog) {
  'user strict';
  $scope.closeSecond = function () {
    ngDialog.close();
  };
}]);

App.controller('FormDemoCtrl', ["$scope", "$resource", function($scope, $resource) {
  'use strict';

  // the following allow to request array $resource instead of object (default)
  var actions = {'get': {method: 'GET', isArray: true}};
  
  // Tags inputs
  // ----------------------------------- 
  var Cities = $resource('server/cities.json', {}, actions);

  Cities.get(function(data){

      $scope.cities = data;

  });
  // for non ajax form just fill the scope variable
  // $scope.cities = ['Amsterdam','Washington','Sydney','Beijing','Cairo'];

  // Slider demo values
  $scope.slider1 = 5;
  $scope.slider2 = 10;
  $scope.slider3 = 15;
  $scope.slider4 = 20;
  $scope.slider5 = 25;
  $scope.slider6 = 30;
  $scope.slider7 = 10;
  $scope.slider8 = [250,750];

  // Chosen data
  // ----------------------------------- 

  var States = $resource('server/chosen-states.json', {},  {'query':    {method:'GET', isArray:true} });

  $scope.states = States.query();


  $scope.alertSubmit = function(){
    alert('Form submitted!');
    return false;
  };

  // Angular wysiwyg 
  // ----------------------------------- 

  $scope.wysiwygContent = '<p> Write something here.. </p>';

  // Text Angular (wysiwyg)
  // ----------------------------------- 
  
  $scope.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><a href="https://github.com/fraywing/textAngular">Source</a> </p>';


}]);
/**=========================================================
 * Module: demo-notify.js
 * Provides a simple demo for notify
 =========================================================*/

App.controller('NotifyDemoCtrl', ['$scope', 'Notify', '$timeout', function AlertDemoCtrl($scope, Notify, $timeout) {

  $scope.msgHtml = "<em class='fa fa-check'></em> Message with icon..";

  $scope.notifyMsg = "Some messages here..";
  $scope.notifyOpts = {
    status: 'danger',
    pos: 'bottom-center'
  };

  // Service usage example
  $timeout(function(){
    
    Notify.alert( 
        'This is a custom message from notify..', 
        {status: 'success'}
    );
  
  }, 500);



}]);
/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

App.controller('PaginationDemoCtrl', ['$scope', function ($scope) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
}]);
/**=========================================================
 * Module: demo-panels.js
 * Provides a simple demo for panel actions
 =========================================================*/

App.controller('PanelsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

  // PANEL COLLAPSE EVENTS
  // ----------------------------------- 

  // We can use panel id name for the boolean flag to [un]collapse the panel
  $scope.$watch('panelDemo1',function(newVal){
      
      console.log('panelDemo1 collapsed: ' + newVal);

  });


  // PANEL DISMISS EVENTS
  // ----------------------------------- 

  // Before remove panel
  $scope.$on('panel-remove', function(event, id, deferred){
    
    console.log('Panel #' + id + ' removing');
    
    // Here is obligatory to call the resolve() if we pretend to remove the panel finally
    // Not calling resolve() will NOT remove the panel
    // It's up to your app to decide if panel should be removed or not
    deferred.resolve();
  
  });

  // Panel removed ( only if above was resolved() )
  $scope.$on('panel-removed', function(event, id){

    console.log('Panel #' + id + ' removed');

  });


  // PANEL REFRESH EVENTS
  // ----------------------------------- 

  $scope.$on('panel-refresh', function(event, id) {
    var secs = 3;
    
    console.log('Refreshing during ' + secs +'s #'+id);

    $timeout(function(){
      // directive listen for to remove the spinner 
      // after we end up to perform own operations
      $scope.$broadcast('removeSpinner', id);
      
      console.log('Refreshed #' + id);

    }, 3000);

  });

  // PANELS VIA NG-REPEAT
  // ----------------------------------- 

  $scope.panels = [
    {
      id: 'panelRepeat1',
      title: 'Panel Title 1',
      body: 'Nulla eget lorem leo, sit amet elementum lorem. '
    },
    {
      id: 'panelRepeat2',
      title: 'Panel Title 2',
      body: 'Nulla eget lorem leo, sit amet elementum lorem. '
    },
    {
      id: 'panelRepeat3',
      title: 'Panel Title 3',
      body: 'Nulla eget lorem leo, sit amet elementum lorem. '
    }
  ];

}]);
/**=========================================================
 * Module: demo-popover.js
 * Provides a simple demo for popovers
 =========================================================*/

App.controller('PopoverDemoCtrl', ['$scope', function ($scope) {
  
  $scope.dynamicPopover = 'Hello, World!';
  $scope.dynamicPopoverTitle = 'Title';

}]);
/**=========================================================
 * Module: demo-progress.js
 * Provides a simple demo to animate progress bar
 =========================================================*/

App.controller('ProgressDemoCtrl', ['$scope', function ($scope) {

  $scope.max = 200;

  $scope.random = function() {
    var value = Math.floor((Math.random() * 100) + 1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    $scope.showWarning = (type === 'danger' || type === 'warning');

    $scope.dynamic = value;
    $scope.type = type;
  };
  $scope.random();

  $scope.randomStacked = function() {
    $scope.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
        var index = Math.floor((Math.random() * 4));
        $scope.stacked.push({
          value: Math.floor((Math.random() * 30) + 1),
          type: types[index]
        });
    }
  };
  $scope.randomStacked();
}]);
/**=========================================================
 * Module: demo-rating.js
 * Provides a demo for ratings UI
 =========================================================*/

App.controller('RatingDemoCtrl', ['$scope', function ($scope) {

  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'fa fa-check', stateOff: 'fa fa-check-circle'},
    {stateOn: 'fa fa-star', stateOff: 'fa fa-star-o'},
    {stateOn: 'fa fa-heart', stateOff: 'fa fa-ban'},
    {stateOn: 'fa fa-heart'},
    {stateOff: 'fa fa-power-off'}
  ];

}]);
/**=========================================================
 * Module: demo-timepicker.js
 * Provides a simple demo for bootstrap ui timepicker
 =========================================================*/

App.controller('TimepickerDemoCtrl', ['$scope', function ($scope) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
}]);

/**=========================================================
 * Module: demo-toaster.js
 * Demos for toaster notifications
 =========================================================*/

App.controller('ToasterDemoCtrl', ['$scope', 'toaster', function($scope, toaster) {

  $scope.toaster = {
      type:  'success',
      title: 'Title',
      text:  'Message'
  };

  $scope.pop = function() {
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

}]);
/**=========================================================
 * Module: demo-tooltip.js
 * Provides a simple demo for tooltip
 =========================================================*/
App.controller('TooltipDemoCtrl', ['$scope', function ($scope) {

  $scope.dynamicTooltip = 'Hello, World!';
  $scope.dynamicTooltipText = 'dynamic';
  $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';

}]);
/**=========================================================
 * Module: demo-typeahead.js
 * Provides a simple demo for typeahead
 =========================================================*/

App.controller('TypeaheadCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.selected = undefined;
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(res){
      var addresses = [];
      angular.forEach(res.data.results, function(item){
        addresses.push(item.formatted_address);
      });
      return addresses;
    });
  };

  $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];

}]);
/**=========================================================
 * Module: flot-chart.js
 * Setup options and data for flot chart directive
 =========================================================*/

App.controller('FlotChartController', ['$scope', 'ChartData', '$timeout', function($scope, ChartData, $timeout) {
  'use strict';
  
  // BAR
  // ----------------------------------- 
  $scope.barData = ChartData.load('server/chart/bar.json');
  $scope.barOptions = {
      series: {
          bars: {
              align: 'center',
              lineWidth: 0,
              show: true,
              barWidth: 0.6,
              fill: 0.9
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories'
      },
      yaxis: {
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickColor: '#eee'
      },
      shadowSize: 0
  };

  // BAR STACKED
  // ----------------------------------- 
  $scope.barStackeData = ChartData.load('server/chart/barstacked.json');
  $scope.barStackedOptions = {
      series: {
          stack: true,
          bars: {
              align: 'center',
              lineWidth: 0,
              show: true,
              barWidth: 0.6,
              fill: 0.9
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories'
      },
      yaxis: {
          min: 0,
          max: 200, // optional: use it for a clear represetation
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickColor: '#eee'
      },
      shadowSize: 0
  };

  // SPLINE
  // ----------------------------------- 
  $scope.splineData = ChartData.load('server/chart/spline.json');
  $scope.splineOptions = {
      series: {
          lines: {
              show: false
          },
          points: {
              show: true,
              radius: 4
          },
          splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.5
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories'
      },
      yaxis: {
          min: 0,
          max: 150, // optional: use it for a clear represetation
          tickColor: '#eee',
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickFormatter: function (v) {
              return v/* + ' visitors'*/;
          }
      },
      shadowSize: 0
  };

  // AREA
  // ----------------------------------- 
  $scope.areaData = ChartData.load('server/chart/area.json');
  $scope.areaOptions = {
      series: {
          lines: {
              show: true,
              fill: 0.8
          },
          points: {
              show: true,
              radius: 4
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories'
      },
      yaxis: {
          min: 0,
          tickColor: '#eee',
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickFormatter: function (v) {
              return v + ' visitors';
          }
      },
      shadowSize: 0
  };

  // LINE
  // ----------------------------------- 
  $scope.lineData = ChartData.load('server/chart/line.json');
  $scope.lineOptions = {
      series: {
          lines: {
              show: true,
              fill: 0.01
          },
          points: {
              show: true,
              radius: 4
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#eee',
          mode: 'categories'
      },
      yaxis: {
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickColor: '#eee'
      },
      shadowSize: 0
  };

  // PIE
  // ----------------------------------- 
  $scope.pieData = ChartData.load('server/chart/pie.json');
  $scope.pieOptions = {
      series: {
          pie: {
              show: true,
              innerRadius: 0,
              label: {
                  show: true,
                  radius: 0.8,
                  formatter: function (label, series) {
                      return '<div class="flot-pie-label">' +
                      //label + ' : ' +
                      Math.round(series.percent) +
                      '%</div>';
                  },
                  background: {
                      opacity: 0.8,
                      color: '#222'
                  }
              }
          }
      }
  };

  // DONUT
  // ----------------------------------- 
  $scope.donutData = ChartData.load('server/chart/donut.json');
  $scope.donutOptions = {
      series: {
          pie: {
              show: true,
              innerRadius: 0.5 // This makes the donut shape
          }
      }
  };


  // REALTIME
  // ----------------------------------- 
  $scope.realTimeOptions = {
      series: {
        lines: { show: true, fill: true, fillColor:  { colors: ['#a0e0f3', '#23b7e5'] } },
        shadowSize: 0 // Drawing is faster without shadows
      },
      grid: {
          show:false,
          borderWidth: 0,
          minBorderMargin: 20,
          labelMargin: 10
      },
      xaxis: {
        tickFormatter: function() {
            return "";
        }
      },
      yaxis: {
          min: 0,
          max: 110
      },
      legend: {
          show: true
      },
      colors: ["#23b7e5"]
  };

  // Generate random data for realtime demo
  var data = [], totalPoints = 300;
    
  update();

  function getRandomData() {
    if (data.length > 0)
      data = data.slice(1);
    // Do a random walk
    while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;
      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }
      data.push(y);
    }
    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }
    return [res];
  }
  function update() {
    $scope.realTimeData = getRandomData();
    $timeout(update, 30);
  }
  // end random data generation


  // PANEL REFRESH EVENTS
  // ----------------------------------- 

  $scope.$on('panel-refresh', function(event, id) {
    
    console.log('Simulating chart refresh during 3s on #'+id);

    // Instead of timeout you can request a chart data
    $timeout(function(){
      
      // directive listen for to remove the spinner 
      // after we end up to perform own operations
      $scope.$broadcast('removeSpinner', id);
      
      console.log('Refreshed #' + id);

    }, 3000);

  });


  // PANEL DISMISS EVENTS
  // ----------------------------------- 

  // Before remove panel
  $scope.$on('panel-remove', function(event, id, deferred){
    
    console.log('Panel #' + id + ' removing');
    
    // Here is obligatory to call the resolve() if we pretend to remove the panel finally
    // Not calling resolve() will NOT remove the panel
    // It's up to your app to decide if panel should be removed or not
    deferred.resolve();
  
  });

  // Panel removed ( only if above was resolved() )
  $scope.$on('panel-removed', function(event, id){

    console.log('Panel #' + id + ' removed');

  });
  
}]).service('ChartData', ["$resource", function($resource){
  
  var opts = {
      get: { method: 'GET', isArray: true }
    };
  return {
    load: function(source){
      return $resource(source, {}, opts).get();
    }
  };
}]);
/**=========================================================
 * Module: form-imgcrop.js
 * Image crop controller
 =========================================================*/
App.controller('ImageCropController', ["$scope", function($scope) {

  $scope.reset = function() {
    $scope.myImage        = '';
    $scope.myCroppedImage = '';
    $scope.imgcropType    = "square";
  };

  $scope.reset();

  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    if(file)
      reader.readAsDataURL(file);
  };
  
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

}]);

/**=========================================================
 * 无操作超时自动锁屏
 * author: BGOnline
 * version 1.0 2016-3-28
 =========================================================*/

var timeoutLock = (function($state) {
    
    if(localStorage.lockTime == 0) {
        return;
    }else {
        document.onmousemove = function() { window.lastMove = new Date().getTime(); }; 
        document.onkeydown = function() { window.lastMove = new Date().getTime(); }; 
        
        var timer = 1000 * localStorage.lockTime;
        window.lastMove = new Date().getTime();
        var lockInterval = setInterval(function() {
            var now = new Date().getTime(); 
            if( now - lastMove >= timer ) { 
                $state.go('page.lock');
            }
        }, 1000); 

    }
    
    
});

 
/**=========================================================
 * lock
 * author: BGOnline
 * version 1.0 2016-3-25
 =========================================================*/

App.controller('lockScreenController',['$scope', '$state', function($scope, $state) {
    
    lockCount = parseInt(sessionStorage.lockCount); // 计数器
    
    // 锁屏计时 2016-3-29
    var getLock = (function() { // 时间显示
        
        lockCount += 1;
        hour = parseInt(lockCount / 3600);
        min = parseInt(lockCount / 60);
        if(min >= 60){ min %= 60 } 
        secs = lockCount % 60;
        if( hour > 24) { signOut(); }
        
        var lockClockDom = document.getElementsByName('lockClock');
        // 数字填充
        var j = function(arg){ return arg >= 10 ? arg : "0" + arg; }
        lockClockDom[0].innerHTML = j(hour)+'时'+j(min)+'分'+j(secs)+'秒'; 
        
        sessionStorage.setItem('lockCount', lockCount); // 保留刷新时的时间
    });
    
    getLock(lockCount); // 时间初始化
    
    (function() {
        return intervalTimer = setInterval(function() { // 时间变化
            getLock(lockCount); 
        }, 1000); 
    })();
    
    
    // 锁屏
    sessionStorage.removeItem('suserid');
    $scope.unLock = function() {
        var md5Pwd = hex_md5($scope.lockPassword);
        var tempArr = new Array();
        for(var i = 0; i < 32; i += 2) { // 加密比对
            if(i%3){
                tempArr.push(md5Pwd.substr(i, 2).split("").reverse().join(""));
            }else {
                tempArr.push(md5Pwd.substr(i, 2));
            }
        }
        var encryptPassword = hex_md5(tempArr.join(''));
        if(encryptPassword != sessionStorage.password) {
            $scope.errorInfo = "密码不匹配！";
        }
        else {
            sessionStorage.setItem("suserid", sessionStorage.tempSuserid);
            clearInterval(intervalTimer);
            lockClockInit(lockCountInit);// 锁屏计数器初始化
            history.go(-1);
            timeoutLock($state);
        }
    }
    
}])


/**=========================================================
 * setUp 设置中心
 * author: BGOnline
 * version 1.0 2016-3-31
 =========================================================*/

App.controller('setUpCtrl', ['$scope', '$http', 'FileUploader', '$state', 'ngDialog', function($scope, $http, FileUploader, $state, ngDialog) {
    
    errorJump($state);
    $http
      .post(''+url+'/course/index', { // 获取课程列表
          token: sessionStorage.token, get_type: 'all'
      })
      .then(function(response) {
          if ( response.data.code != 200 ) {
              requestError(response, $state, ngDialog);
          }
          else{ 
              $scope.course = response.data.data;
          }
      }, function(x) { 
        ngDialog.open({
          template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
          plain: true,
          className: 'ngdialog-theme-default'
        });
    });
    
    var uploader = $scope.uploader = new FileUploader({
        url: ''+url+'/gd/upload'
    })

    var bannerUrl = function(_index) { // 生成图片地址
        uploader.onSuccessItem = function(response) {
            $('.bannerTr').eq(_index).children().eq(0).attr('name', jQuery.parseJSON(response._xhr.response).url);
        };
    }

    $('.bannerTypeSetHide12').css({'display':'block'});
    $('.bannerTypeSetHide22').css({'display':'block'});
    $('.bannerTypeSetHide32').css({'display':'block'});
    $('.bannerTypeSetHide42').css({'display':'block'});
    
    var jumpType = function(_index) { // 生成跳转方式
        if(!($('.bannerTr').eq(_index).children().eq(1).attr('name'))) {
            $('.bannerTr').eq(_index).children().eq(1).attr('name', 2);
        }
        $scope.selectbRadio = function(type) {
            switch(type) {
                case 1:
                  $('.bannerTypeSetHide'+(_index+1)+'2').css({'display':'none'});
                  $('.bannerTypeSetHide'+(_index+1)+'1').css({'display':'block'});
                  $('.bannerTr').eq(_index).children().eq(1).attr('name', type);
                  break;
                case 2:
                  $('.bannerTypeSetHide'+(_index+1)+'1').css({'display':'none'});
                  $('.bannerTypeSetHide'+(_index+1)+'2').css({'display':'block'});
                  $('.bannerTr').eq(_index).children().eq(1).attr('name', type);
                  break;
            }
        }
    }
    
    var jumpCourseId = function(_index) { // 生成课程id
        $scope.getCourseId = function(courseid) {
            $('.bannerTr').eq(_index).children().eq(2).attr('name', courseid);
        }
    }

    var jumpUrl = function(_index) {
        $scope.getJumpUrl = function(url) { // 生成跳转链接
            $('.bannerTr').eq(_index).children().eq(2).attr('name', url);
        }
    }

    var startCreate = function(_index) { // 开始生成name
        bannerUrl(_index);
        jumpType(_index);
        jumpCourseId(_index);
        jumpUrl(_index);
    }

    $scope.setImgUrl = function(_index) {
        switch(_index) {
            case 0:
              startCreate(_index);
              break; 
            case 1:
              startCreate(_index);
              break; 
            case 2:
              startCreate(_index);
              break; 
            case 3:
              startCreate(_index);
              break; 
        }
    }

    
    $scope.createBanner = function() { // 生成预览

        bannerArr = new Array();
        var bannerTr = $('.bannerTr');
        var attributeName = ['img', 'type', 'link'];
        for(var i = 0; i < bannerTr.length; i++) {
            var banners = {};
            for(var c = 0; c < bannerTr.eq(i).children().length; c++) {
                banners[attributeName[c]] = bannerTr.eq(i).children().eq(c).attr('name');
            }
            bannerArr.push(banners);
        }
        console.log(bannerArr);
    }
    
    $scope.saveBanner = function() { // 确认保存

        bannerArr = new Array();
        var bannerTr = $('.bannerTr');
        var attributeName = ['img', 'type', 'link'];
        for(var i = 0; i < bannerTr.length; i++) {
            var banners = {};
            for(var c = 0; c < bannerTr.eq(i).children().length; c++) {
                banners[attributeName[c]] = bannerTr.eq(i).children().eq(c).attr('name');
            }
            bannerArr.push(banners);
        }

        $http
          .post(''+url+'/setting/setbanner', { // 设置启动图
              token: sessionStorage.token, banner: bannerArr
          })
          .then(function(response) {
              if ( response.data.code != 200 ) {
                  requestError(response, $state, ngDialog);
              }
              else{ 
                  ngDialog.open({
                    template: "<p style='text-align:center;margin: 0;'>" + response.data.msg + "</p>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                  });
              }
          }, function(x) { 
            ngDialog.open({
              template: "<p style='text-align:center;margin: 0;'>啊噢~服务器开小差啦！刷新试试吧！</p>",
              plain: true,
              className: 'ngdialog-theme-default'
            });
        });
    }
      

}])


/**=========================================================
 * Module: form-xeditable.js
 * Form xEditable controller
 =========================================================*/

App.controller('FormxEditableController', ['$scope', 'editableOptions', 'editableThemes', '$filter', '$http',
  function($scope, editableOptions, editableThemes, $filter, $http) {

    editableOptions.theme = 'bs3';

    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success"><span class="fa fa-check"></span></button>';
    editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
                                     '<span class="fa fa-times text-muted"></span>'+
                                   '</button>';

    $scope.user = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null,
      desc: 'Sed pharetra euismod dolor, id feugiat ante volutpat eget. '
    };

    // Local select
    // ----------------------------------- 

    $scope.user2 = {
      status: 2
    };

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user2.status});
      return ($scope.user2.status && selected.length) ? selected[0].text : 'Not set';
    };

    // select remote
    // ----------------------------------- 

    $scope.user3 = {
      id: 4,
      text: 'admin' // original value
    };

    $scope.groups = [];

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.$watch('user3.id', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selected = $filter('filter')($scope.groups, {id: $scope.user3.id});
        $scope.user3.text = selected.length ? selected[0].text : null;
      }
    });

    // Typeahead
    // ----------------------------------- 

    $scope.user4 = {
      state: 'Arizona'
    };

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

}]);
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

App.controller('ModalGmapController', ['$scope', '$modal', '$timeout', function ($scope, $modal, $timeout) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalInstanceCtrl = function ($scope, $modalInstance, $timeout) {

    $modalInstance.opened.then(function () {
      var position = new google.maps.LatLng(33.790807, -117.835734);

      $scope.mapOptionsModal = {
        zoom: 14,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // we use timeout to wait maps to be ready before add a markers
      $timeout(function(){
        // 1. Add a marker at the position it was initialized
        new google.maps.Marker({
          map: $scope.myMapModal,
          position: position
        });
        // 2. Trigger a resize so the map is redrawed 
        google.maps.event.trigger($scope.myMapModal, 'resize');
        // 3. Move to the center if it is misaligned
        $scope.myMapModal.panTo(position);
      });

    });

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance", "$timeout"];

}]);


App.controller('GMapController', ["$scope", "$timeout", function($scope, $timeout){

  var position = [
      new google.maps.LatLng(33.790807, -117.835734),
      new google.maps.LatLng(33.790807, -117.835734),
      new google.maps.LatLng(33.790807, -117.835734),
      new google.maps.LatLng(33.790807, -117.835734),
      new google.maps.LatLng(33.787453, -117.835858)
    ];
  
  $scope.addMarker = addMarker;
  // we use timeout to wait maps to be ready before add a markers
  $timeout(function(){
    addMarker($scope.myMap1, position[0]);
    addMarker($scope.myMap2, position[1]);
    addMarker($scope.myMap3, position[2]);
    addMarker($scope.myMap5, position[3]);
  });

  $scope.mapOptions1 = {
    zoom: 14,
    center: position[0],
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };

  $scope.mapOptions2 = {
    zoom: 19,
    center: position[1],
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.mapOptions3 = {
    zoom: 14,
    center: position[2],
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  $scope.mapOptions4 = {
    zoom: 14,
    center: position[3],
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // for multiple markers
  $timeout(function(){
    addMarker($scope.myMap4, position[3]);
    addMarker($scope.myMap4, position[4]);
  });

  // custom map style
  var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
  $scope.mapOptions5 = {
    zoom: 14,
    center: position[3],
    styles: MapStyles,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };

  ///////////////
  
  function addMarker(map, position) {
    return new google.maps.Marker({
      map: map,
      position: position
    });
  }

}]);
/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

App.controller('InfiniteScrollController', ["$scope", "$timeout", function($scope, $timeout) {

  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 10; i++) {
      $scope.images.push(last + i);
    }
  };

}]).factory('datasource', [
    '$log', '$timeout', function(console, $timeout) {
        'use strict';

        var get = function(index, count, success) {
            return $timeout(function() {
                var i, result, _i, _ref;
                result = [];
                for (i = _i = index, _ref = index + count - 1; index <= _ref ? _i <= _ref : _i >= _ref; i = index <= _ref ? ++_i : --_i) {
                    result.push('item #' + i);
                }
                return success(result);
            }, 100);
        };
        return {
            get: get
        };
    }]);
/**=========================================================
 * Module: locale.js
 * Demo for locale settings
 =========================================================*/

App.controller('LocalizationController', ["$rootScope", "tmhDynamicLocale", "$locale", function($rootScope, tmhDynamicLocale, $locale) {
  
  $rootScope.availableLocales = {
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'fr': 'French',
    'ar': 'Arabic',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese'};
  
  $rootScope.model = {selectedLocale: 'en'};
  
  $rootScope.$locale = $locale;
  
  $rootScope.changeLocale = tmhDynamicLocale.set;

}]);

/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

 App.controller('MailboxController', ["$scope", "colors", function($scope, colors) {


  $scope.folders = [
    {name: 'Inbox',   folder: 'inbox',   alert: 42, icon: "fa-inbox" },
    {name: 'Starred', folder: 'starred', alert: 10, icon: "fa-star" },
    {name: 'Sent',    folder: 'sent',    alert: 0,  icon: "fa-paper-plane-o" },
    {name: 'Draft',   folder: 'draft',   alert: 5,  icon: "fa-edit" },
    {name: 'Trash',   folder: 'trash',   alert: 0,  icon: "fa-trash"}
  ];

  $scope.labels = [
    {name: 'Red',     color: 'danger'},
    {name: 'Pink',    color: 'pink'},
    {name: 'Blue',    color: 'info'},
    {name: 'Yellow',  color: 'warning'}
  ];

  $scope.mail = {
    cc: false,
    bcc: false
  };
  // Mailbox editr initial content
  $scope.content = "<p>Type something..</p>";


}]);

App.controller('MailFolderController', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  // no filter for inbox
  $scope.folder = $stateParams.folder === 'inbox' ? '' : $stateParams.folder;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
}]);

App.controller('MailViewController', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mid).then(function(mail){
    $scope.mail = mail;
  });
}]);

// A RESTful factory for retreiving mails from 'mails.json'
App.factory('mails', ['$http', function ($http) {
  var path = 'server/mails.json';
  var mails = $http.get(path).then(function (resp) {
    return resp.data.mails;
  });

  var factory = {};
  factory.all = function () {
    return mails;
  };
  factory.get = function (id) {
    return mails.then(function(mails){
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    });
  };
  return factory;
}]);
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name;
      document.title = title;
      return title;
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Hides/show user avatar on sidebar
    $scope.toggleUserBlock = function(){
      $scope.$broadcast('toggleUserBlock');
    };

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);

/**=========================================================
 * Module: masonry-deck.js
 * Demo for Angular Deck
 =========================================================*/

App.controller('MasonryDeckController', ['$scope', 'RouteHelpers', function ($scope, RouteHelpers) {
  'use strict';

  $scope.basepath = RouteHelpers.basepath;

  $scope.photos = [
      {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
      {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
      {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
      {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
      {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
      {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
      {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
      {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
      {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
      {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
      {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
      {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
      {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
      {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
      {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
  ];

}]).directive('imageloaded', [
    // Copyright(c) 2013 André König <akoenig@posteo.de>
    // MIT Licensed
    function () {

        'use strict';

        return {
            restrict: 'A',

            link: function(scope, element, attrs) {   
                var cssClass = attrs.loadedclass;

                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }
]);


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

App.controller('ModalController', ['$scope', '$modal', function ($scope, $modal) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size
    });

    var state = $('#modal-state');
    modalInstance.result.then(function () {
      state.text('Modal dismissed with OK status');
    }, function () {
      state.text('Modal dismissed with Cancel status');
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance"];

}]);

/**=========================================================
 * Module: morris.js
 =========================================================*/

App.controller('ChartMorrisController', ['$scope', '$timeout', 'colors', function ($scope, $timeout, colors) {

  $scope.chartdata = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75,  b: 65 },
      { y: "2008", a: 50,  b: 40 },
      { y: "2009", a: 75,  b: 65 },
      { y: "2010", a: 50,  b: 40 },
      { y: "2011", a: 75,  b: 65 },
      { y: "2012", a: 100, b: 90 }
  ];

  /* test data update
  $timeout(function(){
    $scope.chartdata[0].a = 50;
    $scope.chartdata[0].b = 50;
  }, 3000); */

  $scope.donutdata = [
    {label: "Download Sales", value: 12},
    {label: "In-Store Sales",value: 30},
    {label: "Mail-Order Sales", value: 20}
  ];

  $scope.donutOptions = {
    colors: [ colors.byName('danger'), colors.byName('yellow'), colors.byName('warning') ],
    resize: true
  };

  $scope.barOptions = {
    xkey: 'y',
    ykeys: ["a", "b"],
    labels: ["Series A", "Series B"],
    xLabelMargin: 2,
    barColors: [ colors.byName('info'), colors.byName('danger') ],
    resize: true
  };

  $scope.lineOptions = {
    xkey: 'y',
    ykeys: ["a", "b"],
    labels: ["Serie A", "Serie B"],
    lineColors: ["#31C0BE", "#7a92a3"],
    resize: true
  };

  $scope.areaOptions = {
    xkey: 'y',
    ykeys: ["a", "b"],
    labels: ["Serie A", "Serie B"],
    lineColors: [ colors.byName('purple'), colors.byName('info') ],
    resize: true
  };

}]);

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('AbnTestController', ['$scope', '$timeout', '$resource', function($scope, $timeout, $resource) {

  $scope.my_tree_handler = function(branch) {

    $scope.output = "You selected: " + branch.label;

    if (branch.data && branch.data.description) {
      $scope.output += '(' + branch.data.description + ')';
      return $scope.output;
    }
  };

  // onSelect event handlers
  var apple_selected = function(branch) {
    $scope.output = "APPLE! : " + branch.label;
    return $scope.output;
  };

  var treedata_avm = [
    {
      label: 'Animal',
      children: [
        {
          label: 'Dog',
          data: {
            description: "man's best friend"
          }
        }, {
          label: 'Cat',
          data: {
            description: "Felis catus"
          }
        }, {
          label: 'Hippopotamus',
          data: {
            description: "hungry, hungry"
          }
        }, {
          label: 'Chicken',
          children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
        }
      ]
    }, {
      label: 'Vegetable',
      data: {
        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
        data_can_contain_anything: true
      },
      onSelect: function(branch) {
        $scope.output = "Vegetable: " + branch.data.definition;
        return $scope.output;
      },
      children: [
        {
          label: 'Oranges'
        }, {
          label: 'Apples',
          children: [
            {
              label: 'Granny Smith',
              onSelect: apple_selected
            }, {
              label: 'Red Delicous',
              onSelect: apple_selected
            }, {
              label: 'Fuji',
              onSelect: apple_selected
            }
          ]
        }
      ]
    }, {
      label: 'Mineral',
      children: [
        {
          label: 'Rock',
          children: ['Igneous', 'Sedimentary', 'Metamorphic']
        }, {
          label: 'Metal',
          children: ['Aluminum', 'Steel', 'Copper']
        }, {
          label: 'Plastic',
          children: [
            {
              label: 'Thermoplastic',
              children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
            }, {
              label: 'Thermosetting Polymer',
              children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
            }
          ]
        }
      ]
    }
  ];
  
  var treedata_geography = [
    {
      label: 'North America',
      children: [
        {
          label: 'Canada',
          children: ['Toronto', 'Vancouver']
        }, {
          label: 'USA',
          children: ['New York', 'Los Angeles']
        }, {
          label: 'Mexico',
          children: ['Mexico City', 'Guadalajara']
        }
      ]
    }, {
      label: 'South America',
      children: [
        {
          label: 'Venezuela',
          children: ['Caracas', 'Maracaibo']
        }, {
          label: 'Brazil',
          children: ['Sao Paulo', 'Rio de Janeiro']
        }, {
          label: 'Argentina',
          children: ['Buenos Aires', 'Cordoba']
        }
      ]
    }
  ];

  $scope.my_data = treedata_avm;
  $scope.try_changing_the_tree_data = function() {
    if ($scope.my_data === treedata_avm) {
      $scope.my_data = treedata_geography;
    } else {
      $scope.my_data = treedata_avm;
    }
    return $scope.my_data;
  };
  
  var tree;
  // This is our API control variable
  $scope.my_tree = tree = {};
  $scope.try_async_load = function() {
    
    $scope.my_data = [];
    $scope.doing_async = true;
    
    // Request tree data via $resource
    var remoteTree = $resource('server/treedata.json');
    
    return remoteTree.get(function(res){
      
      $scope.my_data = res.data;

      $scope.doing_async = false;
    
      return tree.expand_all();
    
    // we must return a promise so the plugin 
    // can watch when it's resolved
    }).$promise;
  };
  
  // Adds a new branch to the tree
  $scope.try_adding_a_branch = function() {
    var b;
    b = tree.get_selected_branch();
    return tree.add_branch(b, {
      label: 'New Branch',
      data: {
        something: 42,
        "else": 43
      }
    });
  };
  
}]);

/**=========================================================
 * Module: nestable.js
 * Nestable controller
 =========================================================*/

App.controller('NestableController', ['$scope', function($scope) {
  
  'use strict';

  $scope.items =  [
    {
      item: {text: 'a'},
      children: []
    },
    {
      item: {text: 'b'},
      children: [
        {
          item: {text: 'c'},
          children: []
        },
        {
          item: {text: 'd'},
          children: []
        }
      ]
    },
    {
      item: {text: 'e'},
      children: []
    },
    {
      item: {text: 'f'},
      children: []
    }
  ];

  $scope.items2 =  [
    {
      item: {text: '1'},
      children: []
    },
    {
      item: {text: '2'},
      children: [
        {
          item: {text: '3'},
          children: []
        },
        {
          item: {text: '4'},
          children: []
        }
      ]
    },
    {
      item: {text: '5'},
      children: []
    },
    {
      item: {text: '6'},
      children: []
    }
  ]


}]);

/**=========================================================
 * Module: ng-grid.js
 * ngGrid demo
 =========================================================*/

App.controller('NGGridController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes:   [250, 500, 1000],  // page size options
        pageSize:    250,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.gridOptions = {
        data:             'myData',
        enablePaging:     true,
        showFooter:       true,
        rowHeight:        36,
        headerRowHeight:  38,
        totalServerItems: 'totalServerItems',
        pagingOptions:    $scope.pagingOptions,
        filterOptions:    $scope.filterOptions
    };

    $scope.setPagingData = function(data, page, pageSize){
        // calc for pager
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        // Store data from server
        $scope.myData = pagedData;
        // Update server side data length
        $scope.totalServerItems = data.length;

        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
      var ngGridResourcePath = 'server/ng-grid-data.json';

      $timeout(function () {

          if (searchText) {
              var ft = searchText.toLowerCase();
              $http.get(ngGridResourcePath).success(function (largeLoad) {
                  var data = largeLoad.filter(function(item) {
                      return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                  });
                  $scope.setPagingData(data,page,pageSize);
              });
          } else {
              $http.get(ngGridResourcePath).success(function (largeLoad) {
                  $scope.setPagingData(largeLoad,page,pageSize);
              });
          }
      }, 100);
    };


    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

}]);

/**=========================================================
 * Module: NGTableCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('NGTableCtrl', NGTableCtrl);

function NGTableCtrl($scope, $filter, ngTableParams, $resource, $timeout, ngTableDataService) {
  'use strict';
  // required for inner references
  var vm = this;


  var data = [
      {name: "Moroni",  age: 50, money: -10   },
      {name: "Tiancum", age: 43, money: 120   },
      {name: "Jacob",   age: 27, money: 5.5   },
      {name: "Nephi",   age: 29, money: -54   },
      {name: "Enos",    age: 34, money: 110   },
      {name: "Tiancum", age: 43, money: 1000  },
      {name: "Jacob",   age: 27, money: -201  },
      {name: "Nephi",   age: 29, money: 100   },
      {name: "Enos",    age: 34, money: -52.5 },
      {name: "Tiancum", age: 43, money: 52.1  },
      {name: "Jacob",   age: 27, money: 110   },
      {name: "Nephi",   age: 29, money: -55   },
      {name: "Enos",    age: 34, money: 551   },
      {name: "Tiancum", age: 43, money: -1410 },
      {name: "Jacob",   age: 27, money: 410   },
      {name: "Nephi",   age: 29, money: 100   },
      {name: "Enos",    age: 34, money: -100  }
  ];

  // SELECT ROWS
  // ----------------------------------- 

  vm.data = data;

  vm.tableParams3 = new ngTableParams({
      page: 1,            // show first page
      count: 10          // count per page
  }, {
      total: data.length, // length of data
      getData: function ($defer, params) {
          // use build-in angular filter
          var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                  data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) :
                  data;

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });

  vm.changeSelection = function(user) {
      // console.info(user);
  };

  // EXPORT CSV
  // -----------------------------------  

  var data4 = [{name: "Moroni", age: 50},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34}];

  vm.tableParams4 = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
  }, {
      total: data4.length, // length of data4
      getData: function($defer, params) {
          $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });


  // SORTING
  // ----------------------------------- 



  vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
          name: 'asc'     // initial sorting
      }
  }, {
      total: data.length, // length of data
      getData: function($defer, params) {
          // use build-in angular filter
          var orderedData = params.sorting() ?
                  $filter('orderBy')(data, params.orderBy()) :
                  data;
  
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });

  // FILTERS
  // ----------------------------------- 

  vm.tableParams2 = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      filter: {
          name: '',
          age: ''
          // name: 'M'       // initial filter
      }
  }, {
      total: data.length, // length of data
      getData: function($defer, params) {
          // use build-in angular filter
          var orderedData = params.filter() ?
                 $filter('filter')(data, params.filter()) :
                 data;

          vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(vm.users);
      }
  });

  // AJAX
  
  var Api = $resource('server/table-data.json');

  vm.tableParams5 = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
  }, {
      total: 0,           // length of data
      counts: [],         // hide page counts control
      getData: function($defer, params) {
          
          // Service using cache to avoid mutiple requests
          ngTableDataService.getData( $defer, params, Api);
          
          /* direct ajax request to api (perform result pagination on the server)
          Api.get(params.url(), function(data) {
              $timeout(function() {
                  // update table params
                  params.total(data.total);
                  // set new data
                  $defer.resolve(data.result);
              }, 500);
          });
          */
      }
  });

}
NGTableCtrl.$inject = ["$scope", "$filter", "ngTableParams", "$resource", "$timeout", "ngTableDataService"];

// NOTE: We add the service definition here for quick reference
App.service('ngTableDataService', function() {

  var TableData = {
    cache: null,
    getData: function($defer, params, api){
      // if no cache, request data and filter
      if ( ! TableData.cache ) {
        if ( api ) {
          api.get(function(data){
            TableData.cache = data;
            filterdata($defer, params);
          });
        }
      }
      else {
        filterdata($defer, params);
      }
      
      function filterdata($defer, params) {
        var from = (params.page() - 1) * params.count();
        var to = params.page() * params.count();
        var filteredData = TableData.cache.result.slice(from, to);

        params.total(TableData.cache.total);
        $defer.resolve(filteredData);
      }

    }
  };
  
  return TableData;

});

/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('NotificationController', ['$scope', function($scope){

 $scope.autoplace = function (context, source) {
    //return (predictTooltipTop(source) < 0) ?  "bottom": "top";
    var pos = 'top';
    if(predictTooltipTop(source) < 0)
      pos = 'bottom';
    if(predictTooltipLeft(source) < 0)
      pos = 'right';
    return pos;
  };

  // Predicts tooltip top position 
  // based on the trigger element
  function predictTooltipTop(el) {
    var top = el.offsetTop;
    var height = 40; // asumes ~40px tooltip height

    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
    }
    return (top - height) - (window.pageYOffset);
  }

  // Predicts tooltip top position 
  // based on the trigger element
  function predictTooltipLeft(el) {
    var left = el.offsetLeft;
    var width = el.offsetWidth;

    while(el.offsetParent) {
      el = el.offsetParent;
      left += el.offsetLeft;
    }
    return (left - width) - (window.pageXOffset);
  }

}]);
/**=========================================================
 * Module: portlet.js
 * Drag and drop any panel to change its position
 * The Selector should could be applied to any object that contains
 * panel, so .col-* element are ideal.
 =========================================================*/
App.controller('portletsController', [ '$scope', '$timeout', '$window', function($scope, $timeout, $window) {
  'use strict';

  // Component is optional
  if(!$.fn.sortable) return;

  var Selector = '[portlet]',
      storageKeyName = 'portletState';

  angular.element(document).ready(function () {

    $timeout(function() {

      $( Selector ).sortable({
        connectWith:          Selector,
        items:                'div.panel',
        handle:               '.portlet-handler',
        opacity:              0.7,
        placeholder:          'portlet box-placeholder',
        cancel:               '.portlet-cancel',
        forcePlaceholderSize: true,
        iframeFix:            false,
        tolerance:            'pointer',
        helper:               'original',
        revert:               200,
        forceHelperSize:      true,
        start:                saveListSize,
        update:               savePortletOrder,
        create:               loadPortletOrder
      })
      // optionally disables mouse selection
      //.disableSelection()
      ;
    }, 0);

  });

  function savePortletOrder(event, ui) {
    var self = event.target;
    var data = angular.fromJson($scope.$storage[storageKeyName]);
    
    if(!data) { data = {}; }

    data[self.id] = $(self).sortable('toArray');

    $scope.$storage[storageKeyName] = angular.toJson(data);
      
    // save portlet size to avoid jumps
    saveListSize.apply(self);
  }

  function loadPortletOrder(event) {
    var self = event.target;
    var data = angular.fromJson($scope.$storage[storageKeyName]);

    if(data) {
      
      var porletId = self.id,
          panels   = data[porletId];

      if(panels) {
        var portlet = $('#'+porletId);
        
        $.each(panels, function(index, value) {
           $('#'+value).appendTo(portlet);
        });
      }

    }

    // save portlet size to avoid jumps
    saveListSize.apply(self);
  }

  // Keeps a consistent size in all portlet lists
  function saveListSize() {
    var $this = $(this);
    $this.css('min-height', $this.height());
  }

  /*function resetListSize() {
    $(this).css('min-height', "");
  }*/

}]);
/**=========================================================
 * Module: rickshaw.js
 =========================================================*/

App.controller('ChartRickshawController', ['$scope', function($scope) {
  'use strict';

  $scope.renderers = [{
          id: 'area',
          name: 'Area'
      }, {
          id: 'line',
          name: 'Line'
      }, {
          id: 'bar',
          name: 'Bar'
      }, {
          id: 'scatterplot',
          name: 'Scatterplot'
      }];

  $scope.palettes = [
      'spectrum14',
      'spectrum2000',
      'spectrum2001',
      'colorwheel',
      'cool',
      'classic9',
      'munin'
  ];

  $scope.rendererChanged = function(id) {
      $scope['options' + id] = {
          renderer: $scope['renderer' + id].id
      };
  };

  $scope.paletteChanged = function(id) {
      $scope['features' + id] = {
          palette: $scope['palette' + id]
      };
  };

  $scope.changeSeriesData = function(id) {
      var seriesList = [];
      for (var i = 0; i < 3; i++) {
          var series = {
              name: 'Series ' + (i + 1),
              data: []
          };
          for (var j = 0; j < 10; j++) {
              series.data.push({x: j, y: Math.random() * 20});
          }
          seriesList.push(series);
          $scope['series' + id][i] = series;
      }
      //$scope['series' + id] = seriesList;
  };

  $scope.series0 = [];

  $scope.options0 = {
    renderer: 'area'
  };

  $scope.renderer0 = $scope.renderers[0];
  $scope.palette0 = $scope.palettes[0];

  $scope.rendererChanged(0);
  $scope.paletteChanged(0);
  $scope.changeSeriesData(0);  

  // Graph 2

  var seriesData = [ [], [], [] ];
  var random = new Rickshaw.Fixtures.RandomData(150);

  for (var i = 0; i < 150; i++) {
    random.addData(seriesData);
  }

  $scope.series2 = [
    {
      color: "#c05020",
      data: seriesData[0],
      name: 'New York'
    }, {
      color: "#30c020",
      data: seriesData[1],
      name: 'London'
    }, {
      color: "#6060c0",
      data: seriesData[2],
      name: 'Tokyo'
    }
  ];

  $scope.options2 = {
    renderer: 'area'
  };


}]);

//控制菜单选中状态/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils',
  function($rootScope, $scope, $state, $http, $timeout, Utils){

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    $scope.loadSidebarMenu = function() {

      var menuJson = 'server/sidebar-menu.json',
          menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(menuURL)
        .success(function(items) {
           $scope.menuItems = items;
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading menu');
        });
     };

     $scope.loadSidebarMenu();

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem, sortid) {

      sessionStorage.setItem('sortid', sortid);
      sessionStorage.setItem('sname', undefined);
      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
      
      $scope.lastEventFromChild = isChild($index);

      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

}]);

/**=========================================================
 * Module: sortable.js
 * Sortable controller
 =========================================================*/

App.controller('SortableController', ['$scope', function($scope) {
  'use strict';

  // Single List
  $scope.data1 = [
    { id: 1, name: 'Donald Hoffman' },
    { id: 2, name: 'Wallace Barrett' },
    { id: 3, name: 'Marsha Hicks' },
    { id: 4, name: 'Roland Brown' }
  ];

  $scope.add = function () {
    $scope.data1.push({id: $scope.data1.length + 1, name: 'Earl Knight'});
  };

  $scope.sortableCallback = function (sourceModel, destModel, start, end) {
    console.log(start + ' -> ' + end);
  };
  
  $scope.sortableOptions = {
      placeholder: '<div class="box-placeholder p0 m0"><div></div></div>',
      forcePlaceholderSize: true
  };

}]);

/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

App.controller('TablexEditableController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','$q',
  function($scope, $filter, $http, editableOptions, editableThemes, $q) {

  // editable row
  // ----------------------------------- 
  $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ];

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    console.log('Saving user: ' + id);
    // return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null,
      isNew: true
    };
    $scope.users.push($scope.inserted);
  };

  // editable column
  // ----------------------------------- 


  $scope.saveColumn = function(column) {
    var results = [];
    angular.forEach($scope.users, function(user) {
      // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
      console.log('Saving column: ' + column);
    });
    return $q.all(results);
  };

  // editable table
  // ----------------------------------- 

  // filter users to show
  $scope.filterUser = function(user) {
    return user.isDeleted !== true;
  };

  // mark user as deleted
  $scope.deleteUser = function(id) {
    var filtered = $filter('filter')($scope.users, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.users.length; i--;) {
      var user = $scope.users[i];
      // undelete
      if (user.isDeleted) {
        delete user.isDeleted;
      }
      // remove new 
      if (user.isNew) {
        $scope.users.splice(i, 1);
      }
    }
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    for (var i = $scope.users.length; i--;) {
      var user = $scope.users[i];
      // actually delete user
      if (user.isDeleted) {
        $scope.users.splice(i, 1);
      }
      // mark as not new 
      if (user.isNew) {
        user.isNew = false;
      }

      // send on server
      // results.push($http.post('/saveUser', user));
      console.log('Saving Table...');
    }

    return $q.all(results);
  };

}]);

App.controller("TodoController", ['$scope', '$filter', function($scope, $filter) {
  
  $scope.items = [
    {
      todo: {title: "Meeting with Mark at 7am.", description: "Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. "},
      complete: true
    },
    {
      todo: {title: "Call Sonya. Talk about the new project.", description: ""},
      complete: false
    },
    {
      todo: {title: "Find a new place for vacations", description: ""},
      complete: false
    }
    ];
  
  $scope.editingTodo = false;
  $scope.todo = {};

  $scope.addTodo = function() {
    
    if( $scope.todo.title === "" ) return;
    if( !$scope.todo.description ) $scope.todo.description = "";
    
    if( $scope.editingTodo ) {
      $scope.todo = {};
      $scope.editingTodo = false;
    }
    else {
      $scope.items.push({todo: angular.copy($scope.todo), complete: false});
      $scope.todo.title = "";
      $scope.todo.description = "";
    }
  };
  
  $scope.editTodo = function(index, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.todo = $scope.items[index].todo;
    $scope.editingTodo = true;
  };

  $scope.removeTodo = function(index, $event) {
    $scope.items.splice(index, 1);
  };
  
  $scope.clearAll = function() {
    $scope.items = [];
  };

  $scope.totalCompleted = function() {
    return $filter("filter")($scope.items, function(item){
      return item.complete;
    }).length;
  };

  $scope.totalPending = function() {
    return $filter("filter")($scope.items, function(item){
      return !item.complete;
    }).length;
  };
}]);
/**=========================================================
 * Module: UIGridController
  =========================================================*/
App.controller('UIGridController', ['$scope', 'uiGridConstants', '$http', function($scope, uiGridConstants, $http) {
  
  // Basic example
  // ----------------------------------- 

  $scope.gridOptions = {
    rowHeight: 34,
    data: [
      {
          "name": "Wilder Gonzales",
          "gender": "male",
          "company": "Geekko"
      },
      {
          "name": "Georgina Schultz",
          "gender": "female",
          "company": "Suretech"
      },
      {
          "name": "Carroll Buchanan",
          "gender": "male",
          "company": "Ecosys"
      },
      {
          "name": "Valarie Atkinson",
          "gender": "female",
          "company": "Hopeli"
      },
      {
          "name": "Schroeder Mathews",
          "gender": "male",
          "company": "Polarium"
      },
      {
          "name": "Ethel Price",
          "gender": "female",
          "company": "Enersol"
      },
      {
          "name": "Claudine Neal",
          "gender": "female",
          "company": "Sealoud"
      },
      {
          "name": "Beryl Rice",
          "gender": "female",
          "company": "Velity"
      },
      {
          "name": "Lynda Mendoza",
          "gender": "female",
          "company": "Dogspa"
      },
      {
          "name": "Sarah Massey",
          "gender": "female",
          "company": "Bisba"
      },
      {
          "name": "Robles Boyle",
          "gender": "male",
          "company": "Comtract"
      },
      {
          "name": "Evans Hickman",
          "gender": "male",
          "company": "Parleynet"
      },
      {
          "name": "Dawson Barber",
          "gender": "male",
          "company": "Dymi"
      },
      {
          "name": "Bruce Strong",
          "gender": "male",
          "company": "Xyqag"
      },
      {
          "name": "Nellie Whitfield",
          "gender": "female",
          "company": "Exospace"
      },
      {
          "name": "Jackson Macias",
          "gender": "male",
          "company": "Aquamate"
      },
      {
          "name": "Pena Pena",
          "gender": "male",
          "company": "Quarx"
      },
      {
          "name": "Lelia Gates",
          "gender": "female",
          "company": "Proxsoft"
      },
      {
          "name": "Letitia Vasquez",
          "gender": "female",
          "company": "Slumberia"
      },
      {
          "name": "Trevino Moreno",
          "gender": "male",
          "company": "Conjurica"
      }
    ]
  };
  
  // Complex example
  // ----------------------------------- 

  var data = [];
   
  $scope.gridOptionsComplex = {
      showGridFooter: true,
      showColumnFooter: true,
      enableFiltering: true,
      columnDefs: [
          { field: 'name', width: '13%' },
          { field: 'address.street',aggregationType: uiGridConstants.aggregationTypes.sum, width: '13%' },
          { field: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true, width: '13%' },
          { name: 'ageMin', field: 'age', aggregationType: uiGridConstants.aggregationTypes.min, width: '13%', displayName: 'Age for min' },
          { name: 'ageMax', field: 'age', aggregationType: uiGridConstants.aggregationTypes.max, width: '13%', displayName: 'Age for max' },
          { name: 'customCellTemplate', 
            field: 'age', 
            width: '14%', 
            footerCellTemplate: '<div class="ui-grid-cell-contents bg-info text-center">Custom HTML</div>' 
          },
          { name: 'registered', field: 'registered', width: '20%', cellFilter: 'date', footerCellFilter: 'date', aggregationType: uiGridConstants.aggregationTypes.max }
      ],
      data: data,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
      }
  }
   
  $http.get('server/uigrid-complex.json')
    .success(function(data) {
      data.forEach( function(row) {
        row.registered = Date.parse(row.registered);
      });
      $scope.gridOptionsComplex.data = data;
    });


   $scope.gridOptions1 = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      columnDefs: [
        { name: 'name' },
        { name: 'gender' },
        { name: 'company' }
      ]
    };
   
    $http.get('server/uigrid-100.json')
    .success(function (data) {
      $scope.gridOptions1.data = data;
    });

}]);

/**=========================================================
 * Module: uiselect.js
 * uiSelect controller
 =========================================================*/

App.controller('uiSelectController', ["$scope", "$http", function($scope, $http) {
  $scope.disabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.person = {};
  $scope.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 10 },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
    { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
  ];

  $scope.address = {};
  $scope.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results;
    });
  };

  $scope.country = {};
  $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'Andorra', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'s Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'Rwanda', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Vietnam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}
  ];


  // Multiple
  $scope.someGroupFn = function (item){

    if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';

    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';

  };

  $scope.counter = 0;
  $scope.someFunction = function (item, model){
    $scope.counter++;
    $scope.eventResult = {item: item, model: model};
  };

  $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

  $scope.multipleDemo = {};
  $scope.multipleDemo.colors = ['Blue','Red'];
  $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
  $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
  $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];

}]);


/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

App.controller('UserBlockController', ['$scope', function($scope) {

  $scope.userBlockVisible = true;
  
  $scope.$on('toggleUserBlock', function(event, args) {

    $scope.userBlockVisible = ! $scope.userBlockVisible;
    
  });

}]);
/**=========================================================
 * Module: vmaps,js
 * jVector Maps support
 =========================================================*/

App.controller('VectorMapController', ['$scope', function($scope) {
  'use strict';

  $scope.seriesData = {
    'CA': 11100,   // Canada
    'DE': 2510,    // Germany
    'FR': 3710,    // France
    'AU': 5710,    // Australia
    'GB': 8310,    // Great Britain
    'RU': 9310,    // Russia
    'BR': 6610,    // Brazil
    'IN': 7810,    // India
    'CN': 4310,    // China
    'US': 839,     // USA
    'SA': 410      // Saudi Arabia
  };
  
  $scope.markersData = [
    { latLng:[41.90, 12.45],  name:'Vatican City'          },
    { latLng:[43.73, 7.41],   name:'Monaco'                },
    { latLng:[-0.52, 166.93], name:'Nauru'                 },
    { latLng:[-8.51, 179.21], name:'Tuvalu'                },
    { latLng:[7.11,171.06],   name:'Marshall Islands'      },
    { latLng:[17.3,-62.73],   name:'Saint Kitts and Nevis' },
    { latLng:[3.2,73.22],     name:'Maldives'              },
    { latLng:[35.88,14.5],    name:'Malta'                 },
    { latLng:[41.0,-71.06],   name:'New England'           },
    { latLng:[12.05,-61.75],  name:'Grenada'               },
    { latLng:[13.16,-59.55],  name:'Barbados'              },
    { latLng:[17.11,-61.85],  name:'Antigua and Barbuda'   },
    { latLng:[-4.61,55.45],   name:'Seychelles'            },
    { latLng:[7.35,134.46],   name:'Palau'                 },
    { latLng:[42.5,1.51],     name:'Andorra'               }
  ];

}]);

/**=========================================================
 * Module: word-cloud.js
 * Controller for jqCloud
 =========================================================*/

App.controller('WordCloudController', ['$scope', function ($scope) {

  $scope.words = [
      {
        text: 'Lorem',
        weight: 13
        //link: 'http://themicon.co'
      }, {
        text: 'Ipsum',
        weight: 10.5
      }, {
        text: 'Dolor',
        weight: 9.4
      }, {
        text: 'Sit',
        weight: 8
      }, {
        text: 'Amet',
        weight: 6.2
      }, {
        text: 'Consectetur',
        weight: 5
      }, {
        text: 'Adipiscing',
        weight: 5
      }, {
        text: 'Sit',
        weight: 8
      }, {
        text: 'Amet',
        weight: 6.2
      }, {
        text: 'Consectetur',
        weight: 5
      }, {
        text: 'Adipiscing',
        weight: 5
      }
  ];

}]);

/**=========================================================
 * Module: anchor.js
 * Disables null anchor behavior
 =========================================================*/

App.directive('href', function() {

  return {
    restrict: 'A',
    compile: function(element, attr) {
        return function(scope, element) {
          if(attr.ngClick || attr.href === '' || attr.href === '#'){
            if( !element.hasClass('dropdown-toggle') )
              element.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
              });
          }
        };
      }
   };
});
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

App.directive("animateEnabled", ["$animate", function ($animate) {
  return {
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.animateEnabled, scope);
      }, function (newValue) {
        $animate.enabled(!!newValue, element);
      });
    }
  };
}]);
/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

var ChartJS = function (type) {
    return {
        restrict: "A",
        scope: {
            data: "=",
            options: "=",
            id: "@",
            width: "=",
            height: "=",
            resize: "=",
            chart: "@",
            segments: "@",
            responsive: "=",
            tooltip: "=",
            legend: "="
        },
        link: function ($scope, $elem) {
            var ctx = $elem[0].getContext("2d");
            var autosize = false;

            $scope.size = function () {
                if ($scope.width <= 0) {
                    $elem.width($elem.parent().width());
                    ctx.canvas.width = $elem.width();
                } else {
                    ctx.canvas.width = $scope.width || ctx.canvas.width;
                    autosize = true;
                }

                if($scope.height <= 0){
                    $elem.height($elem.parent().height());
                    ctx.canvas.height = ctx.canvas.width / 2;
                } else {
                    ctx.canvas.height = $scope.height || ctx.canvas.height;
                    autosize = true;
                }
            };

            $scope.$watch("data", function (newVal, oldVal) {
                if(chartCreated)
                    chartCreated.destroy();

                // if data not defined, exit
                if (!newVal) {
                    return;
                }
                if ($scope.chart) { type = $scope.chart; }

                if(autosize){
                    $scope.size();
                    chart = new Chart(ctx);
                }

                if($scope.responsive || $scope.resize)
                    $scope.options.responsive = true;

                if($scope.responsive !== undefined)
                    $scope.options.responsive = $scope.responsive;

                chartCreated = chart[type]($scope.data, $scope.options);
                chartCreated.update();
                if($scope.legend)
                    angular.element($elem[0]).parent().after( chartCreated.generateLegend() );
            }, true);

            $scope.$watch("tooltip", function (newVal, oldVal) {
                if (chartCreated)
                    chartCreated.draw();
                if(newVal===undefined || !chartCreated.segments)
                    return;
                if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                    return;
                var activeSegment = chartCreated.segments[newVal];
                activeSegment.save();
                activeSegment.fillColor = activeSegment.highlightColor;
                chartCreated.showTooltip([activeSegment]);
                activeSegment.restore();
            }, true);

            $scope.size();
            var chart = new Chart(ctx);
            var chartCreated;
        }
    };
};

/* Aliases for various chart types */
App.directive("chartjs",       function () { return ChartJS(); });
App.directive("linechart",     function () { return ChartJS("Line"); });
App.directive("barchart",      function () { return ChartJS("Bar"); });
App.directive("radarchart",    function () { return ChartJS("Radar"); });
App.directive("polarchart",    function () { return ChartJS("PolarArea"); });
App.directive("piechart",      function () { return ChartJS("Pie"); });
App.directive("doughnutchart", function () { return ChartJS("Doughnut"); });
App.directive("donutchart",    function () { return ChartJS("Doughnut"); });

/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

App.directive('classyloader', ["$timeout", "Utils", function($timeout, Utils) {
  'use strict';

  var $scroller       = $(window),
      inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // run after interpolation  
      $timeout(function(){
  
        var $element = $(element),
            options  = $element.data();
        
        // At lease we need a data-percentage attribute
        if(options) {
          if( options.triggerInView ) {

            $scroller.scroll(function() {
              checkLoaderInVIew($element, options);
            });
            // if the element starts already in view
            checkLoaderInVIew($element, options);
          }
          else
            startLoader($element, options);
        }

      }, 0);

      function checkLoaderInVIew(element, options) {
        var offset = -20;
        if( ! element.hasClass(inViewFlagClass) &&
            Utils.isInView(element, {topoffset: offset}) ) {
          startLoader(element, options);
        }
      }
      function startLoader(element, options) {
        element.ClassyLoader(options).addClass(inViewFlagClass);
      }
    }
  };
}]);

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

App.directive('resetKey',  ['$state','$rootScope', function($state, $rootScope) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      resetKey: '='
    },
    link: function(scope, element, attrs) {
      
      scope.resetKey = attrs.resetKey;

    },
    controller: ["$scope", "$element", function($scope, $element) {
    
      $element.on('click', function (e) {
          e.preventDefault();

          if($scope.resetKey) {
            delete $rootScope.$storage[$scope.resetKey];
            $state.go($state.current, {}, {reload: true});
          }
          else {
            $.error('No storage key specified for reset.');
          }
      });

    }]

  };

}]);
/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

App.directive('filestyle', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var options = $element.data();
      
      // old usage support
        options.classInput = $element.data('classinput') || options.classInput;
      
      $element.filestyle(options);
    }]
  };
});

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

App.directive('flatdoc', ['$location', function($location) {
  return {
    restrict: "EA",
    template: "<div role='flatdoc'><div role='flatdoc-menu'></div><div role='flatdoc-content'></div></div>",
    link: function(scope, element, attrs) {

      Flatdoc.run({
        fetcher: Flatdoc.file(attrs.src)
      });
      
      var $root = $('html, body');
      $(document).on('flatdoc:ready', function() {
        var docMenu = $('[role="flatdoc-menu"]');
        docMenu.find('a').on('click', function(e) {
          e.preventDefault(); e.stopPropagation();
          
          var $this = $(this);
          
          docMenu.find('a.active').removeClass('active');
          $this.addClass('active');

          $root.animate({
                scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
            }, 800);
        });

      });
    }
  };

}]);
/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

App.directive('flot', ['$http', '$timeout', function($http, $timeout) {
  'use strict';
  return {
    restrict: 'EA',
    template: '<div></div>',
    scope: {
      dataset: '=?',
      options: '=',
      series: '=',
      callback: '=',
      src: '='
    },
    link: linkFunction
  };
  
  function linkFunction(scope, element, attributes) {
    var height, plot, plotArea, width;
    var heightDefault = 220;

    plot = null;

    width = attributes.width || '100%';
    height = attributes.height || heightDefault;

    plotArea = $(element.children()[0]);
    plotArea.css({
      width: width,
      height: height
    });

    function init() {
      var plotObj;
      if(!scope.dataset || !scope.options) return;
      plotObj = $.plot(plotArea, scope.dataset, scope.options);
      scope.$emit('plotReady', plotObj);
      if (scope.callback) {
        scope.callback(plotObj, scope);
      }

      return plotObj;
    }

    function onDatasetChanged(dataset) {
      if (plot) {
        plot.setData(dataset);
        plot.setupGrid();
        return plot.draw();
      } else {
        plot = init();
        onSerieToggled(scope.series);
        return plot;
      }
    }
    scope.$watchCollection('dataset', onDatasetChanged, true);

    function onSerieToggled (series) {
      if( !plot || !series ) return;
      var someData = plot.getData();
      for(var sName in series) {
        angular.forEach(series[sName], toggleFor(sName));
      }
      
      plot.setData(someData);
      plot.draw();
      
      function toggleFor(sName) {
        return function (s, i){
          if(someData[i] && someData[i][sName])
            someData[i][sName].show = s;
        };
      }
    }
    scope.$watch('series', onSerieToggled, true);
    
    function onSrcChanged(src) {

      if( src ) {

        $http.get(src)
          .success(function (data) {

            $timeout(function(){
              scope.dataset = data;
            });

        }).error(function(){
          $.error('Flot chart: Bad request.');
        });
        
      }
    }
    scope.$watch('src', onSrcChanged);
  }

}]);

/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/

App.directive('formWizard', ["$parse", function($parse){
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attribute) {
      var validate = $parse(attribute.validateSteps)(scope),
          wiz = new Wizard(attribute.steps, !!validate, element);
      scope.wizard = wiz.init();

    }
  };

  function Wizard (quantity, validate, element) {
    
    var self = this;
    self.quantity = parseInt(quantity,10);
    self.validate = validate;
    self.element = element;
    
    self.init = function() {
      self.createsteps(self.quantity);
      self.go(1); // always start at fist step
      return self;
    };

    self.go = function(step) {
      
      if ( angular.isDefined(self.steps[step]) ) {

        if(self.validate && step !== 1) {
          var form = $(self.element),
              group = form.children().children('div').get(step - 2);

          if (false === form.parsley().validate( group.id )) {
            return false;
          }
        }

        self.cleanall();
        self.steps[step] = true;
      }
    };

    self.active = function(step) {
      return !!self.steps[step];
    };

    self.cleanall = function() {
      for(var i in self.steps){
        self.steps[i] = false;
      }
    };

    self.createsteps = function(q) {
      self.steps = [];
      for(var i = 1; i <= q; i++) self.steps[i] = false;
    };

  }

}]);

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

App.directive('toggleFullscreen', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      element.on('click', function (e) {
          e.preventDefault();

          if (screenfull.enabled) {
            
            screenfull.toggle();
            
            // Switch icon indicator
            if(screenfull.isFullscreen)
              $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
            else
              $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

          } else {
            $.error('Fullscreen not enabled');
          }

      });
    }
  };

});


/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

App.directive('loadCss', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function (e) {
          if(element.is('a')) e.preventDefault();
          var uri = attrs.loadCss,
              link;

          if(uri) {
            link = createLink(uri);
            if ( !link ) {
              $.error('Error creating stylesheet link element.');
            }
          }
          else {
            $.error('No stylesheet location defined.');
          }

      });

    }
  };

  function createLink(uri) {
    var linkId = 'autoloaded-stylesheet',
        oldLink = $('#'+linkId).attr('id', linkId + '-old');

    $('head').append($('<link/>').attr({
      'id':   linkId,
      'rel':  'stylesheet',
      'href': uri
    }));

    if( oldLink.length ) {
      oldLink.remove();
    }

    return $('#'+linkId);
  }


});
/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

App.directive('masked', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var $elem = $($element);
      if($.fn.inputmask)
        $elem.inputmask();
    }]
  };
});

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
    "use strict";

    App.directive('morrisBar',   morrisChart('Bar')   );
    App.directive('morrisDonut', morrisChart('Donut') );
    App.directive('morrisLine',  morrisChart('Line')  );
    App.directive('morrisArea',  morrisChart('Area')  );

    function morrisChart(type) {
      return function () {
        return {
          restrict: 'EA',
          scope: {
            morrisData: '=',
            morrisOptions: '='
          },
          link: function($scope, elem, attrs) {
            // start ready to watch for changes in data
            $scope.$watch("morrisData", function(newVal, oldVal) {
              if (newVal) {
                $scope.morrisInstance.setData(newVal);
                $scope.morrisInstance.redraw();
              }
            }, true);
            // the element that contains the chart
            $scope.morrisOptions.element = elem;
            // If data defined copy to options
            if($scope.morrisData)
              $scope.morrisOptions.data = $scope.morrisData;
            // Init chart
            $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

          }
        }
      }
    }

})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: notify.js
 * Directive for notify plugin
 =========================================================*/

App.directive('notify', ["$window", "Notify", function($window, Notify){

  return {
    restrict: 'A',
    scope: {
        options: '=',
        message: '='
    },
    link: function (scope, element, attrs) {
      
      element.on('click', function (e) {
        e.preventDefault();
        Notify.alert(scope.message, scope.options);
      });

    }
  };

}]);


/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

App.directive("now", ['dateFilter', '$interval', function(dateFilter, $interval){
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        
        var format = attrs.format;

        function updateTime() {
          var dt = dateFilter(new Date(), format);
          element.text(dt);
        }

        updateTime();
        $interval(updateTime, 1000);
      }
    };
}]);
/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels. 
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

App.directive('paneltool', ["$compile", "$timeout", function($compile, $timeout){
  var templates = {
    /* jshint multistr: true */
    collapse:"<a href='#' panel-collapse='' tooltip='Collapse Panel' ng-click='{{panelId}} = !{{panelId}}'> \
                <em ng-show='{{panelId}}' class='fa fa-plus'></em> \
                <em ng-show='!{{panelId}}' class='fa fa-minus'></em> \
              </a>",
    dismiss: "<a href='#' panel-dismiss='' tooltip='Close Panel'>\
               <em class='fa fa-times'></em>\
             </a>",
    refresh: "<a href='#' panel-refresh='' data-spinner='{{spinner}}' tooltip='Refresh Panel'>\
               <em class='fa fa-refresh'></em>\
             </a>"
  };

  function getTemplate( elem, attrs ){
    var temp = '';
    attrs = attrs || {};
    if(attrs.toolCollapse)
      temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
    if(attrs.toolDismiss)
      temp += templates.dismiss;
    if(attrs.toolRefresh)
      temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
    return temp;
  }
  
  return {
    restrict: 'E',
    scope: false,
    link: function (scope, element, attrs) {

      var tools = scope.panelTools || attrs;
  
      $timeout(function() {
        element.html(getTemplate(element, tools )).show();
        $compile(element.contents())(scope);
        
        element.addClass('pull-right');
      });

    }
  };
}])
/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/
.directive('panelDismiss', ["$q", "Utils", function($q, Utils){
  'use strict';
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function ($scope, $element) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function () {

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware);
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }
      });
    }]
  };
}])
/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
.directive('panelCollapse', ['$timeout', function($timeout){
  'use strict';
  
  var storageKeyName = 'panelState',
      storage;
  
  return {
    restrict: 'A',
    scope: false,
    controller: ["$scope", "$element", function ($scope, $element) {

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      storage = $scope.$storage;

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function() {

        savePanelState( panelId, !$scope[panelId] );

      });
    }]
  };

  function savePanelState(id, state) {
    if(!id) return false;
    var data = angular.fromJson(storage[storageKeyName]);
    if(!data) { data = {}; }
    data[id] = state;
    storage[storageKeyName] = angular.toJson(data);
  }

  function loadPanelState(id) {
    if(!id) return false;
    var data = angular.fromJson(storage[storageKeyName]);
    if(data) {
      return data[id];
    }
  }

}])
/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/
.directive('panelRefresh', ["$q", function($q){
  'use strict';
  
  return {
    restrict: 'A',
    scope: false,
    controller: ["$scope", "$element", function ($scope, $element) {
      
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';


      // catch clicks to toggle panel refresh
      $element.on('click', function () {
        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) == '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }]
  };
}]);

/**=========================================================
 * Module: play-animation.js
 * Provides a simple way to run animation with a trigger
 * Requires animo.js
 =========================================================*/
 
App.directive('animate', ["$window", "Utils", function($window, Utils){

  'use strict';

  var $scroller = $(window).add('body, .wrapper');
  
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      // Parse animations params and attach trigger to scroll
      var $elem     = $(elem),
          offset    = $elem.data('offset'),
          delay     = $elem.data('delay')     || 100, // milliseconds
          animation = $elem.data('play')      || 'bounce';
      
      if(typeof offset !== 'undefined') {
        
        // test if the element starts visible
        testAnimation($elem);
        // test on scroll
        $scroller.scroll(function(){
          testAnimation($elem);
        });

      }

      // Test an element visibilty and trigger the given animation
      function testAnimation(element) {
          if ( !element.hasClass('anim-running') &&
              Utils.isInView(element, {topoffset: offset})) {
          element
            .addClass('anim-running');

          setTimeout(function() {
            element
              .addClass('anim-done')
              .animo( { animation: animation, duration: 0.7} );
          }, delay);

        }
      }

      // Run click triggered animations
      $elem.on('click', function() {

        var $elem     = $(this),
            targetSel = $elem.data('target'),
            animation = $elem.data('play') || 'bounce',
            target    = $(targetSel);

        if(target && target.length) {
          target.animo( { animation: animation } );
        }
        
      });
    }
  };

}]);

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

App.directive('scrollable', function(){
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      var defaultHeight = 250;
      elem.slimScroll({
          height: (attrs.height || defaultHeight)
      });
    }
  };
});
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Allows to close
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        $('.wrapper').on('click.sidebar', function(e){
          // don't check if sidebar not visible
          if( ! $body.hasClass('aside-toggled')) return;

          // if not child of sidebar
          if( ! $(e.target).parents('.aside').length ) {
            $body.removeClass('aside-toggled');          
          }

        });
      }

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

App.directive('skycon', function(){

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      var skycons = new Skycons({'color': (attrs.color || 'white')});

      element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

      skycons.add(element.children()[0], attrs.skycon);

      skycons.play();

    }
  };
});
/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
App.directive('sparkline', ['$timeout', '$window', function($timeout, $window){

  'use strict';

  return {
    restrict: 'EA',
    controller: ["$scope", "$element", function ($scope, $element) {
      var runSL = function(){
        initSparLine($element);
      };

      $timeout(runSL);
    }]
  };

  function initSparLine($element) {
    var options = $element.data();

    options.type = options.type || 'bar'; // default chart is bar
    options.disableHiddenCheck = true;

    $element.sparkline('html', options);

    if(options.resize) {
      $(window).resize(function(){
        $element.sparkline('html', options);
      });
    }
  }

}]);

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/

App.directive('checkAll', function() {
  'use strict';
  
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element){
      
      $element.on('change', function() {
        var $this = $(this),
            index= $this.index() + 1,
            checkbox = $this.find('input[type="checkbox"]'),
            table = $this.parents('table');
        // Make sure to affect only the correct checkbox column
        table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
          .prop('checked', checkbox[0].checked);

      });
    }]
  };

});
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

App.directive('tagsinput', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      element.on('itemAdded itemRemoved', function(){
        // check if view value is not empty and is a string
        // and update the view from string to an array of tags
        if(ngModel.$viewValue && ngModel.$viewValue.split) {
          ngModel.$setViewValue( ngModel.$viewValue.split(',') );
          ngModel.$render();
        }
      });

      $timeout(function(){
        element.tagsinput();
      });

    }
  };
}]);

// /**=========================================================
//  * Module: toggle-state.js
//  * Toggle a classname from the BODY Useful to change a state that 
//  * affects globally the entire layout or more than one item 
//  * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
//  * User no-persist to avoid saving the sate in browser storage
//  =========================================================*/

// App.directive('toggleState', ['toggleStateService', function(toggle) {
//   'use strict';
  
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs) {

//       var $body = $('body');

//       $(element)
//         .on('click', function (e) {
//           e.preventDefault();
//           var classname = attrs.toggleState;
          
//           if(classname) {
//             if( $body.hasClass(classname) ) {
//               $body.removeClass(classname);
//               if( ! attrs.noPersist)
//                 toggle.removeState(classname);
//             }
//             else {
//               $body.addClass(classname);
//               if( ! attrs.noPersist)
//                 toggle.addState(classname);
//             }
            
//           }

//       });
//     }
//   };
  
// }]);

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/

App.directive("triggerResize", ['$window', '$timeout', function ($window, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function(){
        $timeout(function(){
          $window.dispatchEvent(new Event('resize'))
        });
      });
    }
  };
}]);

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

App.directive('validateForm', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var $elem = $($element);
      if($.fn.parsley)
        $elem.parsley();
    }]
  };
});

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

App.directive('vectorMap', ['vectorMap', function(vectorMap){
  'use strict';

  var defaultColors = {
      markerColor:  '#23b7e5',      // the marker points
      bgColor:      'transparent',      // the background
      scaleColors:  ['#878c9a'],    // the color of the region in the serie
      regionFill:   '#bbbec6'       // the base region color
  };

  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {

      var mapHeight   = attrs.height || '300',
          options     = {
            markerColor:  attrs.markerColor  || defaultColors.markerColor,
            bgColor:      attrs.bgColor      || defaultColors.bgColor,
            scale:        attrs.scale        || 1,
            scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
            regionFill:   attrs.regionFill   || defaultColors.regionFill,
            mapName:      attrs.mapName      || 'world_mill_en'
          };
      
      element.css('height', mapHeight);
      
      vectorMap.init( element , options, scope.seriesData, scope.markersData);

    }
  };

}]);
/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

App.service('Notify', ["$timeout", function($timeout){
    this.alert = alert;

    ////////////////

    function alert(msg, opts) {
        if ( msg ) {
            $timeout(function(){
                $.notify(msg, opts || {});
            });
        }
    }

}]);



/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){
    return {
      basepath: this.basepath
    }
  };

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);
/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

App.service('vectorMap', function() {
  'use strict';
  return {
    init: function($element, opts, series, markers) {
          $element.vectorMap({
            map:             opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin:         1,
            zoomMax:         8,
            zoomOnScroll:    false,
            regionStyle: {
              initial: {
                'fill':           opts.regionFill,
                'fill-opacity':   1,
                'stroke':         'none',
                'stroke-width':   1.5,
                'stroke-opacity': 1
              },
              hover: {
                'fill-opacity': 0.8
              },
              selected: {
                fill: 'blue'
              },
              selectedHover: {
              }
            },
            focusOn:{ x:0.4, y:0.6, scale: opts.scale},
            markerStyle: {
              initial: {
                fill: opts.markerColor,
                stroke: opts.markerColor
              }
            },
            onRegionLabelShow: function(e, el, code) {
              if ( series && series[code] )
                el.html(el.html() + ': ' + series[code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
          });
        }
  };
});
// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('myAppName', ['angle']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition
  
}]);

myApp.controller('oneOfMyOwnController', ["$scope", function($scope) {
  /* controller code */
}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);
