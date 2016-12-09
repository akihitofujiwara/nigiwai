global <<<< require \prelude-ls
require! <[gulp gulp-plumber gulp-webserver gulp-watch gulp-babel gulp-pug run-sequence]>

gulp.task \dev, ->
  run-sequence \build, <[watch serve]>

gulp.task \serve, ->
  gulp.src \. .pipe gulp-webserver(
    host: process.env.IP
    port: process.env.PORT || 3000
  )

gulp.task \build, ->
  run-sequence <[es6 pug index-pug]>

gulp.task \watch, ->
  gulp-watch "#__dirname/../*.pug", -> gulp.start \index-pug
  <[es6 pug]>
  |> map (ext)->
    gulp-watch "#__dirname/../components/**/*.#ext", -> gulp.start ext

gulp.task \es6, ->
  gulp
    .src "#__dirname/../components/**/*.es6"
    .pipe gulp-plumber!
    .pipe gulp-babel presets: <[es2015 stage-2]>
    .pipe gulp.dest "#__dirname/../components/"

gulp.task \pug, ->
  gulp
    .src "#__dirname/../components/**/*.pug"
    .pipe gulp-plumber!
    .pipe gulp-pug!
    .pipe gulp.dest "#__dirname/../components/"

gulp.task \index-pug, ->
  gulp
    .src "#__dirname/../*.pug"
    .pipe gulp-plumber!
    .pipe gulp-pug!
    .pipe gulp.dest "#__dirname/../"

