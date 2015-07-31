(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		]);


	angular.module('app.routes', ['ui.router', 'ngStorage', 'satellizer']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'ngMdIcons', 'angular-loading-bar']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router', 'ngStorage', 'restangular']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();
(function(){
	"use strict";

	angular.module('app.routes').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

		var getView = function(viewName){
			return '/views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					sidebar: {
						templateUrl: getView('sidebar')
					},
					header: {
						templateUrl: getView('header')
					},
					main: {}
				}
			})
			.state('app.landing', {
				url: '/',
				data: {
					pageName: 'Overview'
				},
				views: {
					'main@': {
						templateUrl: getView('landing')
					}
				}
			})
			.state('app.install', {
				url: '/install',
				data: {
					pageName: 'Install'
				},
				views: {
					'main@': {
						templateUrl: getView('install')
					}
				}
			})
			.state('app.tabs', {
				url: '/features',
				data: {
					pageName: 'Features'
				},
				views: {
					'main@': {
						templateUrl: getView('tabs')
					}
				}
			});


	}]);
})();
(function(){
	"use strict";

	angular.module('app.routes').run(["$rootScope", function($rootScope){
		$rootScope.$on("$stateChangeStart", function(event, toState){

			if (toState.data && toState.data.pageName){
				$rootScope.current_page = toState.data.pageName;
			}


		});
		$rootScope.$on("$viewContentLoaded", function(event, toState){
			Prism.highlightAll();
		});
	}]);

})();

(function (){
	"use strict";

	angular.module('app.config').config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeSpinner = false;
	}]);

})();

(function(){
	"use strict";

	angular.module('app.config').config( ["RestangularProvider", function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/1/');
	}]);

})();
(function (){
    "use strict";

    angular.module('app.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/1/authenticate';
    }]);

})();
(function(){
	"use strict";

	angular.module('app.config').config( ["$mdThemingProvider", function($mdThemingProvider) {
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
		$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('grey')
		.warnPalette('red');
	}]);

})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'capitalize', function(){
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	});
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 't', ["$filter", function( $filter ){
		return function( text ){
			text = $filter('translate')(text);
			return $filter('ucfirst')(text);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', ["$sce", function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter('ucfirst', function() {
		return function( input ) {
			if ( !input ){
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	});

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('HeaderCtrl', ["$scope", "$rootScope", function($scope, $rootScope){

		$scope.$watch(function(){
			return $rootScope.current_page;
		}, function(newPage){
			$scope.current_page = newPage || 'Page Name';
		});


	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", "$interval", function( $scope, $mdToast, $mdDialog, $interval ){

		$scope.promoImage = 'https://i.imgur.com/XiMykki.png';
		$scope.icon = 'send';

		var icons = [
		'office', 'facebook', 'twitter', 'apple', 'whatsapp', 'linkedin', 'windows', 'accessibility', 'alarm', 'aspect_ratio',
		'autorenew', 'bookmark_outline', 'dashboard', 'dns', 'favorite_outline', 'get_app', 'highlight_remove', 'history', 'list',
		'picture_in_picture', 'print', 'settings_ethernet', 'settings_power', 'shopping_cart', 'spellcheck', 'swap_horiz', 'swap_vert',
		'thumb_up', 'thumbs_up_down', 'translate', 'trending_up', 'visibility', 'warning', 'mic', 'play_circle_outline', 'repeat',
		'skip_next', 'call', 'chat', 'clear_all', 'dialpad', 'dnd_on', 'forum', 'location_on', 'vpn_key', 'filter_list', 'inbox',
		'link', 'remove_circle_outline', 'save', 'text_format', 'access_time', 'airplanemode_on', 'bluetooth', 'data_usage',
		'gps_fixed', 'now_wallpaper', 'now_widgets', 'storage', 'wifi_tethering', 'attach_file', 'format_line_spacing',
		'format_list_numbered', 'format_quote', 'vertical_align_center', 'wrap_text', 'cloud_queue', 'file_download', 'folder_open',
		'cast', 'headset', 'keyboard_backspace', 'mouse', 'speaker', 'watch', 'audiotrack', 'edit', 'brush', 'looks', 'crop_free',
		'camera', 'filter_vintage', 'hdr_strong', 'photo_camera', 'slideshow', 'timer', 'directions_bike', 'hotel', 'local_library',
		'directions_walk', 'local_cafe', 'local_pizza', 'local_florist', 'my_location', 'navigation', 'pin_drop', 'arrow_back', 'menu',
		'close', 'more_horiz', 'more_vert', 'refresh', 'phone_paused', 'vibration', 'cake', 'group', 'mood', 'person',
		'notifications_none', 'plus_one', 'school', 'share', 'star_outline'
		],
		counter = 0;

		$interval(function(){
			$scope.icon = icons[++counter];
			if ( counter > 112 ){
				counter = 0;
			}
		}, 2000);

		$scope.toastNotification = function(){
			$mdToast.show(
				$mdToast.simple()
				.content('This is a toast notification!')
				.position('top right')
				.hideDelay(3000)
				);
		};

		$scope.showDialog = function( event ){
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.title('This is an alert title')
				.content('You can specify some description text in here.')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(event)
				);
		};

	}]);

})();
(function (){
    "use strict";

    angular.module('app.controllers').controller('LoginCtrl', ["$scope", "Restangular", "$auth", "$state", function ($scope, Restangular, $auth, $state){

        // Use Satellizer's $auth service to login because it'll automatically save the JWT in localStorage
        $auth.login(credentials).then(function (data){
            // If login is successful, redirect to the users state
            $state.go('dashboard');
        });


        // This request will hit the getData method in the AuthenticateController
        // on the Laravel side and will return your data that require authentication
        Restangular.all('api/authenticate/data').get().then(function (response){

        }, function (error){

        });

    }]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('SidebarCtrl', ["$scope", "$state", function($scope, $state){

		$scope.noop = function(){
			//noop hack to make the hover effect work
		};

	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', function(){

	});

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcbWFpbi5qcyIsImFwcFxccm91dGVzLmpzIiwiYXBwXFxyb3V0ZXMucnVuLmpzIiwiY29uZmlnXFxsb2FkaW5nX2Jhci5qcyIsImNvbmZpZ1xccmVzdGFuZ3VsYXIuanMiLCJjb25maWdcXHNhdGVsbGl6ZXIuanMiLCJjb25maWdcXHRoZW1lLmpzIiwiZmlsdGVyc1xcY2FwaXRhbGl6ZS5qcyIsImZpbHRlcnNcXHRyYW5zbGF0aW9ucy5qcyIsImZpbHRlcnNcXHRydXN0X2h0bWwuanMiLCJmaWx0ZXJzXFx1Y2ZpcnN0LmpzIiwiYXBwXFxoZWFkZXJcXGhlYWRlci5qcyIsImFwcFxcaW5zdGFsbFxcaW5zdGFsbC5qcyIsImFwcFxcbGFuZGluZ1xcbGFuZGluZy5qcyIsImFwcFxcbG9naW5cXGxvZ2luLmpzIiwiYXBwXFxzaWRlYmFyXFxzaWRlYmFyLmpzIiwiYXBwXFx0YWJzXFx0YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcclxuXHRcdFtcclxuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxyXG5cdFx0J2FwcC5maWx0ZXJzJyxcclxuXHRcdCdhcHAuc2VydmljZXMnLFxyXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcclxuXHRcdCdhcHAucm91dGVzJyxcclxuXHRcdCdhcHAuY29uZmlnJyxcclxuXHRcdF0pO1xyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAnc2F0ZWxsaXplciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInLCAnbmdNZEljb25zJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblxyXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSl7XHJcblx0XHRcdHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcblx0XHR9O1xyXG5cclxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcblx0XHQkc3RhdGVQcm92aWRlclxyXG5cdFx0XHQuc3RhdGUoJ2FwcCcsIHtcclxuXHRcdFx0XHRhYnN0cmFjdDogdHJ1ZSxcclxuXHRcdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdFx0c2lkZWJhcjoge1xyXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2lkZWJhcicpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aGVhZGVyOiB7XHJcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG1haW46IHt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuc3RhdGUoJ2FwcC5sYW5kaW5nJywge1xyXG5cdFx0XHRcdHVybDogJy8nLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHBhZ2VOYW1lOiAnT3ZlcnZpZXcnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdFx0J21haW5AJzoge1xyXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuc3RhdGUoJ2FwcC5pbnN0YWxsJywge1xyXG5cdFx0XHRcdHVybDogJy9pbnN0YWxsJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRwYWdlTmFtZTogJ0luc3RhbGwnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdFx0J21haW5AJzoge1xyXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnaW5zdGFsbCcpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuc3RhdGUoJ2FwcC50YWJzJywge1xyXG5cdFx0XHRcdHVybDogJy9mZWF0dXJlcycsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0cGFnZU5hbWU6ICdGZWF0dXJlcydcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZpZXdzOiB7XHJcblx0XHRcdFx0XHQnbWFpbkAnOiB7XHJcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0YWJzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpe1xyXG5cdFx0JHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSl7XHJcblxyXG5cdFx0XHRpZiAodG9TdGF0ZS5kYXRhICYmIHRvU3RhdGUuZGF0YS5wYWdlTmFtZSl7XHJcblx0XHRcdFx0JHJvb3RTY29wZS5jdXJyZW50X3BhZ2UgPSB0b1N0YXRlLmRhdGEucGFnZU5hbWU7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fSk7XHJcblx0XHQkcm9vdFNjb3BlLiRvbihcIiR2aWV3Q29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSl7XHJcblx0XHRcdFByaXNtLmhpZ2hsaWdodEFsbCgpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uIChjZnBMb2FkaW5nQmFyUHJvdmlkZXIpe1xyXG5cdFx0Y2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gZmFsc2U7XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcclxuXHRcdFJlc3Rhbmd1bGFyUHJvdmlkZXJcclxuXHRcdC5zZXRCYXNlVXJsKCcvYXBpLzEvJyk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcclxuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXHJcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cclxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvMS9hdXRoZW50aWNhdGUnO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xyXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgnaW5kaWdvJylcclxuXHRcdC5hY2NlbnRQYWxldHRlKCdncmV5JylcclxuXHRcdC53YXJuUGFsZXR0ZSgncmVkJyk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdjYXBpdGFsaXplJywgZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCwgYWxsKSB7XHJcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XHJcblx0XHRcdFx0cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fSkgOiAnJztcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3QnLCBmdW5jdGlvbiggJGZpbHRlciApe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCB0ZXh0ICl7XHJcblx0XHRcdHRleHQgPSAkZmlsdGVyKCd0cmFuc2xhdGUnKSh0ZXh0KTtcclxuXHRcdFx0cmV0dXJuICRmaWx0ZXIoJ3VjZmlyc3QnKSh0ZXh0KTtcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3RydXN0SHRtbCcsIGZ1bmN0aW9uKCAkc2NlICl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcclxuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3VjZmlyc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggaW5wdXQgKSB7XHJcblx0XHRcdGlmICggIWlucHV0ICl7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSGVhZGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSl7XHJcblxyXG5cdFx0JHNjb3BlLiR3YXRjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gJHJvb3RTY29wZS5jdXJyZW50X3BhZ2U7XHJcblx0XHR9LCBmdW5jdGlvbihuZXdQYWdlKXtcclxuXHRcdFx0JHNjb3BlLmN1cnJlbnRfcGFnZSA9IG5ld1BhZ2UgfHwgJ1BhZ2UgTmFtZSc7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xhbmRpbmdDdHJsJywgZnVuY3Rpb24oICRzY29wZSwgJG1kVG9hc3QsICRtZERpYWxvZywgJGludGVydmFsICl7XHJcblxyXG5cdFx0JHNjb3BlLnByb21vSW1hZ2UgPSAnaHR0cHM6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XHJcblx0XHQkc2NvcGUuaWNvbiA9ICdzZW5kJztcclxuXHJcblx0XHR2YXIgaWNvbnMgPSBbXHJcblx0XHQnb2ZmaWNlJywgJ2ZhY2Vib29rJywgJ3R3aXR0ZXInLCAnYXBwbGUnLCAnd2hhdHNhcHAnLCAnbGlua2VkaW4nLCAnd2luZG93cycsICdhY2Nlc3NpYmlsaXR5JywgJ2FsYXJtJywgJ2FzcGVjdF9yYXRpbycsXHJcblx0XHQnYXV0b3JlbmV3JywgJ2Jvb2ttYXJrX291dGxpbmUnLCAnZGFzaGJvYXJkJywgJ2RucycsICdmYXZvcml0ZV9vdXRsaW5lJywgJ2dldF9hcHAnLCAnaGlnaGxpZ2h0X3JlbW92ZScsICdoaXN0b3J5JywgJ2xpc3QnLFxyXG5cdFx0J3BpY3R1cmVfaW5fcGljdHVyZScsICdwcmludCcsICdzZXR0aW5nc19ldGhlcm5ldCcsICdzZXR0aW5nc19wb3dlcicsICdzaG9wcGluZ19jYXJ0JywgJ3NwZWxsY2hlY2snLCAnc3dhcF9ob3JpeicsICdzd2FwX3ZlcnQnLFxyXG5cdFx0J3RodW1iX3VwJywgJ3RodW1ic191cF9kb3duJywgJ3RyYW5zbGF0ZScsICd0cmVuZGluZ191cCcsICd2aXNpYmlsaXR5JywgJ3dhcm5pbmcnLCAnbWljJywgJ3BsYXlfY2lyY2xlX291dGxpbmUnLCAncmVwZWF0JyxcclxuXHRcdCdza2lwX25leHQnLCAnY2FsbCcsICdjaGF0JywgJ2NsZWFyX2FsbCcsICdkaWFscGFkJywgJ2RuZF9vbicsICdmb3J1bScsICdsb2NhdGlvbl9vbicsICd2cG5fa2V5JywgJ2ZpbHRlcl9saXN0JywgJ2luYm94JyxcclxuXHRcdCdsaW5rJywgJ3JlbW92ZV9jaXJjbGVfb3V0bGluZScsICdzYXZlJywgJ3RleHRfZm9ybWF0JywgJ2FjY2Vzc190aW1lJywgJ2FpcnBsYW5lbW9kZV9vbicsICdibHVldG9vdGgnLCAnZGF0YV91c2FnZScsXHJcblx0XHQnZ3BzX2ZpeGVkJywgJ25vd193YWxscGFwZXInLCAnbm93X3dpZGdldHMnLCAnc3RvcmFnZScsICd3aWZpX3RldGhlcmluZycsICdhdHRhY2hfZmlsZScsICdmb3JtYXRfbGluZV9zcGFjaW5nJyxcclxuXHRcdCdmb3JtYXRfbGlzdF9udW1iZXJlZCcsICdmb3JtYXRfcXVvdGUnLCAndmVydGljYWxfYWxpZ25fY2VudGVyJywgJ3dyYXBfdGV4dCcsICdjbG91ZF9xdWV1ZScsICdmaWxlX2Rvd25sb2FkJywgJ2ZvbGRlcl9vcGVuJyxcclxuXHRcdCdjYXN0JywgJ2hlYWRzZXQnLCAna2V5Ym9hcmRfYmFja3NwYWNlJywgJ21vdXNlJywgJ3NwZWFrZXInLCAnd2F0Y2gnLCAnYXVkaW90cmFjaycsICdlZGl0JywgJ2JydXNoJywgJ2xvb2tzJywgJ2Nyb3BfZnJlZScsXHJcblx0XHQnY2FtZXJhJywgJ2ZpbHRlcl92aW50YWdlJywgJ2hkcl9zdHJvbmcnLCAncGhvdG9fY2FtZXJhJywgJ3NsaWRlc2hvdycsICd0aW1lcicsICdkaXJlY3Rpb25zX2Jpa2UnLCAnaG90ZWwnLCAnbG9jYWxfbGlicmFyeScsXHJcblx0XHQnZGlyZWN0aW9uc193YWxrJywgJ2xvY2FsX2NhZmUnLCAnbG9jYWxfcGl6emEnLCAnbG9jYWxfZmxvcmlzdCcsICdteV9sb2NhdGlvbicsICduYXZpZ2F0aW9uJywgJ3Bpbl9kcm9wJywgJ2Fycm93X2JhY2snLCAnbWVudScsXHJcblx0XHQnY2xvc2UnLCAnbW9yZV9ob3JpeicsICdtb3JlX3ZlcnQnLCAncmVmcmVzaCcsICdwaG9uZV9wYXVzZWQnLCAndmlicmF0aW9uJywgJ2Nha2UnLCAnZ3JvdXAnLCAnbW9vZCcsICdwZXJzb24nLFxyXG5cdFx0J25vdGlmaWNhdGlvbnNfbm9uZScsICdwbHVzX29uZScsICdzY2hvb2wnLCAnc2hhcmUnLCAnc3Rhcl9vdXRsaW5lJ1xyXG5cdFx0XSxcclxuXHRcdGNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdCRpbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuaWNvbiA9IGljb25zWysrY291bnRlcl07XHJcblx0XHRcdGlmICggY291bnRlciA+IDExMiApe1xyXG5cdFx0XHRcdGNvdW50ZXIgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAyMDAwKTtcclxuXHJcblx0XHQkc2NvcGUudG9hc3ROb3RpZmljYXRpb24gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkbWRUb2FzdC5zaG93KFxyXG5cdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXHJcblx0XHRcdFx0LmNvbnRlbnQoJ1RoaXMgaXMgYSB0b2FzdCBub3RpZmljYXRpb24hJylcclxuXHRcdFx0XHQucG9zaXRpb24oJ3RvcCByaWdodCcpXHJcblx0XHRcdFx0LmhpZGVEZWxheSgzMDAwKVxyXG5cdFx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHRcdCRtZERpYWxvZy5zaG93KFxyXG5cdFx0XHRcdCRtZERpYWxvZy5hbGVydCgpXHJcblx0XHRcdFx0LnBhcmVudChhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkpXHJcblx0XHRcdFx0LnRpdGxlKCdUaGlzIGlzIGFuIGFsZXJ0IHRpdGxlJylcclxuXHRcdFx0XHQuY29udGVudCgnWW91IGNhbiBzcGVjaWZ5IHNvbWUgZGVzY3JpcHRpb24gdGV4dCBpbiBoZXJlLicpXHJcblx0XHRcdFx0LmFyaWFMYWJlbCgnQWxlcnQgRGlhbG9nIERlbW8nKVxyXG5cdFx0XHRcdC5vaygnR290IGl0IScpXHJcblx0XHRcdFx0LnRhcmdldEV2ZW50KGV2ZW50KVxyXG5cdFx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIFJlc3Rhbmd1bGFyLCAkYXV0aCwgJHN0YXRlKXtcclxuXHJcbiAgICAgICAgLy8gVXNlIFNhdGVsbGl6ZXIncyAkYXV0aCBzZXJ2aWNlIHRvIGxvZ2luIGJlY2F1c2UgaXQnbGwgYXV0b21hdGljYWxseSBzYXZlIHRoZSBKV1QgaW4gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBJZiBsb2dpbiBpcyBzdWNjZXNzZnVsLCByZWRpcmVjdCB0byB0aGUgdXNlcnMgc3RhdGVcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdkYXNoYm9hcmQnKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIFRoaXMgcmVxdWVzdCB3aWxsIGhpdCB0aGUgZ2V0RGF0YSBtZXRob2QgaW4gdGhlIEF1dGhlbnRpY2F0ZUNvbnRyb2xsZXJcclxuICAgICAgICAvLyBvbiB0aGUgTGFyYXZlbCBzaWRlIGFuZCB3aWxsIHJldHVybiB5b3VyIGRhdGEgdGhhdCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgICAgUmVzdGFuZ3VsYXIuYWxsKCdhcGkvYXV0aGVudGljYXRlL2RhdGEnKS5nZXQoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcil7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1NpZGViYXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpe1xyXG5cclxuXHRcdCRzY29wZS5ub29wID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly9ub29wIGhhY2sgdG8gbWFrZSB0aGUgaG92ZXIgZWZmZWN0IHdvcmtcclxuXHRcdH07XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbigpe1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9