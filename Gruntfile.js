module.exports=function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        concat:{
            options:{
                //
            },
            dist:{
                src:['client/frontend/src/js/app.js','client/frontend/src/js/controller.js'],
                dest:'client/frontend/src/js/global.js'
            }
        },
        uglify:{
            compressjs:{
                files:{
                    'client/frontend/build/js/global.min.js':['client/frontend/src/js/global.js']
                }
            }
        },
        cssmin:{
            options:{
            // stripBanners:true,
            },
            build:{
                src:'client/frontend/src/css/main.css',
                dest:'client/frontend/build/css/main.min.css'
            }
        },
        jshint:{
            all:['client/frontend/src/js/global.js']
        },
        watch:{
            scripts:{
                files:['client/frontend/src/js/app.js','client/frontend/src/js/js.controller.js','client/frontend/src/css/main.css'],
                tasks:['cssmin','concat','jshint','uglify']
            },
            livereload:{
                options:{
                    livereload:'<%=connect.options.livereload %>'
                },
                files:[
                    'client/frontend/build/js/global.min.js',
                    'client/frontend/build/css/main.min.css'
                ]
            }
        },
        connect:{
            options:{
                port:9000,
                open:true,
                livereload:35729,
                hostname:'localhost'
            },
            server:{
                options:{
                    port:9001,
                    base:"./"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('compressjs',['concat','jshint','uglify']);
    grunt.registerTask('compresscss',['cssmin'])
    grunt.registerTask('watchit',['cssmin','concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');
};
