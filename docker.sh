#!/bin/bash

docker build -t impc:landing-page .
docker tag impc:landing-page it4u/impc-landing-page:0.0.1
docker push it4u/impc-landing-page:0.0.1