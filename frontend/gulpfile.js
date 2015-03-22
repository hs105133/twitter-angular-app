var gulp =require("gulp"),
	webServer = require("gulp-webserver"),
	mainBowerFiles = require("main-bower-files"),
	inject = require('gulp-inject'),
	del = require("del");

var paths = {
	temp: "temp",
	tmpVendor: "temp/vendor",
	tmpIndex: "temp/index.html",

	index: "app/index.html", 
	appSrc: ["app/**/*","!app/index.html"],
	bowerSrc: "bower_components/**/*"
};

gulp.task("default", ["watch"]);

gulp.task("watch", ["serve"], function(){
	gulp.watch(paths.appSrc, ["scripts"]);
	gulp.watch(paths.bowerSrc, ["vendors"]);
	gulp.watch(paths.index, ["copyAll"]);
});

gulp.task("serve", ["copyAll"], function(){
    return gulp.src(paths.temp)
			.pipe(webServer({
				open: true,
				livereload: true,
				proxies: [
					{ source: "/api", target: "http://localhost:1337" }
				]		
			}));
});

gulp.task("copyAll", function(){
	var tmpVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tmpVendor));
	var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

	return gulp.src(paths.index)
		.pipe(gulp.dest(paths.temp))
		.pipe(inject(tmpVendors, {relative: true, name: "vendorInject"}))
		.pipe(inject(appFiles, {relative: true}))
		.pipe(gulp.dest(paths.temp));
});

gulp.task("vendors", function(){
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tmpVendor));

	return gulp.src(paths.tmpIndex)
		.pipe(inject(tempVendors, {relative: true, name: "vendorInject"}))
		.pipe(gulp.dest(paths.temp));
});

gulp.task("scripts", function(){
	var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

	return gulp.src(paths.tmpIndex)
		.pipe(inject(appFiles, {relative: true}))
		.pipe(gulp.dest(paths.temp));
});


gulp.task("clean", function(){
	del([paths.temp]);
});




