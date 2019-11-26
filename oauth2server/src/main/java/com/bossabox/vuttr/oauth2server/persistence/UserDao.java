package com.bossabox.vuttr.oauth2server.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bossabox.vuttr.oauth2server.model.User;

public interface UserDao extends JpaRepository<User, Integer> {

	@Query("SELECT DISTINCT u FROM User u WHERE u.userName = :username")
	User findByUsername(@Param("username") String username);
}
