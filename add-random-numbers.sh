#!/bin/bash

# Generate two random numbers using $RANDOM (0-32767)
num1=$RANDOM
num2=$RANDOM

# Calculate the sum
sum=$((num1 + num2))

# Print the result
echo "Number 1: $num1"
echo "Number 2: $num2"
echo "Sum: $sum"
