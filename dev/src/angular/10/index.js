angular.module('myApp', [])
.directive('myDirective', function() {
	return {
		restrict: 'EACM', //指令类型  E:元素  A：属性  C：类名   M：注释
		priority: 0,  //优先级   默认为0   eg: ng-repeat 将这个参数设置为1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。
		terminal: true || false, //AngularJS停止运行当前元素上比本指令优先级低的指令。但同当前指令优先级相同的指令还是会被执行。
		template: 'String'  //一段html文本 
				|| function(tElement, tAttrs) {}, //返回一个代表模板的字符串
		templateUrl: 'String'  //代表外部HTML文件路径的字符串
				|| function(tElement , tAttrs){}, //返回一个外部HTML文件路径的字符串
		replace: true || false, //默认为false  默认值意味着模板会被当作子元素插入到调用此指令的元素内部
		scope: false || true || {}, //指令作用域  默认false ： 直接调用相同的作用域对象    true : 从父作用域继承并创建一个新的作用域对象   {} :创建隔离作用域
//		scope: {
//			ngModel: '=', // 将ngModel同指定对象绑定
//			onSend: '&', // 将引用传递给这个方法
//			fromName: '@' // 储存与fromName相关联的字符串
//		}
		transclude: false || true, //默认为false 设置必为:true   //嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏
		controller: 'SomeController' //设置为字符串时， 会以字符串的值为名字，来查找注册在应用中的控制器的构造函数
				|| function($scope, $element, $attrs, $transclude, $otherInjectables) {
					//$scope          与指令元素相关联的当前作用域
					//$element        当前指令对应的元素
					//$attrs          由当前元素的属性组成的对象
					//$transclude     嵌入链接函数会与对应的嵌入作用域进行预绑定
				},
		controllerAs: 'String', //设置控制器的别名
		require: 'String',//字符串或数组元素的值是会在当前指令的作用域中使用的指令名称           eg:require: 'ngModel'
						  //前缀：  ?  如果在当前指令中没有找到所需要的控制器，会将 null 作为传给 link 函数的第四个参数
						  //     ^    如果添加了 ^ 前缀，指令会在上游的指令链中查找 require 参数所指定的控制器
						  //     ?^   将前面两个选项的行为组合起来，我们可选择地加载需要的指令并在父指令链中进行查找
						  //如果没有前缀，指令将会在自身所提供的控制器中进行查找,如果没有找到任何控制器（或具有指定名字的指令）就抛出一个错误
		link: function(scope, iElement, iAttrs , controller) {//它会在模板编译并同作用域进行链接后被调用，因此它负责设置事件监听器，监视数据变化和实时的操作DOM
			//scope      指令用来在其内部注册监听器的作用域
			//iElement   iElement 参数代表实例元素，指使用此指令的元素
			//iAttrs     iAttrs 参数代表实例属性
			//controller 参数指向 require 选项定义的控制器
		},
		//compile 和 link 选项是互斥的。如果同时设置了这两个选项，那么会把 compile所返回的函数当作链接函数，而 link 选项本身则会被忽略。
		compile: // 返回一个对象或连接函数，如下所示：
			function(tElement, tAttrs, transclude) {
				return {
					pre: function(scope, iElement, iAttrs, controller) {  },
					post: function(scope, iElement, iAttrs, controller) { }
				}
				// 或者
				return function postLink() {  }
			}
	};
});

angular.module('app' , [])
.directive('myDirective' , function(){
	return {
		restrict : 'A',
		scope : {},
		template : 'Inside myDirective , isolate scope : {{myProperty}}'
	};
})
.directive('myInheritScopeDirective' , function(){
	return {
		restrict : 'A',
		scope : true,
		template : 'Inside myDirective, isolate scope: {{ myProperty }}'
	};
})
.directive('sidebox', function() {
	return {
		restrict: 'EA',
		scope: {
			title: '@'
		},
		transclude: true,
		template:  ['<div class="sidebox"><div class="content">',
					'		<h2 class="header">{{title}}</h2>',
					'		<span class="content" ng-transclude></span>',
					'	</div>',
					'</div>'].join('')
	};
});
