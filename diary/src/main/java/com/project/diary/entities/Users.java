package com.project.diary.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//@JsonFormat(shape = JsonFormat.Shape.ARRAY)
//@JsonPropertyOrder({ "username", "password" })
public class Users{
//	@JsonProperty("username")
	private String username;
	
//	@JsonProperty("password")
	private String password;
	
	public Users() {
		
	}
	public Users(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "Users [username=" + username + ", password=" + password + "]";
	}
	
}