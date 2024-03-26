package com.project.diary.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Diary{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String owner;
	private Date date;
	private String type;
	private String content;
	
	
	@Override
	public String toString() {
		return "Diary [owner=" + owner + ", date=" + date + ", type=" + type + "]";
	}
	public Diary() {
		
	}
	public Diary(String owner, Date date, String type, String content) {
		super();
		this.owner = owner;
		this.date = date;
		this.type = type;
		this.content = content;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
}