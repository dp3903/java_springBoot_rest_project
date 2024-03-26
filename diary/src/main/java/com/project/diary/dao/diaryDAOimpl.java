package com.project.diary.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.diary.entities.Diary;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
public class diaryDAOimpl implements diaryDAO{
	
	private EntityManager em;
	
	@Autowired
	public diaryDAOimpl(EntityManager theEntityManager) {
		em = theEntityManager;
	}
	
	
	@Override
	@Transactional
	public void createEntry(Diary d) {
		em.persist(d);
	}
	
	@Override
	@Transactional
	public void deleteEntry(Diary d) {
		em.remove(d);
	}
	
	@Override
	@Transactional
	public void deleteEntryByUser(String owner) {
//		System.out.println("Deleting all entries of user; " + owner);
		Query q = em.createNativeQuery("DELETE FROM diary WHERE owner=:o", Diary.class);
		q.setParameter("o", owner);
		int u = q.executeUpdate();
		System.out.println(u + " Entries deleted.");
	}
	
	@Override
	@Transactional
	public void updateDiary(Diary d) {
		em.merge(d);
	}
	
	@Override
	@Transactional
	public Diary readDiary(String owner, Date date, String type) {
		System.out.println("Searching for " + owner + " on date: " + date + " of type: " + type);
		TypedQuery<Diary> q = em.createQuery("from Diary where owner=:o and date=:d and type=:t", Diary.class);
		q.setParameter("o", owner);
		q.setParameter("d", date);
		q.setParameter("t", type);
//		System.out.println(q.getParameterValue("owner"));
//		System.out.println(q.getParameterValue("d"));
		List<Diary> res = q.getResultList();
		System.out.println(res.size());
		if(res.size() == 0)
			return null;
		System.out.println(res.get(0));
		return res.get(0);
	}
	
	@Override
	@Transactional
	public List<Diary> getMyDiaries(String owner){
		TypedQuery<Diary> q = em.createQuery("from Diary where owner=:o", Diary.class);
		q.setParameter("o", owner);
		List<Diary> res = q.getResultList();
		return res;
	}
	
	@Override
	@Transactional
	public List<Diary> getAllPublicDiaries(){
		TypedQuery<Diary> q = em.createQuery("from Diary where type=:t", Diary.class);
		q.setParameter("t", "public");
		List<Diary> res = q.getResultList();
		return res;
	}
}