module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  console.log(process.env.SCREEPS_EMAIL);
  grunt.initConfig({
    screeps: {
      options: {
        email: process.env.SCREEPS_EMAIL,
        password: process.env.SCREEPS_PASSWORD,
        branch: process.env.SCREEPS_BRANCH,
        ptr: false
      },
      dist: {
        src: ['dist/*.js']
      }
    }
  });
};
