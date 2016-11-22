const gulp        = require('gulp');
const gutil       = require('gulp-util');
const sass        = require('gulp-sass');
const sourcemaps  = require('gulp-sourcemaps');
const minify      = require('gulp-minify');

const browserSync = require('browser-sync').create();
const spawn       = require('child_process').spawn;
const fs          = require('fs');
const _           = require('lodash');
const del         = require('del');
const runSequence = require('run-sequence');
const uuid        = require('node-uuid');

const PORT          = 3000;
const DIST_FOLDER   = '_site';            // DO NOT CHANGE THIS, IS USED BY TRAVIS FOR DEPLOYMENT IN MANIFEST
const CONFIG        = '_config.yml';
const CONFIG_TEST   = '_config_test.yml';

/* DONT EDIT BELOW */

const paths = {
  styles: {
    src: '_assets/styles/**/*.scss',
    dest: `${DIST_FOLDER}/public/styles`
  },
  images: {
    src: '_assets/images/**/*',
    dest: `${DIST_FOLDER}/public/images`
  },
  scripts: {
    src: '_assets/js/**/*.js',
    dest: `${DIST_FOLDER}/public/js`
  }
}
let cacheID = uuid.v4().replace(/-/g, '');

/*************************************************
    Write cache json
**************************************************/
const writeCacheJson = (cb) => {
  const hash = { 'cache' : cacheID };
  fs.writeFile('./_data/hashes.json', JSON.stringify(hash, null, 2), (err) => {
    cb(err);
  });
}

/*************************************************
    JEKYLL RUNNER (BUNDLE EXEC JEKYLL BUILD)
**************************************************/
const spawnJekyll = (test, watch, cb) => {
  const jekyll_indicator = gutil.colors.cyan("[JEKYLL]");
  const doneStr = 'done in';
  const child = spawn('bundle', [
    'exec',
    'jekyll',
    'build',
    '--config',
    (test ? CONFIG_TEST : CONFIG),
    (watch ? '-w' : '')
  ], { cwd: process.cwd()});

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');

  child.stdout.on('data', data => {
      _.each(data.split('\n'), line => {
        if (line) {
          gutil.log(jekyll_indicator, line);
          if (line.indexOf(doneStr) !== -1 && watch) {
            browserSync.reload();         // Rebuild was triggered by Hugo, so we'll reload the page
          }
        }
      });
  });

  child.stderr.on('data', data => {
      _.each(data.split('\n'), line => {
        if (line) {
          gutil.log(jekyll_indicator, gutil.colors.red(line));
        }
      });
      gutil.beep();
  });

  child.on('close', function(code) {
      gutil.log(jekyll_indicator, "Closed with exit code", code);
      if (cb && _.isFunction(cb)) {
        cb(code);
      }
  });
}

/*************************************************
    TASKS
**************************************************/

gulp.task('clean', () => {
  return del([
    DIST_FOLDER
  ], { force: true });
});

gulp.task('write-cache-file', (done) => {
  writeCacheJson((err) => {
    if (err) {
      throw new gutil.PluginError({
        plugin: 'write-cache-file',
        message: `Something went wrong while writing the cache file in _data/hashes.json: ${err}`
      });
    } else {
      done();
    }
  });
});

gulp.task('copy:images', () => {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
});

gulp.task('compress:js', () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(minify({
      ext: {
        src: '.js',
        min: `-${cacheID}.js`
      }
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

gulp.task('sass:build', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('sass:dev', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

const build = (t, cb) => {
  spawnJekyll(t, false, (code) => {
    if (code !== 0) {
      throw new gutil.PluginError({
        plugin: 'jekyll:build',
        message: `Jekyll exit code is ${code}, check your Jekyll setup`
      });
    } else {
      cb();
    }
  });
}

gulp.task('jekyll:build', [], done => {
  build(false, done);
});
gulp.task('jekyll:build-test', [], done => {
  build(true, done);
});

gulp.task('dev', ['sass:dev', 'copy:images', 'compress:js'], done => {
  browserSync.init({
      port: PORT,
      serveStatic: [ DIST_FOLDER ],
      serveStaticOptions: {
          extensions: ['html'] // pretty urls (so this works locally as it would online)
      }
  });
  spawnJekyll(true, true);
  gulp.watch(paths.styles.src, ['sass:dev']);
  gulp.watch(paths.scripts.src, ['compress:js']);
  gulp.watch(paths.images.src, ['copy:images']);
});

gulp.task('serve', done => {
  runSequence('clean', 'write-cache-file', 'dev');
})

gulp.task('build', done => {
  runSequence('clean', 'write-cache-file', ['jekyll:build', 'sass:build', 'copy:images', 'compress:js'], done);
});

gulp.task('build-test', done => {
  runSequence('clean', 'write-cache-file', ['jekyll:build-test', 'sass:build', 'copy:images', 'compress:js'], done);
});
