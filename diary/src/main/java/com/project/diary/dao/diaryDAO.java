package com.project.diary.dao;

import java.sql.Date;
import java.util.List;

import com.project.diary.entities.Diary;

public interface diaryDAO{
	
	public void createEntry(Diary d);
	public void deleteEntry(Diary d);
	public void deleteEntryByUser(String owner);
	public void updateDiary(Diary d);
	public Diary readDiary(String owner, Date date, String type);
	public List<Diary> getMyDiaries(String Owner);
	public List<Diary> getAllPublicDiaries();
	
}