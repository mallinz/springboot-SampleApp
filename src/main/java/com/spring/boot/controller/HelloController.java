package com.spring.boot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController {
	
	@RequestMapping(value = "/")
	public ModelAndView handleRedirect() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:/home.do");
		return mav;
	}

	@RequestMapping(value = "/hello.do")
	public ModelAndView hello() {
		ModelAndView mav = new ModelAndView();
		mav.addObject("name", "Navin");
		mav.setViewName("hello");
		return mav;
	}

}
