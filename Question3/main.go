package main

import "fmt"

func repeatedWord(array []string, num int) {
	frequency := 0
	word := ""
	slice := []string{} //creating a slice to type string
	for i := 0; i < num; i++ {
		count := 0
		for j := i + 1; j < num; j++ {
			if array[j] == array[i] { //comparing two words
				count++ //incrementing count if both words are same
			}
		}
		if count >= frequency {
			word = array[i]
			frequency = count
			slice = append(slice, word) //appending word in slice
		}
	}
	for _, word := range slice {
		fmt.Println(word)

	}
}
func main() {
	data := []string{"red", "red", "red", "red", "apple", "yellow", "yellow", "yellow"}
	num := len(data) //calculating length of the slice
	repeatedWord(data, num)
}
