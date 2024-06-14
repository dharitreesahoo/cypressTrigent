FROM cypress/base:14.16.0

RUN apt-get update -y && \
    apt-get upgrade -y

# Cypress Requirements
# Reference: https://docs.cypress.io/guides/continuous-integration/introduction#Machine-requirements

# Install latest Chrome
RUN wget -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y /tmp/chrome.deb \
                       awscli

# Remove vulnerable packages
RUN apt-get purge -y mariadb-common \
                     imagemagick \
                     imagemagick-6-common \
                     python2.7 \
                     python2.7-minimal \
                     libpython2.7-minimal \
                     python3.7 \
                     python3.7-minimal \
                     libpython3.7-minimal \
                     linux-libc-dev
                     # libjpeg62-turbo-dev # needed for libgdk-pixbuf2.0-0
                     # libjpeg62-turbo # needed for libgdk-pixbuf2.0-0
                     # libjpeg-dev # needed for libgdk-pixbuf2.0-0
