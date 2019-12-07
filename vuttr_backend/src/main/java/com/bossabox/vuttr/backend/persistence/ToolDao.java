package com.bossabox.vuttr.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bossabox.vuttr.backend.model.Tool;

public interface ToolDao extends JpaRepository<Tool, Integer> {

	@Query(value = "SELECT t FROM Tool t JOIN t.tags s WHERE :tag = s")
	List<Tool> findByTag(@Param("tag") String tag);
	
	List<Tool> findAllByOrderByIdDesc();
}
