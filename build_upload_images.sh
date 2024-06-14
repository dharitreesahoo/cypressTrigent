#!/usr/bin/env bash
#
#

# Public

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/t1x8f1m2
docker build -t socotra/frontend-cypress .
docker tag socotra/frontend-cypress:latest public.ecr.aws/t1x8f1m2/socotra/frontend-cypress:latest
docker push public.ecr.aws/t1x8f1m2/socotra/frontend-cypress:latest

# Private

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 936926373655.dkr.ecr.us-west-2.amazonaws.com
docker build -t socotra/frontend-cypress .
docker tag socotra/frontend-cypress:latest 936926373655.dkr.ecr.us-west-2.amazonaws.com/socotra/frontend-cypress:latest
docker push 936926373655.dkr.ecr.us-west-2.amazonaws.com/socotra/frontend-cypress:latest

