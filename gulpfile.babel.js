import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import less from 'gulp-less';
import del from 'del';


// все нужные пути
const paths = {
  allSrc: 'src/**/*.*',
  srcHtml: 'src/**/*.html',
  allSrcLess: 'src/**/css/spa.less',
  allSrcJs: 'src/**/*.js',
  libDir: 'lib',
  gulpFile: 'gulpfile.babel.js',
};


gulp.task('lint', () =>
  gulp.src([ paths.gulpFile, paths.allSrcJs, '!src/**/jq/*.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));


// html - преобразует все файлы html и  записывает
// результат в lib 
gulp.task('html', () =>
  gulp.src(paths.srcHtml)
    .pipe(gulp.dest(paths.libDir)));


// css - преобразует все файлы less и записывает
// результат в lib
gulp.task('css', () =>
  gulp.src(paths.allSrcLess)
    .pipe(less())
    .pipe(gulp.dest(paths.libDir)));


// js - вызывает Babel, чтобы преобразовать все исходные 
// js файлы из src, и записывает результат в lib.
gulp.task('js', () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir)));


// clean - задача, которая удаляет всю автоматически 
// сгенерированную директорию lib перед каждым build
gulp.task('clean', () => del(paths.libDir));


// build вызывает запуск всех указанных задач.
gulp.task('build', ['lint', 'clean', 'html', 'css', 'js']);


// watch запускает задачу build, когда происходят изменения 
// файловой системы для указанных файлов.
gulp.task('watch', () =>
  gulp.watch(paths.allSrc, ['build']));


// default - это специальная задача, которая запускается, 
// если вызывается gulp из CLI (командной строки).
gulp.task('default', ['watch', 'build']);
