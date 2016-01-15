var _ = require('underscore');
var del = require('del');
var file_system = require('fs.extra');
var gettextParser = require('gettext-parser');
var gulp = require('gulp');
var jade = require('gulp-jade');
var merge = require('merge-stream');
var path = require('path');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var zip = require('gulp-zip');

// ===================================================
// Configuration
// ===================================================

var config = require('./config.js');
var localConfig = require('./config.local.js');

var extensionsToFilter = _.union(['css', 'scss', 'js', 'html', 'php', 'txt', 'md', 'po', 'pot', 'json'], config.extensionsToFilter);
var targetFolder = 'target';

var placeholders = _.extend({}, config.placeholders, localConfig.placeholders);

// ===================================================
// Tasks
// ===================================================

gulp.task('default', function (cb) {
    runSequence(
        'clean',
        'build-default',
        cb
    );
});

gulp.task('build-default', function (cb) {
    runSequence(
        'copy-sources',
        ['compile-styles', 'compile-documentation'],
        'replace-placeholders', 'compile-mo-files',
        'post-build-clean',
        cb
    );
});

gulp.task('build-documentation', function () {
    runSequence('copy-sources-documentation',
        ['compile-styles', 'compile-documentation'],
        'replace-placeholders');
});

gulp.task('copy-to-deploy-target', function () {
    return gulp.src(targetFolder + '/release-full-package/' + config.pluginSlug + '/**')
        .pipe(gulp.dest(localConfig.deployTargetDir + '/' + config.pluginSlug));
});

gulp.task('build-wordpress', function (cb) {
    runSequence('copy-sources-wordpress', 'compile-styles', 'replace-placeholders', 'compile-mo-files', cb);
});

gulp.task('build-wordpress-and-copy', function (cb) {
    runSequence('build-wordpress', 'copy-to-deploy-target', cb);
});


gulp.task('watch', ['default'], function () {
    watch('src/documentation/**', function () {
        gulp.start('build-documentation');
    });
    watch('src/wordpress-plugin/**', function () {
        gulp.start('build-wordpress-and-copy');
    });
});

gulp.task('clean', function (cb) {
    del([
        targetFolder
    ]).then(function () {
        cb()
    });
});

gulp.task('copy-sources', ['copy-sources-wordpress', 'copy-sources-documentation'], function () {
    return gulp.src('src/release-full-package-resources/**').pipe(gulp.dest(targetFolder + '/release-full-package'));
});

gulp.task('copy-sources-documentation', function () {
    var onlineDocumentation = gulp.src('src/documentation/**').pipe(gulp.dest(targetFolder + '/online-documentation'));
    var offlineDocumentation = gulp.src('src/documentation/**').pipe(gulp.dest(targetFolder + '/release-full-package/HELP'));
    return merge(onlineDocumentation, offlineDocumentation);
});

gulp.task('copy-sources-wordpress', function () {
    return gulp.src('src/wordpress-plugin/**').pipe(gulp.dest(targetFolder + '/release-full-package/' + config.pluginSlug));
});

gulp.task('compile-styles', function () {
    return gulp
        .src('target/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(targetFolder));
});


gulp.task('compile-documentation', function () {
    var offline = gulp
        .src('src/documentation/**/*.jade')
        .pipe(jade({data: {online: false}}))
        .pipe(gulp.dest(targetFolder + '/release-full-package/HELP'));
    var online = gulp
        .src('src/documentation/**/*.jade')
        .pipe(jade({data: {online: true}}))
        .pipe(gulp.dest(targetFolder + '/online-documentation'));
    return merge(offline, online)
});


gulp.task('replace-placeholders', function (cb) {
        var walker = file_system.walk(targetFolder);
        walker.on("file", function (root, stat, next) {
            if (extensionsToFilter.indexOf(getFileExtension(stat.name)) >= 0) {
                var filepath = path.join(root, stat.name);
                file_system.readFile(filepath, {encoding: 'utf8'}, function (err, data) {
                    for (var placeholder in placeholders) {
                        data = data.split('' + placeholder).join(placeholders['' + placeholder]);
                    }
                    file_system.writeFile(filepath, data, null);
                });
            }
            next();
        });
        walker.on('end', cb);
    }
);

gulp.task('compile-mo-files', function (cb) {
    var walker = file_system.walk(targetFolder);
    walker.on("file", function (root, stat, next) {
        if (['po', 'pot'].indexOf(getFileExtension(stat.name)) >= 0) {
            var input = file_system.readFileSync(root + '/' + stat.name);
            var po = gettextParser.po.parse(input);
            var output = gettextParser.mo.compile(po);
            file_system.writeFileSync(root + '/' + stat.name.substr(0, stat.name.lastIndexOf('.')) + '.mo', output);
        }
        next();
    });
    walker.on('end', cb);
});

gulp.task('post-build-clean', function (cb) {
    var filesToExclude = [
        targetFolder + '/release-full-package/HELP/**/*.scss',
        targetFolder + '/release-full-package/HELP/jade-includes',
        targetFolder + '/online-documentation/**/*.scss',
        targetFolder + '/online-documentation/jade-includes',
        targetFolder + '/**/*.jade'
    ];
    for (var i = 0; i < config.filesToIgnoreFromTarget.length; i++) {
        filesToExclude.push(targetFolder + '/**' + config.filesToIgnoreFromTarget[i]);
    }
    del(filesToExclude).then(function () {
        cb()
    });
});
gulp.task('create-temporary-plugin', function () {
    // We have to copy the files into a temp folder, because of subfolders
    return gulp.src(targetFolder + '/release-full-package/' + config.pluginSlug + '/**')
        .pipe(gulp.dest(targetFolder + '/temporary-plugin/' + config.pluginSlug));
});

gulp.task('zip-files', function () {
    var previewImages = gulp.src('src/release-meta-resources/preview_images/*')
        .pipe(zip('preview_images.zip'))
        .pipe(gulp.dest(targetFolder));
    var wordpressPlugin = gulp.src(targetFolder + '/temporary-plugin/**')
        .pipe(zip(config.pluginSlug + '.zip'))
        .pipe(gulp.dest(targetFolder))
        .pipe(gulp.dest(targetFolder + '/release-full-package'));
    return merge(previewImages, wordpressPlugin)
});

gulp.task('package-release-full-zip', function () {
    return gulp.src(targetFolder + '/release-full-package/**')
        .pipe(zip('release-full-package.zip'))
        .pipe(gulp.dest(targetFolder));
});

gulp.task('release', function (callback) {
    runSequence(
        'default',
        'create-temporary-plugin',
        'zip-files',
        'package-release-full-zip',
        callback
    );
});

// ===================================================
// Helper Functions
// ===================================================

/**
 * From http://stackoverflow.com/a/10865625
 * @param filename  The filename.
 * @returns {string} The files extension.
 */
function getFileExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i + 1);
}
