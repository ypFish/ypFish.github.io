//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    cleanss = require('gulp-cleancss'), //压缩CSS文件
    imagemin = require('gulp-imagemin'); //压缩图片

//压缩PC端css文件
gulp.task('minPCCSS', function () {
    gulp.src('style/css/*.css')
        .pipe(cleanss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('style/css/dist'));
});

//压缩Mobliecss文件
gulp.task('minMoibleCSS', function () {
    gulp.src('style/mobile/css/*.css')
        .pipe(cleanss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('style/mobile/css/dist'));
});

//压缩图片
gulp.task('minImage', function () {
    gulp.src('res/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('res/img/dist'));
});

//glup默认任务
gulp.task('default',['minPCCSS', 'minMoibleCSS','minImage']);

