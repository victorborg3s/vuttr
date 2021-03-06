package com.bossabox.vuttr.backend.controller;

import java.security.InvalidParameterException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.bossabox.vuttr.backend.model.Tool;
import com.bossabox.vuttr.backend.persistence.ToolDao;

@Controller
@RequestMapping("tools")
public class ToolController {

	@Autowired
	private ToolDao toolDao;

	/**
	 * Public end-point that return paginated {@link Tool}s
	 * 
	 * @param tag optional parameter used to filter the returned {@link Tool}s
	 * @return a list of tools from database
	 */
	@GetMapping("/paginated")
	public @ResponseBody Page<Tool> getAllPaginated(@RequestParam(required = false) String tag,
			@RequestParam(required = true) Integer page, @RequestParam(required = false) Integer size) {
		int iSize = size == null || size <= 0 ? 10 : size;
		PageRequest pageRequest = PageRequest.of(page, iSize, Sort.Direction.DESC, "id");
		if (tag != null && !tag.isEmpty()) {
			return toolDao.findByTag(pageRequest, tag);
		}
		return toolDao.findAllByOrderByIdDesc(pageRequest);
	}

	/**
	 * Public end-point that return {@link Tool}s
	 * 
	 * @param tag optional parameter used to filter the returned {@link Tool}s
	 * @return a list of tools from database
	 */
	@GetMapping
	public @ResponseBody List<Tool> getAll(@RequestParam(required = false) String tag) {
		if (tag != null && !tag.isEmpty()) {
			return toolDao.findByTag(tag);
		}
		return toolDao.findAllByOrderByIdDesc();
	}

	/**
	 * Private end-point that allow the creation of a new {@link Tool}. Only
	 * accessible with a valid {@link OAuth2Authentication}
	 * 
	 * @param auth token with user authentication that can be used to do some
	 *             checking
	 * @param tool the object to be inserted/updated
	 * @return inserted/updated record
	 */
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("#oauth2.hasAnyScope('vuttr_tool_write')")
	public @ResponseBody Tool save(@Valid @RequestBody Tool tool) {
		return toolDao.save(tool);
	}

	/**
	 * Private end-point that allow the deletion of an existing {@link Tool}. Only
	 * accessible with a valid {@link OAuth2Authentication}
	 * 
	 * @param auth           token with user authentication that can be used to do
	 *                       some checking
	 * @param toolDescriptor the object to be inserted/updated
	 * @return inserted/updated record
	 */
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("#oauth2.hasAnyScope('vuttr_tool_write')")
	public @ResponseBody void delete(@PathVariable Integer id) {
		if (id != null && id > 0) {
			Tool tool = toolDao.getOne(id);
			toolDao.delete(tool);
		} else {
			throw new InvalidParameterException("Parameter id is required for Tool deletion.");
		}
	}

}
