package database

import (
	"fmt"

	"github.com/userAPI/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Database *gorm.DB
var err error

func DataMigration(url string) {
	//connecting to database
	Database, err = gorm.Open(mysql.Open(url), &gorm.Config{})
	if err != nil {
		fmt.Print(err.Error())
		panic("connection failed")
	}
	//migrating table
	Database.AutoMigrate(&model.User{})
}
