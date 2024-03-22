#!/bin/bash

tests=(
  "./load/get_usuarios_api.js"
  "./smoke/get_usuarios_api.js"
  "./soak/get_usuarios_api.js"
  "./spike/get_usuarios_api.js"
  "./stress/get_usuarios_api.js"
  )

for test in "${tests[@]}"
do
  echo "Running $test"
  k6 run $test
done
