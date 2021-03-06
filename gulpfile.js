const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const panini = require('panini');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const ghPages = require('gh-pages');
const path = require('path');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        tunnel: true
    });
    // gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

gulp.task('html', function(done) {
    panini.refresh()
    gulp.src('src/pages/**/*.html')

    .pipe(plumber())
      .pipe(panini({
        root: 'src/pages/',
        layouts: 'src/layouts/',
        partials: 'src/partials/',
        helpers: 'src/helpers/',
        data: 'src/data/'
      }))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.reload({stream: true}));
      done();
  });

gulp.task('styles', function() {
    return gulp.src ("src/sass/**/*.+(scss|sass|css)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
            
});

gulp.task ('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel ("styles"));
    gulp.watch("src/pages/**/*.html").on("change", gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel('scripts'));
    gulp.watch("src/img/**/*").on("change", gulp.parallel('images'));
    gulp.watch("src/fonts/**/*").on("change", gulp.parallel('fonts'));
});

// gulp.task('html', function () {
//     return gulp.src("src/*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest("dist/"));
// });

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});


gulp.task ('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'html', 'images'));


function deploy(cb) {
    ghPages.publish(path.join(process.cwd(), './dist'), cb);
  }
  exports.deploy = deploy;