var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	changed = require('gulp-changed'),
	fileinclude = require('gulp-file-include'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	cssbase64 = require('gulp-css-base64'),
	browserSync = require('browser-sync');
	
var reload = browserSync.reload;
var root = {
		src : 'dev/src', //开发目录
		build : 'build', //本地测试目录
		dist : 'dist',  //线上目录
		images : 'dev/images' ,//图片目录
		lib  : 'dev/lib', //库文件目录
		host : 'localhost:3000' //代理服务器域名 or ip
	};
	
/**
 * 测试环境任务
 * 任务：  js检测 , sass编译 ，html文件合并注入 , 图片压缩 ,库文件复制
 */
gulp.task('build' , ['jshint','sass' , 'html', 'buildimagemin' , 'buildlib']);
/**
 * 线上环境任务
 * 任务： js压缩 ，sass编译压缩 , html文件合并注入 , 图片压缩 ,库文件复制
 */
 gulp.task('dist' , ['jsminify','cssminify' , 'fileinclude', 'distimagemin' , 'distlib']);
 
 
/*********************start 测试环境配置********************************/
/**
 * 本地时时刷新服务
 * cmd : gulp server
 * author:jin
 */
gulp.task('server' , ['build'] , function(){
	browserSync.init(root.build+'/**/*.{css|js|html}' , {
//		server : { baseDir : root.build}	//本地目录
		proxy : root.host  //选择代理 , 因为可能需要调用nodejs的模拟接口
	});
	// 监听开发目录的文件变化 ,随时将变化的文件发送到build测试目录
	gulp.watch(root.src+'/**/*.scss' , ['sass']);
    gulp.watch(root.src+'/**/*.html' , ['html']);
    gulp.watch(root.src+'/**/*.js' , ['jshint']);
    //测试目录html文件发生变化，重新加载
    gulp.watch(root.build+'/**/*.html').on('change' ,reload);
});

/**
 * 注入html文件
 * cmd  gulp html
 * authopr : jin
 */
gulp.task('html' , function(){
	return gulp.src(root.src+'/**/*.html')
		.pipe(fileinclude({
      		prefix: '@@',  //前缀
      		basepath: root.src+'/include/'
    	}))
		.pipe(changed(root.build))  //只有发生变化的文件才能通过
		.pipe(gulp.dest(root.build))
    	.pipe(reload({stream: true}));
})
/**
 * [编译sass]
 * cmd : gulp sass
 * author : jin
 */
gulp.task('sass', function () {
    return gulp.src(root.src+'/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbase64())
        .pipe(changed(root.build))
        .pipe(gulp.dest(root.build));
});

/**
 * [js 校验]
 * cmd ： gulp jshint
 * author : jin
 */
gulp.task('jshint' , function(){
	return gulp.src(root.src+'/**/*.js')
		.pipe(changed(root.build))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest(root.build))
		.pipe(reload({stream: true}));
});

/**
 * 图片压缩
 * cmd : gulp buildimagemin
 * author : jin
 */
gulp.task('buildimagemin', function(){
    return gulp.src(root.images+'/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(changed(root.build+'/images'))
        .pipe(gulp.dest(root.build+'/images'));
});
/**
 * 复制库文件到测试目录
 * cmd : gulp buildlib
 * author : jin
 */
gulp.task('buildlib', function(){
    return gulp.src(root.lib+'/**/*.*')
    	.pipe(changed(root.build+'/lib'))
    	.pipe(gulp.dest(root.build+'/lib'));
});

/*******************end****************************************/


/***********************start 线上环境任务*******************************/
/**
 * 注入html文件
 * cmd  gulp fileinclude
 * authopr : jin
 */
gulp.task('fileinclude' , function(){
	return gulp.src(root.src+'/**/*.html')
		.pipe(fileinclude({
      		prefix: '@@',  //前缀
      		basepath: root.src+'/include/'
    	}))
		.pipe(changed(root.dist))  //只有发生变化的文件才能通过
		.pipe(gulp.dest(root.dist));
})
/**
 * 压缩css
 * cmd : gulp cssminify
 * author : jin
 */
gulp.task('cssminify' , function(){
	return gulp.src(root.src+'/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer()) //添加css3浏览器兼容
        .pipe(cssbase64())
        .pipe(rename(function(path){ //改名
        	path.basename += ".min"
        }))
        .pipe(minifycss())
        .pipe(changed(root.dist))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))//map文件位置
        .pipe(gulp.dest(root.dist));
});
/**
 * 压缩JS
 * cmd : gulp jsminify
 * author : jin
 */
gulp.task('jsminify' , function(){
	return gulp.src(root.src+'/**/*.js')
        .pipe(rename(function(path){
        	path.basename += ".min"
        }))
		.pipe(uglify())
		.pipe(changed(root.dist))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(root.dist));
});
/**
 * 图片压缩
 * cmd : gulp distimagemin
 * author : jin
 */
gulp.task('distimagemin', function(){
    return gulp.src(root.images+'/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(changed(root.dist+'/images'))
        .pipe(gulp.dest(root.dist+'/images'));
});
/**
 * 复制库文件到测试目录
 * cmd : gulp distlib
 * author : jin
 */
gulp.task('distlib', function(){
    return gulp.src(root.lib+'/**/*.*')
    	.pipe(changed(root.dist+'/lib'))
    	.pipe(gulp.dest(root.dist+'/lib'));
});

/********************end********************/







