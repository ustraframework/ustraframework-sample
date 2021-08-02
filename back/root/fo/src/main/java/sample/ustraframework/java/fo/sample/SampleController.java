package sample.ustraframework.java.fo.sample;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

	@PostMapping("/api/npass/test")
	public String test(@RequestBody SampleVo in) {
		//return in.getTest();
		return "api test ok";
	}

}

