package com.project.diary.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.project.diary.dao.diaryDAO;
import com.project.diary.entities.Diary;

import jakarta.transaction.Transactional;

@Service
public class diaryServiceimpl implements diaryService{
	
	private diaryDAO dao;
	
	@Autowired
	public diaryServiceimpl(@Qualifier("diaryDAOimpl") diaryDAO dao) {
		this.dao = dao;
	}

	@Override
	@Transactional
	public String createEntry(Diary d) {
		// TODO Auto-generated method stub
		if(dao.readDiary(d.getOwner(),d.getDate(),d.getType()) != null) {
			System.out.println(d.getOwner()+" has already created a diary today.");
			return "User has already created a diary today.";
		}
		
		dao.createEntry(d);
		System.out.println("Diary created successfully...");
		return "Diary created successfully.";
	}

	@Override
	public String deleteEntry(Diary d) {
		// TODO Auto-generated method stub
		Diary newd = dao.readDiary(d.getOwner(),d.getDate(),d.getType());
		if(newd == null) {
			System.out.println(d.getOwner()+" has no such diary.");
			return d.getOwner()+" has no such diary.";
		}
		
		dao.deleteEntry(newd);
		System.out.println("Diary deleted successfully...");
		return "Diary deleted successfully.";
	}
	
	@Override
	public void deleteEntryByUser(String owner) {
		dao.deleteEntryByUser(owner);
	}

	@Override
	public String updateDiary(Diary d) {
		// TODO Auto-generated method stub
		Diary newd = dao.readDiary(d.getOwner(),d.getDate(),d.getType());
		if(newd == null) {
			System.out.println(d.getOwner()+" has no such diary.");
			return d.getOwner()+" has no such diary.";
		}
		
		
		newd.setContent(d.getContent());
		dao.updateDiary(newd);
		System.out.println("Diary updated successfully...");
		return "Diary updated successfully.";
	}

	@Override
	public Diary readDiary(String owner, Date date, String type) {
		// TODO Auto-generated method stub
		return dao.readDiary(owner, date, type);

	}

	@Override
	public List<Diary> getMyDiaries(String Owner) {
		// TODO Auto-generated method stub
		return dao.getMyDiaries(Owner);
		
	}
	
	@Override
	public List<Diary> getAllPublicDiaries(){
		return dao.getAllPublicDiaries();
	}
	
}