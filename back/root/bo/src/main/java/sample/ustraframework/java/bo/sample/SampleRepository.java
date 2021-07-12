package sample.ustraframework.java.bo.sample;

import org.apache.ibatis.annotations.Mapper;

import com.gsitm.ustra.java.data.domains.PaginationList;
import com.gsitm.ustra.java.data.domains.PaginationRequest;

@Mapper
public interface SampleRepository {

	PaginationList<SampleModel> select(PaginationRequest pagination, SampleModel.Criteria criteria);

}
