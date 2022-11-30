package main

import (
	"fmt"
	"sort"
	"strings"
	"unicode/utf8"
)

func Sort(array []string, n int) {

	sort.Slice(array, func(i, j int) bool {
		word1, word2 := array[i], array[j]
		//calculating number of "a" in each word
		count1, count2 := strings.Count(word1, "a"), strings.Count(word2, "a")
		if count1 != count2 {
			return count1 > count2
		}
		return utf8.RuneCountInString(word1) > utf8.RuneCountInString(word2)
	})

	fmt.Println(array)
}
func main() {
	data := []string{"aaa", "aab", "aabb", "aa", "araaa", "ac", "acccc", "acc", "b"}
	length := len(data) //calculating length of slice
	Sort(data, length)
}
