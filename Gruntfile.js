module.exports=function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        sass:{
            output:{
                files:[{
                    expand:true,
                    cwd:'frontend/src',
                    src:'**/main.scss',
                    dest:'frontend/build',
                    ext:'.css'
                }]

            }
        },
        concat:{
            options:{
                //
            },
            dist:{
                src:['frontend/src/js/*'],
                dest:'frontend/build/js/global.js'
            }
        },
        uglify:{
            compressjs:{
                files:{
                    'frontend/build/js/global.min.js':['frontend/build/js/global.js']
                }
            }
        },
        cssmin:{
            options:{
            // stripBanners:true,
            },
            build:{
                src:'frontend/build/css/main.css',
                dest:'frontend/build/css/main.min.css'
            }
        },
        jshint:{
            all:['frontend/build/js/global.js']
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
                    cwd:'frontend/src/html',
                    src:['*.html'],
                    dest:'frontend/build/html'
                }]
            }
        },
        watch:{
            scripts:{
                files:['frontend/src/html/*.html','frontend/src/js/*.js','frontend/src/css/main.scss'],
                tasks:['sass','htmlmin','cssmin','concat','jshint','uglify']
            },
            livereload:{
                options:{
                    livereload:'<%=connect.options.livereload %>'
                },
                files:[
                    'frontend/build/js/global.min.js',
                    'frontend/build/css/main.min.css',
                    'frontend/build/html/*'

                ]
            }
        },
        connect:{
            options:{
                port:9001,
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('watchit',['htmlmin','cssmin','concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');
};
