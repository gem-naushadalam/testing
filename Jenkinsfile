
node('nodejs_runner') {
  stage('frontend_checkout') {
         dir ('mis-ui') {
         checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg:  [], \
userRemoteConfigs: [[credentialsId: 'admingithub', url: 'https://github.com/Gemini-Solutions/MIS-UI.git', poll: 'false']]])
         }
  }
  stage('Nodejs_Build') {
        container('nodejsbuild') {
            dir ('mis-ui'){
             sh 'rm -rf package-lock.json'
             sh 'npm cache clean --force'
             sh 'npm install'
             sh 'npm run build'
        }
       }
     }
   }


node('image_builder') {
  try {
   stage('Build_image') {
            dir ('mis-ui') {
              container('dockerbuild') {
                //checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg:  [], \
//userRemoteConfigs: [[credentialsId: 'admingithub', url: 'https://github.com/Gemini-Solutions/MIS-UI.git']]])
              withCredentials([usernamePassword(credentialsId: 'docker_registry', passwordVariable: 'docker_pass', usernameVariable: 'docker_user')]) {
              sh 'docker image build -f Dockerfile -t registry.geminisolutions.com/misui/misui:1.0-$BUILD_NUMBER .'
              sh '''docker login -u $docker_user -p $docker_pass https://registry.geminisolutions.com'''
              sh 'docker push registry.geminisolutions.com/misui/misui:1.0-$BUILD_NUMBER'
              sh 'rm -rf dist/'
           }
         }
            }
      }
  } finally {
     sh 'echo current_image="registry.geminisolutions.com/misui/misui:1.0-$BUILD_NUMBER" > build.properties'
     archiveArtifacts artifacts: 'build.properties', onlyIfSuccessful: true
  }
    }
