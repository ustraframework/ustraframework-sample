package sample.ustraframework.java.bo.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gsitm.ustra.java.data.domains.PaginationList;
import com.gsitm.ustra.java.data.domains.PaginationRequest;

@Service
@Transactional
public class SampleService {

	@Autowired private SampleRepository sampleRepository;

	public PaginationList<SampleModel> getCodes(PaginationRequest pagination, SampleModel.Criteria criteria) {
		return sampleRepository.select(pagination, criteria);
	};
}
