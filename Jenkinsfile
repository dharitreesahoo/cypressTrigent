#!/usr/bin/groovy
def label = "frontend-cypress-master-${BUILD_ID}"
podTemplate(
    label: label,
    showRawYaml: true,
    inheritFrom: 'otherParent',
    podRetention: never(),
    yaml: """
apiVersion: v1
kind: Pod
name: frontend-cypress
metadata:
  labels:
    label: frontend-cypress
spec:
  tolerations:
  - key: "spot"
    operator: "Exists"
    effect: "NoSchedule"
  nodeSelector:
    role: builder
  containers:
  - name: "jnlp"
    image: "jenkins/inbound-agent:4.3-8"
    imagePullPolicy: Always
    resources:
      requests:
        cpu: "500m"
        memory: "1000Mi"
      limits:
        cpu: "1000m"
        memory: "2000Mi"
  - name: cypress
    image: public.ecr.aws/t1x8f1m2/socotra/frontend-cypress:latest
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    resources:
      requests:
        cpu: "8"
        memory: "8192Mi"
      limits:
        memory: "16384Mi"
""") {
    node(label) {
        properties([ 
          buildDiscarder(
            logRotator(
              artifactDaysToKeepStr: '3', 
              artifactNumToKeepStr: '3', 
              daysToKeepStr: '14', 
              numToKeepStr: '14')
            )
        ])
        stage('Checkout') {
            checkout([
                $class: 'GitSCM',
                branches: scm.branches,
                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                extensions: [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
                userRemoteConfigs: scm.userRemoteConfigs,
            ])
            env.COMMIT_SHORT   = sh( script: 'git rev-parse --short=8 HEAD', returnStdout: true ).trim()

            echo "COMMIT_SHORT   : ${env.COMMIT_SHORT}"
            echo "IMAGE_TAG      : ${env.IMAGE_TAG}"
        }

        stage ('Setup') {
            container ('cypress') {
                sh """
                  apt-get update -y && apt-get install -y awscli
                  npm install
                """
            }
        }

        stage ('Test') {
            container ('cypress') {
                try {
                    sh """
                        export TZ=America/Los_Angeles
                        ln -snf /usr/share/zoneinfo/\$TZ /etc/localtime && echo \$TZ > /etc/timezone
                        Xvfb :99 &
                        npm run ${NPM_SCRIPTS_ARGS}
                    """
                } catch (Exception ex) {
                    // mark failure but continue pipeline so that results
                    // get uploaded to S3
                    currentBuild.result = 'FAILURE'
                } finally {
                    sh """
                        npm run merge-reports
                        npm run combine-reports
                        npm run generate-report
                    """
                    publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/results/json', reportFiles: 'report.html', reportName: 'Mochawesome Tests Report'])
                    junit allowEmptyResults: true, keepLongStdio: true, testResults: 'cypress/results/junit/merged.xml'
                    archiveArtifacts allowEmptyArchive: true, artifacts: '**', defaultExcludes: false, excludes: '', fingerprint: true, followSymlinks: false
                }
            }
        }

        stage('Upload') {
            creds = [
                string(credentialsId: 'jenkins-backup-aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                string(credentialsId: 'jenkins-backup-aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY'),
            ]
            envs = [
              "AWS_DEFAULT_REGION=us-west-2",
              "RESULT_BUCKET=s3://socotra-cypress-frontend-results"
            ]
            container ('cypress') {
                withEnv(envs) {
                    withCredentials(creds) {
                        sh """
                            echo Uploading results...
                            [ -d ./cypress/screenshots ] && (aws s3 cp --recursive ./cypress/screenshots $RESULT_BUCKET/${BUILD_ID}/screenshots || exit 1)
                            [ -d ./cypress/videos ] && (aws s3 cp --recursive ./cypress/videos $RESULT_BUCKET/${BUILD_ID}/videos || exit 1)
                            [ -d ./cypress/logs ] && (aws s3 cp --recursive ./cypress/logs $RESULT_BUCKET/${BUILD_ID}/logs || exit 1)
                            echo Finished uploading results.
                        """
                    }
                }
            }
        }
    }
}
