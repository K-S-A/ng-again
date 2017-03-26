"use strict";angular.module("ngTestApp",["ngAria","ngCookies","ngFlash","ngAnimate","ui.router","ui.bootstrap","djangoRESTResources","yaru22.angular-timeago"]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("register",{url:"/registration",templateUrl:"views/auth/register.html",controller:"RegisterCtrl as vm"}).state("products",{url:"/products",templateUrl:"views/products/index.html",controller:"ProductsCtrl as vm",resolve:{products:["Product",function(a){a.all=a.query()}]}}).state("product",{url:"/products/{id:int}",views:{"":{templateUrl:"views/products/show.html",controller:"ProductCtrl as vm"},reviews:{templateUrl:"views/reviews/index.html",controller:"ReviewsCtrl as vm"},"add-review":{templateUrl:"views/reviews/form.html",controller:"ReviewsCtrl as vm"}},resolve:{products:["$q","$stateParams","Product",function(a,b,c){var d=a.defer();return c.query(function(a){c.all=a,c.get(b.id)?d.resolve(a):d.reject()},function(a){d.reject(a)}),d.promise}],reviews:["$stateParams","Review",function(a,b){b.all=b.query({productId:a.id})}]}}),b.otherwise("/products")}]).run(["$rootScope","$state","Config","cookieStore","Auth",function(a,b,c,d,e){a.$on("$viewContentLoaded",function(){angular.element(document).find("#productsCarousel").carousel()}),a.$watch(function(){return e.token},function(a){a&&"register"===b.current.name&&b.go("products"),d.put("token",a)}),a.$watch(function(){return e.currentUser.username},function(a){d.put("username",a)})}]),angular.module("ngTestApp").factory("Auth",["$http","cookieStore","Config",function(a,b,c){function d(a,b,c){g("register/",{username:a,password:b},c)}function e(a,b,c){g("login/",{username:a,password:b},c)}function f(a){h.token=h.currentUser.username=void 0,"function"==typeof a&&a()}function g(b,d,e){a.post(c.API_BASE_URL+b,d).then(function(a){a.data.success?(h.token=a.data.token,h.currentUser.username=d.username):h.message=a.data.message,"function"==typeof e&&e(a.data)})}var h;return h={currentUser:{username:b.get("username")},token:b.get("token"),register:d,login:e,logout:f}}]),angular.module("ngTestApp").constant("Config",{IMAGES_BASE_URL:"https://smktesting.herokuapp.com/static/",API_BASE_URL:"https://smktesting.herokuapp.com/api/",COOKIE_NAMESPACE:"ngTestApp",MESSAGES:{ON_LOGIN:"Successfully logged in!",ON_LOGIN_ERROR:"Wrong user credentials. Check username/password and try again!",ON_REGISTER:"Successfully registered!",ON_REGISTER_ERROR:"Something go wrong. Check username/password and try again!",ON_LOGOUT:"Logged out!",ON_SERVER_ERROR:"Server error! Please, try again later."}}),angular.module("ngTestApp").factory("cookieStore",["$cookieStore","Config",function(a,b){return{put:function(c,d){return a.put(b.COOKIE_NAMESPACE+"."+c,d)},get:function(c){return a.get(b.COOKIE_NAMESPACE+"."+c)}}}]),angular.module("ngTestApp").controller("LoginCtrl",["$scope","FlashProvider","Auth",function(a,b,c){var d=this;d.currentUser=c.currentUser,d.login=function(){d.loading=!0,c.login(d.username,d.password,function(c){d.loading=!1,c.success?(d.username=d.password=null,a.form.$setPristine(),b.create("login")):b.create("loginError",c.message)})},d.logout=function(){c.logout(),b.create("logout")}}]),angular.module("ngTestApp").controller("RegisterCtrl",["$state","FlashProvider","Auth",function(a,b,c){var d=this;d.register=function(){d.loading=!0,c.register(d.username,d.password,function(c){d.loading=!1,c.success?(a.go("products"),b.create("register")):b.create("registerError",c.message)})}}]),angular.module("ngTestApp").directive("loginNav",[function(){return{templateUrl:"views/auth/nav-login.html",controller:"LoginCtrl as vm",restrict:"A"}}]),angular.module("ngTestApp").directive("logoutNav",[function(){return{templateUrl:"views/auth/nav-logout.html",controller:"LoginCtrl as vm",restrict:"A"}}]),angular.module("ngTestApp").factory("FlashProvider",["Config","Flash",function(a,b){function c(a,c){b.clear(),b.create(a,c)}var d=this;return d._login=function(b){c("success",b||a.MESSAGES.ON_LOGIN)},d._loginError=function(b){c("danger",b||a.MESSAGES.ON_LOGIN_ERROR)},d._register=function(b){c("success",b||a.MESSAGES.ON_REGISTER)},d._registerError=function(b){c("danger",b||a.MESSAGES.ON_REGISTER_ERROR)},d._logout=function(b){c("success",b||a.MESSAGES.ON_LOGOUT)},d._serverError=function(b){c("danger",b||a.MESSAGES.ON_SERVER_ERROR)},{create:function(a,b){return d["_"+a](b)}}}]),angular.module("ngTestApp").factory("Product",["djResource","Config",function(a,b){var c=a(b.API_BASE_URL+"products/:id/",{id:"@id"},{query:{method:"GET",isArray:!0,transformResponse:function(a){return angular.fromJson(a).map(function(a,c){return/^https?:.+$/.test(a.img)||(a.img=b.IMAGES_BASE_URL+a.img),a._index=c,a})}}});return c.get=function(a){return c.all.find(function(b){return b.id===a})},c.prevProduct=function(a){return c.all[a._index-1]||c.all[c.all.length-1]},c.nextProduct=function(a){return c.all[a._index+1]||c.all[0]},c}]),angular.module("ngTestApp").controller("ProductsCtrl",["Product",function(a){var b=this;b.products=a.all}]),angular.module("ngTestApp").factory("Review",["Config","djResource","Auth",function(a,b,c){var d=b(a.API_BASE_URL+"reviews/:productId",{productId:"@productId"},{save:{method:"POST",headers:{Authorization:"Token "+c.token}}});return d.refresh=function(a,b){return function(){d.query(a,function(a){var c=d.all.map(function(a){return a.id});a.forEach(function(a){c.indexOf(a.id)<0&&d.all.push(a)}),b()})}},d.create=function(a,b,c,e){new d(a).$save(b,d.refresh(b,c),e)},d}]),angular.module("ngTestApp").controller("ReviewsCtrl",["$scope","$stateParams","Review","FlashProvider",function(a,b,c,d){var e=this;e.review={rate:0},e.reviews=c.all,e.reset=function(){e.review.text="",e.review.rate=0,e.loading=!1,a.reviewForm.$setPristine()},e.create=function(){e.loading=!0,c.create(e.review,{productId:b.id},function(){e.reset()},function(a){e.loading=!1,d.create("serverError",a.data&&a.data.message)})}}]),angular.module("ngTestApp").controller("ProductCtrl",["$stateParams","Product",function(a,b){var c=this;c.currentProduct=b.get(a.id),c.prevProductId=b.prevProduct(c.currentProduct).id,c.nextProductId=b.nextProduct(c.currentProduct).id}]),angular.module("ngTestApp").directive("myAuthorized",["Auth",function(a){return{restrict:"A",link:function(b,c,d){var e="true"===d.myAuthorized;b.$watch(function(){return a.token},function(a){Boolean(a)===e?c.show():c.hide()})}}}]),angular.module("ngTestApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/auth/nav-login.html",'<a href="" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a> <ul style="padding: 14px 14px 0" class="dropdown-menu"> <li> <div class="row" style="min-width: 200px"> <div class="col-md-12"> <form id="form" name="form" role="form" ng-submit="vm.login()"> <div class="form-group" ng-class="{ \'has-error\': form.username.$dirty && form.username.$error.required }"> <label for="username" class="sr-only">Username</label> <input type="text" class="form-control" name="username" id="username" ng-model="vm.username" placeholder="Username..." required> <span ng-show="form.username.$dirty && form.username.$error.required" class="help-block">Username is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': form.password.$dirty && form.password.$error.required }"> <label for="password" class="sr-only">Username</label> <input type="password" class="form-control" name="password" id="password" ng-model="vm.password" placeholder="Password..." required> <span ng-show="form.password.$dirty && form.password.$error.required" class="help-block">Password is required</span> </div> <div class="form-group"> <button type="submit" class="btn btn-primary btn-block" ng-disabled="form.$invalid || vm.loading">Sign in</button> </div> </form> <p class="small"> New user? Visit <a ui-sref="register">registration</a> page to create new account. </p> </div> </div> </li> </ul>'),a.put("views/auth/nav-logout.html",'<a href="" class="dropdown-toggle" data-toggle="dropdown"> <span class="glyphicon glyphicon-user"></span> <b ng-bind="vm.currentUser.username"></b> <span class="caret"></span> </a> <ul class="dropdown-menu"> <li> <a ng-click="vm.logout()" href="">Logout<span class="glyphicon glyphicon-log-out pull-right"></span></a> </li> </ul>'),a.put("views/auth/register.html",'<div class="row"> <div class="col-md-6 col-md-offset-3"> <form id="form" name="form" role="form" ng-submit="vm.register()"> <div class="form-group" ng-class="{ \'has-error\': form.username.$dirty && form.username.$error.required }"> <label for="username" class="sr-only">Username</label> <input type="text" class="form-control" name="username" id="username" ng-model="vm.username" placeholder="Username..." required> <span ng-show="form.username.$dirty && form.username.$error.required" class="help-block">Username is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': form.password.$dirty && form.password.$error.required }"> <label for="password" class="sr-only">Password</label> <input type="password" class="form-control" name="password" id="password" ng-model="vm.password" placeholder="Password..." required> <span ng-show="form.password.$dirty && form.password.$error.required" class="help-block">Password is required</span> </div> <div class="form-group" ng-class="{ \'has-error\': form.confirmation.$dirty && vm.password != vm.confirmation }"> <label for="confirmation" class="sr-only">Password confirmation</label> <input type="confirmation" class="form-control" name="confirmation" id="confirmation" ng-model="vm.confirmation" placeholder="Password confirmation..."> <span ng-show="form.confirmation.$dirty && vm.password != vm.confirmation" class="help-block">Confirmation and password do not match.</span> </div> <div class="form-group"> <button type="submit" class="btn btn-primary btn-block" ng-disabled="form.$invalid || vm.loading">Register</button> <button type="button" class="btn btn-default btn-block" ui-sref="root">Cancel</button> </div> </form> </div> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/products/index.html",'<div id="productsCarousel" class="carousel slide" data-ride="carousel" data-interval="3000"> <ol class="carousel-indicators" style="bottom: 0"> <li data-target="#productsCarousel" data-slide-to="{{$index}}" style="box-shadow: 0 0 5pt 2pt grey; margin: 0 3px" ng-repeat="product in vm.products" class="{{$index ? \'\' : \'active\'}}"></li> </ol> <div class="carousel-inner" style="height: 250px"> <div ng-repeat="product in vm.products" class="item {{$index ? \'\' : \'active\'}}"> <img ng-src="{{::product.img}}" class="img-thumbnail center-block" style="height: 250px"> <div class="carousel-caption"> <h3 class="text-capitalize"> <a ui-sref="product({id: product.id})" style="font-size: 30px; color: white" ng-bind="::product.title"></a> </h3> <span class="text-capitalize label label-primary" ng-bind="::product.text"></span> </div> </div> </div> <a class="carousel-control left" href="" data-target="#productsCarousel" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left"></span> </a> <a class="carousel-control right" href="" data-target="#productsCarousel" data-slide="next"> <span class="glyphicon glyphicon-chevron-right"></span> </a> </div>'),a.put("views/products/show.html",'<div id="productsCarousel" class="carousel slide" data-ride="carousel" data-interval="false"> <div class="carousel-inner" style="height: 250px"> <div class="item active"> <img ng-src="{{::vm.currentProduct.img}}" class="img-thumbnail center-block" style="height: 250px"> </div> </div> <a class="carousel-control left" ui-sref="product({id: vm.prevProductId})"> <span class="glyphicon glyphicon-chevron-left"></span> </a> <a class="carousel-control right" ui-sref="product({id: vm.nextProductId})"> <span class="glyphicon glyphicon-chevron-right"></span> </a> </div> <h3 class="text-capitalize text-center" style="font-size: 30px"> {{::vm.currentProduct.title}} <small class="text-capitalize" ng-bind="::vm.currentProduct.text"></small> </h3>'),a.put("views/reviews/form.html",'<form id="reviewForm" name="reviewForm" role="form" ng-submit="vm.create()" my-authorized="true"> <div class="form-group" style="margin-bottom: 0"> <span uib-rating ng-model="vm.review.rate" aria-labelledby="default-rating" style="color: #FFD700; font-size: 30px"></span> </div> <div class="form-group" ng-class="{ \'has-error\': reviewForm.text.$dirty && reviewForm.text.$error.required }"> <label for="text" class="sr-only">Message</label> <textarea ng-model="vm.review.text" class="form-control" name="text" placeholder="Enter review text here..." id="text" rows="3" required style="resize: none"></textarea> <span ng-show="reviewForm.text.$dirty && reviewForm.text.$error.required" class="help-block">Review text can\'t be blank.</span> </div> <div class="form-group"> <div class="btn-group btn-group-sm btn-group-justified" role="group"> <div class="btn-group" role="group"> <button type="submit" class="btn btn-primary btn-block" ng-disabled="reviewForm.$invalid || vm.loading">Submit review</button> </div> <div class="btn-group" role="group"> <button ng-click="vm.reset()" ng-disabled="reviewForm.$pristine || vm.loading" type="button" class="btn btn-default btn-block">Reset</button> </div> </div> </div> </form> <div class="alert alert-info" my-authorized="false"> <p> Only authorized users can leave reviews! <a ui-sref="register" class="alert-link">Register</a> or login to proceed. </p> </div>'),a.put("views/reviews/index.html",'<div class="review panel panel-default" ng-repeat="review in vm.reviews | orderBy: \'-created_at\'" ng-animate="ng-animate=&quot;{enter:" animate-enter leave: animate-leave> <div class="panel-heading"> <span uib-rating ng-model="::review.rate" read-only="true" aria-labelledby="default-rating" style="color: #FFD700"></span> <span uib-tooltip="{{::review.created_at}}">{{::review.created_at | timeAgo}}</span> <span>from</span> <strong><span class="glyphicon glyphicon-user"></span>{{::review.created_by.username}}</strong> </div> <div class="panel-body"> <p ng-bind="::review.text"></p> </div> </div> <div class="well well-sm text-center" ng-hide="vm.reviews.length"> <p>No reviews for current product.</p> </div>')}]);