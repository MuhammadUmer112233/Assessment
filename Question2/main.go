package main

import (
	"fmt"
	"math"
)

func main() {

	var recursiveFunc func(float64)

	//assigning an anonymous function to a variable
	recursiveFunc = func(variable float64) {
		slice := []float64{} //creating a slice of type float64
		if variable < 2 {
			return
		} else {
			val := variable / 2
			res := math.Floor(val) //taking floor value from the result

			slice = append(slice, variable) //appending result to the slice
			recursiveFunc(res)
		}

		var output []float64
		for i := len(slice) - 1; i >= 0; i-- {
			output = append(output, slice[i])
		}
		for _, num := range output {
			fmt.Println(num)

		}
	}
	var number float64
	fmt.Print("Enter a number: ")
	fmt.Scanln(&number) // taking input from user

	recursiveFunc(number)
}
