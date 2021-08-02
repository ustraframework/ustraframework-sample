package sample.ustraframework.java.bo.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.ustra.java.data.domains.PaginationList;
import com.gsitm.ustra.java.mvc.rest.utils.UstraRestUtils;

@RestController
public class SampleController {

	@Autowired SampleService service;

//	@GetMapping("/api/test")
//	public SampleResVo test() {
//		SampleResVo vo = new SampleResVo();
//		vo.setTest("test");
//		return vo;
//	}

	@PostMapping("/api/sample/paging")
	PaginationList<SampleModel> getCodeList(@RequestBody SampleModel.Criteria criteria) {
		return service.getCodes(UstraRestUtils.getCurrentApiHeader(), criteria);
	}

}