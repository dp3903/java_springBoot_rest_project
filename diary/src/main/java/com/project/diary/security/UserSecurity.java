package com.project.diary.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class UserSecurity {

    // add support for JDBC ... no more hardcoded users :-)

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {

        return new JdbcUserDetailsManager(dataSource);
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(configurer ->
                configurer
                		.requestMatchers(HttpMethod.GET, "/api/test").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/diary").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/diary").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/diary").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/mydiaries").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/allpublicdiaries").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/diary").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/newuser").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/deleteUser").hasRole("USER")
        );
        
//        http.authorizeHttpRequests().antMatchers("/api/newuser").permitAll();

        // use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

        // disable Cross Site Request Forgery (CSRF)
        // in general, not required for stateless REST APIs that use POST, PUT, DELETE and/or PATCH
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}
