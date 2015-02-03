module.exports = function(grunt) {
  grunt.initConfig({
    uglify:{
      dist: {
        options: {
          beautify: true,
          compress: false
        },
        files: {
          'dist/main.min.js': ['src/js/jquery.min.js', 'src/js/fingerprint.js', 'src/js/aes.js', 'src/js/valid.js']
        }
      }
    },
    clean: ["../imooc/", "../*.crx", "../*.pem"],
    copy: {
      deploy: {
        files: [
          // includes files within path
          {expand: true, src: ['dist/**', 'icon.png', 'manifest.json', '*.html'], dest: '../imooc/'}
        ],
      },
    },
    watch:{
      js:{
        files: 'src/js/*.js',
        tasks:['uglify']
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'watch']);
  grunt.registerTask('deploy', ['uglify', 'clean', 'copy:deploy']);
};
