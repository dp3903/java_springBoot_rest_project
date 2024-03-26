package com.project.diary.rest;


import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.diary.entities.Diary;
import com.project.diary.entities.Users;
import com.project.diary.service.diaryService;

import jakarta.servlet.http.HttpServletRequest;

//import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class Controller{
	
	private diaryService ds;
	
	@Autowired
	private UserDetailsManager userDetailsManager;
	
	@Autowired
	public Controller(diaryService ds) {
		this.ds = ds;
	}
	
	@GetMapping("test")
	public String test(@AuthenticationPrincipal UserDetails userDetails){
		try {
			System.out.println(userDetails.getUsername());
		}
		catch(Exception ex) {
			System.out.println("Some exception caught...");
		}
		return "Rest working successfully...";
	}
	
	@PostMapping("/newuser")
	public String createUser(HttpServletRequest request) throws IOException {
		System.out.println("Creating new user " + request.getParameter("username") + " password: " + request.getParameter("password"));
		
		Users userdata = new Users(request.getParameter("username"),request.getParameter("password"));
		
		try {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
	
			User user = new User(userdata.getUsername(), "{noop}"+userdata.getPassword(), authorities);
			userDetailsManager.createUser(user);
		}
		catch(Exception ex) {
			System.out.println("Error: " + ex.getMessage());
			return "Error, something went wrong. try again with different username.";
		}
		System.out.println("User '"+userdata.getUsername()+"' created Successfully");
		return "User created Successfully...";
	}

	
	@PostMapping("/diary")
	public String createDiaryEntry(@RequestBody Diary d, @AuthenticationPrincipal UserDetails userDetails) {
		System.out.println("Creating diary...");
//		Map<String,String[]> parameterMap = req.getParameterMap();
//		for (Map.Entry<String,String[]> entry : parameterMap.entrySet())  
//            System.out.println("Key = " + entry.getKey() + 
//                             ", Value = " + entry.getValue()); 
//		System.out.println(req.getParameter("content"));
//		System.out.println(userDetails.getUsername());
		
		if(d != null) {
			d.setOwner(userDetails.getUsername());
			d.setDate(new java.sql.Date(System.currentTimeMillis()));
			System.out.println(d);
			return ds.createEntry(d);
//			System.out.println("Diary created successfully...");
			
		}
		else {
			System.out.println("Diary is empty...");
			return "Input Diary is empty";
		}
		
	}
	
	@GetMapping("/diary")
	public Diary getdiaryEntry(@RequestParam("date") Date date, @RequestParam("type") String type, @AuthenticationPrincipal UserDetails userDetails) {
//		Date d = new Date(System.currentTimeMillis());
//		String type = "private";
		System.out.println("Getting diary of " + userDetails.getUsername() + " on Date: " + date + " of type: " + type);
		if(date != null && type != null) {
			return ds.readDiary(userDetails.getUsername(), date, type);
		}
		return null;
	}
	
	@GetMapping("/mydiaries")
	public List<Diary> getMyDiaries(@AuthenticationPrincipal UserDetails userDetails) {
		System.out.println("Getting all diaries of user: " + userDetails.getUsername());
		return ds.getMyDiaries(userDetails.getUsername());
	}
	
	@GetMapping("/allpublicdiaries")
	public List<Diary> getPublicDiaries(@AuthenticationPrincipal UserDetails userDetails) {
		System.out.println("Getting all public diaries");
		return ds.getAllPublicDiaries();
	}
	
	@PutMapping("/diary")
	public String updateDiaryEntry(@RequestBody Diary d, @AuthenticationPrincipal UserDetails userDetails) {
//		Date d = new Date(System.currentTimeMillis());
//		String type = "private";
		d.setOwner(userDetails.getUsername());
		d.setDate((d.getDate() != null) ? d.getDate() : (new Date(System.currentTimeMillis())));
		System.out.println("Updating diary of " + userDetails.getUsername() + " on Date: " + d.getDate() + " of type: " + d.getType());
		if(d.getDate() != null && d.getType() != null) {
			return ds.updateDiary(d);
		}
		return "Please set the type and other inputs properly.";

	}
	
	@DeleteMapping("/diary")
	public String deleteDiaryEntry(@RequestBody Diary d, @AuthenticationPrincipal UserDetails userDetails) {
//		Date d = new Date(System.currentTimeMillis());
//		String type = "private";
		d.setOwner(userDetails.getUsername());
//		d.setDate((d.getDate() != null) ? d.getDate() : (new Date(System.currentTimeMillis())));
		System.out.println("Deleting diary of " + userDetails.getUsername() + " on Date: " + d.getDate() + " of type: " + d.getType());
		if(d.getDate() != null && d.getType() != null) {
			return ds.deleteEntry(d);
		}
		return "Please give the date and type of the diary to be deleted.";
	}
	
	@DeleteMapping("/deleteUser")
	public String deleteUser(@RequestBody String m, @AuthenticationPrincipal UserDetails userDetails) {
		System.out.println(m);
		if(m.equalsIgnoreCase("confirm")) {
			System.out.println("Deleting all entries of the user: " + userDetails.getUsername());
			ds.deleteEntryByUser(userDetails.getUsername());
			System.out.println("Deleted all the entries this user: '"+userDetails.getUsername() + "' Successfully.");
			System.out.println("Deleting this user: "+userDetails.getUsername());
			userDetailsManager.deleteUser(userDetails.getUsername());
			System.out.println("Deleted this user: '"+userDetails.getUsername() + "' Successfully.");
			return "User deleted successfuly";
		}
		System.out.println("No confirm message for Deleting this user: "+userDetails.getUsername());
		return "Confirmation to delete user not recieved. Please send 'confirm' as plain text to delete this user.";
	}
	
}

@RestController
class IndexController implements ErrorController{
    private final static String PATH = "/error";
 
    @RequestMapping(PATH)
    @ResponseBody
    public String getErrorPath() {
        // TODO Auto-generated method stub
        return "No Mapping Found";
    }

}