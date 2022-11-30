package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/spf13/viper"
	"github.com/userAPI/controller"
	"github.com/userAPI/database"
)

type Config struct {
	Port             string `mapstructure:"port"`
	ConnectionString string `mapstructure:"connection_string"`
}

var AppConfig *Config

// Method to load cofig from config.json file
func LoadAppConfig() {
	log.Println("Loading Server Configurations...")
	viper.AddConfigPath(".") // using viper package to load configuration
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal(err)
	}
	err = viper.Unmarshal(&AppConfig) //unmarshalling configurations into Config struct
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	LoadAppConfig()

	//calling a database function to connect and migrate to database
	database.DataMigration(AppConfig.ConnectionString)

	//using mux package to handle http requests
	router := mux.NewRouter() // creating new router
	router.HandleFunc("/users", controller.GetUsers).Methods("GET")
	router.HandleFunc("/user", controller.CreateUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/user/{id}", controller.GetUser).Methods("GET")
	router.HandleFunc("/user/{id}", controller.UpdateUser).Methods("PUT")
	router.HandleFunc("/user/{id}", controller.DeleteUser).Methods("DELETE")

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", AppConfig.Port), handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"}), handlers.AllowedOrigins([]string{"http://localhost:3000"}), handlers.AllowCredentials())(router)))
}
