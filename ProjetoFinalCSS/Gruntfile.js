module.exports = (grunt) => {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			my_target: {
				files: [
					{
						expand: true,
						cwd: 'src/js',
						src: ['.js', '!.min.js'],
						dest: 'dist/js',
						ext: '.min.js',
					},
				],
			},
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/css',
						src: ['*.scss'],
						dest: 'dist/css',
						ext: '.min.css',
					},
				],
			},
		},
		watch: {
			scripts: {
				files: ['src/js/*.js'],
				tasks: ['uglify'],
				options: {
					spawn: false,
				},
			},
			styles: {
				files: ['src/css/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				},
			},
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass']);
};