package controller

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/userAPI/database"
	"github.com/userAPI/model"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json") //setting content type of header

	var user model.User
	json.NewDecoder(r.Body).Decode(&user)

	err := database.Database.Create(&user).Error //creating new user
	if err != nil {
		w.WriteHeader(http.StatusBadRequest) //returning http status to header
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode(user)
}

// method to get single user
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var user model.User

	//get record of the given id if available
	err := database.Database.First(&user, mux.Vars(r)["id"]).Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode(user)
}

// method to get all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var users []model.User

	//get all the records of user from the database
	database.Database.Find(&users)
	json.NewEncoder(w).Encode(users)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var user model.User

	//get record of the given id if available
	database.Database.First(&user, mux.Vars(r)["id"])
	json.NewDecoder(r.Body).Decode(&user)

	//updating record of the given id
	err := database.Database.Save(&user).Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode(user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var user model.User
	err := database.Database.Delete(&user, mux.Vars(r)["id"]).Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode("User is deleted") //encoding response
}
