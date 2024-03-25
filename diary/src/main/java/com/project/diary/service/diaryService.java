package com.project.diary.service;

import java.sql.Date;
import java.util.List;

import com.project.diary.entities.Diary;

public interface diaryService{
	
	public String createEntry(Diary d);
	public String deleteEntry(Diary d);
	public void deleteEntryByUser(String owner);
	public String updateDiary(Diary d);
	public Diary readDiary(String owner, Date date, String type);
	public List<Diary> getMyDiaries(String Owner);
	public List<Diary> getAllPublicDiaries();
	
}