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
        htmlmin:{
            options:{
                removeComments:true,
                collapseWhitespace:true,
                collapseBooleanAttributes:true,
                useShortDoctype:true,
                removeAttributeQuotes:true,
                removeRedundantAttributes:true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html:{
                files:[{
                    expand:true,
                    cwd:'client/frontend/src/html',
                    src:['*.html'],
                    dest:'client/frontend/build/html'
                }]
            }
        },
        watch:{
            scripts:{
                files:['client/frontend/src/html/*.html','client/frontend/src/js/app.js','client/frontend/src/js/js.controller.js','client/frontend/src/css/main.css'],
                tasks:['htmlmin','cssmin','concat','jshint','uglify']
            },
            livereload:{
                options:{
                    livereload:'<%=connect.options.livereload %>'
                },
                files:[
                    'client/frontend/build/js/global.min.js',
                    'client/frontend/build/css/main.min.css',
                    'client/frontend/build/html/*'

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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('watchit',['htmlmin','cssmin','concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');
};